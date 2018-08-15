/*
 * @Author: Lienren
 * @Date: 2018-08-13 22:50:10
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-08-13 22:50:30
 */
'use strict'

import Common from './common.js'
import Http from './http.js'

export default function (Vue) {
  if (!Vue.$utils) {
    Vue.$utils = {
      Common,
      Http
    }
  } else {
    Vue.$utils = {
      Common,
      Http
    }
  }

  Vue.mixin({
    created () {
      this.$utils = {
        Common,
        Http
      }
    }
  })
}