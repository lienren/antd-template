/*
 * @Author: Lienren
 * @Date: 2018-08-13 22:30:45
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-08-13 22:32:55
 */
'use strict'

import codes from './httpresultcode'

export default {
  ErrorMsg (code, msg) {
    if (
      window.$globalHub.$route.path !== '/' &&
      window.$globalHub.$route.path !== '/login' &&
      codes.AUTH_ERROR.some(x => x === code)
    ) {
      console.log(`登录验证失败！${msg}`)
    } else {
      console.log(`传输异常，请稍后再试！${msg}`)
    }
  }
}
