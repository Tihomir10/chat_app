import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectUserById } from '../listOfUsers/listOfUsersSlice'
import { selectedChatBuddy } from './chatSlice'

import { ChatForm } from './ChatForm'
import { ChatHistory } from './ChatHistory'

export const Chat = ({ match }) => {
  const dispatch = useDispatch()
  const { id } = match.params

  const chatBuddy = useSelector(state => selectUserById(state, id))

  if (chatBuddy) {
    dispatch(selectedChatBuddy({chatBuddy}))
  }

  if (!chatBuddy) {
    return (
      <div className='chats'>
        <Link to='/chat'>Back to Chat</Link>
        <h4>User not found</h4>
      </div>
    )
  }

  return (
    <div className='chats'>
      <Link to='/chat'>Back to Chat</Link>
      <h4>Talking to {chatBuddy.name}</h4>
      <ChatForm />
      <ChatHistory />      
    </div>
  )
}