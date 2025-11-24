import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export function Badge({ children, color = '#F97316', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}
      style={{
        backgroundColor: `${color}20`,
        color: color
      }}
    >
      {children}
    </span>
  );
}
