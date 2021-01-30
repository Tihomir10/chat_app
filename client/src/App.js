import { useState } from 'react'
import { io } from 'socket.io-client';

import Form from './components/Form'

const socket = io('http://localhost:4001', { transports: ['websocket']});

function App() {
  const [ username, setUsername ] = useState();

  const [ inputError, setInputError ] = useState('');

  const [ submit, setSubmit ] = useState(false)

  socket.on('connect', () => {
    console.log('Connected')
  });
  
  socket.on('disconnect', () => {
    console.log('disconnected')
  })

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
      setSubmit(true)
    }
    event.preventDefault();
  }

  if (submit) {
    return (
      <div>Hello {username}</div>
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
