<template>
  <a-layout-header class="layout-header">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, index) in crumbs" :key="index">{{item.name}}</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout class="layout-header-user" title="点击显示详细" @click="clickHeaderImg">
      <a-badge dot :count="badgeNumber">
        <a-avatar icon="user" size="small" style="color: #fff; backgroundColor: #1890ff; cursor: pointer;"></a-avatar>
      </a-badge>
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
    clickHeaderImg () {
      this.$emit('clickheadimg')
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
