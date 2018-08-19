/*
 * @Author: Lienren
 * @Date: 2018-08-13 22:29:12
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-08-19 10:24:06
 */
'use strict'

import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import UtilsPlugin from './assets/utils'
import LoadingPlugin from './plugs/loading'
import App from './App'
import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import './styles/index.scss' // global css
import './styles/animate.css' // animate css

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(UtilsPlugin)
Vue.use(LoadingPlugin)

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  setTimeout(next, 0)
})
router.afterEach(to => {
  NProgress.done() // finish progress bar
})

/* eslint-disable no-new */
window.$globalHub = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
