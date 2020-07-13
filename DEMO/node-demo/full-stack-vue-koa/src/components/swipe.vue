<template>
  <div>
    <!-- https://www.jianshu.com/p/366e374e108d -->
    <!-- 自动无缝滚动 -->
    <!-- 点击圆点切换图片 -->
    <!-- 左右按钮控制滚动 -->
    <div id="parent" :style="{width: imgWidth + 'px'}">
      <div id="uls" :style="{width: imgWidth + 'px'}">
        <!-- 图片轮播 -->
        <ul id="img_ul" :style="{width: (len+1)*imgWidth+'px', left: imageUlLeft+'px'}">
          <li v-for="(bannerPic, index) in bannerPicArray" :key="index" :style="{width: imgWidth + 'px'}">
            <img @click="slideToImg(index)" :src="bannerPic.imageUrl" :style="{width: imgWidth + 'px'}"/>
          </li>
          <!-- 跟着第一个图片 => 无缝滚动 -->
          <li>
            <img :src="bannerPicArray[0].imageUrl" :style="{width: imgWidth + 'px'}"/>
          </li>
        </ul>
        <!-- 小圆点 -->
        <ul id='litCir_ul'>
          <li v-for="i in len" :key="i" @click="slideToDot(i)" :class="{ 'active': i===active+1, 'quiet': i!=active+1 }"></li>
        </ul>
      </div>
      <!-- 左右按钮 -->
      <div id="buttons" :style="{display: btnShow ? 'block' : 'none'}">
        <span id="left" @click="left">&lt;</span>
        <span id="right" @click="right">&gt;</span>
        <div class="bg" @click="bg"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bannerPicArray: [
        {imageUrl: require('@/assets/img/1.png')},
        {imageUrl: require('@/assets/img/2.png')},
        {imageUrl: require('@/assets/img/3.png')},
        {imageUrl: require('@/assets/img/4.png')}
      ],
      imgWidth: 0,
      imageUlLeft: 0,
      active: 0,
      len: 0,
      rate: 15, // 一张图片的切换速度， 单位为px
      times: 1, // 切换速度的倍率
      gap: 2000, // 自动切换间隙， 单位为毫秒
      moveTimer: null, // 初始化一个移动定时器
      rotationTimer: null, // 初始化一个轮播定时器
      picN: 0, // 当前显示的图片下标
      cirN: 0, // 当前显示图片的小圆点下标
      btnShow: false
    }
  },
  watch: {
    // active () {
    //   this.roll()
    // }
  },
  methods: {
    roll () {
      var distance = this.imgWidth * this.active
      var that = this
      clearInterval(this.moveTimer)
      that.moveTimer = setInterval(() => {
        if (that.imageUlLeft >= -distance) {
          that.imageUlLeft += -that.rate
        } else {
          that.imageUlLeft = -distance
          if (that.active === that.len) {
            that.active = 0
            that.imageUlLeft = 0
          }
          clearInterval(that.moveTimer)
        }
      }, 10)
    },
    // 点击小圆点，滑动到对应图片
    slideToDot (i) {
      this.selectToImg(i - 1)
      setTimeout(() => {
        this.rotation()
      }, 2000)
    },
    // 点击图片，滑动到对应图片
    slideToImg (i) {
      this.selectToImg(i)
      this.btnShow = true
      this.$forceUpdate()
    },
    // 选中某图
    selectToImg (i) {
      clearInterval(this.moveTimer)
      clearInterval(this.rotationTimer)
      this.imageUlLeft = -this.imgWidth * i
      this.active = i
    },
    // 轮播调用
    rotation () {
      this.rotationTimer = setInterval(() => {
        this.active += 1
        this.active = this.active % 5
        this.roll()
      }, this.gap)
    },
    left () {
      this.selectToImg(((this.active - 1) < 0) ? (4 + (this.active - 1) % 4) : ((this.active - 1) % 4))
    },
    right () {
      this.selectToImg((this.active + 1) % 4)
    },
    bg () {
      this.btnShow = false
      this.rotation()
    }
  },
  mounted () {
    this.imgWidth = document.body.clientWidth
    this.len = this.bannerPicArray.length
    this.rotation()
  }
}
</script>

<style lang="scss" scoped>
#parent{
  position: relative;
  padding: 0;
  // width: 375px;
  height: 309px;
  #uls{
    position: relative;
    margin: 0;
    padding: 0;
    // width: 375px;
    height: 309px;
    overflow: hidden;
    z-index: 2;
    #img_ul{
      position: absolute;
      margin: 0;
      padding: 0;
      left: 0;
      top: 0;
      // width: 1875px;           /*多留出一张图片的宽度！*/
      list-style: none;
      li{
        float: left;
        margin: 0;
        padding: 0;
        // width: 375px;
        height: 309px;
        img{
          // width: 375px;
          height: 309px;
        }
      }
    }
    #litCir_ul{
      position: absolute;
      margin: 0;
      padding: 0;
      right: 10px;
      bottom: 10px;
      list-style: none;
      li{
        margin: 0;
        padding: 0;
        float: left;
        width: 15px;
        height: 15px;
        text-align: center;
        line-height: 20px;
        border-radius: 50%;
        margin-left:10px ;
        cursor: pointer;
      }
      li.active{
        background-color: white;
      }
      li.quiet{
        background-color: #1e90ff;
      }
    }
  }
  #buttons{
    margin: 0;
    padding: 0;
    span{
      position: absolute;
      width: 40px;
      height: 40px;
      top: 50%;
      margin-top: -20px;
      line-height: 40px;
      text-align: center;
      font-weight: bold;
      font-family: Simsun;
      font-size: 30px;
      border: 1px solid #fff;
      opacity: 0.3;
      cursor: pointer;
      color: #fff;
      background: black;
    }
    #left{
      left: 5px;
      z-index: 2;
    }
    #right{
      left: 100%;
      margin-left: -45px;
      z-index: 2;
    }
    .bg{
      background: red;
      opacity: 0;
      display: block;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      bottom: 0;
    }
  }
}
</style>
