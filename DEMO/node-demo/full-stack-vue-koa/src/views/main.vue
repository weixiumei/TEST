<template>
  <div>
    <keep-alive>
      <router-view />
    </keep-alive>
    <van-tabbar v-model="active" @change="changeTabbar">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="like-o">自定义</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  methods: {
    changeTabbar (index) {
      this.active = index
      switch (index) {
        case 0:
          this.$router.push({name: '主页'})
          break
        case 1:
          this.$router.push({name: '自定义'})
          break
      }
    }
  },
  created () {
    if (this.$route.name === '自定义') {
      this.changeTabbar(1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
