import { io } from 'socket.io-client';

const socket = io('http://localhost:4001', { transports: ['websocket']});

socket.on('connect', () => {
  console.log('Connected')
});

socket.on('disconnect', () => {
  console.log('disconnected')
})

function App() {
  return (
    <div>
      Chat App
    </div>
  );
}

export default App;
