<template>
    <div class="app" :style="{minHeight: height + 'px'}">
      <!-- mainView -->
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  data () {
    return {
      height: ''
    }
  },
  methods: {
  },
  mounted () {
    var screabHeight = document.documentElement.clientHeight
    this.height = screabHeight
  }
}
</script>

<style scoped>
.app {
  background-color: #fff;
}
</style>