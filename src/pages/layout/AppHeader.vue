<template>
  <a-layout-header class="layout-header">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, index) in crumbs" :key="index">{{item.name}}</a-breadcrumb-item>
    </a-breadcrumb>
    <template v-for="(item, index) in quickFunList">
      <a-icon :key="index" :type="item.type" class="layout-quickfun" :style="{right: quickFunStyleRight(index)}" :title="item.title" @click="clickQuickFun(item)" />
    </template>
    <a-layout class="layout-header-user" title="点击显示详细">
      <a-dropdown :trigger="['click']">
        <a-badge dot :count="badgeNumber">
          <a-avatar icon="user" size="small" style="color: #fff; backgroundColor: #1890ff; cursor: pointer;"></a-avatar>
        </a-badge>
        <a-menu slot="overlay" @click="clickDropDown">
          <a-menu-item v-for="item in dropDownList" :key="item.key">{{item.name}}</a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-layout>
  </a-layout-header>
</template>

<script>

export default {
  props: {
    crumbs: {
      type: Array
    },
    badgeNumber: {
      type: Number,
      default: 0
    },
    quickFunList: {
      type: Array
    },
    dropDownList: {
      type: Array
    }
  },
  components: {},
  data () {
    return {}
  },
  computed: { },
  created () { },
  beforeDestroy () { },
  mounted () { },
  methods: {
    clickDropDown (e) {
      if (this.dropDownList) {
        let dropDownMenu = this.dropDownList.find(d => {
          return d.key === e.key
        })

        if (dropDownMenu && dropDownMenu.click && typeof dropDownMenu.click === 'function') {
          dropDownMenu.click(e)
        }
      }
      this.$emit('on-clickdropdown', e)
    },
    quickFunStyleRight (index) {
      return `${(index + 1) * 34}px`
    },
    clickQuickFun (e) {
      if (e.click) {
        e.click(e)
      }
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .layout-header {
    position: relative;
    height: 40px;
    padding: 0;
    background: none;
    div {
      line-height: 40px;
    }
    .layout-quickfun {
      width: 18px;
      height: 18px;
      font-size: 18px;
      line-height: 18px;
      position: absolute;
      top: 50%;
      margin-top: -9px;
      cursor: pointer;
    }
    .layout-header-user {
      width: 24px;
      height: 24px;
      line-height: 24px;
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -12px;
    }
  }
</style>
