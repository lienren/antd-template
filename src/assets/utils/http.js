/*
 * @Author: Lienren
 * @Date: 2018-08-13 22:29:08
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-08-13 23:19:11
 */
'use strict'

import axios from 'axios'
import ex from './httpex'
import codes from './httpresultcode'

// 通用接口业务成功判定条件
const DEF_VALIDATOR = res => res.ErrorCode === codes.SUCCESS
// 通用接口业务失败处理
const DEF_FAIL_HANDLING = res => ex.ErrorMsg(res.ErrorCode, res.Message)

function requestUrl (url) {
  return url
}

function send (url, method, body, options, load, loadMsg, validator, defFail, defEx) {
  const opts = { ...options }
  // 生成请求url
  url = requestUrl(url)
  if (load) {
    // 显示加载框
  }
  let token = ''
  opts.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authentication: token || '',
    ...opts.headers
  }
  return axios({ method, url, data: body, ...opts })
    .then(async res => {
      const obj = res.data

      if (load) {
        // 隐藏加载框
      }
      // 验证接口结果
      if (validator(obj)) {
        return obj
      } else {
        if (defFail) {
          // 通用业务失败处理
          DEF_FAIL_HANDLING(obj)
          return null
        } else {
          // 返回前台处理
          return obj
        }
      }
    })
    .catch(error => {
      let errorMsg = ''
      try {
        if (error.response) {
          errorMsg = JSON.stringify(error.response)
        } else if (error.request) {
          errorMsg = JSON.stringify(error.request)
        } else {
          errorMsg = JSON.stringify(error.message)
        }
      } catch (e) {}
      if (load) {
        // 隐藏加载框
      }
      // 接口异常处理
      if (defEx) {
      } else {
        // 返回前台处理
        return Promise.reject(new Error(errorMsg))
      }
    })
}

export default {
  /**
   * 调用Get接口
   * @param url 接口地址
   * @param options axios的options设置（参考https://github.com/mzabriskie/axios）
   * @param load  是否展示loading (true：默认，展示全屏loading框，false：不展示，btn：展示按钮loading)
   * @param loadMsg loading展示文字
   * @param validator 业务成功逻辑判断
   * @param defFail 是否使用默认业务失败处理
   * @param defEx 是否使用默认接口失败处理
   */
  get (
    url,
    { options = null, load = true, loadMsg = '加载中...', validator = DEF_VALIDATOR, defFail = true, defEx = true } = {}
  ) {
    return send(url, 'get', null, options, load, loadMsg, validator, defFail, defEx)
  },
  /**
   * 调用Post接口
   * @param url 接口地址
   * @param body 接口参数
   * @param options axios的options设置（参考https://github.com/mzabriskie/axios）
   * @param load  是否展示loading (true：默认，展示全屏loading框，false：不展示，btn：展示按钮loading)
   * @param loadMsg loading展示文字
   * @param validator 业务成功逻辑判断
   * @param defFail 是否使用默认业务失败处理
   * @param defEx 是否使用默认接口失败处理
   */
  post (
    url,
    body,
    { options = null, load = true, loadMsg = '加载中...', validator = DEF_VALIDATOR, defFail = true, defEx = true } = {}
  ) {
    return send(url, 'post', body, options, load, loadMsg, validator, defFail, defEx)
  },
  all (list) {
    return axios.all(list).then(
      axios.spread((...args) => {
        return args
      })
    )
  },
  getRequestUrl (url) {
    return requestUrl(url)
  }
}
