import { useState } from 'react'
import { io } from 'socket.io-client';

import Form from './components/Form'

const socket = io('http://localhost:4001', { transports: ['websocket']});

function App() {
  socket.on('connect', () => {
    console.log('Connected')
  });
  
  socket.on('disconnect', () => {
    console.log('disconnected')
  })

  return (
    <div id="center">
      <Form />
    </div>
  );
}

export default App;
