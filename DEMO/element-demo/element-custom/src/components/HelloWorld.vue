<template>
<div>
  <el-button>default</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button plain>朴素按钮</el-button>
  <el-button type="primary" plain>主要按钮plain</el-button>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
