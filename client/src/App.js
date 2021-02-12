import { useState } from 'react'
import { io } from 'socket.io-client';

import Form from './components/Form';
import Chat from './components/Chat';

const socket = io('http://localhost:4001', { transports: ['websocket']});

function App() {
  const [ user, setUser ] = useState({inputError: '', sent: false});

  const [ listOfUsers, setListOfUsers ] = useState([]);

  const [ message, setMessage ] = useState({text: '', receiverID: ''});

  const [ chat, setChat ] = useState([]);

  //Set username
  const handleChange = (event) => {
    if (event.target.name === 'username' && event.target.value.length < 4) {
      setUser({inputError: 'Username must be 4 characters or longer'});
    } else if (event.target.name === 'username') {
      setUser({inputError: '', [event.target.name]: event.target.value});
    }
    if (event.target.name === 'message') {
      setMessage({...message,
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
    //Check if caht with same name exists
    for(var i = 0; i < chat.length; i++) {
      if (chat[i].chatName == receiverID) {
          break;
      }
      return
    }

    var receiverUser = listOfUsers.find(obj => obj.name === event.target.id);
    var receiverID = receiverUser.userID;
    var receiverUsername = receiverUser.name;
    var chatName = receiverID + user.senderID;
    chatName = chatName.split('').sort().join('');;

    setChat([...chat, {
      chatName, receiverID, receiverUsername, senderID: user.senderID, senderUsername: user.senderUsername, messages: []
    }]); 
  };

  const getReceiverID = (event) => {
    setMessage({...message, receiverID: event.target.id})
  }

  const handleSentMessage = (event) => {
    setChat(chat.map(chatObj => {
      if (chatObj.chatName === event.target.name) {
        return {...chatObj, messages: [...chatObj.messages, message]}
      }
      return chatObj;
    }));

    socket.emit('private message', message);
    event.preventDefault();
  };

  socket.on('message', receivedMessage => {
    console.log(receivedMessage)
    setMessage({text: '', receiverID: ''})
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
        getReceiverID={getReceiverID}
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
