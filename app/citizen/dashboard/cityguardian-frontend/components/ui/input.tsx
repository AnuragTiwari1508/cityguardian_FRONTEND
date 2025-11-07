import React from 'react';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`border border-gray-600 bg-gray-800 text-white placeholder:text-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };