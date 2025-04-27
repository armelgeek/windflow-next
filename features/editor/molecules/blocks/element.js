import React, { useEffect, useMemo, useRef, useState } from 'react';
import _ from 'lodash';
import { useEditor } from "../../hooks/use-editor";
import BlockIcon from "../blocks/components/icon";
import BlockImage from "../blocks/components/image";
const BlockElement = (props) => {
    const refElement = useRef(null);
    const [isEnter, setIsEnter] = useState(false);
    const {
        editor,
        desktop,
        editBlockContent,
        toggleSelectedBlock,
        resetSelectedBlock
    } = useEditor();
    const classes = useMemo(() => {
        if (!editor.current && !props.element) {
            return
        }

        let cls = ''
        cls += props.element.css.css;
        cls += ' z-' + (parseInt(props.level) + 1)
        editor.current && editor.current.type === 'hidden' ?
            (cls += ' h-10 w-64 bg-gray-100 shadow-sm rounded-md') : null
        editor.current && editor.current.id === props.element.id ?
            cls += ' shadow-md' :
            cls += ' hover:shadow-sm'

        return cls
    }, [editor.current, props.element]);

    const isSelected = useMemo(() => editor.selectedBlocks && editor.selectedBlocks.some((block) => block.id === props.element.id), [editor.selectedBlocks, props.element]);
    const getStyle = (block) => {

        let stl = {};

        if (block.style !== '') {
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
    const toggleBorder = useMemo(() => {
        if (isEnter && (editor.current && editor.current.id === props.element.id)) {
            return isSelected 
                ? 'border-2 border-dashed border-red-400 ring-2 ring-red-200' 
                : 'border-2 border-dashed border-blue-400 ring-2 ring-blue-200';
        } else if (editor.current && editor.current.id === props.element.id) {
            return isSelected 
                ? 'border-2 border-dashed border-red-400 shadow-md' 
                : 'border-2 border-dashed border-green-400 shadow-md';
        } else {
            return isSelected 
                ? 'border-2 border-dashed border-red-400' 
                : 'border-none border-dashed border-transparent hover:border hover:border-gray-200';
        }
    }, [isSelected, props.element.id, editor.current, isEnter]);
    const renderElement = () => {
        const commonProps = {
            ref: refElement,
            'style': getStyle(props.element),
            'id': props.element.id,
            className: `${classes} ${toggleBorder} rounded transition-all duration-200 ease-in-out`,
            onMouseEnter: (e) => {
                e.stopPropagation();
                setIsEnter(true);
            },
            onMouseLeave: (e) => {
                e.stopPropagation();
                setIsEnter(false);
            },
            onClick: (e) => {
                e.stopPropagation();
                props.setCurrent(props.element, refElement.current?.offsetWidth)
                if (e.ctrlKey) {
                    toggleSelectedBlock(props.element);
                } else {
                    resetSelectedBlock();
                }
            }
        };
        const editableProps = {
            contentEditable: true,
            onBlur: (e) => {
                e.stopPropagation();
                editBlockContent(e.currentTarget.textContent);
            }
        }
        switch (props.element.element) {
            case 'div':
                return <div {...commonProps}>{props.element.content}</div>;
            case 'img':
                return <BlockImage commonProps={commonProps} element={props.element} />;
            case 'p':
                return <p {...commonProps}>{props.element.content}</p>;
            case 'h': {
                if (props.element.level === 1) return <h1 {...commonProps}>{props.element.content}</h1>;
                if (props.element.level === 2) return <h2 {...commonProps}>{props.element.content}</h2>;
                if (props.element.level === 3) return <h3 {...commonProps}>{props.element.content}</h3>;
                if (props.element.level === 4) return <h4 {...commonProps}>{props.element.content}</h4>;
                if (props.element.level === 5) return <h5 {...commonProps}>{props.element.content}</h5>;
                if (props.element.level === 6) return <h6 {...commonProps}>{props.element.content}</h6>;
            }
                break;
            case 'span':
                return <span {...commonProps}>{props.element.content}</span>;
            case 'blockquote':
                return <blockquote {...commonProps}>{props.element.content}</blockquote>;
            case 'pre':
                return <pre {...commonProps}>{props.element.content}</pre>;
            case 'input': {
                let placeholder = !_.isUndefined(props.element.data) && !_.isUndefined(props.element.data.attributes) ? props.element.data.attributes.placeholder : 'Input';
                let name = !_.isUndefined(props.element.data) && !_.isUndefined(props.element.data.attributes) ? props.element.data.attributes.name : null;
                let id = !_.isUndefined(props.element.data) && !_.isUndefined(props.element.data.attributes) ? props.element.data.attributes.id : null;
                let required = !_.isUndefined(props.element.data) && !_.isUndefined(props.element.data.attributes) ? props.element.data.attributes.required : null;
                return <input type={props.element.type} placeholder={placeholder} name={name} required={required} {...commonProps} />;
            }

            case 'textarea':
                return <textarea {...commonProps}>{props.element.placeholder}</textarea>;
            case 'button':
                return <button type={props.element.tag} {...commonProps}>{props.element.content}</button>;
            case 'video':
                return <video   {...commonProps} src={props.element.link}  {...props.element.options}>{props.element.content}</video>;

            case 'audio':
                return <audio   {...commonProps} src={props.element.link}  {...props.element.options}>{props.element.content}</audio>;
            case 'iframe':
                return (
                    <iframe
                        key={props.element.id}
                        src={props.element.src + props.element.content}
                        className={classes}
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setCurrent(props.element, refElement.current)
                        }}
                        data-element-tag={props.element.tag}>
                    </iframe>
                );
            case "article":
                return <article  {...commonProps} >{props.element.content}</article>;
            case "aside":
                return <aside  {...commonProps}>{props.element.content}</aside>;
            case "header":
                return <header  {...commonProps}>{props.element.content}</header>;
            case "figcaption":
                return <figcaption  {...commonProps}>{props.element.content}</figcaption>;
            case "figure":
                return <figure  {...commonProps}>{props.element.content}</figure>;
            case "label":
                return <label  {...commonProps}>{props.element.content}</label>;
            case "mark":
                return <mark  {...commonProps}>{props.element.content}</mark>;
            case "section":
                return <section  {...commonProps}>{props.element.content}</section>;
            case "summary":
                return <summary  {...commonProps}>{props.element.content}</summary>;
            case "time":
                return <time  {...commonProps}>{props.element.content}</time>;
            case "details":
                return <details  {...commonProps}>{props.element.content}</details>;
            case "main":
                return <main  {...commonProps}>{props.element.content}</main>;
            case "footer":
                return <footer  {...commonProps}>{props.element.content}</footer>;
            case "a": {
                let href = !_.isUndefined(props.element.href) ? props.element.href : '';
                return <a  {...commonProps}>{props.element.content}</a>
            }
            case "hr":
                return <hr  {...commonProps} />;

            case "option":
                return <option  {...commonProps}>{props.element.content}</option>;
            case 'iconify': {
                let icon = !_.isUndefined(props.element.data) && !_.isUndefined(props.element.data.icon) ? props.element.data.icon : 'material-symbols:home';
                console.log('props.element.data.icon', props.element.data.icon);
                return <BlockIcon icon={icon} id={props.element.id} commonProps={commonProps} />
            }

            default:
                return <div key={props.element.id} {...commonProps}>{props.element.content}</div>;
        }
    }
    return props.element ? renderElement() : (<span></span>)
}
export default BlockElement;
