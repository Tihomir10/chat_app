import { createSlice } from '@reduxjs/toolkit'

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
    }
  }
})

export const { selectedChatBuddy } = chatSlice.actions

export default chatSlice.reducer