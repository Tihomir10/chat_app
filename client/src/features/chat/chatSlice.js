import { createSlice } from '@reduxjs/toolkit'
import socket from '../../socket'

const initialState = {
  listOfUsers: [],
  chats: [],
  chatBuddy: null,
  status: 'idle',
  errorMsg: null
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectedChatBuddy(state, action) {
      state.chatBuddy = action.payload
    },
    sendMessage(state, action) {
      const { chatName, id, messages } = action.payload
      socket.emit('private message', {chatName, id, messages})
    },
    receiveMessage(state, action) {
      if (Object.keys(action.payload.currentUser).length < 1) {
        return
      }
      
      const { content, currentUser } = action.payload
      const { chatName, messages} = content
      const { senderName } = messages[0]

      if ((!state.chatBuddy && currentUser.name !== senderName) || (state.chatBuddy.name !== senderName)) {
        for (var j = 0; j < state.listOfUsers.length; j++) {
          if (state.listOfUsers[j].name === senderName) {
            state.listOfUsers[j].newMessages = true
          }
        }
      }

      const chat = state.chats.find(chat => {
        return chat.chatName === chatName
      })
      if(chat) {
        chat.messages.push(messages[0])
        return
      } 

      state.chats.push(action.payload.content)
    },
    setUsers(state, action) {
      state.listOfUsers = action.payload
    }, 
    setReadMessage(state, action) {
      for (var i = 0; i < state.listOfUsers.length; i++) {
        if (state.listOfUsers[i].name === action.payload.name) {
          state.listOfUsers[i].newMessages = false
        }
      }
    }
  }
})

export const { selectedChatBuddy, sendMessage, receiveMessage, setUsers, setReadMessage } = chatSlice.actions

export const selectListOfUsers = state => state.chat.listOfUsers

export const selectChatBuddy = state => state.chat.chatBuddy

export const selectUserById = (state, id) => 
  state.chat.listOfUsers.find(user => user.id === id)

export const selectChatByChatName = (state, chatName) =>
  state.chat.chats.find(chat => chat.chatName === chatName)

export default chatSlice.reducer