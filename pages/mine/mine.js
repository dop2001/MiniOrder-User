
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    navigatePath:[
      './address/address',
      './coupon/coupon',
      '../orderForm/orderForm',
      './store/store',
      './suggestion/suggestion',
      './aboutMe/aboutMe'
    ],
    point:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(app.globalData.openId);
    var id = app.globalData.openId;
    wx.request({
      url: 'https://order.mirai.zone/user/getUser/' + id,
      method: 'GET',
      success:(res=>{
        console.log(res);
        this.setData({
          point: res.data.data.point
        })
      })
    })
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
       //获取用户信息
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        // 发送用户昵称到后台
        // wx.request({
        //   url: 'url',
        // })
      }
    })
  },
  click(e) {
    // if(!this.data.hasUserInfo) {
    //   this.toast();
    //   return ;
    // }

    var id = e.currentTarget.dataset.id;
    var path = this.data.navigatePath[parseInt(id)];
   
    if(parseInt(id) == 2) {
      wx.switchTab({
        url: path
      })
    }
    else{
      wx.navigateTo({
        url: path
      })
    }
   
    
  },
  toast() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '还未登陆账户，请登陆后重新尝试',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          that.getUserProfile();
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
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
    var id = app.globalData.openId;
    wx.request({
      url: 'https://order.mirai.zone/user/getUser/' + id,
      method: 'GET',
      success:(res=>{
        console.log(res);
        this.setData({
          point: res.data.data.point
        })
      })
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