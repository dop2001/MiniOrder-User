// pages/orderForm/orderForm.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList:[],
    historyOrderList:[],
    uid: "",
    // uid: "",
    display:true,
    HZL_height:0,
    HZL_categories:[
      '自提单',
      '外卖单'
    ],
    HZL_swiper_ID:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      uid: app.globalData.openid
    });
    var that = this;
    console.log(this.data.uid);
     //高度大小
     wx.getSystemInfo({
      success: function (res) {
        var HZL_height = res.windowHeight - 53
        that.setData({
          HZL_height: HZL_height
        })
        console.log(HZL_height);
      }
    });

    console.log(app.globalData.openid)
    wx.request({
      url: app.globalData.host + 'user/order/getOrders',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'authentication': app.globalData.token
      }, 
      data: {  
        openid: app.globalData.openid
      },
      success:(res)=>{  
        console.log(res);
        this.setData({
          historyList: res.data.data
        })
      }
    })

    // wx.request({
    //   url: 'https://order.mirai.zone/order/getOrders',
    //   method: "POST",
    //   header: { "content-type":'application/x-www-form-urlencoded'},
    //   data: {
    //     uid:this.data.uid,
    //     otype: '0'
    //   },
    //   success:(res)=>{
    //     console.log(res);
    //     this.setData({
    //       historyList: res.data.data
    //     })
    //   },complete(res){
    //     let temp = that.data.historyList;
    //     for(let i=0; i<temp.length; i++){
    //       temp[i].uuid = "msxd" + temp[i].uuid.substring(3, 15);
    //     }
    //     that.setData({
    //       display:true,
    //       historyList:temp
    //     })
    //   }
    // });

    // wx.request({
    //   url: 'https://order.mirai.zone/order/getOrders',
    //   method: "POST",
    //   header: { "content-type":'application/x-www-form-urlencoded'},
    //   data: {
    //     uid:this.data.uid,
    //     otype: '1'
    //   },
    //   success:(res)=>{
    //     console.log(res);
    //     this.setData({
    //       historyOrderList: res.data.data
    //     })
    //   },complete(res){
    //     let temp = that.data.historyOrderList;
    //     for(let i=0; i<temp.length; i++){
    //       temp[i].uuid = "msxd" + temp[i].uuid.substring(3, 15);
    //     }
    //     that.setData({
    //       display:true,
    //       historyOrderList:temp
    //     })
    //   }
    // })

  },
  HZL_categories(e) {
    let temp = e.currentTarget.dataset;
    this.setData({
      HZL_swiper_ID: temp.index
    })
  },
  getInformation(e) {
    console.log(e.currentTarget.dataset.id);
    let temp = e.currentTarget.dataset.id;
    let date = e.currentTarget.dataset.date;
    let number = e.currentTarget.dataset.number;
    let otype = e.currentTarget.dataset.otype;
    wx.navigateTo({
      url: './orderListInfo/orderListInfo?id=' + temp +'&date=' + date +'&number=' + number + '&otype=' + otype
    })
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