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
  history.push(response.redirectUrl)
  return response
})

export const loginUser = createAsyncThunk('user/loginUser', async (data) => {
  const response = await callLoginUser(data)
  history.push(response.redirectUrl)
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
        break
      default:
        state.errorMsg = action.payload
    }
  }
  }
})

export default userSlice.reducer