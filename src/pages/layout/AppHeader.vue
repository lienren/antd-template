<template>
  <a-layout-header class="layout-header">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, index) in crumbs" :key="index">{{item.name}}</a-breadcrumb-item>
    </a-breadcrumb>
    <a-icon type="setting" class="layout-setting" title="点击设置" @click="clickSettingImg" />
    <a-layout class="layout-header-user" title="点击显示详细">
      <a-dropdown :trigger="['click']">
        <a-badge dot :count="badgeNumber">
          <a-avatar icon="user" size="small" style="color: #fff; backgroundColor: #1890ff; cursor: pointer;"></a-avatar>
        </a-badge>
        <a-menu slot="overlay" @click="clickDropDown">
          <a-menu-item key="editPwd">修改密码</a-menu-item>
          <a-menu-item key="quit">退出</a-menu-item>
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
    }
  },
  components: {},
  data () {
    return {}
  },
  computed: {},
  created () { },
  beforeDestroy () { },
  mounted () { },
  methods: {
    clickSettingImg () {
      this.$emit('on-clicksetting')
    },
    clickDropDown (e) {
      this.$emit('on-clickdropdown', e)
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
    .layout-setting {
      width: 18px;
      height: 18px;
      font-size: 18px;
      line-height: 18px;
      position: absolute;
      right: 34px;
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
