import React, { useEffect } from 'react'
import { useEditor } from '../../../hooks/use-editor';

const BlockSourceCode = () => {
    const {
        desktop
    } = useEditor();
    return (
        <>
            {/**<CodeMirror
             value={source.html}
             options={{
             mode: 'html',
             theme: 'material',
             lineNumbers: true
             }}
             onChange={(editor, data, value) => {
             }}

             />
            {source.html}**/}
        </>
    )
}
export default BlockSourceCode;
