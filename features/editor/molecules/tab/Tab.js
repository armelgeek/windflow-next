import React from 'react';

const Tab = ({ isActive, label, onClick, onClose }) => {
    const activeClasses = "bg-blue-600 text-white shadow-md";
    const inactiveClasses = "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700";

    return (
        <div
            className={`group cursor-pointer relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ${isActive ? activeClasses : inactiveClasses}`}
            onClick={onClick}
        >
            <span className="truncate max-w-[150px]">{label}</span>
            <button
                className={`ml-2 flex items-center justify-center w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                    ${isActive 
                        ? "hover:bg-blue-700 text-blue-100" 
                        : "hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"
                    }`}
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                title="Close tab"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};

export default Tab;
