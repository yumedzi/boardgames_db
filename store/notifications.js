let nextId = 2

export const namespaced = true

export const state = () => ({
  notifications: []
})

export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      type: 'info',
      ...notification,
      id: nextId++
    })
  },
  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationToRemove.id
    )
  }
}

export const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification)
  },
  remove({ commit }, notificationToRemove) {
    commit('DELETE', notificationToRemove)
  }
}