// pages/mine/store/store.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    HZL_height:0,
    historyList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var HZL_height = res.windowHeight
        that.setData({
          HZL_height: HZL_height
        })
        console.log(HZL_height);
      }
    });
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
    wx.request({
      url: "https://order.mirai.zone/shop/getByUid",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uid: app.globalData.openId
      },
      success:(res)=>{
        console.log(res);
        this.setData({
          historyList: res.data.data 
        })
      }
    })

    
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