<template>
  <a-layout-header class="layout-header">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, index) in crumbs" :key="index">{{item.name}}</a-breadcrumb-item>
    </a-breadcrumb>
    <template v-for="(item, index) in quickFunList">
      <a-icon :key="index" :type="item.type" class="layout-quickfun" :style="{right: quickFunStyleRight(index)}" :title="item.title" @click="clickQuickFun(item)" />
    </template>
    <a-layout class="layout-header-user" title="点击显示详细">
      <a-badge dot :count="badgeNumber">
        <a-avatar icon="user" size="small" style="color: #fff; backgroundColor: #1890ff; cursor: pointer;" @click="openUserDrawer"></a-avatar>
      </a-badge>
    </a-layout>
    <a-drawer placement="right" @close="closeUserDrawer" :visible="visibleUserDrawer">
      <div slot="title">
        <div style="height:40px;">
          <div style="float:left;">
            <a-avatar icon="user" style="color: #fff; backgroundColor: #1890ff;"></a-avatar>
          </div>
          <div style="float:left;">
            <span>{{authInfo.userName}}</span>
          </div>
        </div>
      </div>
      <a-list itemLayout="horizontal" :dataSource="events">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta :description="item.time" @click="item.click(item)">
            <div slot="title">{{item.title}}</div>
            <a-avatar :icon="item.icon" slot="avatar" :style="{backgroundColor: '#faad14', verticalAlign: 'middle'}">{{!item.icon&&item.sender&&item.sender.length>0?item.sender:'未知'}}</a-avatar>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-drawer>
  </a-layout-header>
</template>

<script>
import { mapState } from 'vuex'

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
    return {
      visibleUserDrawer: false
    }
  },
  computed: {
    ...mapState({
      authInfo: state => state.auth.authInfo,
      events: state => state.event.events
    })
  },
  created () { },
  beforeDestroy () { },
  mounted () { },
  methods: {
    openUserDrawer () {
      this.visibleUserDrawer = true
      this.$store.commit('SET_EVENT_READALL')
    },
    closeUserDrawer () {
      this.visibleUserDrawer = false
    },
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
