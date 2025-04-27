import React, { useCallback, useEffect, useState } from 'react'
import { useEditor } from '../../../hooks/use-editor';

const BlockLink = ({ link }) => {
    const {
        editor,
        updateBlockProperty
    } = useEditor();
    const [state, setState] = useState({
        link: editor?.current?.href,
        content: editor?.current?.content,
    })
    const updateValue = useCallback((value, type) => {
        updateBlockProperty(value, type);
        if (editor.selectedBlocks.length > 0) {
            for (let index = 0; index < editor.selectedBlocks.length; index++) {
                const element = editor.selectedBlocks[index];
                updateBlockProperty(value, type, element);
            }
        }
    }, [editor.selectedBlocks, updateBlockProperty])
    useEffect(() => {
        setState({
            link: editor?.current?.href,
            content: editor?.current?.content,
        });
    }, [editor])

    return (
        <div className="w-1/4 flex flex-col">
            <div className="flex items-center p-1">
                {editor.current && (
                    <>
                        <label>Link</label>
                        <input className="ml-2 p-1 rounded w-56 text-lg" value={state.link} onChange={(e) => { updateValue(e.target.value, 'href') }} />
                    </>
                )}

            </div>
            <div className="flex items-center p-1" title="title">
                {editor.current && (
                    <>
                        <label>title</label>
                        <input className="ml-2 p-1 rounded w-56 text-lg" value={state.content} onChange={(e) => { updateValue(e.target.value, 'content') }} />
                    </>
                )}
            </div>
        </div>
    )
}
export default BlockLink;
