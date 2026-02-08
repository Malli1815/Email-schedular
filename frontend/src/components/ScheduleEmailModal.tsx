"use client";

import React, { useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, User, Type, AlignLeft, Send, Sparkles } from 'lucide-react';

interface ScheduleEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ScheduleEmailModal: React.FC<ScheduleEmailModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    recipient: '',
    subject: '',
    body: '',
    scheduledAt: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.scheduledAt) {
        setError('Please select a launch schedule');
        return;
      }

      const scheduleTime = new Date(formData.scheduledAt);
      const now = new Date();
      if (scheduleTime.getTime() < now.getTime()) {
        setError('Launch schedule must be in the future');
        return;
      }

      await api.scheduleEmail(formData);
      onSuccess();
      onClose();
      setFormData({ recipient: '', subject: '', body: '', scheduledAt: '' });
    } catch (err: any) {
      setError(err.message || 'Workflow execution failed. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)' }}
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            style={{ 
              position: 'relative', 
              backgroundColor: '#0a0a0a', 
              borderRadius: '40px', 
              boxShadow: '0 32px 128px -16px rgba(0,0,0,0.7)', 
              width: '100%', 
              maxWidth: '672px', 
              overflow: 'hidden', 
              border: '1px solid rgba(255, 255, 255, 0.1)' 
            }}
          >
            {/* Header Accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '6px', background: 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '40px', paddingBottom: '24px' }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '30px', fontWeight: 900, color: 'white', letterSpacing: '-0.05em', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Sparkles style={{ width: '24px', height: '24px', color: '#818cf8' }} />
                  New Campaign
                </h2>
                <p style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '4px', margin: 0, opacity: 0.6 }}>Outreach Orchestrator</p>
              </div>
              <button 
                onClick={onClose} 
                style={{ padding: '12px', backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#6B7280', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s' }}
              >
                <X style={{ width: '24px', height: '24px' }} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '0 40px 40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {error && (
                <div style={{ padding: '20px', backgroundColor: 'rgba(244, 63, 94, 0.1)', color: '#F43F5E', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '16px', border: '1px solid rgba(244, 63, 94, 0.2)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '16px' }}>⚠️</span>
                  {error}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ fontSize: '10px', fontWeight: 900, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User style={{ width: '14px', height: '14px' }} /> Target Recipient
                  </label>
                  <input
                    type="email"
                    required
                    style={{ width: '100%', height: '64px', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '0 24px', color: 'white', fontWeight: 700, fontSize: '16px', outline: 'none' }}
                    placeholder="identity@enterprise.com"
                    value={formData.recipient}
                    onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ fontSize: '10px', fontWeight: 900, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CalendarIcon style={{ width: '14px', height: '14px' }} /> Launch Schedule
                  </label>
                  <input
                    type="datetime-local"
                    required
                    style={{ width: '100%', height: '64px', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '0 24px', color: 'white', fontWeight: 700, fontSize: '16px', outline: 'none' }}
                    value={formData.scheduledAt}
                    onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '10px', fontWeight: 900, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Type style={{ width: '14px', height: '14px' }} /> Campaign Subject
                </label>
                <input
                  type="text"
                  required
                  style={{ width: '100%', height: '64px', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '0 24px', color: 'white', fontWeight: 700, fontSize: '16px', outline: 'none' }}
                  placeholder="The primary objective..."
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '10px', fontWeight: 900, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlignLeft style={{ width: '14px', height: '14px' }} /> Intelligence Body
                  </label>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      type="button"
                      onClick={() => {
                        if (!formData.subject) {
                          setError('Please enter a subject first');
                          return;
                        }
                        setLoading(true);
                        setTimeout(() => {
                          setFormData({
                            ...formData,
                            body: `Hi there,\n\nI was researching more about ${formData.subject} and thought our platform could really help you scale. We've helped similar companies grow 2x.\n\nWould you be open to a 10-minute chat next week?\n\nBest regards,\nReachInbox Intelligence`
                          });
                          setLoading(false);
                        }, 800);
                      }}
                      style={{ 
                        padding: '8px 16px', 
                        backgroundColor: 'rgba(129, 140, 248, 0.1)', 
                        color: '#818cf8', 
                        border: '1px solid rgba(129, 140, 248, 0.2)', 
                        borderRadius: '12px', 
                        fontSize: '11px', 
                        fontWeight: 800, 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        cursor: 'pointer' 
                      }}
                    >
                      <Sparkles style={{ width: '12px', height: '12px' }} />
                      AI WRITER
                    </button>

                    <select
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'outreach') {
                          setFormData({ ...formData, subject: 'Scaling your outreach', body: 'Hi,\n\nI noticed you are looking to scale your email outreach. Our platform automates everything with precision...' });
                        } else if (val === 'followup') {
                          setFormData({ ...formData, subject: 'Quick follow up', body: 'Hi,\n\nJust wanted to follow up on my previous email regarding our scheduler...' });
                        } else if (val === 'professional') {
                          setFormData({ ...formData, subject: 'Partnership Opportunity', body: 'Dear Team,\n\nI am writing to express my interest in a potential partnership between our companies...' });
                        }
                        e.target.value = '';
                      }}
                      style={{ 
                        padding: '8px 12px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                        color: '#9CA3AF', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '12px', 
                        fontSize: '11px', 
                        fontWeight: 700,
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="">TEMPLATES</option>
                      <option value="outreach">Outreach</option>
                      <option value="followup">Follow-up</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>
                </div>
                <textarea
                  required
                  rows={4}
                  style={{ width: '100%', borderRadius: '24px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '24px', color: 'white', fontWeight: 500, fontSize: '16px', lineHeight: '1.6', outline: 'none', resize: 'none' }}
                  placeholder="Differentiate your message..."
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <button 
                  type="button" 
                  onClick={onClose}
                  style={{ backgroundColor: 'transparent', color: '#9CA3AF', padding: '16px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                >
                  Abort Launch
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ 
                    backgroundColor: '#4F46E5', 
                    color: 'white', 
                    padding: '16px 40px', 
                    borderRadius: '16px', 
                    border: 'none', 
                    cursor: 'pointer', 
                    fontWeight: 800, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  <Send style={{ width: '16px', height: '16px' }} /> 
                  {loading ? 'Processing...' : 'Initialize Workflow'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

function AlertCircle({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>
        </svg>
    )
}
