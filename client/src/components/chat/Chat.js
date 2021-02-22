import ChatForm from './ChatForm';
import ChatHistory from './ChatHistory'

function Chat(props) {
  if (props.chat.chatName) {
    return (
      <div className='chats'>
        <ChatHistory messages={props.chat.messages} />
        <ChatForm 
          chatName={props.chat.chatName}
          handleChange={props.handleChange}
          handleSentMessage={props.handleSentMessage}
          updateMessageForSending={props.updateMessageForSending}
        />
      </div>
    ) 
  }

  return (
    <div>
      Click on user to start messaging
    </div>
  )
}

export default Chat;