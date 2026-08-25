import React from 'react';

const ErrorBanner = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5 flex items-center gap-3 animate-fadeIn">
      <i className="fas fa-circle-exclamation text-red-500"></i>
      <span className="text-red-700 flex-1">{message}</span>
      <button 
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default ErrorBanner;