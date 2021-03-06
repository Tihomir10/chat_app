import { post } from './api'

export const registerUser = (data) => {
  return post('/api/register', data)
}