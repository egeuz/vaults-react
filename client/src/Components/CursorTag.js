import React, { useReducer, useEffect } from 'react'

const initialState = {
  label: '',
  visible: false,
  x: 0,
  y: 0
}

const cursorReducer = (state, action) => {
  switch (action.type) {
    case 'MOVE_TAG':
      return { ...state, x: action.pageX, y: action.pageY }
    case 'SHOW_TAG':
      return { ...state, visible: true, label: action.label }
    case 'HIDE_TAG':
      return { ...state, visible: false, label: '' }
    default:
      return state
  }
}

function CursorTag() {

  const [cursorState, dispatch] = useReducer(cursorReducer, initialState)

  const handleCursorTag = ({ target, pageX, pageY }) => {
    dispatch({ type: 'MOVE_TAG', pageX, pageY })
    if (target.classList.contains('item')) {
      const label = target.classList[1]
      dispatch({ type: 'SHOW_TAG', label })
    } else {
      dispatch({ type: 'HIDE_TAG' })
    }
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleCursorTag)
    return () => {
      window.removeEventListener("mousemove", handleCursorTag)
    }
  }, [])

  return (
    <div
      id="cursor-tag"
      style={{
        left: `${cursorState.x + 20}px`,
        top: `${cursorState.y + 10}px`,
        visibility: cursorState.visible ? 'visible' : 'hidden'
      }}>
      {cursorState.visible && <p>{cursorState.label}</p>}
    </div>
  )
}

export default CursorTag
