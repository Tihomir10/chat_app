import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/user/currentUserSlice'
import listOfUsersReducer from '../features/listOfUsers/listOfUsersSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    listOfUsers: listOfUsersReducer
  }
})