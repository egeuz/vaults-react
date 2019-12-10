import React, { useEffect, useReducer } from 'react'
/**** COMPONENTS ****/
import CursorTag from './CursorTag'
import SceneView from './SceneView'
import InventoryView from './InventoryView'
/**** RECEIVE DATA FROM SERVER ****/
import ItemCatalog from '../services/items'

export const SessionContext = React.createContext()
export const ScrenContext = React.createContext()

const initialSessionState = {
  itemCatalog: [],
  //ITEM MANAGEMENT
  items: [],
  inventory: [],
  receptacle: {},
  terminalOpen: false
}

const sessionReducer = (state, action) => {
  switch (action.type) {

    case "LOAD_SESSION_DATA":
      return {
        ...state,
        itemCatalog: action.data,
        items: action.data,
      }

    case 'OPEN_TERMINAL':
      return { ...state, terminalOpen: true }

    case 'CLOSE_TERMINAL':
      return { ...state, terminalOpen: false }

    case 'GENERATE_ITEM':
      return {
        ...state, receptacle: action.item
      }
    case 'UPDATE_ITEM_LOCATION':
      const updatedItem = { ...action.item, x: action.x, y: action.y }
      const newItems = [...state.items.filter(item => item.id !== action.item.id), updatedItem]
      return {
        ...state, items: newItems
      }

    case "INVENTORY_TO_SCENE":
      const newItem = { ...action.item, x: action.x, y: action.y }
      return {
        ...state,
        items: [...state.items, newItem],
        inventory: state.inventory.filter(item => item.id !== action.item.id),
      }
    case "SCENE_TO_INVENTORY":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.item.id),
        inventory: [...state.inventory, action.item]
      }

    case "INVENTORY_TO_RECEPTACLE":
      return {
        ...state,
        inventory: state.inventory.filter(item => item.id !== action.item.id),
        receptacle: action.item
      }

    case "RECEPTACLE_TO_INVENTORY":
      return {
        ...state,
        inventory: [...state.inventory, action.item],
        receptacle: {}
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
        dispatch({
          type: "LOAD_SESSION_DATA",
          data: response.data
        })
      })
    //post data on dismount
  }, [])

  return (
    <SessionContext.Provider value={{ session: session, dispatch: dispatch }}>
      <div id="app">
        <CursorTag />
        <SceneView />
        <InventoryView />
      </div>
    </SessionContext.Provider>
  )
}

export default App
