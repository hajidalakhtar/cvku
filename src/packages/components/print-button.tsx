import React from 'react';

interface PrintButtonProps {
  className?: string;
}

export const PrintButton: React.FC<PrintButtonProps> = ({ className = '' }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className={`no-print bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium transition-colors ${className}`}
    >
      Print Resume
    </button>
  );
};
