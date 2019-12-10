import React from 'react'
import Item from './Item'
import Terminal from './Terminal'

function Scene({ items }) {
  return (
    <div id="scene">
      {items.map(item =>
        (<Item key={item.id} item={item} name={item.name} className={"scene-item"} />)
      )}
      <Terminal />
    </div>
  )
}

export default Scene
