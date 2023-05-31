// pages/personal/personal.js
import request from "../../utils/request"
// 读取storage的数据

let StartY = 0 ;
let MoveY = 0 ;
let moveDistance = 0 ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(0)',
    coverTransition: '' ,
    UserInfo: {}, //用户信息
    recentPlayList: {}, //用户最近播放记录
  },

  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userinfor = wx.getStorageSync('userInfo')
    console.log(userinfor ) ;
    if (userinfor){
      this.setData({
        UserInfo:JSON.parse(userinfor)
      })
    }

    this.getUserTencentPlayList(this.data.UserInfo.userId)
    
  },

  async getUserTencentPlayList(userId){
    let recentPlayListData = await request("/user/record", {uid:userId, type:0}) ;
    let index = 0 ;
    let recentPlayList = recentPlayListData.allData.splice(0, 10).map(item=>{
      item.id = index ++ ;
      return item ;
    })
    this.setData({
      recentPlayList,
    })

  },

  handleTouchStart(event){
    StartY = event.touches[0].clientY ;
  } ,
  handleTouchMove(event) {
    MoveY = event.touches[0].clientY ;
    moveDistance = MoveY - StartY ;
    if ( moveDistance <= 0 ){
      return ;
    }
    if (moveDistance >= 80){
      moveDistance = 80 ;
    }
    this.setData({
      coverTransform:`translateY(${moveDistance}rpx)`
    })
  },
  handleTouchEnd(){
    this.setData({
      coverTransform:'translateY(0rpx)',
      coverTransition: 'transform 1s linear'
    })
  },

  // toRecommend(){
  //   wx.reLaunch({
  //     url: '/pages/recommendSong/recommendSong',
  //   })
  // },

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