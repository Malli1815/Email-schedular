import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  style,
  ...props
}: ButtonProps) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isDanger = variant === 'danger';
  const isGhost = variant === 'ghost';
  const isOutline = variant === 'outline';

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px',
    fontWeight: 900,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: (disabled || isLoading) ? 'not-allowed' : 'pointer',
    opacity: (disabled || isLoading) ? 0.6 : 1,
    border: 'none',
    position: 'relative',
    overflow: 'hidden',
    outline: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    ...style
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
      color: 'white',
      boxShadow: '0 10px 30px -10px rgba(99, 102, 241, 0.4)',
    },
    secondary: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: 'white',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    danger: {
      backgroundColor: 'rgba(244, 63, 94, 0.1)',
      color: '#F43F5E',
      border: '1px solid rgba(244, 63, 94, 0.2)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#9CA3AF',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'white',
      border: '2px solid rgba(255, 255, 255, 0.1)',
    }
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '10px 20px', fontSize: '10px' },
    md: { padding: '16px 32px', fontSize: '12px' },
    lg: { padding: '20px 40px', fontSize: '14px' }
  };

  const combinedStyle = {
    ...baseStyle,
    ...variantStyles[variant],
    ...sizeStyles[size]
  };

  return (
    <motion.button
      whileHover={(!disabled && !isLoading) ? { scale: 1.02, y: -2 } : {}}
      whileTap={(!disabled && !isLoading) ? { scale: 0.98 } : {}}
      style={combinedStyle as any}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '16px', height: '16px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          <span>Processing</span>
        </div>
      ) : (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {children as any}
        </span>
      )}
    </motion.button>
  );
};
