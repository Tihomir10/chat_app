import { Link } from 'react-router-dom'

export const ListOfUsers = ({ users }) => {  
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