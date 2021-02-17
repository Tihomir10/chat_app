import MessagingForm from './MessagingForm';
import UsersList from './UsersList';
import ExchangedMessages from './ExchangedMessages'

function Chat(props) {
  return (
    <div>
      <UsersList 
        listOfUsers={props.listOfUsers}
        createChat={props.createChat}
      />
      <div className='chats'>
        {props.chat.map(user => {
          return (
            <div>
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
    </div>
  )
}

export default Chat;