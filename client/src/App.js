import { useState } from 'react'
import { io } from 'socket.io-client';

const socket = io('http://localhost:4001', { transports: ['websocket']});

function App() {
  socket.on('connect', () => {
    console.log('Connected')
  });
  
  socket.on('disconnect', () => {
    console.log('disconnected')
  })
  
  const [ msg, setMsg ] = useState('');

  const handleChange = (event) => {
    setMsg(event.target.value)
  }

  const submit = (event) => {
    event.preventDefault();
    if (msg !== '') {
      socket.emit('message', msg);
      setMsg('');
    }  
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input type='text' name='message' value={msg} onChange={handleChange} />
        <input type='submit' />
      </form>
    </div>
  );
}

export default App;
