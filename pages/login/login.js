// pages/login/login.js
// 网易云他自己的database
// userInfo --Profile
import request from "../../utils/request"

//登录流程 
/**
 * 收集表单数据 
 * 前端验证
 *  1）验证用户信息是否合法 2）发送请求
 * 后端验证
 *  1）验证用户是否存在 2）用户账密是否匹配
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '', //手机号码
    captcha: '' ,//验证码
    password:'' ,//密码
    // 二维码 逻辑没理清楚
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  //vue 双向绑定 ---获取用户信息
  handleInput(event){
    let type = event.currentTarget.id ;
    console.log(type , event.detail.value) ;
    this.setData({
      [type]: event.detail.value ,
    }) ;
  },

  // 同步、异步
 // 发送验证码---GET
  async sendCaptcha(){
    if(!this.data.phone){
      wx.showToast({
        title: '手机号不能为空',
        icon:'none' ,
      }) ;
      return ;
    } 

    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if ( !phoneReg.test(this.data.phone)){
      wx.showToast({
        title: '手机号格式错误',
        icon:'none' ,
      }) ;
      return ;
    } 
     
    //发送请求，想投后台获取数据
    //解耦 ---降低关联度
    let result = await request('/captcha/sent', {phone: this.data.phone}) ;//请求头参数

    if (result.code == 200){
      wx.showToast({
        title: '验证码发送成功',
        icon:'success',
      }) ;
    }
  },


  async login(){
    // 1. 收集表单项的数据
    let {phone,captcha}=this.data;
    // 2. 前端验证 : 不能为空，号码正确
    if(!phone){
      // 提醒用户
      wx.showToast({
        title:"用户名不能为空！",
        icon:"none"
      });
      return;
    }
    // 正则表达式：号码正确
    let phoneReg=/^1(3|4|5|6|7|8|9)\d{9}$/;
    if(!phoneReg.test(phone)){
      // 提醒用户
      wx.showToast({
        title:"手机号格式错误！！",
        icon:"none"
      });
      return;
    }
    // 验证密码
    if(!captcha){
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none'
      })
      return;
    }
  
    // 后端验证
    let result = await request('/captcha/verify', {phone,captcha})
    if(result.code === 200){ // 登录成功
      console.log(result);
      wx.showToast({
        title: '登录成功'
      }) ;

      //跳转主页面
      wx.switchTab({
        url: '/pages/personal/personal',
      }) ;
   
    }else if(result.code === 400){
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
    }else if(result.code === 502){
      wx.showToast({
        title: '验证码错误',
        icon: 'none'
      })
    }else {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon: 'none'
      })
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