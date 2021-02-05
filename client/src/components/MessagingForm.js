function MessagingForm(props) {
  return (
    <form>
      <input name='userID' value={props.userID} className='userIdInput' />
      <input name='message' placeholder='Type...' />
      <input type='submit' value='Send' />
    </form>
  )
}

export default MessagingForm;