import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { history } from '../../history'
import { callRegisterUser, callLoginUser } from '../../api'

const initialState = {
  currentUser: {},
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers : {
  [registerUser.rejected]: (state, action) => {
    state.errorMsg = action.payload;
    state.status = "error"
  },
  [registerUser.fulfilled]: (state, action) => {
    state.status = 'success'
    switch(action.payload.code) {
      case 201:
        state.currentUser = action.payload
        history.push(action.payload.redirectUrl)
        break
      default:
        state.errorMsg = action.payload
    }
  },
  [loginUser.rejected]: (state, action) => {
    state.errorMsg = action.payload
    state.status = 'error'
  },
  [loginUser.fulfilled]: (state, action) => {
    state.status = 'success'
    switch(action.payload.code) {
      case 201:
        state.currentUser = action.payload
        history.push(action.payload.redirectUrl)
        break
      default:
        state.errorMsg = action.payload
    }
  }
  }
})

export const { userRegistered, userAdded } = userSlice.actions

export default userSlice.reducer