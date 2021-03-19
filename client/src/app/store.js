import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/user/currentUserSlice'
import chatReducer from '../features/chat/chatSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer
  }
})