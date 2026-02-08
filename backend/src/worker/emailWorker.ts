import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import nodemailer from 'nodemailer';
// @ts-ignore
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Export transporter for direct use when queue is unavailable
export const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Shared email sending logic
export async function sendEmailJob(data: any) {
  const { emailId, recipient, subject, body, userId, hourlyLimit, fromEmail } = data;

  // Send email via Ethereal
  const info = await transporter.sendMail({
    from: fromEmail || '"ReachInbox Scheduler" <scheduler@reachinbox.ai>',
    to: recipient,
    subject: subject,
    text: body,
  });

  console.log(`Email sent: ${info.messageId}`);

  // Update DB status
  await prisma.email.update({
    where: { id: emailId },
    data: {
      status: 'SENT',
      sentAt: new Date(),
    },
  });

  return info;
}

let emailWorker: Worker | null = null;

// Only create worker if Redis is available
if (process.env.REDIS_URL && process.env.REDIS_URL.trim() !== '') {
  try {
    const connection = new IORedis(process.env.REDIS_URL, {
      maxRetriesPerRequest: null,
      lazyConnect: true,
    });

    connection.on('error', (err) => {
      console.warn('Worker Redis connection error:', err.message);
    });

    emailWorker = new Worker(
      'email-queue',
      async (job: Job) => {
        try {
          await sendEmailJob(job.data);
        } catch (error: any) {
          console.error(`Failed to send email ${job.data.emailId}:`, error);
          await prisma.email.update({
            where: { id: job.data.emailId },
            data: {
              status: 'FAILED',
              error: error.message,
            },
          });
          throw error;
        }
      },
      {
        connection,
        concurrency: parseInt(process.env.WORKER_CONCURRENCY || '5'),
        limiter: {
          max: 1,
          duration: 2000, // 2 seconds between sends
        },
      }
    );

    console.log('Email worker initialized with Redis');
  } catch (error: any) {
    console.warn('Failed to initialize email worker:', error.message);
    console.warn('Emails will be sent immediately instead of being queued');
  }
} else {
  console.log('No Redis configured - worker not initialized');
}

export { emailWorker };
