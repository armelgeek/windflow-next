import React, { useState, useCallback, useEffect, useRef, memo } from 'react'
import _ from 'lodash';
import classes, { flattenClasses, searchClass } from "../../../../../shared/lib/tail/classes";
import { useEditor } from '../../../hooks/use-editor';
const classList = flattenClasses();
// eslint-disable-next-line react/display-name
const ScrollItem = memo(({ selectTag, item, index }) => {
    return (
        <div className="text-sm  lowercase suggestion-item" key={item.attr + '--' + index} onClick={() => {
            selectTag(item.value, item.attr)
        }}> {item.value}</div>
    )
}, (prevProps, nextProps) =>
    prevProps.item === nextProps.item &&
    prevProps.index === nextProps.index
)
const ScrollableList = ({ items, containerRef, selectTag }) => {
    const [visibleItems, setVisibleItems] = useState(10);
    const [loading, setLoading] = useState(false);

    const handleScroll = useCallback(() => {
        const container = containerRef.current;

        if (container) {
            const scrolledToBottom =
                Math.round(container.scrollTop + container.clientHeight + 2) >= container.scrollHeight;
            if (scrolledToBottom && !loading && visibleItems < items.length) {
                setLoading(true);
                setTimeout(() => {
                    setVisibleItems((prevVisibleItems) => Math.min(prevVisibleItems + 10, items.length));
                    setLoading(false);
                }, 100);
            }
        }
    }, [containerRef, loading, visibleItems, items.length])

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, [containerRef, loading, visibleItems, items])

    const renderedItems = items.slice(0, visibleItems).map((item, index) => (
        <ScrollItem key={index} item={item} index={index} selectTag={selectTag} />
    ));
    return (
        <>
            {renderedItems}
        </>
    );
};
const BlockCss = () => {
    const {
        desktop,
        editor,
        updateBlockStyle,
        updateBlockProperty
    } = useEditor();
    const [semantics, setSemantics] = useState(classes.semantics);
    const containerRef = useRef();
    const [cls, setCls] = useState([]);
    const [text, setText] = useState('');
    const [state, setState] = useState({
        css: editor?.current?.cssObject,
        container: editor?.current?.css.container,
        style: editor?.current?.style,
        semantic: editor?.current?.semantic,
    })
    const updateCss = useCallback((classe, attr) => {
        editor.current.cssObject[`${desktop.mode}`][`${desktop.state}`] = {
            ...editor.current.cssObject[`${desktop.mode}`][`${desktop.state}`],
            [attr]: classe
        };
        updateBlockStyle(editor.current.cssObject);
        if (editor.selectedBlocks.length > 0) {
            for (let index = 0; index < editor.selectedBlocks.length; index++) {
                const element = editor.selectedBlocks[index];
                element.cssObject[`${desktop.mode}`][`${desktop.state}`] = {
                    ...element.cssObject[`${desktop.mode}`][`${desktop.state}`],
                    [attr]: classe
                };
                updateBlockStyle(element.cssObject, element);
            }
        }
    },
        [editor, desktop.mode, desktop.state, updateBlockStyle])
    const updateValue = useCallback((value, type) => {
        if (type !== 'style') {
            updateBlockProperty(value, 'element');
            if (editor.selectedBlocks.length > 0) {
                for (let index = 0; index < editor.selectedBlocks.length; index++) {
                    const element = editor.selectedBlocks[index];
                    updateBlockProperty(value, 'element', element);
                }
            }
        }
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
            css: editor?.current?.cssObject,
            container: editor?.current?.css.container,
            style: editor?.current?.style,
            semantic: editor?.current?.semantic,
        });
    }, [editor])
    const handleSearh = useCallback((value) => {
        setText(value);
        if (value.length > 1) {
            setCls(searchClass(classList, value));
        }
    }, [])
    const selectTag = useCallback((value, key) => {
        updateCss(value, key);
        setCls([]);
        setText('');
    }, [updateCss])
    return (
        <div className="flex flex-col w-full h-full items-start bg-bluegray-200">
            <span className="uppercase font-bold  my-2" style={{ fontSize: '10px' }}>CSS</span>
            <div className="tag-input-sg-container  w-full">
                <input type="text" value={text} className="w-full input-sm  rounded-md  border-gray-200 focus:outline-0 focus:shadow-none focus:focus-within:ring-0 text-sm" placeholder='Search class' onChange={(e) => handleSearh(e.target.value)} />
                <div className="suggestions-container" ref={containerRef} style={{
                    display: cls.length > 0 ? 'block' : 'none'
                }}>
                    <ScrollableList items={cls} containerRef={containerRef} selectTag={selectTag} />
                </div>
                <div className="flex flex-row flex-wrap gap-2 py-2">
                    {!_.isUndefined(state.css[`${desktop.mode}`][`${desktop.state}`]) && !_.isNull(state.css[`${desktop.mode}`][`${desktop.state}`]) && Object.keys(state.css[`${desktop.mode}`][`${desktop.state}`]).map((item) => {
                        return state.css[`${desktop.mode}`][`${desktop.state}`][item] !== '' ? (
                            <div className="badge badge-primary tex-sm rounded-full text-xs lowercase font-bold cursor-pointer" key={`css-badge-` + item}>
                                <span>{state.css[`${desktop.mode}`][`${desktop.state}`][item]}</span>
                                <span className='ml-1' onClick={() => updateCss('', item)}>x</span>
                            </div>
                        ) : null;
                    })}
                </div>
            </div>
            <span className="uppercase font-bold   my-2" style={{ fontSize: '10px' }}>Style</span>
            <div className="p-4 space-y-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="p-1.5 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-md text-blue-600 dark:text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Style
                        </h3>
                    </div>
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md">
                        CSS
                    </span>
                </div>

                <div className="space-y-2">
                    <textarea
                        value={state.style}
                        rows={10}
                        onChange={(e) => updateValue(e.target.value, 'style')}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 
                        bg-gray-50 dark:bg-gray-900 
                        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500
                        placeholder-gray-400 dark:placeholder-gray-500
                        transition-colors duration-200"
                        placeholder="Enter style value..."
                    />
                    
                    <div className="flex flex-wrap gap-2">
                        {['auto', 'inherit', 'initial', 'unset'].map((preset) => (
                            <button
                                key={preset}
                                onClick={() => updateValue(preset, 'style')}
                                className="px-2 py-1 text-xs rounded-md border border-gray-200 dark:border-gray-700 
                                bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 
                                text-gray-600 dark:text-gray-300
                                focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                                transition-colors duration-200"
                            >
                                {preset}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <span className="uppercase font-bold   mt-2" style={{ fontSize: '10px' }}>Semantic</span>
            <select value={state.semantic} className="w-full mr-4 select select-sm" onChange={(e) => { updateValue(e.target.value, 'semantic') }}>
                <option value=""></option>
                {semantics.map(semantic => (
                    <option key={semantic} selected={state.semantic === semantic} value={semantic}>{semantic}</option>
                ))}
            </select>
        </div>
    )
}
export default BlockCss;
