import React, { useEffect, useReducer } from 'react'
/**** COMPONENTS ****/
import SceneView from './SceneView'
import InventoryView from './InventoryView'
import LogView from './LogView'
/**** RECEIVE DATA FROM SERVER ****/
import ItemCatalog from '../services/items'

export const SessionContext = React.createContext()

const initialSessionState = {
  currentScene: "hello",
  items: [],
  inventory: []
}

const sessionReducer = (state, action) => {
  switch(action.type) {
    case "LOAD_SESSION_DATA":
      return {
        currentScene: "online",
        items: action.data,
        inventory: action.data
       }

    default:
      return state
  }
}

function App() {
  
  const [session, dispatch] = useReducer(sessionReducer, initialSessionState)
  useEffect(() => {
    ItemCatalog.getAll()
      .then(response => {
        dispatch({type: "LOAD_SESSION_DATA", data: response.data})
      })
  }, [])

  return (
    <SessionContext.Provider value={{session: session, dispatch: dispatch }}>
      <div id="app">
        <SceneView />
        <InventoryView />
        <LogView />
      </div>
    </SessionContext.Provider>
  )
}

export default App
