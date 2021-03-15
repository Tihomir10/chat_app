import { useDispatch, useSelector } from 'react-redux'

import { setUsers, selectListOfUsers } from './listOfUsersSlice'

import { ListOfUsers } from './ListOfUsers';
import socket from '../../socket';

export const ActiveUsers = () => {
  const users = useSelector(selectListOfUsers)
  const dispatch = useDispatch()
  socket.on('users', users => {
    dispatch(setUsers(users))
  })

  return (
    <div className='users'>
      <ListOfUsers users={users}/>
    </div>
  )
}
