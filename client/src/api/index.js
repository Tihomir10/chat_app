import { post } from './api'

export const callRegisterUser = (data) => {
  return post('/api/register', data)
}

export const callLoginUser = (data) => {
  return post('/api/login', data)
}