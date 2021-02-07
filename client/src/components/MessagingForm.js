function MessagingForm(props) {
  return (
    <div>
      <form onSubmit={props.handleSentMessage}>
        <input name='message' placeholder='Type...' onChange={props.handleChange} />
        <input type='submit' value='Send' />
      </form>
    </div>
  )
}

export default MessagingForm;