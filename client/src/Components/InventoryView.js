import React, { useContext } from 'react'
import { SessionContext } from './App'

/**** COMPONENTS****/
import Item from './Item'

function InventoryView() {

  const {session} = useContext(SessionContext)

  return (

    <div id="inventory-view">
      {session.inventory.map(item =>
        (
          <div className="item-container" key={item.id + "container"}>
            <Item item={item} key={item.id} name={item.name} className={"inventory-item"} />
          </div>
        )
      )}
    </div>
  )
}

export default InventoryView
