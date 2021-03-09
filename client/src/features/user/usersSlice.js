import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { history } from '../..//history'
import { callRegisterUser, callLoginUser } from '../../api'

const initialState = {
  currentUser: [],
  status: "idle",
  errorMsg: null
}

export const registerUser = createAsyncThunk('user/registerUser', async (data) => {
  const response = await callRegisterUser(data)
  return response
})

export const loginUser = createAsyncThunk('user/loginUser', async (data) => {
  const response = await callLoginUser(data)
  return response
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers : {
  [registerUser.rejected]: (state, action) => {
    state.errorMsg = action.payload;
    state.status = "error"
  },
  [registerUser.fulfilled]: (state, action) => {
    state.status = 'success'
    const { name, userId } = action.payload
    state.currentUser.push(name, userId)
    history.push(action.payload.redirectUrl)
  },
  [loginUser.rejected]: (state, action) => {
    state.errorMsg = action.payload
    state.status = 'error'
  },
  [loginUser.fulfilled]: (state, action) => {
    state.status = 'success'
    const { name, userId } = action.payload
    state.currentUser.push(name, userId)
    history.push(action.payload.redirectUrl)
  }
  }
})

export const { userRegistered, userAdded } = usersSlice.actions

export default usersSlice.reducer