// pages/recommendSong/recommendSong.js

import request from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '',
    month: '',
    recommendSongs: [],
    index: '',
  },

    //获取用户每日推荐
    async getRecommendList(){
      let recommendListData = await request("/playlist/track/all?id=24381616&limit=20&offset=1") ;
      this.setData({
        recommendSongs: recommendListData.songs,
      });
    },

    // 跳转至toSongDetail页面
    toSongDetail(event){
      let {song,index} = event.currentTarget.dataset;
      this.setData({
        index
      })
      // 路由跳转传参 query参数
        wx.navigateTo({
          // 不能直接将song对象作为参数传递，太长会被截取掉
          url: '/pages/SongDetail/SongDetail?musicId=' + song.id,
          
        })
      },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    //判断用户是否登录
    let userInfo = wx.getStorageSync('userInfo')

    if (!userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        success: ()=> {
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      });


    }

    this.setData({
      day: new Date().getDate() ,
      month : new Date().getMonth() + 1 ,
    });

    this.getRecommendList() ;
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