/*
 * @Author: Lienren
 * @Date: 2019-02-28 14:54:37
 * @Last Modified by: Lienren
 * @Last Modified time: 2019-03-26 09:02:35
 */

'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import config from '../../config/index'
import localStorage from '../assets/utils/localStorage'

import auth from './modules/auth'
import event from './modules/event'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: { auth, event },
  plugins: [
    createPersistedState({
      key: config.build.assetsPublicPath + 'vuex',
      paths: ['auth', 'event'],
      getState: key => localStorage.get(key),
      setState: (key, state) => localStorage.set(key, state)
    })
  ]
})
