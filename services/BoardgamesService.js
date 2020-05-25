import axios from 'axios'

const apiClient = axios.create({
  baseURL: `https://crm-nexus.appspot.com`,
  // baseURL: `http://localhost:1337`,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getGames() {
    return apiClient.get('/boardgames')
  },
  getGame(id) {
    return apiClient.get('/boardgames/' + id)
  },
  getGenres() {
    return apiClient.get('/bg-genres/')
  },
  getGenre(id) {
    return apiClient.get('/bg-genres/' + id)
  },
  addGame(formData, token) {
    return apiClient.post('/boardgames', formData).then(res => {
      return res.data
    })
  },
  updateGame(formData, id, token) {
    return apiClient.put(`/boardgames/${id}`, formData, { headers: { "Authorization": token } }).then(res => {
      return res.data
    })
  }
}