import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

export const fetchUser = createAsyncThunk('user/fetchUser', async (data) => {
  const response = await axios.post('http://localhost:4001/api/register', data)
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