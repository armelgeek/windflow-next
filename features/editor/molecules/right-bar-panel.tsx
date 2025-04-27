import React from 'react';
import PseudoClass from './blocks/components/pseudoClass';
import BlockTailwind from './blocks/tailwind/BlockTailwind';

const RightSidebar = () => {
    return (
        <div className="h-[calc(100vh-89px)] overflow-hidden bg-gray-50 dark:bg-gray-900">
            <div className="h-full overflow-y-auto px-4 py-3">
                <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-3 text-white shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium">Styles</h3>
                                <p className="text-sm text-purple-100">Visual properties</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                            <PseudoClass />
                        </div>
                        <div className="p-3">
                            <BlockTailwind />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;
