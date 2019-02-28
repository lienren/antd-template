<template>
  <div class="app-main" ref="container">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  data () {
    return {}
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () { }
  }
}
</script>

<style scoped>
  .app-main {
    padding: 20px;
    transition: margin-left 0.28s;
    background: none repeat scroll 0 0 #fff;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
</style>
