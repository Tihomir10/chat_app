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

  const [ currentChat, setCurrentChat ] = useState([]);

  //Set username
  const handleChange = (event) => {
    if (event.target.name === 'username' && event.target.value.length < 4) {
      setUser({inputError: 'Username must be 4 characters or longer'});
    } else if (event.target.name === 'username') {
      setUser({inputError: '', [event.target.name]: event.target.value});
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
    var receiverUsername = event.target.id;
    var chatName = receiverUsername + user.senderUsername;
    chatName = chatName.split('').sort().join('');
    //Check if caht with same name exists
    for(var i = 0; i < chat.length; i++) {
      if (chat[i].chatName == chatName) {
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
    var chatName = event.target.className;
    var obj = chat.filter(obj => obj.chatName === chatName);
    obj = obj[0]
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
    mapAndUpdateChat(message);
    socket.emit('private message', message);
    setMessage({...message, text: ''})
    event.preventDefault();
  };

  socket.on('message', receivedMessage => {
    if (!chat.length) {
      setChat([...chat, {
        chatName: receivedMessage.chatName, receiverID: receivedMessage.senderID, senderUsername: user.senderUsername, messages: [receivedMessage]
      }]); 
      setCurrentChat([{chatName: receivedMessage.chatName, receiverID: receivedMessage.senderID, senderUsername: user.senderUsername, messages: [receivedMessage]}])
      return
    }
    mapAndUpdateChat(receivedMessage);
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
        updateMessageForSending={updateMessageForSending}
        currentChat={currentChat}
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