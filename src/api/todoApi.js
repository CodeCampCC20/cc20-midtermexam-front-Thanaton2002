import axios from 'axios'

const todoApi = {}

const Base_url = 'http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com'

todoApi.post = (input) => {
  return axios.post(`${Base_url}/api/V1/todos`, input)
}

todoApi.getAll = (id) => {
  return axios.get(`${Base_url}/api/V1/todos/${id}`)
}

export default todoApi