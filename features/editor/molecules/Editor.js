import React, { useRef } from 'react';
import BlockContainer from "./blocks/container";
import { useEditor } from '../hooks/use-editor';

const Editor = () => {
    const ref = useRef();
    const {
        desktop,
        editor,
        createEmptyBlock,
        setCurrent
    } = useEditor();
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {desktop.tabs.length > 0 ? (
                <div 
                    id="BlockEditor" 
                    ref={ref}
                    className="bg-white rounded-lg shadow-lg p-6 min-h-[600px] relative"
                >
                    {editor.document && (
                        <BlockContainer
                            doc={editor.document}
                            setCurrent={setCurrent}
                            level="10"
                            ajustCoords={() => { }}
                        />
                    )}
                    {editor.current && (
                        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md opacity-80">
                            <pre className="text-sm">{editor.current.tag}</pre>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-[600px]">
                    <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-all duration-200 flex items-center space-x-2"
                        onClick={createEmptyBlock}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        <span>Créer une page</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Editor;
