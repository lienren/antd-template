<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div style="padding-top:20px;">
        <a-form>
          <a-form-item v-if="!loginButtonLoading">
            <a-input placeholder="请填写登录手机号" size="large" v-model="userPhone">
              <a-icon slot="prefix" type="phone" />
              <a-icon v-if="userPhone" slot="suffix" type="close-circle" @click="userPhone=''" />
            </a-input>
          </a-form-item>
          <a-form-item v-if="!loginButtonLoading">
            <a-input-group compact>
              <a-input style="width:65%" placeholder="请填写右侧图文验证码" size="large" v-model="imgCode">
                <a-icon slot="prefix" type="picture" />
                <a-icon v-if="imgCode" slot="suffix" type="close-circle" @click="imgCode=''" />
              </a-input>
              <a-button style="width:35%;" size="large">
                <img src="http://poc.51pinzhi.cn/proxy/prodApi/poc/tool/VerifyImage?guid=0e04aad8-c36c-3151-066b-e0a4e9278aee" alt="">
              </a-button>
            </a-input-group>
          </a-form-item>
          <a-form-item v-if="!loginButtonLoading">
            <a-input-group compact>
              <a-input style="width:65%;" size="large" v-model="smsCode">
                <a-icon slot="prefix" type="mail" />
                <a-icon v-if="smsCode" slot="suffix" type="close-circle" @click="smsCode=''" />
              </a-input>
              <a-button style="width:35%;" size="large">发送验证码</a-button>
            </a-input-group>
          </a-form-item>
          <a-form-item>
            <a-button :type="loginButtonType" size="large" style="width:100%;" @click="login" :loading="loginButtonLoading">{{loginButtonText}}</a-button>
          </a-form-item>
          <a-form-item>
            <p class="text-tip">PRESENTED BY LI.R&D TEAM 2018-2020.</p>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      userPhone: '',
      imgCode: '',
      smsCode: '',
      loginButtonLoading: false,
      loginButtonText: '登 录',
      loginButtonType: 'primary'
    }
  },
  computed: {},
  created () { },
  beforeDestroy () { },
  mounted () { },
  methods: {
    login () {
      this.loginButtonLoading = true
      this.loginButtonText = '登录权限验证中，请稍后'

      setTimeout(() => {
        if (this.userPhone !== '18652017319') {
          this.loginButtonLoading = false
          this.loginButtonText = '验证失败，请重新填写后再试一次'
          this.loginButtonType = 'danger'
        } else {
          this.$utils.Store.set('userinfo', {
            userPhone: this.userPhone,
            imgCode: this.imgCode,
            smsCode: this.smsCode
          })
          // 路由跳转
          this.$router.push({ path: '/dashboard' })
        }
      }, 10000)
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .login-wrap {
    .ms-login {
      position: relative;
      width: 380px;
      padding: 10px 20px 0;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 1001;

      .ant-form-item {
        margin-bottom: 12px;

        .text-tip {
          color: #f1f1f1;
          text-align: center;
          font-size: 12px;
          padding: 0;
          margin: 0;
        }

        &:last-child {
          margin-bottom: 0 !important;
        }
      }
    }
  }
</style>
