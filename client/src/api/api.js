import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4001'

export const post = async (resource, data = {}) => {
  const response = await axios.post(resource, data)

  if (response.status === 200) {
    return response
  } else {
    return Promise.reject(response.status)
  }
}