function Users(props) {

  const getSocketId = (event) => {
    var user = props.users.find(obj => obj.name === event.target.id);
    var userID = user.userID;
  };

  return (
    <div>
      <div className='users'>
        <h4>Users online:</h4>
        <ul>
          {props.users.map(user => {
            return (
              <li onClick={getSocketId} id={user.name} key={user.userID}>{user.name}</li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Users;