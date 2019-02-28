/*
 * @Author: Lienren
 * @Date: 2018-08-19 10:08:43
 * @Last Modified by: Lienren
 * @Last Modified time: 2019-02-28 15:37:20
 */
'use strict'

import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  routes: routes
})

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  setTimeout(next, 0)
})
router.afterEach(to => {
  NProgress.done() // finish progress bar
})

export default router
