import React, { useState } from 'react'
import _ from 'lodash';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, CircleDot } from 'lucide-react';

const Position = ({ title, data, attr, updateCss, selector }) => {
    const [selected, setSelected] = useState(!_.isNull(data) && !_.isUndefined(data[attr]) ? data[attr] : {});
    const onPress = (value) => {
        setSelected(selector + '-' + value);
        updateCss(selector + '-' + value, attr);
    }
    return (
        <>
            <div className="grid grid-cols-3 gap-2 w-full">
                <button title={"top left"} onClick={() => onPress('left-top')} className={` flex items-center justify-center  whitespace-nowrap text-gray-500 dark:text-gray-300 ${selected == selector + '-' + 'left-top' ? 'bg-primary-500 text-white' : 'bg-slate-300'} text-xs p-2 space-x-1 rounded-md leading-3.5 font-medium`} type="button">
                    <span className="icons m-px -rotate-45" >
                        <ArrowUp size={16} />
                    </span>
                </button>
                <button title={"top"} onClick={() => onPress('top')} className={` flex items-center justify-center  whitespace-nowrap text-gray-500 dark:text-gray-300 ${selected == selector + '-' + 'top' ? 'bg-primary-500 text-white' : 'bg-slate-300'} text-xs p-2 space-x-1 rounded-md leading-3.5 font-medium`} type="button">
                    <span className="icons m-px">
                        <ArrowUp size={16} />
                    </span>
                </button>
                <button title={"top right"} onClick={() => onPress('right-top')} className={` flex items-center justify-center  whitespace-nowrap text-gray-500 dark:text-gray-300 ${selected == selector + '-' + 'right-top' ? 'bg-primary-500 text-white' : 'bg-slate-300'} text-xs p-2 space-x-1 rounded-md leading-3.5 font-medium`} type="button">
                    <span className="icons m-px  rotate-45">
                        <ArrowUp size={16} />
                    </span>
                </button>
                <button title={"left"} onClick={() => onPress('left')} className={` flex items-center justify-center  whitespace-nowrap text-gray-500 dark:text-gray-300 ${selected == selector + '-' + 'left' ? 'bg-primary-500 text-white' : 'bg-slate-300'} text-xs p-2 space-x-1 rounded-md leading-3.5 font-medium`} type="button">
                    <span className="icons m-px ">
                        <ArrowLeft size={16} />
                    </span>
                </button>
                <button title={"center"} onClick={() => onPress('center')} className={` flex items-center justify-center  whitespace-nowrap text-gray-500 dark:text-gray-300 ${selected == selector + '-' + 'center' ? 'bg-primary-500 text-white' : 'bg-slate-300'} text-xs p-2 space-x-1 rounded-md leading-3.5 font-medium`} type="button">
                    <span className="icons m-px">
                        <CircleDot size={16} />
                    </span>
                </button>
                <button title={"right"} onClick={() => onPress('right')} className={` flex items-center justify-center  whitespace-nowrap text-gray-500 dark:text-gray-300 ${selected == selector + '-' + 'right' ? 'bg-primary-500 text-white' : 'bg-slate-300'} text-xs p-2 space-x-1 rounded-md leading-3.5 font-medium`} type="button">
                    <span className="icons m-px ">
                        <ArrowRight size={16} />
                    </span>
                </button>
                <button title={"bottom left"} onClick={() => onPress('left-bottom')} className={` flex items-center justify-center  whitespace-nowrap text-gray-500 dark:text-gray-300 ${selected == selector + '-' + 'left-bottom' ? 'bg-primary-500 text-white' : 'bg-slate-300'} text-xs p-2 space-x-1 rounded-md leading-3.5 font-medium`} type="button">
                    <span className="icons m-px  -rotate-45">
                        <ArrowLeft size={16} />
                    </span>
                </button>
                <button title={"bottom"} onClick={() => onPress('bottom')} className={` flex items-center justify-center  whitespace-nowrap text-gray-500 dark:text-gray-300 ${selected == selector + '-' + 'bottom' ? 'bg-primary-500 text-white' : 'bg-slate-300'} text-xs p-2 space-x-1 rounded-md leading-3.5 font-medium`} type="button">
                    <span className="icons m-px ">
                        <ArrowDown size={16} />
                    </span>
                </button>
                <button title={"bottom right"} onClick={() => onPress('right-bottom')} className={` flex items-center justify-center  whitespace-nowrap text-gray-500 dark:text-gray-300 ${selected == selector + '-' + 'right-bottom' ? 'bg-primary-500 text-white' : 'bg-slate-300'} text-xs p-2 space-x-1 rounded-md leading-3.5 font-medium`} type="button">
                    <span className="icons m-px  rotate-45">
                        <ArrowRight size={16} />
                    </span>
                </button>
            </div>
        </>
    )
}
export default Position;
