<template>
  <div :class="cardClass" :style="cardStyle">
    <a-icon type="close-circle-o" @click="close" />
  </div>
</template>

<script>

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data () {
    return {
      cardClass: ['layout-card'],
      cardStyle: {},
      ishow: this.show
    }
  },
  watch: {
    show (val) {
      this.ishow = val
    },
    ishow (val) {
      if (val) {
        this.cardClass = ['layout-card', 'animated', 'fadeInRight', 'faster']
        this.cardStyle = { display: 'block' }
      } else {
        this.cardClass = ['layout-card', 'animated', 'fadeOutRight', 'faster']
      }
      this.$emit('update:show', val)
    }
  },
  computed: {},
  created () { },
  beforeDestroy () { },
  mounted () { },
  methods: {
    close () {
      this.ishow = !this.ishow
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .layout-card {
    position: absolute;
    right: 0;
    top: 0;
    width: 200px;
    height: 100%;
    background-color: #fff;
    z-index: 9999;
    display: none;
  }
</style>
