import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  loading?: boolean;
  success?: boolean;
  defaultText: React.ReactNode;
  successText?: string;
  loadingText?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  children?: React.ReactNode; // Add children prop
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  loading = false,
  success = false,
  defaultText,
  successText = 'Success! Click again?',
  loadingText = 'Loading...',
  disabled = false,
  label = '',
}) => {
  const baseClasses = 'text-white px-6 py-3 rounded-lg transition duration-300';

  const colorClass = loading
    ? 'bg-gray-500'
    : success
      ? 'bg-green-500'
      : 'bg-blue-500 hover:bg-blue-600';

  return (
    <button
      className={`${baseClasses} ${colorClass}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading
        ? loadingText
        : success
          ? successText
          : defaultText
            ? defaultText
            : label
              ? label
              : defaultText}
    </button>
  );
};

export default Button;
