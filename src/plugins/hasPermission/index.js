/*
 * @Author: Lienren
 * @Date: 2019-02-28 14:55:28
 * @Last Modified by: Lienren
 * @Last Modified time: 2019-02-28 17:15:18
 */

'use strict'

const hasPermission = {
  install (Vue) {
    Vue.directive('hasPurview', {
      inserted (el, binding, vnode) {
        if (!binding.value) {
          return
        }
        let navs = JSON.stringify(vnode.context.$store.state.auth.navs)
        let path = vnode.context.$route.path
        if (navs.indexOf(`"${path}"`) >= 0) {
          let navsplit = navs.split(`"${path}"`)
          try {
            let nav = JSON.parse(
              `${navsplit[0].substring(navsplit[0].lastIndexOf('{'))}"${path}"${navsplit[1].substring(
                0,
                navsplit[1].indexOf('}') + 1
              )}`
            )

            if (nav && nav.purview) {
              if (!nav.purview.includes(binding.value)) {
                el.parentNode.removeChild(el)
              }
            }
          } catch (e) {
            console.error('e:', e)
          }
        }
      }
    })
  }
}

export default hasPermission
