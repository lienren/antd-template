/*
 * @Author: Lienren
 * @Date: 2019-02-28 14:55:42
 * @Last Modified by:   Lienren
 * @Last Modified time: 2019-02-28 14:55:42
 */

'use strict'

import Vue from 'vue'

import hasPermission from './hasPermission'
import loading from './loading'

const Plugins = [
  loading,
  hasPermission
]

Plugins.map((plugin) => {
  Vue.use(plugin)
})

export default Vue
