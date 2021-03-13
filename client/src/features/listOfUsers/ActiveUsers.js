import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { fetchUsers, selectListOfUsers } from './listOfUsersSlice'

import { ListOfUsers } from './ListOfUsers';

export const ActiveUsers = () => {
  const users = useSelector(selectListOfUsers)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className='users'>
      <ListOfUsers users={users}/>
    </div>
  )
}
