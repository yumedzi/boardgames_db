import axios from 'axios'

const apiClient = axios.create({
  baseURL: `https://crm-nexus.appspot.com`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
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
  addGame(data) {
    const json = JSON.stringify(data);
    // const blob = new Blob([json], {
    //   type: 'application/json'
    // });
    const form = new FormData();
    form.append("data", json);

    return apiClient.post('/boardgames', form).then(res => {
      console.log("RESULT is: " + res);
    })
  }
}