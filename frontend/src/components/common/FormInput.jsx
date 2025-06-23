import React from 'react';

const FormInput = ({ 
  label, 
  type = 'text', 
  color = 'blue',
  value, 
  onChange,
  placeholder,
  required = false,
  name,
}) => {
  const colorClasses = {
    blue: {
      border: 'border-blue-400/30 focus:border-blue-400/50',
      shadow: 'shadow-[0_0_15px_rgba(37,99,235,0.1)] focus:shadow-[0_0_20px_rgba(37,99,235,0.2)]',
      bg: 'bg-[#1a2b4d]/70',
      text: 'text-blue-50',
      label: 'text-blue-200/90'
    },
    red: {
      border: 'border-red-900/50 focus:border-red-900/70',
      shadow: 'shadow-[0_0_15px_rgba(185,28,28,0.1)] focus:shadow-[0_0_20px_rgba(185,28,28,0.2)]',
      bg: 'bg-red-900/50',
      text: 'text-white/90',
      label: 'text-red-200/90'
    }
  };

  const classes = colorClasses[color];

  return (
    <div className="w-full mb-6">
      {label && (
        <label 
          htmlFor={name}
          className={`block mb-2 text-2xl font-medium ${classes.label}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full
          px-6
          py-6
          text-2xl
          border
          rounded
          outline-none
          transition-all
          duration-200
          text-center
          ${classes.border}
          ${classes.shadow}
          ${classes.bg}
          ${classes.text}
          placeholder:text-gray-400/60
        `.replace(/\s+/g, ' ').trim()}
      />
    </div>
  );
};

export default FormInput;
