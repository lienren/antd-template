<template>
  <div>
    <h3>管理员列表</h3>
    <iTable :toolbars="tableToolbars" :actionButtons="tableActionBtns" :columns="tableColumns" :dataSource="tableData" :pagination="tablePagination" :height="tableHeight" @on-change="handleTableChange"></iTable>
  </div>
</template>

<script>

import { iTable } from '../../components/'
// import api from '../../api/demo'

export default {
  components: {
    iTable
  },
  data () {
    return {
      tableColumns: [],
      tableData: [],
      tablePagination: {},
      tableToolbars: [],
      tableActionBtns: [],
      list: [{
        key: 1,
        name: '姓名1',
        age: 35,
        address: '江苏省南京市1'
      }, {
        key: 2,
        name: '姓名2',
        age: 30,
        address: '江苏省南京市2'
      }]
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
      console.log('authInfo', this.$store.state.auth.authInfo)

      // 功能按钮
      this.tableToolbars = [
        {
          model: 'button',
          type: 'primary',
          icon: 'search',
          text: '搜索',
          click: (e) => {
            this.$message.success('点击搜索!')
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
            this.$message.success('刷新成功!')
            this.fetch({
              ...this.pagination
            })
          }
        },
        {
          model: 'button',
          icon: 'to-top',
          text: '清空',
          click: () => {
            this.$message.success('搜索条件清空成功!')
            this.fetch({
              ...this.pagination
            })
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
          icon: 'select',
          text: '选择条件',
          menus: [
            {
              key: '1',
              text: '选择1项'
            }
          ],
          click: (e) => {
            this.$message.info(`已选择：${e.key}`)
          }
        }
      ]
      // 列头
      this.tableColumns = [
        {
          title: '编号',
          dataIndex: 'key',
          width: '10%'
        },
        {
          title: '姓名',
          dataIndex: 'name',
          width: '15%'
        }, {
          title: '年龄',
          dataIndex: 'age',
          width: '10%'
        }, {
          title: '地址',
          dataIndex: 'address',
          width: '45%'
        }, {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          width: '20%'
        }
      ]
      // 操作按钮
      this.tableActionBtns = [
        {
          model: 'button',
          text: '修改',
          icon: 'edit',
          purview: 'edit',
          click: (e) => {
            console.log('e:', e)
            this.$message.info('已修改')
          }
        },
        {
          model: 'button',
          text: '删除',
          purview: 'delete',
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
      // 分页
      this.tablePagination = {
        pageSize: 20,
        current: 1,
        total: 200
      }
      this.fetch({
        ...this.tablePagination
      })
    },
    async fetch (param = {}) {
      /* let result = await api.getList({
          pageindex: param.current,
          pagesize: param.pageSize
        }, {})
        this.tableData = []
        if (result) {
          result.Data.list.forEach(item => {
            this.tableData.push({
              key: item.rhid,
              name: item.phone,
              age: item.amount,
              address: item.phonecity
            })
          })
          this.tablePagination = {
            pageSize: param.pageSize,
            current: param.current,
            total: result.Data.totle
          }
        } */
      this.tableData = []
      this.list.forEach(item => {
        this.tableData.push({
          ...item
        })
      })
      this.tablePagination = {
        pageSize: param.pageSize,
        current: param.current,
        total: this.list.length
      }
    },
    handleTableChange (val) {
      this.tablePagination = val.pagination
      this.fetch({
        ...this.tablePagination
      })
    }
  }
}
</script>
