import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import socket from '../../socket'
import { loginUser } from './currentUserSlice'

export const LoginForm = () => {
  const dipatch = useDispatch();
  const errorMsg = useSelector(state => state.user.errorMsg)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)

  const onLoginButtonClicked = () => {
    if (username && password) {
      dipatch(loginUser({username, password}))
      socket.auth = { username }
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
      <div className='err-msg'>{errorMsg}</div>
      <button type="submit"  className="btn btn-primary" onClick={onLoginButtonClicked} disabled={!canLogin} >Login</button>
      <div><Link to='/register'>Don't have an account?</Link></div>
    </form>
  )
}