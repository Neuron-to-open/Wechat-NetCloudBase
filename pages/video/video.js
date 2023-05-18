import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[], //导航标签数据
    navId:'', //导航标签的id标识
    videoList:[], //视频列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getVideoGroupList()
  },

  // 获取导航标签数据的功能函数
  async getVideoGroupList(){
    let result=await request('/video/group/list')
    // 更新videoGroupList的数据
    // slice splice(会影响原数组)
    this.setData({
      videoGroupList:result.data.slice(0,14),
      navId:result.data[0].id
    })
    this.getVideoList(this.data.navId)
  },

  // 获取视频列表数据的功能函数
  async getVideoList(navId){
    let videoListData=await request('/video/group',{id:navId})
    // console.log(videoListData)
    // 更新videoList状态数据
    let index=0
    // 若videoListData.data有值，使用map方法加工这个数组，给item添加一个唯一的id用于标识当前的item，注意加工完的item需要返回
    if (videoListData.datas) {
      let videoList=videoListData.datas.map(item=>{
        item.id=index++
        return item
      })
      this.setData({
        videoList
      })
    }
  },

  // 点击导航切换的回调
  changeNav(event){
    let navId=event.currentTarget.id
    this.setData({
      navId:Number(navId)
    })
    // 获取最新的视频列表数据
    this.getVideoList(this.data.navId)
  },
  })
