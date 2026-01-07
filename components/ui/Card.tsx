import { ReactNode } from 'react';

// ============================================
// CARD COMPONENT
// ============================================

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'hover' | 'recipe';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick
}: CardProps) {
  const variants = {
    default: 'card',
    hover: 'card cursor-pointer',
    recipe: 'card-recipe cursor-pointer'
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div
      className={`${variants[variant]} ${paddings[padding]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Card Header
interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

// Card Title
interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`text-xl font-bold text-neutral-900 ${className}`}>
      {children}
    </h3>
  );
}

// Card Content
interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

// Card Footer
interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-border ${className}`}>
      {children}
    </div>
  );
}
