import React from 'react';
import ElementList from './element-list';

const Tree = () => {
    return (
        <div className="h-full overflow-y-auto">
            <div className="p-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-3 mb-4 shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-medium">Body</h3>
                            <p className="text-sm text-blue-100">Main document</p>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <span className="font-medium">Elements</span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs">
                            Structure
                        </span>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <ElementList />
                    </div>
                </div>
            </div>
        </div>
    );
};

const LeftSidebar = () => {
    return (
        <div className="h-[calc(100vh-89px)] overflow-hidden bg-gray-50 dark:bg-gray-900">
            <Tree />
        </div>
    );
};

export default LeftSidebar;
