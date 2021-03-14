import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4001'

export const post = async (resource, data = {}) => {
  const response = await axios.post(resource, data)

  if (response.status !== 200) {
    throw new Error('Something went wrong')
  } 
  if (response.data.code === 1) {
    return response.data.data
  } else {
    throw new Error(response.data.errorMessage)
  }
}

export const get = async (resource) => {
  const response = await axios.get(resource)

  if (response.status !== 200) {
    throw new Error('Something went wrong')
  }
  if (response.data.code === 1) {
    return response.data.data
  } else {
    throw new Error(response.data.errorMessage)
  }
}

 