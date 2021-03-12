import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/user/currentUserSlice'
import listOfUsersReducer from '../features/listOfUsers/listOfUsersSlice'
import chatReducer from '../features/chat/chatSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    listOfUsers: listOfUsersReducer,
    chat: chatReducer
  }
})