import React, { useContext } from 'react'
import { SessionContext } from './App'

import Item from './Item'

function Receptacle() {

  const { session } = useContext(SessionContext)

  return (
    <div id="receptacle">
      {
        session.receptacle.id &&
        <Item key={session.receptacle.id} item={session.receptacle} name={session.receptacle.name} className={"receptacle-item"} />
      }
    </div>
  )
}

export default Receptacle
