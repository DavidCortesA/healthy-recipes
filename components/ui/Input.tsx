type ModeInput = 'text' | 'email' | 'password' | 'number';

interface InputProps {
  type?: ModeInput;
  className?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
}

export default function Input({ 
  type = 'text', 
  className, 
  placeholder, 
  icon, 
  onChange, 
  value, 
  label, 
  required, 
  disabled = false,
  error,
  helperText 
}: InputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={label} className="block text-sm font-medium text-neutral-700 mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && <div className="absolute left-3 top-3 text-neutral-400">{icon}</div>}
        
        <input
          type={type}
          id={label}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`input ${icon ? 'pl-10' : ''} ${error ? 'border-error focus:border-error focus:ring-error-light' : ''} ${className}`}
          placeholder={placeholder}
          required={required}
        />
      </div>

      {error && <p className="mt-1 text-sm text-error">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-neutral-500">{helperText}</p>}
    </div>
  )
}