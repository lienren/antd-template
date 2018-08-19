<template>
  <div>
    首页
  </div>
</template>

<script>

export default {
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
    init () {
      this.$loading.show({ text: '加载中' })

      setTimeout(() => {
        this.$loading.hide()
      }, 2000)
    }
  }
}
</script>
