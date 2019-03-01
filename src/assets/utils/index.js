/*
 * @Author: Lienren
 * @Date: 2018-08-13 22:50:10
 * @Last Modified by: Lienren
 * @Last Modified time: 2019-02-28 17:36:35
 */
'use strict'

import Common from './common.js'
import Http from './http.js'
import Store from './localStorage.js'
import Date from './date.js'

export default function (Vue) {
  if (!Vue.$utils) {
    Vue.$utils = {
      Common,
      Http,
      Store,
      Date
    }
  } else {
    Vue.$utils = {
      Common,
      Http,
      Store,
      Date
    }
  }

  Vue.mixin({
    created () {
      this.$utils = {
        Common,
        Http,
        Store,
        Date
      }
    }
  })
}
