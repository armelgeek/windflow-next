import React, { useMemo } from 'react';
import Element from "@/shared/lib/tail/element";
import { useEditor } from "../hooks/use-editor";
const elements = new Element().Groups();
const ElementList = () => {
    console.log('ElementList')
    const createElement = useEditor().createElement;
    return useMemo(() => (
        <>
            {elements.map((group, index) => (
                <div className="px-3 py-3.5" key={index}>
                    <div className="text-xs text-gray-700 text-opacity-60 capitalize mb-1.5">{group.label}</div>
                    <div className="grid grid-cols-2 gap-1">
                        {group.elements.map((element, i) => (
                            <div key={i} onClick={(e) => {
                                e.stopPropagation();
                                createElement(element);
                            }} className="px-2 py-2.5 bg-gray-500 hover:bg-gray-300 rounded-md text-white text-xs flex items-center transition ease-in duration-75 group cursor-pointer">
                                {/** <span className='icons group-hover:opacity-75 opacity-50 mr-1.5'>

                                     </span>*/  }
                                <span className='group-hover:opacity-100 opacity-75 leading-4 capitalize -my-0.5 truncate text-xs'> {element.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )
            )
            }
        </>
    ), [])
}
export default ElementList;
