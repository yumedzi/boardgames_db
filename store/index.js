export const actions = {
  async nuxtServerInit({ state, commit, dispatch }, { req }) {
    // console.log("Passing collected data to client...");
    // await dispatch('games/fetchGenres')
    // await dispatch('games/fetchGames')
  },
  async nuxtClientInit({ state, commit, dispatch }, { req }) {
    // console.log(req)
    console.log("Running INIT calls on client...");
    console.log(localStorage.getItem('useDarkTheme') || 'false');

    // commit('games/SET_GAMES', state.games.games)
    // commit('games/SET_GENRES', state.games.genres)
    await dispatch('games/fetchGenres')
    await dispatch('games/fetchGames')
  }
}