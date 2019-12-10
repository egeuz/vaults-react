import { useReducer, useEffect, useContext } from 'react'
import { SessionContext } from '../Components/App'

function useDraggable(item, className) {
  const session = useContext(SessionContext)
  const sessionState = session.session
  const sessionDispatch = session.dispatch

  const initialDragState = {
    item: {},
    originalX: 0,
    originalY: 0,
    translateX: className === 'scene-item' ? item.x : 0,
    translateY: className === 'scene-item' ? item.y : 0,
    lastTranslateX: 0,
    lastTranslateY: 0
  }

  const dragReducer = (state, action) => {
    switch (action.type) {

      case "DRAG_START":
        return {
          ...state,
          item: action.target,
          originalX: action.target.offsetLeft,
          originalY: action.target.offsetTop,
          lastTranslateX: action.clientX,
          lastTranslateY: action.clientY
        }

      case "DRAG_MOVE":
        return {
          ...state,
          translateX: state.item.offsetLeft - (state.lastTranslateX - action.clientX),
          translateY: state.item.offsetTop - (state.lastTranslateY - action.clientY),
          lastTranslateX: action.clientX,
          lastTranslateY: action.clientY
        }

      case "DRAG_END":
        return {
          ...state,
          originalX: state.translateX,
          originalY: state.translateY
        }

      case "DRAG_FAIL":
        return {
          ...state,
          translateX: state.originalX,
          translateY: state.originalY
        }

      default:
        return state
    }
  }

  const [dragState, dispatch] = useReducer(dragReducer, initialDragState)

  const dragStart = (event) => {
    event.preventDefault()
    let { clientX, clientY, target } = event
    window.addEventListener('mousemove', dragMove)
    window.addEventListener('mouseup', dragEnd)
    dispatch({ type: "DRAG_START", clientX, clientY, target })
  }

  const dragMove = ({ clientX, clientY, target }) => {
    dispatch({ type: "DRAG_MOVE", clientX, clientY, target })
  }

  const dragEnd = (event) => {
    window.removeEventListener("mousemove", dragMove)
    window.removeEventListener("mouseup", dragEnd)

    if (className) {
      const area = getEventArea(event)
      const itemOrigin = className.slice(0, -5)

      if (area === false) {
        dispatch({ type: "DRAG_FAIL" })
      }
      if (itemOrigin === area) {
        dispatch({ type: "DRAG_END" })
        if(area === 'scene') {
          sessionDispatch({
            type: 'UPDATE_ITEM_LOCATION',
            item,
            x: dragState.translateX,
            y: dragState.translateY
          })
        }
      }

      if (itemOrigin !== area) {
        if (itemOrigin === 'inventory' && area === 'scene') {
          sessionDispatch({ 
            type: 'INVENTORY_TO_SCENE',
            item,
            x: event.pageX - document.getElementById('scene').offsetLeft,
            y: event.pageY - document.getElementById('scene').offsetTop
          })
        }
        if (itemOrigin === 'scene' && area === 'inventory') {
          sessionDispatch({ type: 'SCENE_TO_INVENTORY', item })
        }
        if (itemOrigin === 'receptacle' && area === 'inventory') {
          sessionDispatch({ type: 'RECEPTACLE_TO_INVENTORY', item })
        }
        if (itemOrigin === 'inventory' && area === 'receptacle') {
          sessionDispatch({ type: 'INVENTORY_TO_RECEPTACLE', item })
        }
      }
    }
  }

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", dragMove)
      window.removeEventListener("mouseup", dragEnd)
    }
  }, [])

  return [dragState, dragStart]


  /**** HELPER METHODS ****/
  function getEventArea({ pageX, pageY }) {
    let scene = document.getElementById('scene')
    let inventory = document.getElementById('inventory-view')
    let receptacle = document.getElementById('receptacle')
    if (sessionState.terminalOpen && isInBounds(pageX, pageY, receptacle)) return "receptacle"
    if (isInBounds(pageX, pageY, inventory)) return "inventory"
    if (isInBounds(pageX, pageY, scene)) return "scene"
    return false
  }
  
  function isInBounds(x, y, area) {
    return (x > area.offsetLeft && x < area.offsetLeft + area.offsetWidth) && (y > area.offsetTop && y < area.offsetTop + area.offsetHeight)
  }
}

export default useDraggable
