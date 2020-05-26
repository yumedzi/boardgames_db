import GameService from '@/services/BoardgamesService.js'

export const state = () => ({
  // games_loaded: false,
  game: {},
  defaultGame: { playtime: 30, players_min: 2, players_max: 4 },
  games: [],
  genres: [],
  complexities: ['easy', 'medium', 'hard', 'ultra'],
  columns: [{
    text: 'Name',
    align: 'start',
    sortable: true,
    value: 'name'
  },
  { text: 'Description', value: 'short_description' },
  { text: 'Genres', value: 'genres' },
  { text: 'Complexity', value: 'complexity' },
  { text: 'Playtime', value: 'playtime' }
  ]
})

export const mutations = {
  SET_GAMES(state, games) {
    // state.games = games
    state.games = games
  },
  SET_GAME(state, game) {
    state.game = game
  },
  ADD_GAME(state, game) {
    state.games.push(game)
  },
  UPDATE_GAME(state, newGame) {
    // state.games.forEach(function (oldGame, i) { if (oldGame.id == newGame.id) state.games[i] = newGame })
    state.games = state.games.map(obj => obj.id === newGame.id ? newGame : obj)
    state.game = newGame
  },
  SET_GENRES(state, genres) {
    state.genres = genres
  },
  SET_LOADED(state, loaded) {
    state.games_loaded = loaded
  }
}

export const actions = {
  setCurrentGameById({ state, commit }, { id }) {
    return commit('SET_GAME', state.games.find(element => element.id === id))
  },
  fetchGames({ state, commit }) {
    if (!state.games.length) {
      return GameService.getGames().then(response => {
        commit('SET_GAMES', response.data)
        // console.log(response.data);
      })
    }
  },
  fetchGame({ commit }, id) {
    return GameService.getGame(id).then(response => {
      commit('SET_GAME', response.data)
    })
  },
  fetchGenres({ state, commit }) {
    if (!state.genres.length) {
      return GameService.getGenres().then(response => {
        commit('SET_GENRES', response.data)
      })
    }
  },
  addGame({ commit, dispatch }, { formData }) {
    dispatch('ui/setLoading', true, { root: true })
    let token = this.app.$auth.getToken('auth0')
    return GameService.addGame(formData, token).then(response => {
      commit('ADD_GAME', response)
      dispatch('ui/setLoading', false, { root: true })
      this.app.router.push(`/game/${response.id}`)
      dispatch('notifications/add', { message: 'Game added successfully' }, { root: true })
    })
  },
  updateGame({ commit, dispatch }, { formData, id }) {
    dispatch('ui/setLoading', true, { root: true })
    let token = this.app.$auth.getToken('auth0')
    return GameService.updateGame(formData, id, token).then(response => {
      commit('UPDATE_GAME', response)
      dispatch('ui/setLoading', false, { root: true })
      dispatch('notifications/add', { message: 'Game updated successfully' }, { root: true })
    })
  }
  // updateGame
}

export const getters = {
  getGameById: (state) => (id) => {
    console.log(state.games);
    return state.games.find(game => game._id == id)
  }
}