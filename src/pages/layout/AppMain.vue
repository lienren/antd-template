<template>
  <div class="app-main" ref="container">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .app-main {
    padding: 10px;
    transition: margin-left 0.28s;
    background: none repeat scroll 0 0 #fff;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
</style>
