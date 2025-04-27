import { useCallback, useMemo } from 'react'
import _ from 'lodash';
import { useEditor } from '../../../hooks/use-editor';

const BlockTree = (props) => {
    const {
        editor,
        setCurrent,
        resetSelectedBlock,
        toggleSelectedBlock,
        deleteElement,
        duplicateElement
    } = useEditor();
    const current = props.current ? props.current : props.editor ? props.editor : null;
    const isSelected = useMemo(() => editor.selectedBlocks && editor.selectedBlocks.some((block) => block.id === current.id), [current, editor.selectedBlocks]);
    const getBorderStyle = useMemo(() => {
        if (editor.current && editor.current.id === current.id) {
            return isSelected ? ' bg-red-500 text-white' : 'border bg-primary-600 text-white';
        } else {
            return isSelected ? ' bg-red-500 text-white' : 'bg-transparent text-black';
        }
    }, [editor, current.id, isSelected]);
    const setSelected = (e, block) => {
        e.stopPropagation();
        setCurrent(current);
        if (e.ctrlKey) {
            toggleSelectedBlock(block);
        } else {
            resetSelectedBlock();
        }
    }
    return (
        <>
            {current ? (
                <div className={`flex flex-col items-stretch  cursor-pointer  ${current.tag !== 'document' ? 'pl-2' : ''} text-xs text-white bg-y-blue-500`}>
                    <div className={`flex p-2 border-l border-b rounded-md border-gray-200 ${getBorderStyle}`}>
                        <div className="flex flex-row justify-between items-center w-full truncate">
                            <div className="text">
                                <span className='icons mr-em-2'></span>
                                <span
                                    className='text-xs truncate w-full'> {current.tag === "document" ? "Body" : current.title}</span>
                            </div>
                            <div className="flex flex-row gap-1">

                                {current.tag !== 'document' ? (
                                    <>
                                        <div className="text-white  hover:text-purple-300 text-sm"
                                            onClick={duplicateElement}>
                                            Copy
                                        </div>
                                        <button onClick={deleteElement}
                                            className={`${editor.current.id === current.id ? 'text-white' : 'text-gray-400'}`
                                            }>Del</button>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    {current.blocks.map((block) => (
                        <div
                            onClick={(e) => setSelected(e, block)}
                            title={block.id}
                            key={'tree_' + block.id}
                        >
                            {!_.isUndefined(block.blocks) && (
                                <BlockTree current={block} setCurrent={props.setCurrent} />
                            )}

                        </div>
                    ))}
                </div>
            ) : null}
        </>
    )
}
export default BlockTree;
