import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectChatByChatName, setReadMessage } from './chatSlice'

export const ChatHistory = ({ chatName, chatBuddy }) => {
  const dispatch = useDispatch()
  const chat = useSelector(state => selectChatByChatName(state, chatName))
  
  useEffect(() => {
    dispatch(setReadMessage(chatBuddy))
  }, [chatBuddy, dispatch])

  if (chat) {
    return (
      <ul>
        {chat.messages.map((msg, index) => {
          return(
            <li key={index}>{msg.senderName}: {msg.message}</li>
          )
        })}
      </ul>
    )
  }

  return (
    <div>
      Messages
    </div>
  )
}