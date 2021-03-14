import React, { useState } from 'react'

export const ChatForm = () => {
  const [message, setMessage] = useState('')

  const onMessageChanged = e => setMessage(e.target.value)

  return (
    <form className='messaging-form' onSubmit={onSubmitButtonClicked}>
      <input id='message' name='message' value={message} onChange={onMessageChanged}/>
      <input id='submit-msg' type='submit' value='Send'/>
    </form>
  )
}