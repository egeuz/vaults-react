import React, { useContext } from 'react'
import { SessionContext } from './App'
import Receptacle from './Receptacle'
import Screen from './Screen'

function TerminalView() {
  const {dispatch} = useContext(SessionContext)
  const closeTerminalView = () => {
   dispatch({
      type: 'CLOSE_TERMINAL'
    })
  }

  return (
    <div id="terminal-view">
      <Screen />
      <Receptacle />
      <button onClick={closeTerminalView}>Back</button>
    </div>
  )
}

export default TerminalView
