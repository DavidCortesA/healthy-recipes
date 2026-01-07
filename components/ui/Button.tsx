type Mode = 'primary' | 'secondary' | 'tertiary' | 'disabled';

interface ButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
  mode?: Mode;
}

export default function Button({ onClick, className, label, mode }: ButtonProps ) {

  if (mode === 'primary') {
    return (
      <button
        onClick={onClick}
        className={`btn-primary ${className} cursor-pointer`}
      >
        {label}
      </button>
    );
  } else if (mode === 'secondary') {
    return (
      <button
        onClick={onClick}
        className={`btn-outline ${className} cursor-pointer`}
      >
        {label}
      </button>
    );
  } else if (mode === 'tertiary') {
    return (
      <button
        onClick={onClick}
        className={`btn-secondary ${className} cursor-pointer`}
      >
        {label}
      </button>
    );
  } else if (mode === 'disabled') {
    return (
      <button
        className={`bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded cursor-not-allowed ${className} cursor-none`}
        disabled
      >
        {label}
      </button>
    );
  }
}