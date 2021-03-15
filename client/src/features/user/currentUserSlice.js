import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { history } from '../../history'
import { callRegisterUser, callLoginUser } from '../../api'
import socket from '../../socket'

const initialState = {
  currentUser: {},
  status: "idle",
  errorMsg: null
}

export const registerUser = createAsyncThunk('user/registerUser', async (data) => {
  const response = await callRegisterUser(data)
  history.push('/chat')
  return response
})

export const loginUser = createAsyncThunk('user/loginUser', async (data) => {
  const response = await callLoginUser(data)
  socket.connect()
  history.push('/chat')
  return response
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers : {
  [registerUser.rejected]: (state, action) => {   
    state.status = "error"
    state.errorMsg = action.error.message
  },
  [registerUser.fulfilled]: (state, action) => {
    state.status = 'success'
    state.currentUser = action.payload
  },
  [loginUser.rejected]: (state, action) => {
    state.status = 'error'
    state.errorMsg = action.error.message
  },
  [loginUser.fulfilled]: (state, action) => {
    state.status = 'success'
    state.currentUser = action.payload
  }
  }
})

export default userSlice.reducer