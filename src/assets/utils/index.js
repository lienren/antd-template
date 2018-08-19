/*
 * @Author: Lienren
 * @Date: 2018-08-13 22:50:10
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-08-19 10:19:48
 */
'use strict'

import Common from './common.js'
import Http from './http.js'
import Store from './localStorage.js'

export default function (Vue) {
  if (!Vue.$utils) {
    Vue.$utils = {
      Common,
      Http,
      Store
    }
  } else {
    Vue.$utils = {
      Common,
      Http,
      Store
    }
  }

  Vue.mixin({
    created () {
      this.$utils = {
        Common,
        Http,
        Store
      }
    }
  })
}
