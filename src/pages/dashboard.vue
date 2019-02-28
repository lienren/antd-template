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
      this.$store.commit('SET_BADGE', this.$store.state.auth.badge + 1)
    },
    clearBadge () {
      this.$store.commit('SET_BADGE', 0)
    }
  }
}
</script>
