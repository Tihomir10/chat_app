import { Link } from 'react-router-dom'

export const ActiveUsers = ({ users }) => {

  const renderedUsers = users.map(user => {
    let indicator 
    if (user.newMessages) {
      indicator = <div id='indicator'></div>
    }
    return (
      <li key={user.id}>
        <Link to={`/chat/${user.id}`}>
          <span>{user.name}</span> 
          {indicator}
        </Link>
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
