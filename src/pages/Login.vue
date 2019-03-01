<template>
  <div class="layout-login-main">
    <vue-particles color="#fff" :particleOpacity="0.7" :particlesNumber="60" shapeType="circle" :particleSize="4" linesColor="#fff" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push" class="bg-particles"></vue-particles>
    <div class="login-content">
      <i-login></i-login>
    </div>
  </div>
</template>

<script>

import { iLogin } from '../components'

export default {
  components: {
    iLogin
  },
  data () {
    return {}
  },
  computed: {},
  created () { },
  beforeDestroy () { },
  mounted () { },
  methods: {}
}
</script>

<style lang="less" rel="stylesheet/less">
  .layout-login-main {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #2f3a49;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .login-content {
      flex: 1;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .bg-particles {
      width: 100%;
      height: 100%;
      background-image: url('../assets/images/bg.jpg');
      background-size: cover;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>
