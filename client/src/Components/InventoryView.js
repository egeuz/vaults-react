import React, {useState, useEffect} from 'react'
import Items from '../services/items'

function InventoryView() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    Items.getAll()
    .then(response => {
      setInventory(response.data)
    })
  }, [])

  return (
    <div id="inventory-view">
      {inventory.map(item => 
        (<span>{item.name}</span>)
      )}
    </div>
  )
}

export default InventoryView
