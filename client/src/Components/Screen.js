import React, { useState, useContext } from 'react'
import { SessionContext } from './App'

const logs = {
  intro: ``,
  intro2: ``,

}

const initialState = {
  messageShown: 'intro',
  inputType: 'name',
}

const screenReducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

function Screen() {
  const [input, setInput] = useState('')
  // const [screenState, screenDispatch] = useReducer(screenReducer, initialState)
  const { session, dispatch } = useContext(SessionContext)

  const handleSubmit = (event) => {
    //first state: introduction text, prompt name demand
    //upon name submit -> trigger secondary intro text, prompt item demand
    //upon failed item name submit -> trigger error text, demand retry
    //upon successful item name submit -> trigger memory demand
    //upon memory submit -> trigger item generation
    //item generated -> success message, please take item from inventory
    //item-on-receptacle


    event.preventDefault()
    if (!session.receptacle.id) {
      const item = session.itemCatalog.find(item => item.name === input.toLowerCase())
      dispatch({
        type: 'GENERATE_ITEM', item
      })
    }
  }

  return (
    <div id="screen">
      <div id="log">{}</div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={(e) => { setInput(e.target.value) }} />
        <button type="submit">>>GO</button>
      </form>
    </div>
  )
}

export default Screen
