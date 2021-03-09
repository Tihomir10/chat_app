import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { loginUser } from './usersSlice'

export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dipatch = useDispatch();

  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)

  const onLoginButtonClicked = () => {
    if (username && password) {
      dipatch(loginUser({username, password}))
      setUsername('')
      setPassword('')
    }
  }

  const canLogin = Boolean(username) && Boolean(password)

  return (
    <form className='center'>
      <div className="form-group">
        <label htmlFor='username'>Username:</label>
        <input 
          type='text' 
          name='username' 
          className="form-control" 
          value={username}
          onChange={onUsernameChanged}
        />
        <label htmlFor='password'>Password:</label>
        <input 
          type='password'
          name='password'
          className="form-control"
          value={password}
          onChange={onPasswordChanged}
        />
      </div>
      <button type="button"  className="btn btn-primary" onClick={onLoginButtonClicked} disabled={!canLogin} >Login</button>
    </form>
  )
}