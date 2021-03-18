import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useEffect } from 'react'

import { selectedChatBuddy, receiveMessage, selectUserById, setUsers, selectListOfUsers, selectChatById } from './chatSlice'
import socket from '../../socket'

import { ChatForm } from './ChatForm'
import { ChatHistory } from './ChatHistory'
import { ActiveUsers } from './ActiveUsers'

export const Chat = ({ match }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = match.params

  const users = useSelector(selectListOfUsers) 
  const chatBuddy = useSelector(state => selectUserById(state, id))

  
  const currentUser = useSelector(state => state.user.currentUser)
  let chatName

  if (chatBuddy) {
    dispatch(selectedChatBuddy(chatBuddy))
    chatName = (currentUser.name + chatBuddy.name).split('').sort().join('')
  }

  useEffect(() => {
    socket.on('users', users => {
      dispatch(setUsers(users))
    })

    socket.on('private message', content => {
      dispatch(receiveMessage(content))
    })
  }, [])

    
  if (id && !chatBuddy) {
    history.push('/')
  }

  if (!chatBuddy) {
    return (
      <div className='users'>
        <ActiveUsers users={users} />
      </div>
    )
  }

  return (
    <div className='chats'>
      <Link to='/chat'>Back to Chat</Link>
      <h4>Talking to {chatBuddy.name}</h4>
      <ChatForm id={id} chatName={chatName} senderName={currentUser.name} />
      <ChatHistory id={id} chatName={chatName} />      
    </div>
  )
}