import React, { useContext } from 'react'
import { SessionContext } from './App'

/**** COMPONENTS****/
import Item from './Item'

function InventoryView() {

  const {session} = useContext(SessionContext)

  return (

    <div id="inventory-view">
      {session.inventory.map((item, index) =>
        (
          <div className="item-container" key={item.id + "container"}>
            <Item item={item} key={`${item.id}${index}`} name={item.name} className={"inventory-item"} />
          </div>
        )
      )}
    </div>
  )
}

export default InventoryView
