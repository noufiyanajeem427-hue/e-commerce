import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

const Input = forwardRef(({ 
  label, 
  error, 
  helper, 
  icon: Icon,
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-semibold text-dark-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
        )}
        <input
          ref={ref}
          className={`
            input-modern
            ${Icon ? 'pl-12' : ''}
            ${error ? 'border-red-500 ring-2 ring-red-500/20 focus:ring-red-500/40' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <div className="flex items-center gap-1.5 text-sm text-red-500">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
      {helper && !error && (
        <p className="text-sm text-dark-400">{helper}</p>
      )}
    </div>
  );
});

export default Input;