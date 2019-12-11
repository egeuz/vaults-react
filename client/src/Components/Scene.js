import React from 'react'
import Item from './Item'
import Terminal from './Terminal'

function Scene({ items }) {
  return (
    <div id="scene">
      {items.map((item, index) =>
        (<Item key={`${item.id}${index}`} item={item} name={item.name} className={"scene-item"} />)
      )}
      <Terminal />
    </div>
  )
}

export default Scene
