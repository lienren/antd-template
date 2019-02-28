import { deepCopy } from '../../assets/utils/tools'

// initial state
const state = {
  authInfo: {},
  badge: 0,
  navs: []
}

const defaultValue = deepCopy(state)

const getters = {}

const mutations = {
  AUTH_INIT (state) {
    window.$globalHub.$store.state.auth = defaultValue
  },
  SET_AUTH (state, data) {
    state.authInfo = { ...state.authInfo, ...data }
  },
  SET_BADGE: (state, data) => {
    state.badge = data
  },
  SET_NAV: (state, data) => {
    state.navs = data
  }
}

const actions = {}

export default {
  state,
  getters,
  actions,
  mutations
}
