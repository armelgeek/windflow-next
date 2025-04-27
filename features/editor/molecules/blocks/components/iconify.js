import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useEditor } from '../../../hooks/use-editor';
// eslint-disable-next-line react/display-name
const ScrollItem = memo(({ updateIcon, item, index }) => {
    return (
        <div className="text-sm  lowercase suggestion-item" key={item + '--' + index} onClick={(e) => {
            updateIcon(item);
            console.log('icon clicked', item);
        }}><span className="iconify-wrapper  text-2xl"><span className={`iconify`} data-icon={`${item}`}></span></span></div>
    )
}, (prevProps, nextProps) => prevProps.item === nextProps.item && prevProps.index === nextProps.index)
const ScrollableList = ({ items, containerRef, updateIcon }) => {
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
    }, [loading, items])


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
        <ScrollItem key={index} item={item} index={index} updateIcon={updateIcon} />
    ));

    return (
        <div className='grid grid-cols-5'>
            {renderedItems}
        </div>
    );
}
const BlockIconify = () => {
    const [items, setItems] = useState([]);
    const { editor, editBlockIcon } = useEditor();
    const updateIcon = useCallback((value) => {
        editBlockIcon(value);
        if (editor.selectedBlocks.length > 0) {
            for (let index = 0; index < editor.selectedBlocks.length; index++) {
                const element = editor.selectedBlocks[index];
                editBlockIcon(value, element)
            }
        }
    }, [editor.selectedBlocks])

    const containerRef = useRef();
    const searchIcon = (e) => {

        if (e.key === 'Enter' && e.target.value.length > 2) {
            let requestObj = icon.iconFinder(e.target.value).promise;
            requestObj.then((response) => {
                console.log('icons', response.icons);
                setItems([] || response.icons);
            })
        }
    }
    return (
        <div className="flex flex-col w-full h-full items-start bg-bluegray-200">
            <span className="uppercase font-bold  my-2" style={{ fontSize: '10px' }}>Icon</span>
            <div className="tag-input-sg-container  w-full">
                <input type="text" className="w-full input-sm  rounded-md  border-gray-200 focus:outline-0 focus:shadow-none focus:focus-within:ring-0 text-sm" placeholder='Search Icon ...' onKeyDown={(e) => searchIcon(e)} />
                <div className="suggestions-container" ref={containerRef} style={{
                    display: items.length > 0 ? 'block' : 'none'
                }}>
                    <ScrollableList items={items} containerRef={containerRef} updateIcon={updateIcon} />
                </div>
            </div>
        </div>
    )
}

export default BlockIconify;
