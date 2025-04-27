import React from 'react';

const ToggleButton = ({ isActive, onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className={`
                relative flex items-center justify-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                ${isActive 
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                }
            `}
        >
            {children}
            {isActive && (
                <span className="absolute -bottom-px left-1/2 -translate-x-1/2 h-0.5 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            )}
        </button>
    );
};

export default ToggleButton;
