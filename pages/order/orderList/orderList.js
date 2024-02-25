// pages/orderList/orderList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    total: 0,
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: true, //文本框焦点
    orderStatus: false,
    hiddenmodalput: true, //初始化隐藏模态输入框
    beizhu:'', // 保存备注信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      orderStatus: app.globalData.orderStatus
    });
    console.log(JSON.parse(options.orderList));

    this.setData({
      orderList: JSON.parse(options.orderList)
    })
    let res = 0;
    for(let i = 0; i<this.data.orderList.length; i++){
      res += this.data.orderList[i].fprice;
    }
    this.setData({
      total: res
    })
  },
  click: function() {
    this.setData({ showPayPwdInput: true, payFocus: true });
  },
  ckeckOut: function() {
    
    console.log(this.data.orderList)
    let lists = [];
    let data = this.data.orderList;
    // let orderId = new Date().now() + ''
    for(let i=0; i<data.length; i++) {
      let obj = {dishId:data[i].dishId, number:data[i].num, amount:data[i].fprice, name:data[i].name
                  ,image:data[i].cover_pic
      };
      lists.push(obj);
    }
    let ans = {openid: app.globalData.openid, amount:this.data.total, orderDetails:lists};
    console.log(ans);

    wx.request({
      url: app.globalData.host + 'user/order/save',
      data: ans,
      header: {
        'authentication': app.globalData.token
      },
      method: "POST",
      success:(res)=>{
        console.log(res);
      }
    })

    let money = this.data.total;
    wx.navigateTo({
      url: '../orderList/pay/pay?money=' + money
    })

  },
  /**
   * 显示支付密码输入层
   */
  showInputLayer: function(){
    this.setData({ showPayPwdInput: true, payFocus: true });
  },
   /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function(){
    
    var val = this.data.pwdVal;

    this.setData({ showPayPwdInput: false, payFocus: false, pwdVal: '' });
    if(val.length==6){
      wx.showToast({
        title: '密码正确',
        
      })
    }

  },
  /**
   * 获取焦点
   */
  getFocus: function(){
    this.setData({ payFocus: true });
  },
    /**
   * 输入密码监听
   */
  inputPwd: function(e){
    this.setData({ pwdVal: e.detail.value });

    if (e.detail.value.length >= 6){
      this.hidePayLayer();
      this.ckeckOut();
    }
   },
   address() {
    wx.navigateTo({
      url: '../../mine/address/address',
    })
   },
   modalinput: function () {
    this.setData({
      //注意到模态框的取消按钮也是绑定的这个函数，
      //所以这里直接取反hiddenmodalput，也是没有毛病
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  confirm:function(){
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
    wx.showToast({
      title: '保存成功',
    })
  },
  bindinput:function(e) {
    this.setData({
      beizhu: e.detail.value
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