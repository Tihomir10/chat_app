function UsersList(props) {
  return (
    <div className='users'>
      <h4>Users online:</h4>
      <ul>
        {props.listOfUsers.map(user => {
          return (
            <li onClick={props.createChat} id={user.name} key={user.userID}>{user.name}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default UsersList;