import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4001'

export const post = async (resource, data = {}) => {
  const response = await axios.post(resource, data)

  if (response.status === 200 && response.data.code === 201) {
    console.log(response)
    return response.data
  } else if (response.status === 200 && response.data.code === 409) {
    console.log(response)
    return response.data.code
  } 
}

 