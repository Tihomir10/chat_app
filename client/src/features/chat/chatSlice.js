import { createSlice } from '@reduxjs/toolkit'
import socket from '../../socket'

const initialState = {
  chats: [],
  chatBuddy: {},
  status: 'idle',
  errorMsg: null
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectedChatBuddy(state, action) {
      const { chatBuddy } = action.payload
      state.chatBuddy = chatBuddy
    },
    sendMessage(state, action) {
      const { id, message } = action.payload
      socket.emit('private message', {id, message})
    }
  }
})

export const { selectedChatBuddy, sendMessage } = chatSlice.actions

export default chatSlice.reducer