import React from 'react'

function BlockImage({commonProps,element}) {
    return (
        <img {...commonProps} src={element.image.url || '/img/no-image.png'} alt={element.content.alt}/>
    )
}

export default BlockImage
