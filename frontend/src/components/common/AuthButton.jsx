import React from 'react';

const AuthButton = ({ children, onClick }) => {
  const buttonClasses = `

  text-xl
  font-bold
  tracking-wide
  rounded
  border
  border-red-900/50
  bg-red-900/50
  text-white/90
  shadow-[0_0_20px_rgba(37,99,235,0.15)]
  transition-all
  duration-300
  transform
  hover:-translate-y-1
  hover:shadow-red-900/80
  hover:border-red-900/80
`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default AuthButton;
