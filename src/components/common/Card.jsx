import React from 'react';
import './Card.css';

/**
 * Reusable Card component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.title] - Optional title
 * @param {function} [props.onClick] - Click handler
 * @param {'shadow'|'border'|'tint'} [props.variant='shadow'] - Visual style
 * @param {'lift'|'glow'|'fill'} [props.hoverEffect='lift'] - Hover animation
 * @param {boolean} [props.hoverable=false] - Whether to show hover effects
 * @param {string} [props.className] - Additional classes
 */
export default function Card({
  children,
  title,
  onClick,
  variant = 'shadow',
  hoverEffect = 'lift',
  hoverable = false,
  className = '',
  ...props
}) {
  const isInteractive = hoverable || !!onClick;
  
  return (
    <div 
      className={`
        card 
        card-${variant} 
        ${isInteractive ? 'card-hoverable' : ''} 
        ${isInteractive ? `card-hover-${hoverEffect}` : ''} 
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {title && <h3 className="card-title">{title}</h3>}
      {children}
    </div>
  );
}
