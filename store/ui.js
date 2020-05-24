export const state = () => ({
  "dark_mode": true,
  "miniVariant": false,
  "menuPermanent": false,
  "loading": false
})

export const mutations = {
  SET_DARK_MODE(state, dark_mode) {
    state.dark_mode = dark_mode
  },
  SET_MINI(state, miniVariant) {
    state.miniVariant = miniVariant
  },
  SET_PERMANENT(state, menuPermanent) {
    state.menuPermanent = menuPermanent
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

export const actions = {
  setDarkMode({ commit }, dark_mode) {
    commit('SET_DARK_MODE', dark_mode)
  },
  setMiniVariant({ commit }, miniVariant) {
    commit('SET_MINI', miniVariant)
  },
  setMenuPermanent({ commit }, menuPermanent) {
    commit('SET_PERMANENT', menuPermanent)
  },
  setLoading({ commit }, loading) {
    commit('SET_LOADING', loading)
  }
}