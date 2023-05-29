
import request from "../../utils/request"

// pages/player/player.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playerList:[], //歌手数据
    area :[
      {
        "type": 1,
        "name": "内陆",
      },
      {
        "type":2,
        "name":"欧美",
      },
      {
        "type":3,
        "name":"韩国",
      },
    ], //地区属性
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPlayerList() ;
  },

  async getPlayerList(){
    let playerListData = await request("/toplist/artist", {type:1});
    console.log(playerListData)
    let result = playerListData.list.artists.slice(0, 10) ;
    this.setData({
      playerList:result ,
    }) ;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})