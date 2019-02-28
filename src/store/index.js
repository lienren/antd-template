/*
 * @Author: Lienren
 * @Date: 2019-02-28 14:54:37
 * @Last Modified by: Lienren
 * @Last Modified time: 2019-02-28 14:54:59
 */

'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import config from '../../config/index'
import localStorage from '../assets/utils/localStorage'

import auth from './modules/auth'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: { auth },
  plugins: [
    createPersistedState({
      key: config.build.assetsPublicPath + 'vuex',
      paths: ['auth'],
      getState: key => localStorage.get(key),
      setState: (key, state) => localStorage.set(key, state)
    })
  ]
})
