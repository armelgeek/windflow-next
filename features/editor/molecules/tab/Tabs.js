import React from 'react';
import Tab from './Tab';
import { useEditor } from '../../hooks/use-editor';

const Tabs = () => {
    const {
        desktop,
        openTab,
        createEmptyBlock,
        closeTab
    } = useEditor();
    const { tabs, currentTab } = desktop;
    
    return (
        <div className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-1 flex items-center gap-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        isActive={index === currentTab}
                        label={tab.label}
                        onClick={() => openTab(index)}
                        onClose={() => closeTab(index)}
                    />
                ))}
            </div>
            <button 
                className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                onClick={createEmptyBlock}
                title="Add new tab"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};

export default Tabs;
