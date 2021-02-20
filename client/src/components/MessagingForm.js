function MessagingForm(props) {
  return (
    <div>
      <form className='messaging-form' onSubmit={props.handleSentMessage}>
        <input id='message' name='message' className={props.chatName} onClick={props.updateMessageForSending} onChange={props.handleChange} />
        <input className={props.chatName} type='submit' value='Send' />
    </form>
    </div>
  )
}

export default MessagingForm;