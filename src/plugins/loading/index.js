/*
 * @Author: Lienren
 * @Date: 2018-08-19 10:08:33
 * @Last Modified by:   Lienren
 * @Last Modified time: 2018-08-19 10:08:33
 */
'use strict'

import LoadingComponent from './iLoading.vue'

let $vm
let watcher

export default {
  install (vue, options) {
    const Loading = vue.extend(LoadingComponent)
    if (!$vm) {
      $vm = new Loading({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }
    const loading = {
      show (options = {}) {
        // destroy watcher
        watcher && watcher()
        if (typeof options === 'string') {
          $vm.text = options
        } else if (typeof options === 'object') {
          for (let i in options) {
            $vm[i] = options[i]
          }
        }
        if ((typeof options === 'object' && options.onShow) || options.onHide) {
          watcher = $vm.$watch('show', val => {
            val && options.onShow && options.onShow($vm)
            val === false && options.onHide && options.onHide($vm)
          })
        }
        $vm.show = true
      },
      hide () {
        $vm.show = false
      }
    }

    vue.prototype.$loading = loading
  }
}
