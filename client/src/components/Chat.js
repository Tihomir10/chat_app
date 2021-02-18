import MessagingForm from './MessagingForm';
import UsersList from './UsersList';
import ExchangedMessages from './ExchangedMessages'

function Chat(props) {
  return (
    <div className='container-fluid'>
      <UsersList 
        listOfUsers={props.listOfUsers}
        createChat={props.createChat}
      />
      {props.currentChat.map(user => {
        return (
          <div className='chats'>
            <ExchangedMessages messages={user.messages} />
            <MessagingForm 
              handleChange={props.handleChange}
              handleSentMessage={props.handleSentMessage}
              chatName={user.chatName}
              message={props.message}
              updateMessageForSending={props.updateMessageForSending}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Chat;