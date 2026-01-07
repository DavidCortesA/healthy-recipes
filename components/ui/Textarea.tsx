import { forwardRef, InputHTMLAttributes } from 'react';

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      rows = 4,
      maxLength,
      showCount = false,
      fullWidth = false,
      className = '',
      id,
      value = '',
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const widthClass = fullWidth ? 'w-full' : '';
    const currentLength = String(value).length;

    return (
      <div className={`space-y-2 ${widthClass}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700"
          >
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          maxLength={maxLength}
          className={`textarea ${error ? 'border-error focus:border-error focus:ring-error-light/20' : ''} ${className}`}
          value={value}
          {...props}
        />

        <div className="flex justify-between items-center">
          {(error || helperText) && (
            <p
              className={`text-sm ${
                error ? 'text-error' : 'text-neutral-600'
              }`}
            >
              {error || helperText}
            </p>
          )}
          
          {showCount && maxLength && (
            <p className={`text-sm ${currentLength > maxLength * 0.9 ? 'text-warning' : 'text-neutral-500'}`}>
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;