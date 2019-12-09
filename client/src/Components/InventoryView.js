import React, { useContext } from 'react'
import { SessionContext } from './App'

/**** COMPONENTS****/
import Item from './Item'

function InventoryView() {

  const sessionContext = useContext(SessionContext)
  const session = sessionContext.session

  return (

    <div id="inventory-view">
      {session.inventory.map(item =>
        (
          <div className="item-container" key={item.id + "container"}>
            <Item key={item.id} name={item.name} className={"inventory-item"} />
          </div>
        )
      )}
    </div>
  )
}

export default InventoryView
