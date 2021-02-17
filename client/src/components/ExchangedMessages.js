function ExchangedMessages(props) {
  return (props.messages.map(msg => {
    return (
      <div>
        {msg.sender}: {msg.text}
      </div>
    )
  }))
}

export default ExchangedMessages;