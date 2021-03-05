function ChatForm(props) {
  return (
    <div>
      <form className='messaging-form' onSubmit={props.handleSentMessage}>
        <input id='message' name='message' value={props.text} className={props.chatName} onClick={props.updateMessageForSending} onChange={props.handleChange} />
        <input className={props.chatName} type='submit' value='Send' />
    </form>
    </div>
  )
}

export default ChatForm;