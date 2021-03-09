import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { history } from '../..//history'
import { registerUser } from '../../api'

const initialState = {
  currentUser: [],
  status: "idle",
  errorMsg: null
}

export const postUser = createAsyncThunk('user/fetchUser', async (data) => {
  const response = await registerUser(data)
  return response
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers : {
  [postUser.rejected]: (state, action) => {
    state.errorMsg = action.payload;
    state.status = "error"
  },
  [postUser.fulfilled]: (state, action) => {
    state.status = 'success'
    const { name, userId } = action.payload
    state.currentUser.push(name, userId)
    history.push(action.payload.redirectUrl)
  }
  }
})

export const { userRegistered, userAdded } = usersSlice.actions

export default usersSlice.reducer