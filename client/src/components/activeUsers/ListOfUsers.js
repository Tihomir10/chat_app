function ListOfUsers(props) {
  return (
    <ul>
      {props.listOfUsers.map(user => {
        return (
          <li onClick={props.createChat} id={user.name} key={user.userID}>{user.name}</li>
        )
      })}
    </ul>
  )
}

export default ListOfUsers;