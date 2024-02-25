// pages/orderForm/orderListInfo/orderListInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listId:0,
    number:"",
    date:"",
    orderList:[],
    display:false,
    str:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.otype=='0');
    if(options.otype=='0') {
      this.setData({
        str:'到店就餐'
      })
    }
    else{
      this.setData({
        str:'外卖点餐'
      })
    }
    this.setData({
      listId: options.id,
      number: options.number,
      date: options.date,
      oytpe: options.otype
    });

    wx.request({
      url: 'https://order.mirai.zone/order/getOrderByOid',
      method:"POST",
      header:{
            'content-type': 'application/x-www-form-urlencoded'
      },
      data:{"oid": this.data.listId},
      success:(res)=>{
        console.log(res);
        this.setData({
          orderList: res.data.data,
          display: true
        });
      }
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