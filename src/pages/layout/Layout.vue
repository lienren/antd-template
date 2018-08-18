<template>
  <a-layout class="layout-main">
    <sidebar :menus="menus" :logoName="logoName" :shortLogoName="shortLogoName" :version="version" :collapsed.sync="collapsed" @on-init="menuInit" @on-logout="logout" @on-collapse="menuCollapse" @on-select="menuSelect"></sidebar>
    <a-layout :style="{ padding:'0 16px', height: '100%', overflow: 'hidden' }">
      <app-header :crumbs="crumbs" :badgeNumber="badgeNumber" @on-clickhead="clickHead" @on-clicksetting="clickSetting"></app-header>
      <a-layout-content :style="{ height: mainHeight }">
        <app-main></app-main>
      </a-layout-content>
      <app-footer></app-footer>
    </a-layout>
    <app-card :show.sync="cardIsShow"></app-card>
  </a-layout>
</template>

<script>
import { Sidebar, AppHeader, AppMain, AppFooter, AppCard } from './'

export default {
  name: 'layout',
  data () {
    return {
      logoName: '管理平台',
      shortLogoName: '平台',
      version: 'Beta1.0.3',
      collapsed: false,
      menus: [
        {
          id: '/dashboard',
          name: '首页',
          icon: 'desktop'
        },
        {
          id: '/lists',
          name: '系统管理',
          icon: 'setting',
          children: [
            {
              id: '/managelist',
              name: '管理员管理'
            },
            {
              id: '/rolelist',
              name: '角色管理'
            },
            {
              id: '/menulist',
              name: '菜单管理'
            },
            {
              id: '/logs',
              name: '日志查看'
            }
          ]
        }
      ],
      crumbs: [],
      badgeNumber: 100,
      cardIsShow: false,
      spinning: true
    }
  },
  components: {
    Sidebar,
    AppHeader,
    AppMain,
    AppFooter,
    AppCard
  },
  computed: {
    mainHeight () {
      // header height:40
      // bodyer padding:16
      // footer height:30
      return this.$utils.Common.getWidthHeight().height - 40 - 16 - 30 + 'px'
    }
  },
  methods: {
    logout () {
      // 路由跳转
      this.$router.push({ path: '/login' })
    },
    menuInit (data) {
      // 设置面包屑名称
      this.setCrumbs(data.defaultSelectedKeys && data.defaultSelectedKeys.length > 0 ? data.defaultSelectedKeys[0] : '')
    },
    menuCollapse (collapsed) {
      if (collapsed) {
        // 已收缩
      } else {
        // 已展开
      }
    },
    menuSelect (selectItem) {
      // 设置面包屑名称
      this.setCrumbs(selectItem.key)
      // 路由跳转
      this.$router.push({ path: selectItem.key })
    },
    setCrumbs (keyName) {
      // 查找已选择父级和子级菜单名称
      this.crumbs = []

      if (keyName !== '') {
        this.menus.forEach((menu) => {
          if (menu.id === keyName) {
            this.crumbs.push({
              name: menu.name
            })
          }

          if (this.crumbs.length === 0 && menu.children && menu.children.length > 0) {
            menu.children.forEach((child) => {
              if (child.id === keyName) {
                this.crumbs.push({
                  name: menu.name
                })
                this.crumbs.push({
                  name: child.name
                })
              }
            })
          }
        })
      }
    },
    clickHead () {
      this.$message.success('点击头像!')
      this.cardIsShow = !this.cardIsShow
    },
    clickSetting () {
      this.$message.success('点击设置按钮!')
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .layout-main {
    position: relative;
    height: 100%;
  }
</style>
