"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, User, Email } from '@/lib/api';
import { ScheduleEmailModal } from '@/components/ScheduleEmailModal';
import { Sidebar } from '@/components/Sidebar';
import DashboardStats from '@/components/DashboardStats';
import { PromoBanner } from '@/components/PromoBanner';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await api.getMe();
        setUser(userData);
        const emailsData = await api.getEmails();
        setEmails(emailsData);
      } catch (err) {
        setError('Real-time connection unstable. Syncing with local cache.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const stats = {
    total: emails.length,
    sent: emails.filter(e => e.status === 'SENT').length,
    scheduled: emails.filter(e => e.status === 'SCHEDULED').length,
    failed: emails.filter(e => e.status === 'FAILED').length,
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-indigo-600 font-bold uppercase tracking-widest text-xs animate-pulse">Initializing Dashboard...</p>
        </div>
      </div>
    );
  }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FC', display: 'flex' }}>
            <Sidebar 
                user={user} 
                onLogout={handleLogout} 
                onComposeClick={() => setIsModalOpen(true)} 
            />

            <main style={{ flex: 1, marginLeft: '260px', padding: '48px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ maxWidth: '1280px', margin: '0 auto' }}
                >
                    {/* Header */}
                    <div style={{ marginBottom: '48px' }}>
                        <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#111827', letterSpacing: '-0.025em', marginBottom: '12px', margin: 0 }}>Overview</h1>
                        <p style={{ color: '#9CA3AF', fontSize: '18px', fontWeight: 500, margin: 0 }}>Real-time performance of your email campaigns.</p>
                    </div>

                    {/* Stats Grid */}
                    <DashboardStats stats={stats} />

                    {/* Banner */}
                    <PromoBanner onComposeClick={() => setIsModalOpen(true)} />

                    {error && (
                        <div style={{ marginTop: '32px', padding: '16px', backgroundColor: '#FFFBEB', color: '#D97706', borderRadius: '16px', border: '1px solid #FEF3C7', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {error}
                        </div>
                    )}
                </motion.div>
            </main>

            <ScheduleEmailModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                    api.getEmails().then(setEmails).catch(console.error);
                }}
            />
        </div>
    );
}

// Visual Helper Component
function Calendar({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
        </svg>
    )
}
