import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-4 transition-all duration-200 ease-in-out';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300',
    secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300',
  };

  const sizeStyles = {
    sm: 'text-base sm:py-2 sm:px-3',
    md: 'text-lg sm:py-3 sm:px-4',
    lg: 'text-xl sm:py-4 sm:px-6',
  };

  const widthStyle = fullWidth ? 'w-full' : 'w-auto';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
