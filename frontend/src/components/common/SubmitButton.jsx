import React from 'react';

const SubmitButton = ({ 
  children, 
  onClick, 
  color = 'blue',
  type = 'submit',
  disabled = false 
}) => {
  const colorClasses = {
    blue: {
      border: 'border-blue-400/30 hover:border-blue-400/50',
      bg: 'bg-[#1a2b4d]/70',
      text: 'text-blue-50',
      shadow: 'shadow-[0_0_20px_rgba(37,99,235,0.15)] hover:shadow-[0_0_30px_rgba(37,99,235,0.3)]',
      disabled: 'disabled:bg-blue-900/30 disabled:border-blue-400/20 disabled:text-blue-200/50'
    },
    red: {
      border: 'border-red-900/50 hover:border-red-900/70',
      bg: 'bg-red-900/50',
      text: 'text-white/90',
      shadow: 'shadow-[0_0_20px_rgba(185,28,28,0.15)] hover:shadow-[0_0_30px_rgba(185,28,28,0.3)]',
      disabled: 'disabled:bg-red-900/30 disabled:border-red-900/20 disabled:text-red-200/50'
    }
  };

  const classes = colorClasses[color];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        w-full
        mx-auto
        px-10
        py-5
        mt-8
        text-2xl
        font-bold
        tracking-wide
        border
        rounded
        transform
        transition-all
        duration-200
        hover:-translate-y-1
        active:translate-y-0
        ${classes.border}
        ${classes.bg}
        ${classes.text}
        ${classes.shadow}
        ${classes.disabled}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
