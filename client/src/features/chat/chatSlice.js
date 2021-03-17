import { createSlice } from '@reduxjs/toolkit'
import socket from '../../socket'

const initialState = {
  chats: [],
  chatBuddy: {},
  listOfUsers: [],
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
      const { id, message } = action.payload
      socket.emit('private message', {id, message})
    },
    receiveMessage(state, action) {
      for(var i = 0; i < state.chats.length; i++) {
        if (state.chats[i].senderName == action.payload.senderName) {
          state.chats[i].messages = state.chats[i].messages.concat(action.payload.messages[0])
          return;
        }
      }
      state.chats.push(action.payload)
    },
    setUsers(state, action) {
      state.listOfUsers = action.payload
    }
  }
})

export const { selectedChatBuddy, sendMessage, receiveMessage, setUsers } = chatSlice.actions

export const selectListOfUsers = state => state.chat.listOfUsers

export const selectUserById = (state, id) => 
  state.chat.listOfUsers.find(user => user.id === id)

export const selectChatById = (state, id) =>
  state.chat.chats.find(chat => chat.from === id)

export default chatSlice.reducer