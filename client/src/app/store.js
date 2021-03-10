import { configureStore } from '@reduxjs/toolkit'

import usersReducer from '../features/user/currentUserSlice'

export default configureStore({
  reducer: {
    user: usersReducer
  }
})