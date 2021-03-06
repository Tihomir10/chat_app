import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { registerUser } from '../../api/index'

const initialState = []

export const postUser = createAsyncThunk('user/fetchUser', async (data) => {
  const response = await registerUser(data)
  console.log('im fetching', response)
})

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