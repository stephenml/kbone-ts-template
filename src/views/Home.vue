<template>
  <div class="home">
    Hello World
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component({
  name: 'Home'
})
export default class Home extends Vue {
}
</script>

<style lang="scss">
.home {
  text-align: center;
}
</style>
