function MessagingForm(props) {
  return (
    <div>
      <form onSubmit={props.handleSentMessage} onClick={props.getReceiverID}>
        <input  name='message' placeholder='Type...' onChange={props.handleChange} />
        <input id={props.chatName} type='submit' value='Send' />
      </form>
    </div>
  )
}

export default MessagingForm;