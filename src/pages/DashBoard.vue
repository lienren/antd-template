<template>
  <div>
    <h3>您好，{{authInfo.userName}}</h3>
    <div>{{todayCalendar}} 农历{{lunarCalendar}}</div>
    <a-divider />
    <a-button type="primary" @click="addBadge">触发事件</a-button>
    <a-button type="primary" @click="clearBadge">清空事件</a-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      authInfo: state => state.auth.authInfo
    }),
    todayCalendar () {
      return this.$utils.Date.format(new Date(), 'yyyy年M月d日') + ' ' + this.$utils.Date.getWeek()
    },
    lunarCalendar () {
      return this.$utils.Date.getLunarCalendar()
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
      this.$loading.show({ text: '加载中' })

      setTimeout(() => {
        this.$loading.hide()
      }, 500)
    },
    addBadge () {
      // this.$store.commit('SET_BADGE', this.$store.state.auth.badge + 1)
      this.$store.commit('ADD_EVENT', {
        title: `埃航空难后北京快速反应`,
        message: '3月10日上午，埃塞俄比亚航空公司一架波音737MAX8飞机，自亚的斯亚贝巴国际机场起飞6分钟后坠毁，机上157人全数遇难，其中包括22名联合国雇员和8名中国人。目前，飞机的黑匣子已经被寻获，业已送到法国巴黎相关部门进行技术分析。',
        time: this.$utils.Date.format(new Date()),
        isRead: false,
        sender: 'Google',
        // icon: 'user',
        click: async (item) => {
          this.$confirm({
            iconType: item.icon ? item.icon : item.sender,
            title: item.title,
            content: item.message,
            onOk () { },
            onCancel () { }
          })
        }
      })
    },
    clearBadge () {
      // this.$store.commit('SET_BADGE', 0)
      this.$store.commit('EVENT_INIT')
      this.$message.success('成功清除了所有事件!')
    }
  }
}
</script>
