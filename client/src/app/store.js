import { configureStore } from '@reduxjs/toolkit'

import usersReducer from '../features/user/usersSlice'

export default configureStore({
  reducer: {
    users: usersReducer
  }
})