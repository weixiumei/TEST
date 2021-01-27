// pages/word/word.js
var wordList = require('../../public/word')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startIndex: 0,
    endIndex: 30,
    wordList: wordList.slice(0, 30)
  },

  getWordList: function () {
    this.setData({
      wordList: wordList.slice(this.data.startIndex, this.data.endIndex)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
    this.setData({
      startIndex: this.data.startIndex <= 30 ? 0 : this.data.startIndex - 30,
      endIndex: this.data.endIndex <= 60 ? 30 : this.data.endIndex - 30
    })
    this.getWordList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onPullDownRefresh')
    if (this.data.endIndex === wordList.length) {
      return
    }
    this.setData({
      startIndex: this.data.startIndex + 30,
      endIndex: this.data.endIndex + 30
    })
    this.getWordList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})