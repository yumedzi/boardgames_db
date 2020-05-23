import Vue from 'vue'


export const actions = {
  async nuxtServerInit({ state, commit, dispatch }, { req }) {
  },
  async nuxtClientInit({ state, commit, dispatch, app }, { req }) {
    await dispatch('games/fetchGenres')
    await dispatch('games/fetchGames')
  }
}