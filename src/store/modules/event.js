const state = {
  events: []
}

const getters = {}

const mutations = {
  EVENT_INIT (state) {
    state.events = []
  },
  ADD_EVENT (state, data) {
    state.events.push(data)
  },
  SET_EVENT_READALL (state) {
    state.events.forEach(e => {
      if (e && !e.isRead) {
        e.isRead = true
      }
    })
  }
}

const actions = {}

export default {
  state,
  getters,
  actions,
  mutations
}
