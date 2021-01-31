import { useState } from 'react'
import { io } from 'socket.io-client';

import Form from './components/Form';
import Users from './components/Users';

const socket = io('http://localhost:4001', { transports: ['websocket']});

function App() {
  const [ username, setUsername ] = useState();

  const [ inputError, setInputError ] = useState('');

  const [ submit, setSubmit ] = useState(false);

  const [ users, setUsers ] = useState({});

  const [ sendMsg, setSendMsg ] = useState(false);

  const [ message, setMessage ] = useState({});

  const [ receivedMessage, setReceivedMessage ] = useState('')

  socket.on('connect', () => {
    console.log('Connected')
  });
  
  socket.on('disconnect', () => {
    console.log('disconnected')
  })


  //Receive list of users
  socket.on('loggedUser', loggedUsers => {
    setUsers(loggedUsers);
    setSubmit(true);
  });


  //Receiving a private message
  socket.on('message', msg => {
    setReceivedMessage(msg)
  });

  //Sending a private message
  if (sendMsg) {
    socket.emit('private message', message);
    setSendMsg(false);
  }



  //Handling sending a private message
  const handleMessage = (event) => {
    setMessage({...message,
      [event.target.name]: event.target.value
    })
  }

  const handleSentMessage = (event) => {
    event.preventDefault()
    setSendMsg(true)
  }




  //Submiting a username
  const handleChange = (event) => {
    if (event.target.value.length < 4) {
      setInputError('Username must be 4 characters or longer');
    } else {
      setUsername(event.target.value);
      setInputError('');
    }
  }

  const sendUsername = (event) => {
    if (username) {
      socket.emit('newUser', username);
    }
    event.preventDefault();
  }


  //Display users if username is submited
  if (submit) {
    return (
      <Users 
        users={users} 
        handleMessage={handleMessage}
        receivedMessage={receivedMessage}
        handleSentMessage={handleSentMessage}
      />
    )
  }

  return (
    <div id="center">
      <Form 
        handleChange={handleChange}
        sendUsername={sendUsername}
        inputError={inputError}
      />
    </div>
  );
}

export default App;
