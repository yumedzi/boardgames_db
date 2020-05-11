export const state = () => ({
  "dark_mode": true
})

export const mutations = {
  SET_DARK_MODE(state, dark_mode) {
    state.dark_mode = dark_mode
  }
}

export const actions = {
  setDarkMode({ commit }, dark_mode) {
    commit('SET_DARK_MODE', dark_mode)
  }
}