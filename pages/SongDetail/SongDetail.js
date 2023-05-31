// pages/SongDetail/SongDetail.js
import request from "../../utils/request"

const appinstance = getApp() ;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false ,//摇杆音乐是否播放
    song : {},
    musicId : '',
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log( options );
    let musicId = options.musicId ;
    console.log(musicId);
    this.getSongDetail(musicId) ;
  },

  async getSongDetail(musicId){
    let songData = await request('/song/detail', {ids :musicId})
    this.setData({
      song: songData.songs ,
      musicId: songData.songs[0].id,
    }) ;

    //动态修改窗口标题
    wx.setNavigationBarTitle({
      title: this.data.song[0].name,
    })
  },

  handleMusicPlay(){
    let isPlay = !this.data.isPlay ;
    this.setData({
      isPlay,
    }) ;
    this.musicControl(isPlay) ; 
  },

  //控制Music播放
  async musicControl(isPlay){
    let backgroundAudioManager = wx.getBackgroundAudioManager() ;
    if(isPlay){
      let musicUrl = await request('/song/url', {id:this.data.song[0].id});
      console.log(musicUrl);
      backgroundAudioManager.src = musicUrl.data[0].url;
      backgroundAudioManager.title = this.data.song[0].name ;

    }else{
      backgroundAudioManager.pause();
    }
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