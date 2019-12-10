import React, { useContext } from 'react'
import { SessionContext } from './App'

function Terminal() {

  const {dispatch} = useContext(SessionContext)
  const openTerminalView = () => {
    dispatch({
      type: 'OPEN_TERMINAL'
    })
  }
  return (
    <div id="terminal" onClick={openTerminalView}></div>
  )
}
export default Terminal
