import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { registerUser } from './usersSlice'

export const RegistrationForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfiramtion] = useState('')

  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)
  const onPasswordConfirmationChanged = e => setPasswordConfiramtion(e.target.value)

  const onRegisterButtonClicked = () => {
    if (username && password && passwordConfirmation) {
      dispatch(registerUser({username, password}))
      setUsername('')
      setPassword('')
      setPasswordConfiramtion('')
    }
  }

  const canRegister = Boolean(username) && Boolean(password) && Boolean(password === passwordConfirmation)

  return (
    <form className='center registration'>
      <label htmlFor='username'>Username:</label>
      <input 
        name='username' 
        value={username}
        onChange={onUsernameChanged}
      />
      <label htmlFor='password'>Password:</label>
      <input 
        type='password'
        name='password' 
        value={password}
        onChange={onPasswordChanged}
      />
      <label htmlFor='passwordConfirmation'>Password Confirmation:</label>
      <input 
        type='password'
        name='passwordConfirmation' 
        value={passwordConfirmation}
        onChange={onPasswordConfirmationChanged}
      />
      <button type="submit" className="btn btn-primary" onClick={onRegisterButtonClicked} disabled={!canRegister}>Submit</button>
      <div><Link to='/login'>Already have an account?</Link></div>
    </form>
  )
}