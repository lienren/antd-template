<template>
  <a-layout-sider :trigger="null" collapsible v-model="collapsed" :style="{ position: 'relative' }">
    <div class="logo">{{collapsed?shortLogoName:logoName}}
      <span>{{version}}</span>
      <div :class="navSwitchClassName" :title="navSwitchText" @click="collapse"></div>
    </div>
    <a-menu theme="dark" mode="inline" :openKeys="openKeys" @openChange="onOpenChange" :defaultOpenKeys="defaultOpenKeys" :defaultSelectedKeys="defaultSelectedKeys" @select="select">
      <template v-for="nav in navs">
        <a-sub-menu v-if="nav.children&&nav.children.length>0" :key="nav.id">
          <span slot="title">
            <a-icon :type="nav.icon" />
            <span>{{nav.name}}</span>
          </span>
          <a-menu-item v-for="child in nav.children" :key="child.id">{{child.name}}</a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="nav.id">
          <a-icon :type="nav.icon" />
          <span>{{nav.name}}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    navs: {
      type: Array
    },
    logoName: {
      type: String,
      default: 'Demo'
    },
    shortLogoName: {
      type: String,
      default: 'Demo'
    },
    version: {
      type: String,
      default: 'V1.0'
    }
  },
  components: {},
  data () {
    return {
      openKeys: []
    }
  },
  watch: {},
  computed: {
    ...mapState({
      collapsed: state => state.auth.collapsed
    }),
    rountKey () {
      let path = window.location.href.split('/')
      return path && path.length > 0 ? `/${path[path.length - 1]}` : ''
    },
    defaultOpenKeys () {
      let rountKey = this.rountKey
      let openKeys = ''
      this.navs.forEach((nav) => {
        if (nav.children && nav.children.length > 0) {
          openKeys = nav.children.some((child) => {
            return child.id === rountKey
          }) ? nav.id : ''
        }
      })
      return openKeys === '' ? [] : [openKeys]
    },
    defaultSelectedKeys () {
      return this.rountKey === '' ? [] : [this.rountKey]
    },
    navSwitchText () {
      return this.collapsed ? '打开菜单' : '收起菜单'
    },
    navSwitchClassName () {
      return this.collapsed ? 'collapsed unfold' : 'collapsed fold'
    }
  },
  created () { },
  beforeDestroy () { },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      this.$emit('on-init', {
        defaultOpenKeys: this.defaultOpenKeys,
        defaultSelectedKeys: this.defaultSelectedKeys
      })
    },
    collapse () {
      // 设置登录信息
      this.$store.commit('SET_COLLAPSED', !this.collapsed)
      this.$emit('on-collapse', this.collapsed)
    },
    select (selected) {
      this.$emit('on-select', selected)
    },
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      this.openKeys = latestOpenKey ? [latestOpenKey] : []
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .logo {
    position: relative;
    height: 48px;
    width: 100%;
    font-size: 18px;
    text-align: center;
    margin: 8px 0;
    color: #fff;
    overflow: hidden;
    span {
      position: absolute;
      left: 50%;
      top: 50%;
      display: inline-block;
      font-size: 9px;
      padding: 1px 5px;
      border-radius: 20px;
      background: #f56c6c;
      color: #fff;
      margin: 0 0 0 -16px;
      transform: scale(0.7);
    }
    .collapsed {
      position: absolute;
      height: 20px;
      width: 10px;
      right: 0;
      top: 3px;
      background-color: #000;
      cursor: pointer;

      &::after {
        position: absolute;
        content: '';
        display: block;
        width: 5px;
        height: 5px;
        top: 50%;
        left: 50%;
        margin-top: -2px;
        border-right: 1px solid #ccc;
        border-top: 1px solid #ccc;
      }

      &.fold::after {
        transform: rotate(-135deg);
        -ms-transform: rotate(-135deg);
        -moz-transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
        -o-transform: rotate(-135deg);
        margin-left: -2px;
      }

      &.unfold::after {
        transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        margin-left: -3px;
      }
    }
  }
</style>
