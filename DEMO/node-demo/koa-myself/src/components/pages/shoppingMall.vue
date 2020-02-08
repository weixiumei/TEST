<template>
  <div>
    <!-- search -->
    <van-row class="search-bar">
      <van-col span="3">
        <img src="@/assets/img/position.png" alt=""/>
      </van-col>
      <van-col span="16">
        <input type="text" class="search-input">
      </van-col>
      <van-col span="5">
        <van-button size="mini">查找</van-button>
      </van-col>
    </van-row>
    <!-- swipe -->
    <div class="swipe-area">
      <van-swipe :autoplay="2000">
      <van-swipe-item v-for="(bannerPic, index) in bannerPicArray" :key="index">
        <img v-lazy="bannerPic.imageUrl" />
      </van-swipe-item>
      </van-swipe>
    </div>
    <div class="meiPhone" v-for="(meiPhone, index) in meiPhones" :key="index">
      <img v-lazy="meiPhone">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      bannerPicArray: [
        {imageUrl: require('@/assets/img/1.png')},
        {imageUrl: require('@/assets/img/2.png')},
        {imageUrl: require('@/assets/img/3.png')},
        {imageUrl: require('@/assets/img/4.png')}
      ],
      meiPhones: []
    }
  },
  methods: {
    getLuPic () {
      // https://www.easy-mock.com/mock/5e1adba864a3c20d7f366d70/example/getLuPic
    }
  },
  created () {
    axios({
      url: 'https://www.easy-mock.com/mock/5e1adba864a3c20d7f366d70/example/getMeiPic',
      method: 'get'
    }).then(response => {
      console.log(response)
      if (response.status === 200) {
        this.meiPhones = response.data.photos
      }
    }, err => {
      console.log(err)
    })
  }
}
</script>

<style lang="less" scoped>
.search-bar{
  background: #e5017d;
  height: 2.2rem;
  line-height: 2.2rem;
  overflow: hidden;
  text-align: center;
  img{
    width: 1.5rem;
    margin: 0.35rem;
  }
  .search-input{
    width: 100%;
    height: 1.3rem;
    border: 0;
    border-bottom: 1px solid #fff;
    background: #e5017d;
    color: #fff;
  }
}
.swipe-area{
  clear: both;
  text-align: center;
  max-height: 12rem;
  overflow: hidden;
  img{
    width: 100%;
  }
}
.meiPhone{
  img{
    height: 200px;
  }
}
</style>
