import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chats: [],
  status: 'idle',
  errorMsg: null
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {}
})

export default chatSlice.reducer