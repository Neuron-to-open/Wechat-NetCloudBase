// /pages/index/index.js
// 主页面索引
import request from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [], // 轮播图数据
    recommendList: [], // 推荐歌单
    topList: [], //排行榜数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let bannerListData = await request('/banner', {type : 2}) ;
    this.setData({
      bannerList: bannerListData.banners
    }) ;
    let recommendListData = await request('/personalized', {limit:10}) ;
    this.setData({
      recommendList: recommendListData.result,
    }) ;
    let topList = await request('/toplist') ;
    let resultArr =[] ;
    //歌单详情
    for(let i=0;i<5;i++){
      let topListId = topList.list[i].id ;
      let topListItem = await request('/playlist/detail',{id:topListId}) ;
      let weneed ={name:topListItem.playlist.name,tracks:topListItem.playlist.tracks.slice(0,3)} ;
      resultArr.push(weneed) ;
      this.setData({
        topListItem:resultArr,
      }) ;
  }

    this.setData({
      topList: resultArr ,
    }) ;

  },

  toRecommend(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
    })
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
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})