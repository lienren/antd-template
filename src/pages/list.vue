<template>
  <div>
    <iTable :btns="buttons" :actionBtns="actionButtons" :columns="columns" :data="data" :pagination="pagination" :height="tableHeight" @change="handleTableChange"></iTable>
  </div>
</template>

<script>

import { iTable } from '../components/'
import api from '../api/demo'

export default {
  components: {
    iTable
  },
  data () {
    return {
      columns: [],
      data: [],
      pagination: {},
      buttons: [],
      actionButtons: []
    }
  },
  computed: {
    tableHeight () {
      return this.$utils.Common.getWidthHeight().height - 188
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
      // 分页
      this.pagination = {
        pageSize: 20,
        current: 1,
        total: 200
      }
      // 列头
      this.columns = [{
        title: 'Name',
        dataIndex: 'name',
        width: 50
      }, {
        title: 'Age',
        dataIndex: 'age',
        width: 100
      }, {
        title: 'Address',
        dataIndex: 'address',
        width: 100
      }, {
        title: '操作',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' },
        text: '123',
        width: 100
      }]
      // 功能按钮
      this.buttons = [
        {
          model: 'button',
          type: 'primary',
          icon: 'search',
          text: '搜索',
          click: (e) => {
            this.fetch({
              ...this.pagination,
              current: 1
            })
          }
        },
        {
          model: 'button',
          icon: 'reload',
          text: '刷新',
          click: () => {
            this.$message.info('点新刷新')
          }
        },
        {
          model: 'button',
          icon: 'to-top',
          text: '清空',
          click: () => {
            this.$message.info('点击清空')
          }
        },
        {
          model: 'button',
          icon: 'edit',
          text: '新增',
          click: () => {
            this.$message.info('点击新增')
          }
        },
        {
          model: 'dropdown',
          text: '选择条件',
          menus: [
            {
              key: '1',
              text: '选择1项'
            }
          ],
          click: (e) => {
            console.log('e:', e)
            this.$message.info(`已选择：${e.key}`)
          }
        }
      ]
      // 操作按钮
      this.actionButtons = [
        {
          model: 'button',
          text: '修改',
          style: {},
          icon: 'edit',
          click: (e) => {
            console.log('e:', e)
            this.$message.info('已修改')
          }
        },
        {
          model: 'button',
          text: '删除',
          style: { color: '#ff0000' },
          icon: 'edit',
          confirm: {
            title: '确认要删除吗？',
            confirm: (e) => {
              console.log('e:', e)
              this.$message.info('已删除')
            },
            cancel: (e) => {
              console.log('e:', e)
              this.$message.info('已取消')
            }
          }
        }
      ]
      this.fetch({
        ...this.pagination
      })
    },
    async fetch (param = {}) {
      let result = await api.getList({
        pageindex: param.current,
        pagesize: param.pageSize
      }, {})
      this.data = []
      if (result) {
        result.Data.list.forEach(item => {
          this.data.push({
            key: item.rhid,
            name: item.phone,
            age: item.amount,
            address: item.phonecity
          })
        })
        this.pagination = {
          pageSize: param.pageSize,
          current: param.current,
          total: result.Data.totle
        }
      }
    },
    handleTableChange (val) {
      this.pagination = val.pagination
      this.fetch({
        ...this.pagination
      })
    }
  }
}
</script>
