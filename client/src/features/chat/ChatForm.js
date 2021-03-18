import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { sendMessage } from './chatSlice'

export const ChatForm = ({ id, chatName, senderName }) => {
  const dispatch = useDispatch()
  
  const [message, setMessage] = useState('')

  const onMessageChanged = e => setMessage(e.target.value)

  const onSubmitButtonClicked = (event) => {
    event.preventDefault()
    dispatch(sendMessage({chatName, id, messages: [{senderName, message}]}))
    setMessage('')
  } 

  return (
    <form className='messaging-form' onSubmit={onSubmitButtonClicked}>
      <input id='message' name='message' value={message} onChange={onMessageChanged}/>
      <input id='submit-msg' type='submit' value='Send'/>
    </form>
  )
}