<template>
  <div class="home">
    <div>Hello binnie</div>
    <KButton type="primary" v-if="isAdmin" @click="openAdmin">打开后台</KButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

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
    if (this.isAdmin === undefined) {
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

  openAdmin () {
    this.$router.push('/admin')
  }
}
</script>

<style lang="scss">
.home {
  text-align: center;
  padding-top: 200px;
}
</style>
