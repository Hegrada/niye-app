import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  const hoverStyles = hover ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1' : '';

  return (
    <div
      className={`bg-white rounded-2xl shadow-md transition-all duration-300 ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
