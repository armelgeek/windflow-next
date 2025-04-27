import React, { useEffect, useMemo, useRef, useState } from "react";
import _ from 'lodash';
import BlockElement from "./element";
import BlockIFrame from "../blocks/components/iframe";
import { useEditor } from "../../hooks/use-editor";
const BlockContainer = ({ doc, level, setCurrent, ajustCoords }) => {
    const refContainer = useRef(null);
    const [isEnter, setIsEnter] = useState(false);
    const {
        editor,
        desktop,
        editBlockContent,
        toggleSelectedBlock,
        resetSelectedBlock
    } = useEditor();
    const isSelected = useMemo(() => editor.selectedBlocks && editor.selectedBlocks.some((block) => block.id === doc.id), [editor.selectedBlocks]);
    const classes = useMemo(() => {
        let css = '';
        css = doc.css && Object.values(doc.css).join(" ");
        css += " windflow-level-" + level;
        return css;
    }, [doc, level]);
    const toggleBorder = useMemo(() => {
        if (isEnter && editor.current && editor.current.id === doc.id) {
            return isSelected 
                ? 'border-2 border-dashed border-red-400 shadow-lg ring-2 ring-red-200' 
                : desktop.state === 'neutral' 
                    ? 'border-2 border-dashed border-blue-400 shadow-lg ring-2 ring-blue-200' 
                    : 'border-2 border-dashed border-green-400 shadow-lg ring-2 ring-green-200';
        } else if (editor.current && editor.current.id === doc.id) {
            return isSelected 
                ? 'border-2 border-dashed border-red-400 shadow-md' 
                : desktop.state === 'neutral' 
                    ? 'border-2 border-dashed border-blue-400 shadow-md' 
                    : 'border-2 border-dashed border-green-400 shadow-md';
        } else {
            return isSelected 
                ? 'border-2 border-dashed border-red-400 shadow-sm' 
                : 'border-none border-dashed border-transparent hover:border hover:border-gray-200 transition-all duration-200';
        }
    }, [isEnter, editor.current, doc.id, isSelected, desktop.state]);

    const getStyle = (block) => {

        let stl = {};

        if (!_.isUndefined(block.style) && block.style !== '') {
            stl = block.style.split(';').reduce((acc, rule) => {
                const [property, value] = rule.split(':');
                if (property && value) {
                    acc[property.trim()] = value.trim();
                }
                return acc;
            }, {});
        }
        if (block.font !== '') {
            stl['fontFamily'] = block.font;
        }

        if (block.background && block.background.url !== '') {
            stl['backgroundImage'] = `url(${block.background.url})`;
        }
        return stl;
    };
    const props = {
        ref: refContainer,
        style: getStyle(doc),
        id: doc.id,
        onMouseEnter: (e) => {
            e.stopPropagation();
            setIsEnter(true)
        },
        onMouseLeave: (e) => {
            e.stopPropagation();
            setIsEnter(false)
        },
        onClick: (e) => {
            e.stopPropagation();
            setCurrent(doc, refContainer.current?.offsetWidth)
            if (e.ctrlKey) {
                toggleSelectedBlock(doc);
            } else {
                resetSelectedBlock();
            }
        },
        className: `${classes} ${toggleBorder} rounded-lg transition-all duration-200 ease-in-out`
    }
    const render = () => (
        <>
            {typeof doc.blocks != "undefined" && doc.blocks.length > 0 ? null : (doc.content ? doc.content : doc.element)}
            {typeof doc.blocks != "undefined" && doc.blocks.map((block) => {
                if (
                    block.type === "container" ||
                    block.tag === "container" ||
                    block.tag === "blocks"
                ) {
                    return (
                        <React.Fragment key={block.id}>
                            <BlockContainer
                                doc={block}
                                key={block.id}
                                setCurrent={setCurrent}
                                level={parseInt(level) + 1}
                                ajustCoords={ajustCoords}
                            />
                        </React.Fragment>
                    )
                }
                {
                    if (block && block.type !== 'container' && block.tag !== 'container') {
                        return (
                            <BlockElement
                                element={block}
                                state={desktop.state}
                                key={'block_element_' + block.id}
                                level={parseInt(level) + 1}
                                setCurrent={setCurrent}
                                ajustCoords={ajustCoords}
                            />
                        )
                    }
                }
                if (block.tag === 'iframe' || block.tag === 'youtube' || block.tag === 'vimeo') {
                    return (
                        <BlockIFrame
                            element={block}
                            key={'block_element_' + block.id}
                            setCurrent={setCurrent}
                            level={parseInt(level) + 1}
                        />)
                }
            })}
        </>
    )
    if (doc.element === "article") {
        return <article  {...props} >{render()}</article>;
    } else if (doc.element === "aside") {
        return <aside  {...props}>{render()}</aside>;
    } else if (doc.element === "header") {
        return <header  {...props}>{render()}</header>;
    } else if (doc.element === "figcaption") {
        return <figcaption  {...props}>{render()}</figcaption>;
    } else if (doc.element === "figure") {
        return <figure  {...props}>{render()}</figure>;
    } else if (doc.element === "label") {
        return <label  {...props}>{render()}</label>;
    } else if (doc.element === "mark") {
        return <mark  {...props}>{render()}</mark>;
    } else if (doc.element === "section") {
        return <section  {...props}>{render()}</section>;
    } else if (doc.element === "summary") {
        return <summary  {...props}>{render()}</summary>;
    } else if (doc.element === "time") {
        return <time  {...props}>{render()}</time>;
    } else if (doc.element === "details") {
        return <details  {...props}>{render()}</details>;
    } else if (doc.element === "main") {
        return <main  {...props}>{render()}</main>;
    } else if (doc.element === "footer") {
        return <footer  {...props}>{render()}</footer>;
    } else if (doc.element === "form") {
        return <form  {...props}>{render()}</form>;
    } else if (doc.element === 'nav') {
        return <nav {...props}>{render()}</nav>;
    } else if (doc.element === 'span') {
        return <span {...props}>{render()}</span>;
    } else if (doc.element === 'div') {
        return <div {...props}>{render()}</div>;
    } else if (doc.element === 'ul') {
        return <ul {...props}>{render()}</ul>;
    } else if (doc.element === 'li') {
        return <li {...props}>{render()}</li>;
    } else if (doc.element === 'ol') {
        return <ol {...props}>{render()}</ol>;
    } else if (doc.element === "select") {
        return <select {...props}>{render()}</select>;
    } else if (doc.element === 'table') {
        return <table {...props}>{render()}</table>;
    } else if (doc.element === 'thead') {
        return <thead {...props}>{render()}</thead>;
    } else if (doc.element === 'tbody') {
        return <tbody {...props}>{render()}</tbody>;
    } else if (doc.element === 'th') {
        return <th {...props}>{render()}</th>;
    } else if (doc.element === 'tr') {
        return <tr {...props}>{render()}</tr>;
    } else if (doc.element === 'td') {
        return <td {...props}>{render()}</td>;
    } else {
        return <div {...props}>{render()}</div>;
    }
}
export default BlockContainer;
