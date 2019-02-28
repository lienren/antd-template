<template>
  <div>
    <a-button-group v-if="toolbars&&toolbars.length>0" :style="{ marginBottom: '10px' }">
      <template v-for="(item, index) in toolbars">
        <a-button v-hasPurview="item.purview" v-if="item.model === 'button'" :key="index" :type="item.type" :icon="item.icon" :loading="item.loading" @click="item.click(item)">{{item.text}}</a-button>
        <a-dropdown v-hasPurview="item.purview" v-if="item.model === 'dropdown'" :key="index">
          <a-menu slot="overlay" @click="item.click">
            <a-menu-item v-for="menu in item.menus" :key="menu.key">{{menu.text}}</a-menu-item>
          </a-menu>
          <a-button :type="item.type" :icon="item.icon">
            {{item.text}}
            <a-icon type="down" /></a-button>
        </a-dropdown>
      </template>
    </a-button-group>
    <a-table :columns="columns" :dataSource="dataSource" :pagination="pagination" :size="size" :scroll="height === 0 ? {} : { y: toolbars&&toolbars.length>0?height - 40:height }" @change="handleTableChange">
      <span slot="action" slot-scope="text, record">
        <template v-for="(item, index) in actionButtons">
          <a-popconfirm v-hasPurview="item.purview" v-if="item.confirm" :key="`btn_confirm_${index}`" :title="item.confirm.title" @confirm="item.confirm.confirm(record)" @cancel="item.confirm.cancel?item.confirm.cancel(record):()=>{}" :okText="item.confirm.okText || '确认'" :cancelText="item.confirm.cancelText || '取消'">
            <a :key="`btn_${index}`" :style="item.style||{}">{{item.text}}</a>
          </a-popconfirm>
          <a v-else v-hasPurview="item.purview" :key="`btn_${index}`" @click="item.click(record)" :style="item.style">{{item.text}}</a>&nbsp;
        </template>
      </span>
    </a-table>
  </div>
</template>

<script>

export default {
  props: {
    toolbars: {
      type: Array
    },
    columns: {
      type: Array
    },
    dataSource: {
      type: Array
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          pageSize: 20,
          current: 1,
          total: 0 }
      }
    },
    size: {
      type: String,
      default: 'small'
    },
    height: {
      type: Number,
      default: 0
    },
    actionButtons: {
      type: Array
    }
  },
  components: {},
  data () {
    return {}
  },
  computed: {},
  created () { },
  beforeDestroy () { },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () { },
    handleTableChange (pagination, filters, sorter) {
      this.$emit('on-change', { pagination, filters, sorter })
    }
  }
}
</script>
