// app.js
App({
  globalData: {
   host: "http://localhost:8080/",
   openid: null,
   token: null,
   userInfo: null,
   addressInfo:{         //地址信息
    "consigneeName":"",
    "phone": "",
    "consigneeRegion":"",
    "detailedAddress":"" 
   },
  },
  onLaunch(){

    // this.getOpenid()
    // 获取用户唯一标识符openid


  },
  getOpenid(){
    var that = this
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          if(res.code) {
            wx.request({
              url: that.globalData.host + "user/user/login",
              method: "POST",
              data: {
                code: res.code
              },
              success(res) {
                console.log(res)
                that.globalData.openid = res.data.data.openid
                that.globalData.token = res.data.data.token
                resolve(res.data)
              }
            })
          } else {
            console.log('登录失败！'+ res.errMsg)
          }
        },
      })
    })

  }

})
