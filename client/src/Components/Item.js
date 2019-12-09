import React from 'react'
import useDraggable from '../Hooks/useDraggable'


function Item({name, className}) {
  const [dragState, dragStart] = useDraggable(className)

  return (
    <div 
      className={`item ${className}`}
      onMouseDown={dragStart}
      style={{
        top: `${dragState.translateY}px`,
        left: `${dragState.translateX}px`,
      }}
    >
      <p>{name}</p>
    </div>
  )
}

export default Item
