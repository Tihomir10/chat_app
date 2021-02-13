function MessagingForm(props) {
  return (
    <div>
      <form name={props.chatName} onSubmit={props.handleSentMessage} onClick={props.getReceiverID}>
        <input  name='message' placeholder='Type...' onChange={props.handleChange} />
        <input id={props.receiverID} type='submit' value='Send' />
      </form>
    </div>
  )
}

export default MessagingForm;