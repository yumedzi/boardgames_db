export const actions = {
  async nuxtServerInit({ state, commit, dispatch }, { req }) {
    // console.log(req)
    console.log("Passing collected data to client...");
    // commit('games/SET_GAMES', state.games.games)
    // commit('games/SET_GENRES', state.games.genres)
    await dispatch('games/fetchGenres')
    await dispatch('games/fetchGames')
  }
}