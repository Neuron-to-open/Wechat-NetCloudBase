// 发送ajax请求 ajax
// nodejs 搭建一个本地服务器，使用网易云提供的官方api接口 --- 后端
// B/S
import config from "./config";
/*
* 1、封装功能函数
* 2、封装功能组件
* **/
// 封装ajax请求功能函数
export default (url,data={},method='GET')=>{
  return new Promise((resolve,reject)=>{
    // 1.初始化promise状态为pending
    // 2.执行异步任务
    wx.request({
      url:config.host+url, //http://localhost:3000/
      data,
      method,
      header:{
        cookie:wx.getStorageSync('cookies')?wx.getStorageSync('cookies').toString():''
      },
      // 3.根据异步任务的结果修改promise的状态
      success:(res)=>{
        // console.log('请求成功',res)
        // 登录请求,将用户的cookie保存至本地
        if (data.isLogin) {
          wx.setStorageSync('cookies', res.cookies)
        }
        resolve(res.data) //修改promise状态为成功为resolved
      },
      fail:(err)=>{
        console.log('请求失败',err)
        reject(err) //修改promise状态为失败状态 rejected
      },
    })
  })
}
