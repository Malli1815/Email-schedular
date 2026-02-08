import { Queue } from 'bullmq';
import IORedis from 'ioredis';

let emailQueue: Queue | null = null;
let isQueueAvailable = false;

// Only initialize Redis if REDIS_URL is provided
if (process.env.REDIS_URL && process.env.REDIS_URL.trim() !== '') {
  try {
    const connection = new IORedis(process.env.REDIS_URL, {
      maxRetriesPerRequest: null,
      lazyConnect: true,
    });

    connection.on('error', (err) => {
      console.warn('Redis connection error:', err.message);
      console.warn('Queue features disabled. Emails will be sent immediately.');
      isQueueAvailable = false;
    });

    connection.on('connect', () => {
      console.log('Redis connected successfully');
      isQueueAvailable = true;
    });

    emailQueue = new Queue('email-queue', {
      connection,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
        removeOnComplete: true,
        removeOnFail: 1000,
      },
    });

    // Try to connect
    connection.connect().catch((err) => {
      console.warn('Failed to connect to Redis:', err.message);
      console.warn('Running without queue - emails will be sent immediately');
    });
  } catch (error: any) {
    console.warn('Redis initialization failed:', error.message);
    console.warn('Running without queue - emails will be sent immediately');
  }
} else {
  console.log('No REDIS_URL configured - running without queue');
  console.log('Emails will be sent immediately instead of being queued');
}

export { emailQueue, isQueueAvailable };
