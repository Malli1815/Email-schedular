const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  googleId?: string;
}

export interface Email {
  id: string;
  recipient: string;
  subject: string;
  status: 'SCHEDULED' | 'SENT' | 'FAILED';
  scheduledAt: string;
  createdAt: string;
}

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  getMe: async (): Promise<User | null> => {
    try {
      const res = await fetch(`${API_URL}/me`, { headers: getHeaders() });
      if (!res.ok) return null;
      return res.json();
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return null;
    }
  },

  getEmails: async (): Promise<Email[]> => {
    try {
      const res = await fetch(`${API_URL}/emails`, { headers: getHeaders() });
      if (!res.ok) throw new Error('Failed to fetch emails');
      return res.json();
    } catch (error) {
      console.error('Failed to fetch emails:', error);
      return [];
    }
  },

  scheduleEmail: async (data: any) => {
    const res = await fetch(`${API_URL}/emails/schedule`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to schedule email');
    }
    return res.json();
  },

  getStats: async () => {
    try {
      const res = await fetch(`${API_URL}/emails/stats`, { headers: getHeaders() });
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      return { total: 0, sent: 0, scheduled: 0, failed: 0 };
    }
  },

  deleteEmail: async (id: string) => {
    const res = await fetch(`${API_URL}/emails/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to cancel email');
    return res.json();
  },

  sendNow: async (id: string) => {
    const res = await fetch(`${API_URL}/emails/${id}/send`, {
      method: 'POST',
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to send email now');
    return res.json();
  },
};
