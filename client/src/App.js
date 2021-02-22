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

  const [ currentChat, setCurrentChat ] = useState([{chatName: '', receiverID: '', senderUsername: '', messages: []}]);

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

  //Create chat object for two users
  const createChat = (event) => {
    if (currentChat[0].chatName) {
      setChat(chat.map(chatObj => {
        if (chatObj.chatName === currentChat[0].chatName) {
          return {...chatObj, messages: currentChat[0].messages}
        }
        return chatObj;
      }));;
    }

    var receiverUsername = event.target.id;
    var chatName = receiverUsername + user.senderUsername;
    chatName = chatName.split('').sort().join('');

    //Check if chat with same name exists
    for(var i = 0; i < chat.length; i++) {
      if (chat[i].chatName === chatName) {
        setCurrentChat([chat[i]])
        return;
      }
    }

    var receiverUser = listOfUsers.find(obj => obj.name === event.target.id);
    var receiverID = receiverUser.userID;

    if (receiverID === user.senderID) {
      return
    }

    setChat([...chat, {
      chatName, receiverID, senderUsername: user.senderUsername, messages: []
    }]); 
    setCurrentChat([{ chatName, receiverID, senderUsername: user.senderUsername, messages: []}])
  };

  const updateMessageForSending = (event) => {
    var obj = currentChat[0]
    setMessage({...message, chatName: obj.chatName, receiverID: obj.receiverID, sender: user.senderUsername, senderID: user.senderID})
  }

  const mapAndUpdateChat = (msg) => {
    setChat(chat.map(chatObj => {
      if (chatObj.chatName === msg.chatName) {
        setCurrentChat([{...chatObj, messages: [...chatObj.messages, msg]}])
        return {...chatObj, messages: [...chatObj.messages, msg]}
      }
      return chatObj;
    }));
  }

  const handleSentMessage = (event) => {
    if (!currentChat[0].messages) {
      console.log('here')
      setCurrentChat([{...currentChat[0], messages: [message]}])
    } else {
      setCurrentChat([{...currentChat[0], messages: [...currentChat[0].messages, message]}])
    }
    
    socket.emit('private message', message);
    setMessage({...message, text: ''})
    event.preventDefault();
  };

  socket.on('message', receivedMessage => {
    if (!currentChat[0].messages) {
      setCurrentChat([{chatName: receivedMessage.chatName, receiverID: receivedMessage.senderID, senderUsername: user.senderUsername, messages: [receivedMessage]}])
      return
    }
    setCurrentChat([{chatName: receivedMessage.chatName, receiverID: receivedMessage.senderID, senderUsername: user.senderUsername, messages: [...currentChat[0].messages, receivedMessage]}])
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
          chat={currentChat[0]}
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