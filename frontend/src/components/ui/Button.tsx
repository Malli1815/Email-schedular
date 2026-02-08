import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-[16px] font-black uppercase tracking-[0.1em] relative overflow-hidden outline-none transition-all duration-300';

  const disabledClasses =
    disabled || isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';

  const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'text-white shadow-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
    secondary:
      'text-white backdrop-blur bg-white/5 border border-white/10',
    danger:
      'text-rose-500 bg-rose-500/10 border border-rose-500/20',
    ghost: 'text-gray-400 bg-transparent',
    outline:
      'text-white bg-transparent border-2 border-white/10',
  };

  const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'px-5 py-2 text-[10px]',
    md: 'px-8 py-4 text-[12px]',
    lg: 'px-10 py-5 text-[14px]',
  };

  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { scale: 1.02, y: -2 } : undefined}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
      disabled={disabled || isLoading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-3">
          <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          Processing
        </span>
      ) : (
        <span className="flex items-center gap-2">{children}</span>
      )}
    </motion.button>
  );
};
