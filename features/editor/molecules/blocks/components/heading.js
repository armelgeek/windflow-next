import React, { useCallback, useEffect, useState } from 'react'
import { useEditor } from '../../../hooks/use-editor';

const BlockHeading = () => {
    const {
        editor,
        editBlockLevel
    } = useEditor();
    const [value, setValue] = useState(editor?.current?.level);
    const updateValue = useCallback((e) => {
        setValue(e.target.value);
        editBlockLevel(e.target.value);
        if (editor.selectedBlocks.length > 0) {
            for (let index = 0; index < editor.selectedBlocks.length; index++) {
                const element = editor.selectedBlocks[index];
                editBlockLevel(e.target.value, element)
            }
        }
    }, [editBlockLevel, editor.selectedBlocks]);
    useEffect(() => {
        setValue(editor?.current?.level);
    }, [editor])
    return (
        <div className="w-full">
            <select className="p-1 m-1 w-full" value={value} onChange={updateValue}>
                {[1, 2, 3, 4, 5, 6].map((value, index) => <option key={index} value={value}>H{value}</option>)}
            </select>
        </div>
    )
}
export default BlockHeading;
