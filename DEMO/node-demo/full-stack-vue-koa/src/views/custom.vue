<template>
  <div>
    <div class="tit">轮播图</div>
    <swipe></swipe>
    <div class="border"></div>
    <div class="tit">左滑删除</div>
    <LeftSlideDeletion></LeftSlideDeletion>
    <div class="border"></div>
    <div class="tit">待续...</div>
  </div>
</template>

<script>
import swipe from '@/components/swipe'
import LeftSlideDeletion from '@/components/LeftSlideDeletion'
export default {
  data () {
    return {
    }
  },
  components: {
    swipe,
    LeftSlideDeletion
  }
}
</script>

<style lang="sass" scoped>
  .tit
    font-weight: 600
    margin: 10px
    background: #ffa414
    text-align: center
    font-size: 18px
  .border
    border-top: 2px dashed #34495E
    margin: 20px 0
</style>
