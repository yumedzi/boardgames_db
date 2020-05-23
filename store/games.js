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
  addGame({ commit, router }, { formData }) {
    return GameService.addGame(formData).then(response => {
      commit('ADD_GAME', response)
      // REDIRECT TO NEWLY CREATED GAME
      this.app.router.push(`/game/${response.id}`)
    })
  },
  updateGame({ commit }, { formData, id }) {
    return GameService.updateGame(formData, id).then(response => {
      commit('UPDATE_GAME', response)
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