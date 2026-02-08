"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, User, Email } from '@/lib/api';
import { Sidebar } from '@/components/Sidebar';
import { ScheduleEmailModal } from '@/components/ScheduleEmailModal';
import { motion } from 'framer-motion';
import { Clock, Send, AlertCircle, Calendar, ChevronRight } from 'lucide-react';

export default function ScheduledEmailsPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'ALL' | 'SCHEDULED' | 'SENT' | 'FAILED'>('ALL');

  const fetchData = async () => {
    try {
      const userData = await api.getMe();
      setUser(userData);
      const emailsData = await api.getEmails();
      setEmails(emailsData);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const handleCancel = async (id: string) => {
    try {
      if (confirm('Are you sure you want to cancel this scheduled email?')) {
        await api.deleteEmail(id);
        fetchData();
      }
    } catch (err) {
      alert('Failed to cancel email');
    }
  };

  const handleSendNow = async (id: string) => {
    try {
      await api.sendNow(id);
      fetchData();
      alert('Email delivery triggered successfully!');
    } catch (err) {
      alert('Failed to send email now');
    }
  };

  const filteredEmails = emails.filter(email => {
    const recipient = email.recipient || '';
    const subject = email.subject || '';
    const matchesSearch = recipient.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'ALL' || email.status === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F9FC' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid #4F46E5', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: '#4F46E5', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Loading Emails...</p>
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
          <div style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#111827', letterSpacing: '-0.025em', marginBottom: '12px', margin: 0 }}>Scheduled Emails</h1>
              <p style={{ color: '#9CA3AF', fontSize: '18px', fontWeight: 500, margin: 0 }}>Manage and track your upcoming email campaigns.</p>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                    <input 
                        type="text" 
                        placeholder="Search emails..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ padding: '12px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', backgroundColor: 'white', fontSize: '14px', width: '300px', outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                    />
                </div>
                <div style={{ display: 'flex', backgroundColor: '#F1F5F9', borderRadius: '12px', padding: '4px' }}>
                    {(['ALL', 'SCHEDULED', 'SENT', 'FAILED'] as const).map(f => (
                        <button 
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{ 
                                padding: '8px 16px', 
                                border: 'none', 
                                borderRadius: '8px', 
                                fontSize: '11px', 
                                fontWeight: 700, 
                                cursor: 'pointer',
                                backgroundColor: filter === f ? 'white' : 'transparent',
                                color: filter === f ? '#111827' : '#64748B',
                                boxShadow: filter === f ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                            }}
                        >
                            {f === 'ALL' ? 'ALL' : f}
                        </button>
                    ))}
                </div>
            </div>
          </div>

          {/* Email List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredEmails.length === 0 ? (
              <div style={{ padding: '64px', textAlign: 'center', backgroundColor: 'white', borderRadius: '32px', border: '1px solid #F1F5F9' }}>
                <div style={{ width: '64px', height: '64px', backgroundColor: '#F8F9FC', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <Calendar style={{ width: '32px', height: '32px', color: '#9CA3AF' }} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '8px', margin: 0 }}>No emails found</h3>
                <p style={{ color: '#6B7280', fontWeight: 500, margin: 0 }}>Try adjusting your filters or search query.</p>
              </div>
            ) : (
              filteredEmails.map((email) => (
                <div 
                  key={email.id} 
                  style={{ 
                    backgroundColor: 'white', 
                    padding: '24px 32px', 
                    borderRadius: '24px', 
                    border: '1px solid #F1F5F9', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '24px',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '16px', 
                    backgroundColor: email.status === 'SENT' ? '#ECFDF5' : email.status === 'FAILED' ? '#FFF1F2' : '#EEF2FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {email.status === 'SENT' ? <Send style={{ width: '20px', height: '20px', color: '#10B981' }} /> :
                     email.status === 'FAILED' ? <AlertCircle style={{ width: '20px', height: '20px', color: '#F43F5E' }} /> :
                     <Clock style={{ width: '20px', height: '20px', color: '#4F46E5' }} />}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '4px', margin: 0 }}>{email.subject}</h4>
                    <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>To: <span style={{ color: '#111827', fontWeight: 600 }}>{email.recipient}</span></p>
                  </div>

                  <div style={{ textAlign: 'right', minWidth: '150px' }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px', margin: 0 }}>Scheduled For</p>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>{new Date(email.scheduledAt).toLocaleDateString()} at {new Date(email.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>

                  {email.status === 'SCHEDULED' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                            onClick={() => handleSendNow(email.id)}
                            style={{ padding: '8px 16px', backgroundColor: '#EEF2FF', color: '#4F46E5', border: 'none', borderRadius: '12px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}
                        >
                            SEND NOW
                        </button>
                        <button 
                            onClick={() => handleCancel(email.id)}
                            style={{ padding: '8px 16px', backgroundColor: '#FFF1F2', color: '#F43F5E', border: 'none', borderRadius: '12px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}
                        >
                            CANCEL
                        </button>
                    </div>
                  )}

                  <div style={{ padding: '8px', color: '#E2E8F0' }}>
                    <ChevronRight style={{ width: '20px', height: '20px' }} />
                  </div>
                </div>
              ))
            )}
          </div>
                </motion.div>
            </main>

            <ScheduleEmailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                    fetchData();
                }}
            />
        </div>
    );
}
