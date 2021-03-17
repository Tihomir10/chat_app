import React from 'react'
import { useSelector } from 'react-redux'

import { selectChatById } from './chatSlice'

export const ChatHistory = ({ id }) => {
  const chat = useSelector(state => selectChatById(state, id))

  if (chat) {
    return (
      <ul>
        {chat.messages.map((msg, index) => {
          return(
            <li key={index}>{chat.senderName}: {msg}</li>
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