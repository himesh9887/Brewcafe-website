import React from 'react';

const InputField = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false,
  icon: Icon,
  className = '',
  name,
  ...rest
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
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-card border border-gray-700 rounded-2xl px-4 py-3 text-secondary 
                     focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
                     placeholder-gray-500 transition-all duration-300 hover:border-gray-500
                     ${Icon ? 'pl-10' : ''}`}
          {...rest}
        />
      </div>
    </div>
  );
};

export default InputField;
