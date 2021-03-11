import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4001'

export const post = async (resource, data = {}) => {
  const response = await axios.post(resource, data)

  if (response.status === 200 && response.data.code === 201) {
    return response.data
  } else if (response.status === 200 && response.data.code === 401) {
    return response.data.error
  } else if (response.status === 200 && response.data.code === 404) {
    return response.data.error
  } else if (response.status === 200 && response.data.code === 409) {
    return response.data.error
  } else {
    return response.data.error
  }
}

export const get = async (resource) => {
  const response = await axios.get(resource)
  return response.data.data
}

 