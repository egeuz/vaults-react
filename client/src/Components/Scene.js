import React from 'react'
import Item from './Item'

function Scene({scene, items}) {
  return (
    <div id="scene">
      {items.map(item => 
          (<Item key={item.id} name={item.name} className={"scene-item"}/>)
        )}
    </div>
  )
}

export default Scene
