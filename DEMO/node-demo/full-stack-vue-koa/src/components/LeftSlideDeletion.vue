<template>
  <div>
    <div class="list">
      <div
        class="item"
        :style="{marginLeft: itemMarginLeft + 'px'}"
        @touchstart="gotouchstart"
        @touchmove="gotouchmove"
        @touchend="gotouchend">
        <div>超炫朋克牛仔裤</div>
        <div>$1,200</div>
      </div>
      <div class="delete" :style="{left: delLeft+'px'}">删除</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      delLeft: 0,
      itemMarginLeft: 0,
      touchStart: 0,
      touchMove: 0
    }
  },
  methods: {
    gotouchstart (e) {
      this.touchStart = e.touches[0].pageX
      this.touchMove = e.touches[0].pageX
    },
    gotouchmove (e) {
      this.touchMove = e.touches[0].pageX
      if (this.touchStart - this.touchMove > 60) {
        this.delLeft = this.width - 60
        this.itemMarginLeft = -62
      } else {
        this.delLeft = this.width - (this.touchStart - this.touchMove)
        this.itemMarginLeft = -this.width - (this.touchStart - this.touchMove)
      }
    },
    gotouchend (e) {
      if (this.touchStart - this.touchMove > 30) {
        this.delLeft = this.width - 60
        this.itemMarginLeft = -62
      } else {
        this.delLeft = this.width
        this.itemMarginLeft = 0
      }
    }
  },
  created () {
    this.width = document.body.clientWidth
    this.delLeft = this.width
    this.itemMarginLeft = 0
  }
}
</script>

<style lang="scss" scoped>
  .list{
    overflow: hidden;
    position: relative;
    .item{
      border: 1px solid #34495e;
      border-radius: 3px;
      padding: 6px;
    }
    .delete{
      width: 60px;
      color: #fff;
      background: #ee0a24;
      position: absolute;
      top: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
</style>
