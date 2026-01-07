import { ReactNode } from "react";
import { X } from "lucide-react";

interface AlertProps {
  children: ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  icon?: ReactNode;
  onClose?: () => void;
  className?: string;
}

export function Alert({
  children,
  variant = 'info',
  title,
  icon,
  onClose,
  className = ''
}: AlertProps) {
  const variants = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info'
  };

  const defaultIcons = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ'
  };

  return (
    <div className={`alert ${variants[variant]} ${className}`}>
      <div className="flex items-start gap-3">
        {icon !== undefined ? (
          icon && <span className="shrink-0 text-lg">{icon}</span>
        ) : (
          <span className="shrink-0 text-lg">{defaultIcons[variant]}</span>
        )}
        
        <div className="flex-1">
          {title && <p className="font-bold mb-1">{title}</p>}
          <div className="text-sm">{children}</div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="shrink-0 p-1 hover:opacity-70 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
