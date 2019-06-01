<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    let script = document.createElement('script')
    script.src = './static/projectPiwik.js'
    script.type = 'text/javascript'
    document.body.appendChild(script)
  }
}
</script>

<style lang="less">
#app {
  font-family: 'PingFang SC', 'Microsoft YaHei';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
