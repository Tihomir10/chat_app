function ChatHistory(props) {
  var i = 0;
  return (props.messages.map(msg => {
    i = i + 1
    return (
      <div key={i} className='messages'>
        {msg.sender}: {msg.text}
      </div>
    )
  }))
}

export default ChatHistory;