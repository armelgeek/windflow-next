import React, { useCallback } from 'react';
import { useEditor } from '../../../hooks/use-editor';
const pseudoClasses = [
    { id: 'hover', label: 'Hover' },
    { id: 'focus', label: 'Focus' },
    { id: 'active', label: 'Active' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'focus-visible', label: 'Focus Visible' },
    { id: 'group-hover', label: 'Group Hover' },
    { id: 'first', label: 'First' },
    { id: 'last', label: 'Last' },
    { id: 'before', label: 'Before' },
    { id: 'after', label: 'After' }
];

const PseudoClass = ({ tab, close }) => {
    const {
        desktop,
        updateDesktopValue
    } = useEditor();
    const handleSelectChange = useCallback((e) => {
        updateDesktopValue({
            prop: 'state',
            value: e.target.value
        })
    }, [updateDesktopValue]);

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Pseudo Classes
                </h3>
                <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-md">
                    States
                </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {pseudoClasses.map((pseudo) => (
                    <button
                        key={pseudo.id}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 
                        bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 
                        focus:outline-none focus:ring-2 focus:ring-purple-500/20 
                        transition-colors duration-200"
                    >
                        <span className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600"></span>
                        <span className="text-gray-700 dark:text-gray-200">{pseudo.label}</span>
                    </button>
                ))}
            </div>
            <div className="flex flex-col px-3  py-1">
                <label htmlFor="editor" className='text-xs uppercase'>Pseudo-/classes/elements</label>
                <select value={desktop.state} onChange={handleSelectChange} className='select select-sm bg-white'>
                    <option value="neutral">Default</option>
                    {pseudoClasses.map((pseudo) => (
                        <option key={pseudo.id} value={pseudo.id}>{pseudo.label}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
export default PseudoClass;
