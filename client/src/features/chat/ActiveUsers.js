import { Link } from 'react-router-dom'

import { setUsers, selectListOfUsers } from '../listOfUsers/listOfUsersSlice'

import socket from '../../socket';

export const ActiveUsers = ({ users }) => {

  const renderedUsers = users.map(user => {
    return (
      <li key={user.id}>
        <Link to={`/chat/${user.id}`}>{user.name}</Link>
      </li>
    )
  })

  return (
    <ul>
      <h4>Users online:</h4>
      {renderedUsers}
    </ul>
  )
}
