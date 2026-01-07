'use client';

import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  showButton?: boolean;
  clearable?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Buscar...',
  size = 'md',
  showButton = true,
  clearable = true,
  autoFocus = false,
  className = ''
}: SearchBarProps) {
  const sizes = {
    sm: 'h-10 text-sm',
    md: 'h-12 text-base',
    lg: 'h-14 text-lg'
  };

  const handleSearch = () => {
    onSearch?.(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    onChange('');
    onSearch?.('');
  };

  return (
    <div className={`relative flex gap-2 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`w-full pl-12 pr-12 ${sizes[size]} border-2 border-border rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all`}
        />

        {clearable && value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-neutral-600" />
          </button>
        )}
      </div>

      {showButton && (
        <button onClick={handleSearch} className="btn-primary px-8 whitespace-nowrap">
          Buscar
        </button>
      )}
    </div>
  );
}

// Search Bar Compacto (para navbars)
interface CompactSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CompactSearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Buscar recetas...',
  className = ''
}: CompactSearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`flex items-center gap-2 transition-all duration-300 ${
          isExpanded ? 'w-64' : 'w-10'
        }`}
      >
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-primary-50 rounded-lg transition-colors shrink-0"
        >
          <Search className="w-5 h-5 text-neutral-700" />
        </button>

        {isExpanded && (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            autoFocus
            onBlur={() => !value && setIsExpanded(false)}
            className="flex-1 px-3 py-2 border border-border rounded-lg outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
          />
        )}
      </div>
    </div>
  );
}