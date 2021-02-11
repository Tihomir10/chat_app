import MessagingForm from './MessagingForm';
import UsersList from './UsersList'

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
              <MessagingForm 
                receiverID={user.receiverID} 
                receiverUsername={user.receiverUsername}
                handleChange={props.handleChange}
                handleSentMessage={props.handleSentMessage}
                chatName={user.chatName}
                getReceiverID={props.getReceiverID}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Chat;