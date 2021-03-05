import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userRegistered(state, action) {
      state.push(action.payload)
    },
    userAdded(state, action) {
      state.push(action.payload)
    }
  }
})

export const { userRegistered, userAdded } = usersSlice.actions

export default usersSlice.reducer