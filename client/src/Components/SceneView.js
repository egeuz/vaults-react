import React, { useContext } from 'react'
import { SessionContext } from './App'
import Scene from './Scene'

function SceneView() {
  const sessionContext = useContext(SessionContext)
  const session = sessionContext.session

  return (
    <div id="scene-view">
      <Scene scene={session.currentScene} items={session.items}/>
    </div>
  )
}

export default SceneView
