import React from 'react';
import './Button.css';

/**
 * Reusable Button component for SilverLink
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {function} props.onClick - Click handler
 * @param {'primary'|'secondary'|'outline'} [props.variant='primary'] - Visual style
 * @param {'small'|'medium'|'large'} [props.size='large'] - Size (default large for accessibility)
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {boolean} [props.fullWidth=false] - Whether to take full width of container
 * @param {React.ReactNode} [props.icon] - Optional icon component
 * @param {string} [props.className] - Additional classes
 * @param {Object} [props.style] - Inline styles
 */
export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'large',
  disabled = false,
  fullWidth = false,
  icon = null,
  className = '',
  style = {},
  ...props
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
      {...props}
    >
      {icon && <span className="btn-icon" style={{ marginRight: '8px' }}>{icon}</span>}
      {children}
    </button>
  );
}
