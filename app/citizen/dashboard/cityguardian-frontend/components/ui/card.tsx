import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`rounded-lg shadow-lg bg-gray-800 ${className}`}>
      {children}
    </div>
  );
};

export { Card };