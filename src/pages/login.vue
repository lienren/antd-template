<template>
  <div class="layout-login-main">
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
    background-image: url('../assets/images/bg.jpeg');
    background-size: cover;

    &:after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: inherit;
      -webkit-filter: brightness(75%) blur(6px);
      -moz-filter: brightness(75%) blur(6px);
      -ms-filter: brightness(75%) blur(6px);
      -o-filter: brightness(75%) blur(6px);
      filter: brightness(75%) blur(6px);
      z-index: 2;
    }

    .login-content {
      flex: 1;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
