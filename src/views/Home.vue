<template>
  <div class="home">
    <KButton type="primary">Hello binnie</KButton>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component({
  name: 'Home'
})
export default class Home extends Vue {
  get isAdmin () {
    return this.$store.state.isAdmin
  }
  set isAdmin (val: Boolean) {
    this.$store.commit('setIsAdmin', val)
  }

  created () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'checkadmin',
      data: {},
      success: (result: any) => {
        console.log('[云函数] [checkadmin] result: ', result)
        this.isAdmin = result['result']
      },
      fail: (error: any) => {
        console.error('[云函数] [checkadmin] result 调用失败', error)
        this.isAdmin = false
      }
    })
  }
}
</script>

<style lang="scss">
.home {
  text-align: center;
  padding-top: 200px;
}
</style>
