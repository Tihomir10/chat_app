import Heading from './Heading'
import ListOfUsers from './ListOfUsers';

function ActiveUsers(props) {
  return (
    <div className='users'>
      <Heading />
      <ListOfUsers 
        createChat={props.createChat}
        listOfUsers={props.listOfUsers} 
      />
    </div>
  )
}

export default ActiveUsers;