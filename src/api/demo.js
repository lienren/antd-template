/*
 * @Author: Lienren
 * @Date: 2018-08-13 22:54:36
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-08-19 10:08:05
 */
'use strict'

import Vue from 'vue'

export default {
  getList (body, op = {}) {
    return Vue.$utils.Http.post(`/demoApi/poc_extend/recharge/list`, { ...body }, op)
  }
}
