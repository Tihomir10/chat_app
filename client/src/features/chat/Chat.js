import { Link } from 'react-router-dom'

import { ChatForm } from './ChatForm'
import { ChatHistory } from './ChatHistory'

export const Chat = () => {
  return (
    <div className='chats'>
      <Link to='/chat'>Back to Chat</Link>
      <ChatForm />
      <ChatHistory />      
    </div>
  )
}