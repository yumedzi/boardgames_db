import GameService from '@/services/BoardgamesService.js'

export const state = () => ({
  // games_loaded: false,
  game: { playtime: 30 },
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
  SET_GENRES(state, genres) {
    state.genres = genres
  },
  SET_LOADED(state, loaded) {
    state.games_loaded = loaded
  }
}

export const actions = {
  setGame({ commit }, game) {
    return commit('SET_GAME', game)
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
  }
}

export const getters = {
  getGameById: (state) => (id) => {
    console.log(state.games);
    return state.games.find(game => game._id == id)
  }
}