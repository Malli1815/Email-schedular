import { Request, Response } from 'express';
import { Email } from '../models/Email';
import { emailQueue, isQueueAvailable } from '../queue/emailQueue';

// Mock DB for demo mode
let mockEmails: any[] = [];

export const getEmails = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - user added by auth middleware
    const userId = req.user?.userId;

    if (!userId) { // Check if running in demo/no-auth mode or just invalid
      if (mockEmails.length > 0) return res.json(mockEmails);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if we are using MongoDB
    try {
      const emails = await Email.find({ userId }).sort({ createdAt: -1 });
      return res.json(emails);
    } catch (dbError) {
      // Fallback to mock data if DB fails
      return res.json(mockEmails);
    }

  } catch (error: any) {
    console.error('Get emails error:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
};

export const scheduleEmail = async (req: Request, res: Response) => {
  try {
    const { recipient, subject, body, scheduledAt } = req.body;
    // @ts-ignore
    const userId = req.user?.userId || 'demo_user';

    if (!scheduledAt) {
      return res.status(400).json({ error: 'Launch Schedule (date) is required' });
    }

    const scheduleTime = new Date(scheduledAt);

    // Check for invalid date
    if (isNaN(scheduleTime.getTime())) {
      return res.status(400).json({ error: 'Invalid launch schedule date format' });
    }

    const now = new Date();
    // Use a small buffer (30 seconds) to account for network lag
    const delay = scheduleTime.getTime() - now.getTime();

    if (delay < -30000) { // If more than 30 seconds in the past
      return res.status(400).json({ error: 'Scheduled time must be in the future' });
    }

    let emailData: any = {
      userId,
      recipient,
      subject,
      body,
      status: 'SCHEDULED',
      scheduledAt: scheduleTime,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Try to save to MongoDB
    try {
      const newEmail = await Email.create({
        userId,
        recipient,
        subject,
        body,
        scheduledAt: scheduleTime,
        status: 'SCHEDULED'
      });
      emailData = newEmail.toObject();
    } catch (e) {
      console.warn('DB save failed, using mock persistence', e);
      emailData._id = Math.random().toString(36).substr(2, 9);
      mockEmails.push(emailData);
    }

    // Add to BullMQ
    if (isQueueAvailable && emailQueue) {
      await emailQueue.add('send-email', {
        emailId: emailData._id || emailData.id,
        recipient,
        subject,
        body
      }, {
        delay: delay
      });
      console.log(`Job added to queue with ${delay}ms delay`);
    } else {
      console.warn('Queue not available. Email scheduled but will NOT be sent automatically in this demo mode unless calling a process endpoint manually (not implemented).');
      // In a real fallback, we might set a timeout here, but for now we just warn.
    }

    res.json(emailData);

  } catch (error: any) {
    console.error('Schedule error:', error);
    res.status(500).json({ error: 'Failed to schedule email' });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user?.userId;

    let stats = {
      total: 0,
      sent: 0,
      scheduled: 0,
      failed: 0
    };

    try {
      if (userId) {
        const emails = await Email.find({ userId });
        stats.total = emails.length;
        stats.sent = emails.filter(e => e.status === 'SENT').length;
        stats.scheduled = emails.filter(e => e.status === 'SCHEDULED').length;
        stats.failed = emails.filter(e => e.status === 'FAILED').length;
      } else {
        stats.total = mockEmails.length;
        stats.sent = mockEmails.filter(e => e.status === 'SENT').length;
        stats.scheduled = mockEmails.filter(e => e.status === 'SCHEDULED').length;
        stats.failed = mockEmails.filter(e => e.status === 'FAILED').length;
      }
    } catch (e) {
      stats.total = mockEmails.length;
      stats.sent = mockEmails.filter(e => e.status === 'SENT').length;
      stats.scheduled = mockEmails.filter(e => e.status === 'SCHEDULED').length;
      stats.failed = mockEmails.filter(e => e.status === 'FAILED').length;
    }

    res.json(stats);

  } catch (error) {
    res.status(500).json({ error: 'Failed to get stats' });
  }
}

export const deleteEmail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // @ts-ignore
    const userId = req.user?.userId;

    try {
      if (userId) {
        await Email.findOneAndDelete({ _id: id, userId });
      } else {
        mockEmails = mockEmails.filter(e => e._id !== id);
      }
      res.json({ message: 'Email cancelled and removed' });
    } catch (e) {
      mockEmails = mockEmails.filter(e => e._id !== id);
      res.json({ message: 'Email cancelled and removed (mock)' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete email' });
  }
};

export const sendNow = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // @ts-ignore
    const userId = req.user?.userId;

    let email;
    try {
      if (userId) {
        email = await Email.findOne({ _id: id, userId });
      } else {
        email = mockEmails.find(e => e._id === id);
      }

      if (!email) return res.status(404).json({ error: 'Email not found' });

      // Add to queue immediately with 0 delay if queue is available
      if (isQueueAvailable && emailQueue) {
        await emailQueue.add('send-email', {
          emailId: id,
          recipient: email.recipient,
          subject: email.subject,
          body: email.body
        }, { delay: 0 });
      }

      // Update status
      if (userId) {
        // @ts-ignore
        email.status = 'SENT';
        // @ts-ignore
        await email.save();
      } else {
        email.status = 'SENT';
        email.updatedAt = new Date();
      }

      res.json({ message: 'Email processing triggered', email });
    } catch (e) {
      res.status(500).json({ error: 'DB processing failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
};
