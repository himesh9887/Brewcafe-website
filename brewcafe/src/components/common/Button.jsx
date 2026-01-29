import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  type = 'button',
  disabled = false,
  icon: Icon
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
  
  const variants = {
    primary: "bg-accent text-primary hover:bg-yellow-500 shadow-lg hover:shadow-accent/50 px-6 py-3",
    secondary: "border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary px-6 py-3",
    outline: "border-2 border-accent text-accent hover:bg-accent hover:text-primary px-6 py-3",
    ghost: "text-secondary hover:text-accent px-4 py-2",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
      {Icon && <Icon size={20} />}
    </button>
  );
};

export default Button;