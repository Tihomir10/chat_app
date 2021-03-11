import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { callGetUsers } from '../../api'

const initialState = {
  listOfUsers: [],
  status: 'idle',
  errorMsg: null
}

export const fetchUsers = createAsyncThunk('listOfUsers', async () => {
  const response = await callGetUsers()
  return response
})

const listOfUsersSlice = createSlice({
  name: 'listOfUsers',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.rejected]: (state, action) => {
      state.status = 'error'
      state.errorMsg = action.payload
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'success'
      state.listOfUsers = (action.payload)
    }
  }
})

export const selectListOfUsers = state => state.listOfUsers.listOfUsers

export default listOfUsersSlice.reducer