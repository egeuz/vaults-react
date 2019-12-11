import React, { useState, useEffect, useReducer, useContext } from 'react'
import { SessionContext } from './App'
import ItemCatalog from '../services/items'

const initialState = {
  messageShown: 'intro',
  inputType: 'enterName'
}

const screenReducer = (state, action) => {
  switch (action.type) {
    case 'intro':
      return {
        messageShown: 'intro',
        inputType: 'enterName'
      }

    case 'intro-2':
      return {
        messageShown: 'intro2',
        inputType: 'itemRequest'
      }

    case 'item-select-success':
      return {
        messageShown: 'personalMemory',
        inputType: 'memoryRequest'
      }

    case 'item-get-success':
      return {
        messageShown: 'itemGetSuccess',
        inputType: 'itemRequest'
      }

    case 'item-get-fail':
      return {
        messageShown: 'itemGetFail',
        inputType: 'itemRequest'
      }

    case 'item-destroy-success':
      return {
        messageShown: 'itemDestroySuccess',
        inputType: 'itemRequest'
      }

    case 'item-destroy-fail':
      return {
        messageShown: 'itemDestroyFail',
        inputType: 'destroyConfirmation'
      }

    case 'inventory-to-receptacle':
      return {
        messageShown: 'itemMemories',
        inputType: 'destroyConfirmation'
      }

    case 'receptacle-to-inventory':
      return {
        messageShown: 'generalPrompt',
        inputType: 'itemRequest'
      }

    default:
      return state
  }
}

function Screen() {
  const [input, setInput] = useState('')
  const [screenState, screenDispatch] = useReducer(screenReducer, initialState)
  const { session, dispatch } = useContext(SessionContext)
  //dispatch an effect each time the session event changes
  useEffect(() => {
    screenDispatch({ type: session.event })
  }, [session.event])

  const logs = {
    intro: (
      <div>
        <p>Hello! Welcome to Vaults, the comprehensive, holistic solution to the world's post-apocalyptic needs!</p>
        <p>You have been assigned Room #1375. It's pretty sparse right now, but we'll help you make it yours in no time!</p>
        <p>But let's not get ahead of ourselves, we have to get you set up first. We just need one thing: what is your name?</p>
        <p>Enter your name in the console below:</p>
      </div>
    ),
    intro2: (
      <div>
        <p>Cool! Nice to meet you, {session.playerName}!</p>
        <p>Well, that's all we need from you right now! We hope you have a great time at Vaults!</p>
        <p>We recommend you start by decorating your room. You can type in any item you'd like to put in your room, and get one materialized into your room ASAP!</p>
        <p>Please inform yourself now of Vaults' new <em>ANTI-HOARDING POLICY:</em> we encourage you to only materialize objects that you have a personal connection with. As such, we will ask you to share your most sincere and heartfelt memory with the object you desire.</p>
        <p>Additionally, please inform yourself now of Vaults' new <em>READING MATERIAL INITIATIVE:</em> You may place any object in your room back on the materializer to get a list of all your neighbors' profound memories with said object! You can also use the same materializer to send back objects you don't like anymore. Hoarding is bad!</p>
        <p>With all that in mind, let's get started. Type in any object you desire into the console, anything at all!</p>
        <p></p>
      </div>
    ),
    personalMemory: (
      <div>
        <p>You're on track to receive a {session.selectedItem.name}.</p>
        <p>First, please share the most profound, salient memory you have with this object. Please don't make up any memories. We'll know.</p>
      </div>
    ),
    itemGetSuccess: (
      <div>
        <p>
          Here's your brand new {session.receptacle.name}! Use it in good health.
        </p>
      </div>
    ),
    itemGetFail: (
      <div>
        <p>Oops, it seems the item you requested isn't in stock. Are you sure that it's a real thing? Yeah? Well our stock is always growing and developing, so please check back again in a few years! In the meantime, may we interest you in anything else?</p>
      </div>
    ),
    itemDestroySuccess: (
      <div>
        <p>Done! Now replace that shit with something new!</p>
      </div>
    ),
    itemDestroyFail: (
      <div>
        <p>Oops, that seems to be the wrong command. Did you mean to write DESTROY? If you don't want to send this object away yet, just take it off of the materializer.</p>
      </div>
    ),
    generalPrompt: (
      <div>
        <p>Hey there, {session.playerName}, here for some new things for your room? Just type in what you need!</p>
        <p>Or if you're here to get rid of some of your stuff, that's cool! Nobody likes clutter. Just put the object you want to get rid of on the materializer below:</p>
      </div>
    ),
    itemMemories: (
      <div>
        <p>Here are the memories your neighbors left for this {session.receptacle.name}:</p>
        <p>/=================================================/</p>
        {session.receptacle.memories ?
          session.receptacle.memories.map((memory, index) =>
            (<p key={`${session.receptacle.name}-memory-${index}`}>
              {memory}
            </p>)
          ) :
          <p>[Doesn't look like there are any. Oh well.]</p>}
        <p>/=================================================/</p>
        <p>Would you like to send away this item so that others may enjoy it? If so, just type in "DESTROY". Otherwise, please keep objects off of the materializer if you're not using them. It's not an end table.</p>
      </div>
    ),
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    let entry = input;
    const item = session.itemCatalog.find(item => item.name === entry.toLowerCase());
    setInput('')

    if (input) {
      switch (screenState.inputType) {
        case 'enterName':
          dispatch({ type: 'SET_NAME', name: input })
          return false

        case 'itemRequest':
          if (item) {
            dispatch({ type: 'SELECT_ITEM', item })
          } else {
            screenDispatch({ type: 'item-get-fail', item })
          }
          return false

        case 'memoryRequest':
          ItemCatalog.put(session.selectedItem.id, { item: session.selectedItem, memory: input }).then(response => {
            console.log(response.data)
            dispatch({ type: 'GENERATE_ITEM', item: response.data })
          })

          return false

        case 'destroyConfirmation':
          if (entry.toLowerCase() === "destroy") {
            dispatch({ type: 'DESTROY_ITEM' })
          } else {
            screenDispatch({ type: 'item-destroy-fail' })
          }
          return false

        default:
          return false
      }
    }
  }

  return (
    <div id="screen">
      <div id="log">{logs[screenState.messageShown]}</div>
      <form onSubmit={handleSubmit}>
        <p>>></p>
        <input autoFocus type="text" value={input} onChange={(e) => { setInput(e.target.value) }} />

      </form>
    </div>
  )
}

export default Screen
