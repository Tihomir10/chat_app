import { useState } from 'react'
import { io } from 'socket.io-client';

import LoginForm from './components/user/LoginForm';
import ActiveUsers from './components/activeUsers/AcitveUsers';
import Chat from './components/chat/Chat';

const socket = io('http://localhost:4001', { transports: ['websocket']});

function App() {
  const [ user, setUser ] = useState({sent: false});

  const [ listOfUsers, setListOfUsers ] = useState([]);

  const [ message, setMessage ] = useState({text: '', receiverID: ''});

  const [ chat, setChat ] = useState([]);

  const [ currentChat, setCurrentChat ] = useState({chatName: '', receiverID: '', senderUsername: '', messages: []});

  //Set username
  const handleChange = (event) => {
    if (event.target.name === 'username') {
      setUser({[event.target.name]: event.target.value});
    } 

    if (event.target.name === 'message') {
      setMessage({...message,
        text: event.target.value
      });
    }
  }

  //Send username to check availability and save
  const sendUsername = (event) => {
    if (user.username) {
      socket.emit('newUser', user.username);
    }
    event.preventDefault();
  }

  socket.on('usernameTaken', err => {
    setUser({inputError: err})
  });

  //Receive list of users and current user after username submit
  socket.on('listOfUsers', data => {
    setListOfUsers(data.users);
    setUser({senderUsername: data.user.name, senderID: data.user.userID, sent: true})
  });

  const checkForChatObjectByName = (chatname) => {
    for(var i = 0; i < chat.length; i++) {
      if (chat[i].chatName === chatname) {
        setCurrentChat(chat[i])
        return;
      }
    }
  }

  const updateChatArray = (prevChat) => {
    if (chat.length && currentChat.chatName !== '') {
      if (chat.some(item => item.chatName === prevChat.chatName)) {
        setChat(chat.map(chatObj => {
          if (chatObj.chatName === prevChat.chatName) {
            return prevChat;
          }
          return chatObj;
        }));
      } else {
        setChat([...chat, prevChat])
      }
    }
  }

  //Create chat object
  const createChat = (event) => {
    var prevChat = currentChat;
    var receiverUsername = event.target.id;
    var chatName = receiverUsername + user.senderUsername;
    chatName = chatName.split('').sort().join('');
    var receiverUser = listOfUsers.find(obj => obj.name === event.target.id);
    var receiverID = receiverUser.userID;

    //If clicked chat is already open or user wants to send chat to himself
    if (prevChat.chatName === chatName || receiverID === user.senderID) {
      return
    }

    setCurrentChat({ chatName, receiverID, senderUsername: user.senderUsername, messages: []})

    if (!chat.length && currentChat.chatName !== '') {
      setChat([prevChat])
    }

    updateChatArray(prevChat);
    checkForChatObjectByName(chatName);
  };

  const updateMessageForSending = (event) => {
    var obj = currentChat
    setMessage({...message, chatName: obj.chatName, receiverID: obj.receiverID, sender: user.senderUsername, senderID: user.senderID})
  }

  const handleSentMessage = (event) => {
    event.preventDefault();
    if (!message.text) {
      return
    }
    setCurrentChat({...currentChat, messages: [...currentChat.messages, message]})
    socket.emit('private message', message);
    setMessage({...message, text: ''})
  };

  socket.on('message', receivedMessage => {
    if (!currentChat.messages) {
      setCurrentChat({chatName: receivedMessage.chatName, receiverID: receivedMessage.senderID, senderUsername: user.senderUsername, messages: [receivedMessage]})
      return
    }
    setCurrentChat({chatName: receivedMessage.chatName, receiverID: receivedMessage.senderID, senderUsername: user.senderUsername, messages: [...currentChat.messages, receivedMessage]})
  });

  if (user.sent) {
    return (
      <div className='container-fluid'>
        <ActiveUsers 
          listOfUsers={listOfUsers} 
          createChat={createChat}
        />
        <Chat 
          handleChange={handleChange}
          chat={currentChat}
          handleSentMessage={handleSentMessage}
          updateMessageForSending={updateMessageForSending}
        />
      </div>
    )
  }

  return (
    <LoginForm 
      handleChange={handleChange}
      sendUsername={sendUsername}
      inputError={user.inputError}
    />
  );
}

export default App;