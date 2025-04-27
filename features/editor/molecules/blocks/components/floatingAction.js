import React, { useRef } from 'react'
import { X } from 'lucide-react'

const BlockFloatingAction = (props) => {
    const floatingActionHeader = useRef(null)
    const floatingActionContainer = useRef(null)
    return (
        <div ref={floatingActionContainer} className={`flex flex-col shadow ${props.component ? '' : 'hidden'}`}>
            <div ref={floatingActionHeader} className="cursor-move z-modal flex bg-purple-800 h-8 text-white p-1">
                {props.title}
                <div className="flex h-8 items-center justify-center absolute top-0 right-0 z-modal">
                    <X size={18} />
                </div>
            </div>
            {props.component && (
                <div className="">
                    component
                </div>
            )}
            {props.component}
        </div>
    )
}

export default BlockFloatingAction
