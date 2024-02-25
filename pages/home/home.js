// pages/home/home.js
var app = getApp();

Page({

  data: {
    // 轮播图url列表
    carouselImgUrls:[]
  },
  onShow(){
    // 获取轮播图
    if(app.globalData.openid == null) {
      // 异步：Jwt令牌需要先获取，否则会被后端拦截
      app.getOpenid().then(res => {
        this.getAllSwiper(res.data.token)
      })
    } else { 
      this.getAllSwiper(app.globalData.token)
    }
    
  },
  getAllSwiper(token) {
    var that = this
    wx.request({
      url: app.globalData.host + 'user/swiper/all',
      method: 'GET',
      header: {
        'authentication': token
      },
      success(res){
        console.log(res)
        var images = []
        var data = res.data.data
        data.forEach((item, index) => {
          images.push(item.image)
        })
        that.setData({
          carouselImgUrls: images
        })
      }
    })
  }

})