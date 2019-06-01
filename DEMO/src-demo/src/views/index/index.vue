<template>
<div>
  <div class="flex-start" @click="aa($event)">
    <div
      class="tab"
      :class="{'active':current==tab}"
      v-for="(tab, index) in tab_list"
      v-bind:key="index">
      {{tab}}
    </div>
  </div>
  <div v-show="current=='基础设置'">
    基础设置
  </div>
  <div v-show="current=='奖项设置'">
    奖项设置
  </div>
</div>
</template>

<script>
// import bus from 'assets/eventBus.js'
export default {
  data () {
    return {
      tab_list: ['基础设置', '奖项设置'],
      current: '基础设置'
    }
  },
  methods: {
    aa (e) {
      this.current = e.target.innerHTML
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
@import "~common/style/variable.less";

.panel {
  background-color: white;
}
.tab{
  border: 1px solid #e4e4e4;
  background: #f6f6f6;
  width: 20%;
  padding: 10px 20px;
}
.active{
  background: #fff;
  border-bottom: 1px solid #fff;;
}
</style>