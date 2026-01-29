import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false,
  icon: Icon,
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label} {required && <span className="text-accent">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Icon size={20} />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-card border border-gray-700 rounded-lg px-4 py-3 text-secondary 
                     focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
                     placeholder-gray-500 transition-all duration-300
                     ${Icon ? 'pl-10' : ''}`}
        />
      </div>
    </div>
  );
};

export default Input;