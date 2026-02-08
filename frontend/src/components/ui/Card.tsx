import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  variant?: 'default' | 'glass' | 'vibrant';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  description,
  footer,
  variant = 'default',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return 'glass-dark border-white/[0.08] shadow-2xl';
      case 'vibrant':
        return 'bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-white/10 shadow-2xl';
      default:
        return 'bg-white/[0.03] backdrop-blur-3xl border border-white/[0.08] shadow-2xl';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-[2.5rem] overflow-hidden ${getVariantStyles()} ${className}`}
    >
      {(title || description) && (
        <div className="p-8 border-b border-white/[0.05]">
          {title && <h3 className="text-2xl font-black text-white tracking-tight">{title}</h3>}
          {description && <p className="mt-2 text-sm text-gray-400 font-medium">{description}</p>}
        </div>
      )}
      <div className="p-8">{children}</div>
      {footer && (
        <div className="bg-white/[0.02] px-8 py-5 border-t border-white/[0.05]">
          {footer}
        </div>
      )}
    </motion.div>
  );
};
