import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { fetchUsers } from './listOfUsersSlice'

import { Heading } from './Heading'
import { ListOfUsers } from './ListOfUsers';

export const ActiveUsers = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  })
  
  return (
    <div className='users'>
      <Heading />
      <ListOfUsers />
    </div>
  )
}
