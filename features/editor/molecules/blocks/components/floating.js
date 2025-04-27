import React, { useCallback, useRef, useState } from 'react';
import {
    ArrowDown,
    ArrowUp,
    Code,
    Edit,
    Layers,
    Paintbrush,
    Type,
    Trash,
    Upload,
    PaintBucket,
    Extension,
    Copy,
    Paste,
    CopyCheck
} from 'lucide-react';
import { useEditor } from '../../../hooks/use-editor';
const BlockFloating = ({ floatRef, coords }) => {
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const {
        editor,
        moveBlock,
        copyStyleBlock,
        pasteStyleBlock,
        copyBlock,
        pasteBlock,
        duplicateElement,
        createElement,
        deleteElement
    } = useEditor();
    const [gr, setGr] = useState('structure');

    const setShow = useCallback((value, title, type) => {
        // Implementation omitted for brevity
    }, []);

    const showSourceCode = useCallback((el) => {
        // Implementation omitted for brevity
    }, []);

    return editor.current ? (
        <div
            ref={floatRef}
            className={`z-50 h-6 bg-slate-950 border border-b-0 font-bold  border-blue-500 flex items-center gap-3 absolute z-highest justify-center  px-2 cursor-pointer`}
            style={{
                top: coords.top,
                left: coords.left
            }}
        >
            <small className=" text-white capitalize">{editor.current.tag === "document" ? "Body" : editor.current.title}</small>
            {editor.current.type === 'container' && (
                <div title={'Add in current UI Kit'} className="text-white  hover:text-purple-300 text-sm" onClick={() => setShow(true, "Ajouter dans le UI Kit", 'add-to-kit')}>
                    <Extension size={18} />
                </div>
            )}
            <div title={'Export code'} className="text-white  hover:text-purple-300 text-sm" onClick={showSourceCode}>
                <Code size={12} />
            </div>

            {editor.current.tag !== 'document' && (
                <>
                    <div title={'Move up'} className="text-white  hover:text-purple-300 text-xs" onClick={() => moveBlock(editor.current.id, 'up')}>
                        <ArrowUp size={12} />
                    </div>
                    <div title={'Move Down'} className="text-white  hover:text-purple-300 text-xs" onClick={() => moveBlock(editor.current.id, 'down')}>
                        <ArrowDown size={12} />
                    </div>
                    {editor.current.element === 'img' && (
                        <div title={'Upload Image'} className="text-white  hover:text-purple-300 text-sm" onClick={() => setShow(true, "Image", 'img')}>
                            <Upload size={12} />
                        </div>
                    )}
                    {editor.current.element === 'h' && (
                        <div title={'Heading'} className="text-white  hover:text-purple-300 text-sm" onClick={() => setShow(true, "Heading", 'heading')}>
                            <Type size={12} />
                        </div>
                    )}
                    {(editor.current.type === 'youtube' || editor.current.type === 'video') && (
                        <div className="text-white  hover:text-purple-300 text-sm" onClick={() => setShow(true, "Editer le contenu", editor.current.type)}>
                            <Edit size={12} />
                        </div>
                    )}
                    {(editor.current.element === 'span' || editor.current.element === 'h' || editor.current.element === 'p' || editor.current.element === 'li' || editor.current.element === 'a') && (
                        <div className="text-white  hover:text-purple-300 text-sm" onClick={() => setShow(true, "Editer le contenu", editor.current.element)}>
                            <Edit size={12} />
                        </div>
                    )}
                    {(editor.current.element === 'input') && (
                        <div className="text-white  hover:text-purple-300 text-sm" onClick={() => setShow(true, "Formulaire", editor.current.element)}>
                            <Layers size={12} />
                        </div>
                    )}
                    {(typeof editor.current.cssObject === 'object' &&
                        !Array.isArray(editor.current.cssObject) &&
                        editor.current.cssObject !== null) && (
                            <>
                                {(typeof editor.copiedCssObject === 'object' &&
                                    !Array.isArray(editor.copiedCssObject) &&
                                    editor.copiedCssObject !== null) ? (
                                    <div title="paste style of block" className="text-white  hover:text-purple-300 text-sm" onClick={pasteStyleBlock}>
                                        <PaintBucket size={12} />
                                    </div>
                                ) : (
                                    <div title="copy style of block" className="text-white  hover:text-purple-300 text-sm" onClick={copyStyleBlock}>
                                        <Paintbrush size={12} />
                                    </div>
                                )}
                            </>)}
                    {(typeof editor.copiedObject === 'object' &&
                        !Array.isArray(editor.copiedObject) &&
                        editor.copiedObject !== null) ? (
                        <div title="paste  block" className="text-white  hover:text-purple-300 text-sm" onClick={pasteBlock}>
                            <Paste size={14} />
                        </div>
                    ) : (
                        <div title="copy  block" className="text-white  hover:text-purple-300 text-sm" onClick={copyBlock}>
                            <Copy size={14} />
                        </div>
                    )}
                    <div title="Duplicate Block" className="text-white  hover:text-purple-300 text-sm" onClick={duplicateElement}>
                        <CopyCheck size={14} />
                    </div>
                    <div title="Delete Block" className="text-white  hover:text-purple-300 text-sm" onClick={deleteElement}>
                        <Trash size={12} />
                    </div>
                </>
            )}
            {floatRef.current != null && floatRef.current.offsetHeight && isPopUpOpen && (
                <div className="absolute w-96 h-72 border border-dark-800 rounded-tl-none rounded-lg  bg-gray-950" style={{
                    top: floatRef.current.offsetHeight - 1,
                    left: 0,
                }}>
                    <div className="flex max-w-full overflow-x-auto overflow-y-hidden flex-col w-full">
                        <div className="btn-group flex flex-row my-1 rounded-sm justify-center">
                            {editor.elements.map((group) => (
                                <React.Fragment key={Math.random().toString(36).substring(7)}>
                                    <button title={group.label} className={`btn font-medium rounded-full btn-xs px-2 py-2 bg-${gr === group.label ? 'primary-500 text-white' : 'slate-300 text-gray-950'}`} onClick={() => setGr(gr === group.label ? null : group.label)}>
                                        {group.label}
                                    </button>
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="w-full h-72 max-h-72 overflow-x-hidden overflow-y-auto">
                            {editor.elements.map((group) => (
                                <div key={group.label} className="flex  bg-gray-950 flex-row flex-wrap justify-center cursor-pointer" style={{ display: gr === group.label ? 'flex' : 'none' }}>
                                    {group.elements.map((element) => (
                                        <div key={element.name} className="bg-slate-800 border border-dark-800  m-1 hover:bg-slate-700 flex w-20 flex-row gap-2 items-center h-8 text-xs justify-center text-center text-slate-200 rounded hover:text-primary-600 shadow" onClick={() => createElement(element)}>
                                            {element.name}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    ) : null;
}

export default BlockFloating;
