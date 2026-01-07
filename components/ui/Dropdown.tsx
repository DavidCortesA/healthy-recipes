'use client'

import { ReactNode, useEffect, useState } from "react";

interface DropdownItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
  divider?: boolean;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export function Dropdown({ trigger, items, align = 'right', className = '' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const alignClasses = {
    left: 'left-0',
    right: 'right-0'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute ${alignClasses[align]} mt-2 w-56 bg-white rounded-lg shadow-xl border border-border z-50 py-1 animate-fade-in`}
        >
          {items.map((item, index) => (
            <div key={index}>
              {item.divider ? (
                <div className="my-1 border-t border-border" />
              ) : (
                <button
                  onClick={() => {
                    if (!item.disabled) {
                      item.onClick();
                      setIsOpen(false);
                    }
                  }}
                  disabled={item.disabled}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                    item.disabled
                      ? 'opacity-50 cursor-not-allowed'
                      : item.danger
                      ? 'text-error hover:bg-error-light/10'
                      : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-700'
                  }`}
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  <span className="flex-1 text-left">{item.label}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}