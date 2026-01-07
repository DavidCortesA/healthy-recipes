import { ReactNode } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  message: string | ReactNode;
  className?: string;
  onClose?: () => void;
}

export default function Alert({ type, message, className = '', onClose }: AlertProps) {
  const styles = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`alert ${styles[type]} ${className}`} role="alert">
      <div className="flex items-start gap-3">
        <span className="text-lg font-bold flex-shrink-0">{icons[type]}</span>
        <div className="flex-1">
          {typeof message === 'string' ? <p>{message}</p> : message}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-lg hover:opacity-70 transition-opacity"
            aria-label="Cerrar"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
