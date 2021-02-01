import { useState } from 'react'
import { io } from 'socket.io-client';

import Form from './components/Form';
import Users from './components/Users';

const socket = io('http://localhost:4001', { transports: ['websocket']});

function App() {
  const [ user, setUser ] = useState({inputError: ''});

  const [ sentMessage, setSentMessage ]  = useState({});

  const [ submit, setSubmit ] = useState(false);

  const [ listOfUsers, setListOfUsers ] = useState({});

  const [ receivedMessage, setReceivedMessage ] = useState({username: '', message: ''});


  //Receive list of users
  socket.on('loggedUser', loggedUsers => {
    setListOfUsers(loggedUsers);
    setSubmit(true);
  });


  //Receiving a private message
  socket.on('message', msg => {
    console.log(msg)
    setReceivedMessage(msg)
  });

  //Sending a private message
  const handleSentMessage = (event) => {
    socket.emit('private message', sentMessage);
    event.preventDefault();
  }

  //Create user 
  const handleChange = (event) => {
    if (event.target.name === 'username' && event.target.value.length < 4) {
      setUser({inputError: 'Username must be 4 characters or longer'});
    } else if (event.target.name === 'username') {
      setUser({inputError: '', [event.target.name]: event.target.value});
    }
    setSentMessage({...sentMessage, [event.target.name]: event.target.value})
  }

  const sendUsername = (event) => {
    if (user.username) {
      socket.emit('newUser', user.username);
    }
    event.preventDefault();
  }

  //Display users if user is submited
  if (submit) {
    return (
      <Users 
        users={listOfUsers} 
        handleChange={handleChange}
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
        inputError={user.inputError}
      />
    </div>
  );
}

export default App;
