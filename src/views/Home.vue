<template>
  <div class="home">
    <div class="text">Hello World</div>
    <button class="login-button" @click="login">Login</button>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component({
  name: 'Home'
})
export default class Home extends Vue {
  login () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: (result: any) => {
        console.log('[云函数] [login] user openid: ', result.result.openid)
      },
      fail: (error: any) => {
        console.error('[云函数] [login] 调用失败', error)
      }
    })
  }
}
</script>

<style lang="scss">
.home {
  text-align: center;

  .text {
    font-size: 26px;
    margin-top: 200px;
    margin-bottom: 20px;
  }

  .login-button {
    border: 2px solid #07C160;
    border-radius: 5px;
    padding: 10px 20px;
  }
}
</style>
