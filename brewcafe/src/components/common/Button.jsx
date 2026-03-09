import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  type = 'button',
  disabled = false,
  icon: Icon,
  ...rest
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
  
  const variants = {
    primary: "bg-accent text-primary shadow-lg shadow-accent/20 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-accent/40",
    secondary: "border border-secondary/60 text-secondary hover:-translate-y-0.5 hover:bg-secondary hover:text-primary",
    outline: "border border-accent/70 text-accent hover:-translate-y-0.5 hover:bg-accent hover:text-primary",
    ghost: "px-4 py-2 text-secondary hover:bg-white/5 hover:text-accent",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
      {Icon && <Icon size={20} />}
    </button>
  );
};

export default Button;
