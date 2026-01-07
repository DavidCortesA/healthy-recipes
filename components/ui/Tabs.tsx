interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number | string;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  fullWidth?: boolean;
  className?: string;
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  fullWidth = false,
  className = ''
}: TabsProps) {
  const getVariantClasses = (isActive: boolean, isDisabled: boolean) => {
    if (isDisabled) {
      return 'opacity-50 cursor-not-allowed';
    }

    switch (variant) {
      case 'pills':
        return isActive
          ? 'bg-primary-500 text-white'
          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200';
      
      case 'underline':
        return isActive
          ? 'text-primary-600 border-b-2 border-primary-500'
          : 'text-neutral-600 hover:text-neutral-900 border-b-2 border-transparent';
      
      default:
        return isActive
          ? 'bg-white text-primary-600 shadow-sm'
          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50';
    }
  };

  return (
    <div className={`${variant === 'underline' ? 'border-b border-border' : 'bg-neutral-50 p-1 rounded-lg'} ${className}`}>
      <div className={`flex ${fullWidth ? 'flex-1' : ''} gap-1`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isDisabled = tab.disabled || false;

          return (
            <button
              key={tab.id}
              onClick={() => !isDisabled && onChange(tab.id)}
              disabled={isDisabled}
              className={`
                ${fullWidth ? 'flex-1' : ''}
                flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                ${getVariantClasses(isActive, isDisabled)}
              `}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={`
                  px-2 py-0.5 text-xs font-bold rounded-full
                  ${isActive ? 'bg-white/20' : 'bg-primary-100 text-primary-700'}
                `}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Tabs con contenido (completo)
interface TabPanelProps {
  children: React.ReactNode;
  value: string;
  activeValue: string;
}

export function TabPanel({ children, value, activeValue }: TabPanelProps) {
  if (value !== activeValue) return null;
  
  return (
    <div className="py-6 animate-fade-in">
      {children}
    </div>
  );
}