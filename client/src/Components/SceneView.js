import React, { useContext } from 'react'
import { SessionContext } from './App'
import Scene from './Scene'
import TerminalView from './TerminalView'

function SceneView() {
  const { session } = useContext(SessionContext)

  return (
    <div id="scene-view">
      {
        session.terminalOpen ? 
        <TerminalView /> :
        <Scene items={session.items} />
      }

    </div>
  )
}

export default SceneView
