import React, { useCallback, useEffect, useState } from 'react'
import { useEditor } from '../../../hooks/use-editor';
const BlockEditContent = () => {
    const { editor, editBlockContent } = useEditor();
    const [value, setValue] = useState(editor?.current?.content);
    const updateValue = useCallback((e) => {
        setValue(e.target.value);
        editBlockContent(e.target.value);
    }, [value]);
    useEffect(() => {
        setValue(editor.current?.content);
    }, [editor])
    return editor.current && (
        <div id="contentEditor" className="flex flex-col items-start w-64">
            {(editor.current.type === 'youtube' || editor.current.type === 'video') && (
                <>
                    <label>Video ID</label>
                    <input
                        className="m-1"
                        type="text"
                        value={value}
                        onChange={updateValue}
                        placeholder="video ID only"
                    />
                </>
            )}
            {(editor.current.element === 'span' || editor.current.element === 'p' || editor.current.element === 'li' || editor.current.element === 'h') && (
                <div className="w-full flex flex-row justify-center">
                    <textarea
                        className="p-1 h-40  text-base input w-96"
                        value={value}
                        onChange={updateValue}
                    />
                </div>
            )}
        </div>
    )
}
export default BlockEditContent;
