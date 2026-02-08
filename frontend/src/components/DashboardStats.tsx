import React from 'react';
import { BarChart3, Clock, Send, AlertCircle } from 'lucide-react';

interface Stats {
  total: number;
  sent: number;
  scheduled: number;
  failed: number;
}

interface DashboardStatsProps {
  stats: Stats;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statItems = [
    { 
      label: 'TOTAL SCHEDULED', 
      value: stats.total, 
      icon: BarChart3, 
      colorClass: 'text-indigo-600', 
      bgClass: 'bg-indigo-50' 
    },
    { 
      label: 'PENDING DELIVERY', 
      value: stats.scheduled, 
      icon: Clock, 
      colorClass: 'text-amber-500', 
      bgClass: 'bg-amber-50' 
    },
    { 
      label: 'SENT SUCCESSFULLY', 
      value: stats.sent, 
      icon: Send, 
      colorClass: 'text-emerald-500', 
      bgClass: 'bg-emerald-50' 
    },
    { 
      label: 'FAILED ATTEMPTS', 
      value: stats.failed, 
      icon: AlertCircle, 
      colorClass: 'text-rose-500', 
      bgClass: 'bg-rose-50' 
    },
  ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            {statItems.map((item, index) => (
                <div 
                    key={index} 
                    style={{ 
                        backgroundColor: 'white', 
                        padding: '32px', 
                        borderRadius: '32px', 
                        border: '1px solid #F1F5F9', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '24px', 
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                        transition: 'box-shadow 0.3s'
                    }}
                >
                    <div style={{ 
                        backgroundColor: item.bgClass === 'bg-indigo-50' ? '#EEF2FF' : 
                                       item.bgClass === 'bg-amber-50' ? '#FFFBEB' : 
                                       item.bgClass === 'bg-emerald-50' ? '#ECFDF5' : '#FFF1F2', 
                        padding: '20px', 
                        borderRadius: '16px' 
                    }}>
                        <item.icon style={{ 
                            width: '32px', 
                            height: '32px', 
                            color: item.colorClass.includes('indigo') ? '#4F46E5' : 
                                   item.colorClass.includes('amber') ? '#F59E0B' : 
                                   item.colorClass.includes('emerald') ? '#10B981' : '#F43F5E' 
                        }} />
                    </div>
                    <div>
                        <p style={{ fontSize: '10px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '4px', margin: 0 }}>{item.label}</p>
                        <p style={{ fontSize: '36px', fontWeight: 800, color: '#111827', lineHeight: 1, margin: 0 }}>{item.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;
