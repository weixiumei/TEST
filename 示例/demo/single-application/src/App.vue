<template>
  <div id="app">
    <div style="background:#d5d5d5;">路由</div>
    <router-view></router-view>
    <div style="background:#d5d5d5;">内嵌路由</div>
    <router-link to="/title">11</router-link>
    <router-link to="/title1">22</router-link>
    <div>
      <router-view name="title"></router-view>
    </div>
    <br>
    <router-link to="/title2">跳转页面</router-link>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
