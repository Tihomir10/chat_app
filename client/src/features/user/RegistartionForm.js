function RegistrationForm() {
  return (
    <form className='center registration'>
      <label>Username</label>
      <input name='username' />
      <label>Password</label>
      <input name='password' />
      <label>Password Confirmation</label>
      <input name='passwordConfirmation' />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default RegistrationForm;