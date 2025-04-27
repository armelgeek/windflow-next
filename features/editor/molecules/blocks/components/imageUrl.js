import React, { useCallback, useEffect, useState } from 'react'
import { FaImage } from 'react-icons/fa';
import { useEditor } from '../../../hooks/use-editor';
const BlockImageUrl = () => {
    const {
        editor,
        editBlockImageUrl
    } = useEditor();
    const [value, setValue] = useState(editor?.current?.image?.url);
    const updateValue = useCallback((e) => {
        setValue(e.target.value);
        editBlockImageUrl(e.target.value);
        if (editor.selectedBlocks.length > 0) {
            for (let index = 0; index < editor.selectedBlocks.length; index++) {
                const element = editor.selectedBlocks[index];
                editBlockImageUrl(e.target.value, element)
            }
        }

    }, [editBlockImageUrl, editor.selectedBlocks]);
    useEffect(() => {
        setValue(editor?.current?.image?.url);
    }, [editor])
    return editor.current && (
        <div className="flex flex-col items-start"  >
            <div className="flex items-center p-1 justify-around w-full">
                <FaImage />
                <input className="ml-2 p-1 w-3/4 rounded text-lg" value={value} onChange={updateValue} />
            </div>
        </div>
    )
}
export default BlockImageUrl;
