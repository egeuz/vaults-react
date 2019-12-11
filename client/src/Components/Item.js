import React from 'react'
import useDraggable from '../Hooks/useDraggable'

function Item({item, name, className}) {
  const [dragState, dragStart] = useDraggable(item, className)
  return (
    <img
      src={require(`../assets/items/${item.name}.png`)}
      alt={item.name}
      className={`item ${name} ${className}`}
      onMouseDown={dragStart}
      style={{
        top: `${dragState.translateY}px`,
        left: `${dragState.translateX}px`,
      }}
    />
  )
}

export default Item
