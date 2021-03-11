import { post, get } from './api'

export const callRegisterUser = (data) => {
  return post('/api/register', data)
}

export const callLoginUser = (data) => {
  return post('/api/login', data)
}

export const callGetUsers = () => {
  return get('/api/chat')
}