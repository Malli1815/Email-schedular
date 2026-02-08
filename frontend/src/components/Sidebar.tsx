"use client";

import React from 'react';
import { Mail, LayoutDashboard, List, Plus, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { User } from '@/lib/api';

interface SidebarProps {
    user: User | null;
    onLogout: () => void;
    onComposeClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, onLogout, onComposeClick }) => {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
        { name: 'Scheduled Emails', icon: List, href: '/dashboard/scheduled' },
        { name: 'Compose Email', icon: Plus, href: '#', onClick: onComposeClick },
    ];

    return (
        <aside 
            style={{ 
                width: '260px', 
                height: '100vh', 
                backgroundColor: 'white', 
                borderRight: '1px solid #F1F5F9', 
                display: 'flex', 
                flexDirection: 'column', 
                position: 'fixed', 
                left: 0, 
                top: 0, 
                zIndex: 40 
            }}
        >
            {/* Logo */}
            <div style={{ padding: '32px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: '#4F46E5', 
                        borderRadius: '12px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.2)' 
                    }}>
                        <Mail style={{ width: '20px', height: '20px', color: 'white' }} />
                    </div>
                    <span style={{ fontSize: '20px', fontWeight: 900, color: '#111827', letterSpacing: '-0.05em' }}>ReachInbox</span>
                </div>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || (item.name === 'Overview' && pathname === '/dashboard');
                    
                    const itemContent = (
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '16px', 
                            padding: '16px 20px', 
                            borderRadius: '16px', 
                            transition: 'all 0.3s',
                            backgroundColor: isActive ? '#4F46E5' : 'transparent',
                            color: isActive ? 'white' : '#6B7280',
                            boxShadow: isActive ? '0 20px 25px -5px rgba(79, 70, 229, 0.3)' : 'none',
                        }}>
                            <item.icon style={{ width: '20px', height: '20px', color: isActive ? 'white' : '#9CA3AF' }} />
                            <span style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '-0.025em' }}>{item.name}</span>
                        </div>
                    );

                    if (item.onClick) {
                        return (
                            <button key={item.name} onClick={item.onClick} style={{ width: '100%', textAlign: 'left', border: 'none', background: 'none', padding: 0, cursor: 'pointer', outline: 'none' }}>
                                {itemContent}
                            </button>
                        );
                    }

                    return (
                        <Link key={item.name} href={item.href} style={{ textDecoration: 'none' }}>
                            {itemContent}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div style={{ padding: '16px', marginTop: 'auto', borderTop: '1px solid #F1F5F9', backgroundColor: '#F9FAFB' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px' }}>
                    <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '9999px', 
                        backgroundColor: '#4F46E5', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        color: 'white', 
                        fontWeight: 'bold', 
                        fontSize: '14px', 
                        overflow: 'hidden' 
                    }}>
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            user?.name?.charAt(0) || 'U'
                        )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'User'}</p>
                        <p style={{ fontSize: '10px', color: '#6B7280', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email || 'No email'}</p>
                    </div>
                    <button
                        onClick={onLogout}
                        style={{ padding: '6px', color: '#9CA3AF', border: 'none', background: 'none', cursor: 'pointer', borderRadius: '8px', transition: 'colors 0.2s' }}
                        title="Logout"
                    >
                        <LogOut style={{ width: '16px', height: '16px' }} />
                    </button>
                </div>
            </div>
        </aside>
    );
};
