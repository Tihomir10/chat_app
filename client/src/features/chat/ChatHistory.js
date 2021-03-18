import React from 'react'
import { useSelector } from 'react-redux'

import { selectChatByChatName } from './chatSlice'

export const ChatHistory = ({ chatName }) => {
  const chat = useSelector(state => selectChatByChatName(state, chatName))
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