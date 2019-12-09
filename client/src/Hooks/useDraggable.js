import { useReducer, useEffect } from 'react'

function useDraggable(className) {

  const initialDragState = {
    isDragging: false,
    originalX: 0,
    originalY: 0,
    translateX: 0,
    translateY: 0,
    lastTranslateX: 0,
    lastTranslateY: 0
  }

  const dragReducer = (state, action) => {
    switch (action.type) {
      case "DRAG_START":
        console.log(state)
        return {
          ...state,
          originalX: action.clientX,
          originalY: action.clientY,
          isDragging: true
        }

      case "DRAG_MOVE":
        console.log(action.clientX)
        return {
          ...state,
          translateX: action.clientX - state.originalX,
          translateY: action.clientY - state.originalY
        }

      case "DRAG_END":
        if (className === "scene-item") {
          return {
            ...state,
            originalX: state.translateX,
            originalY: state.translateY,
            translateX: action.clientX - state.originalX,
            translateY: action.clientY - state.originalY,
            lastTranslateX: state.translateX,
            lastTranslateY: state.translateY,
            isDragging: false
          }

          //if the item stays in the scene floor, keep it there
          //if the item is placed in inventory, begin process to move it to the inventory
          //if the item is placed outside the bounds of scene floor, return to original pos
        }

        if (className === "inventory-item") {
          console.log(`i'm an inventory item!`)
          return {
            ...state,
            originalX: 0,
            originalY: 0,
            translateX: 0,
            translateY: 0,
            lastTranslateX: state.translateX,
            lastTranslateY: state.translateY,
            isDragging: false
          }

          //if the item stays in inventory or is outside the bounds, return to original pos
          //if the item is placed onto scene floor or interactable, begin process of moving it to scene, or consuming it with the dematerializer
          //if the item is placed on a different place in the inventory, change its order
        }

      // return {
      //   ...state,
      //   originalX: 0,
      //   originalY: 0,
      //   lastTranslateX: state.translateX,
      //   lastTranslateY: state.translateY,
      //   isDragging: false
      // }
      default:
        return state
    }
  }

  const [dragState, dispatch] = useReducer(dragReducer, initialDragState)

  const dragStart = (event) => {
    event.preventDefault()
    let { clientX, clientY } = event
    window.addEventListener('mousemove', dragMove)
    window.addEventListener('mouseup', dragEnd)
    dispatch({ type: "DRAG_START", clientX, clientY })
  }

  const dragMove = ({ clientX, clientY }) => {
    dispatch({ type: "DRAG_MOVE", clientX, clientY })
  }

  const dragEnd = ({ clientX, clientY }) => {
    window.removeEventListener("mousemove", dragMove)
    window.removeEventListener("mouseup", dragEnd)
    dispatch({ type: "DRAG_END", clientX, clientY })
  }

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", dragMove)
      window.removeEventListener("mouseup", dragEnd)
    }
  }, [])

  return [dragState, dragStart]

}

export default useDraggable
