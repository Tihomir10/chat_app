import { useState } from 'react'
import { io } from 'socket.io-client';

import Form from './components/Form';
import Chat from './components/Chat';

const socket = io('http://localhost:4001', { transports: ['websocket']});

function App() {
  const [ user, setUser ] = useState({inputError: '', sent: false});

  const [ listOfUsers, setListOfUsers ] = useState([]);

  const [ message, setMessage ] = useState({text: ''});

  const [ chat, setChat ] = useState([]);

  //Set username
  const handleChange = (event) => {
    if (event.target.name === 'username' && event.target.value.length < 4) {
      setUser({inputError: 'Username must be 4 characters or longer'});
    } else if (event.target.name === 'username') {
      setUser({inputError: '', [event.target.name]: event.target.value});
    }
    if (event.target.name === 'message') {
      setMessage({
        text: event.target.value,
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
    var receiverUser = listOfUsers.find(obj => obj.name === event.target.id);
    var receiverID = receiverUser.userID;
    var receiverUsername = receiverUser.name;
    var chatName = receiverID + user.senderID;
    chatName = chatName.split('').sort().join('');;

    //CHECK IF CHAT WITH SAME NAME EXiSTS

    setChat([...chat, {
      chatName, receiverID, receiverUsername, senderID: user.senderID, senderUsername: user.senderUsername, messages: []
    }]); 
  };

  const handleSentMessage = (event) => {
    event.preventDefault();

    setChat(chat.map(chatObj => {
      if (chatObj.chatName === event.target.name) {
        setMessage({...message, receiverID: chatObj.receiverID})
        return {...chatObj, messages: [...chatObj.messages, message]}
      }
      return chatObj;
    }));
    
    socket.emit('private message', message)
  };

  socket.on('message', receivedMessage => {
    console.log('got message',receivedMessage)
    setMessage({...message, receivedMessage})
  });

  if (user.sent) {
    return (
      <Chat 
        listOfUsers={listOfUsers} 
        handleChange={handleChange}
        message={message}
        chat={chat}
        createChat={createChat}
        handleSentMessage={handleSentMessage}
      />
    )
  }

  return (
    <div id="center">
      <Form 
        handleChange={handleChange}
        sendUsername={sendUsername}
        inputError={user.inputError}
      />
    </div>
  );
}

export default App;
