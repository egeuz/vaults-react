import React, {useState, useEffect } from 'react'
/**** COMPONENTS ****/
import SceneView from './SceneView'
import InventoryView from './InventoryView'
import LogView from './LogView'
/**** RECEIVE DATA FROM SERVER ****/
import ItemCatalog from '../services/items'

function App() {
  const [items, setItems] = useState([])
  
  useEffect(() => {
    ItemCatalog.getAll()
    .then(response => {
      console.log(response.data)
      setItems(response.data)})
  }, [])

  return (
    <div id="app">
      <SceneView />
      <InventoryView />
      <LogView />
    </div>
  )
}

export default App
