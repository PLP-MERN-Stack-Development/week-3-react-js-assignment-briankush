import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  glass = false
}) => {
  const baseClasses = 'rounded-xl shadow-lg transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-xl hover:scale-105' : '';
  const glassClasses = glass
    ? 'bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg border border-white/20 dark:border-gray-700/20'
    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700';

  const classes = `${baseClasses} ${hoverClasses} ${glassClasses} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;