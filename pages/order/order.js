// pages/order/order.js
var app = getApp()

// 右侧每一类的 bar 的高度（固定）
const RIGHT_BAR_HEIGHT = 20;   
// 右侧每个子类的高度（固定）
const RIGHT_ITEM_HEIGHT = 100;   
// 左侧每个类的高度（固定）
const LEFT_ITEM_HEIGHT = 50       

Page({
  data: {
   //是否显示下面的购物车
    constants:[],
    HZL_isCat:0,
    //购物车的商品
    HZL_my_cat:[],
    // 购物车的数量
    HZL_num:0,
    //分类的数组
    HZL_categories: [
      '点单',
      '评论'
    ],
    total:0,
    //swiper滑动的数组
    HZL_swiper_ID:0,     
    // 左 => 右联动 右scroll-into-view 所需的id
    HZL_toView: null,  
    // 当前左侧选择的
    HZL_currentLeftSelect: null,   
    // 右侧每类数据到顶部的距离（用来与 右 => 左 联动时监听右侧滚动到顶部的距离比较）
    HZL_eachRightItemToTop: [],       
    HZL_leftToTop: 0,
    navbarHeight:'',
    cartHeight:'',
    dibuche:'',
    myaddress:'北京市朝阳区',
    mchId:'',
    latitude:'',
    longitude:'',
    mch_id:'',
    mch:{
      name:'美食小店',
      distance:'0.3',
      goods_num:56,
      is_delivery:1,
      total_money:0,
      delivery_money:0
    },
    commont:[],
    myparentIndex:'0',
    myindex:'0',
    mytiname: ""
  },
  getAllDish() {
    wx.request({
      url: app.globalData.host + 'user/dish/allDish',
      method: 'GET',
      header: {
        'authentication': app.globalData.token
      },
      success:(res)=>{
        console.log(res.data)
        this.setData({
          constants: res.data.data,
          HZL_currentLeftSelect: res.data.data[0].id,
          HZL_eachRightItemToTop: this.HZL_getEachRightItemToTop()
        })
      }, fail:(res)=>{
        console.log('请求服务器菜单数据失败');
      }
    })
  },
  onLoad: function (t) {
    this.getAllDish()
    // var that = this;
    var a = this;
    // getApp().page.onLoad(a, t);
    console.log(t)
    if(t.mch_id){
      a.setData({
        mch_id:t.mch_id
      })
    }

    var query = wx.createSelectorQuery();
    //选择id
    
    query.select('.zongFather').boundingClientRect(function (rect) {
      console.log(rect)    
        a.setData({
          mymarginTop: rect.height
        })   
    }).exec();
    //高度大小
    wx.getSystemInfo({
      success: function (res) {
        var HZL_height = res.windowHeight - 260
        var HZL_height1 = res.windowHeight - 210
        a.setData({
          HZL_height: HZL_height,
          HZL_height1: HZL_height1
        })
      }
    });
   
    // a.getLocation()  //获取地理位置
   
    
  },
  yue:function(){
    var query = wx.createSelectorQuery();
    var a = this
    //选择id
    query.select('.zongFather').boundingClientRect(function (rect) {
      console.log(rect)
      if (rect) {
        a.setData({
          mymarginTop: rect.height
        }) 

        a.dibu()
      } else {
        a.setData({
          mymarginTop: rect.height
        }) 
        a.dibu()

      }

    }).exec();
  },
    //打开规则提示
    showRule: function (e) {
      console.log(e)
      var index = e.currentTarget.dataset.index;   //当前下标
      var parentIndex = e.currentTarget.dataset.parentindex;    //左侧下标
      console.log(index)
      console.log(parentIndex)
      console.log(this.data.constants[parentIndex].category[index])
      this.setData({
        isRuleTrue: true,
        myindex:e.currentTarget.dataset.index,
        myparentIndex : e.currentTarget.dataset.parentindex,
        myuunum:this.data.constants[parentIndex].category[index].num,
        // 设置弹窗图片地址
        myCover_pic: this.data.constants[parentIndex].category[index].img,   
        mytiname: this.data.constants[parentIndex].category[index].fname,
        myshouchu: this.data.constants[parentIndex].category[index].sale,
        myxianjia:this.data.constants[parentIndex].category[index].fprice,
        myyuanjia:this.data.constants[parentIndex].category[index].fprice + 5
      
      })
    },
    //关闭规则提示
    hideRule: function () {
      this.setData({
        isRuleTrue: false
      })
    },
  //获取经纬度
  getLocation: function (e) {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude:latitude,
          longitude:longitude
        })
        that.list()
      }
    })
  },

  //预览图片，放大预览
  preview(e) {
    console.log(e.currentTarget.dataset.src)
    let currentUrl = e.currentTarget.dataset.current
    var imglist = e.currentTarget.dataset.urls
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: imglist // 需要预览的图片http链接列表
    })
  },
  // 底部结算距离底距离
  dibu:function(){
    //高度大小
    var a = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        var query = wx.createSelectorQuery();
        query.select('.HZL_cat').boundingClientRect(function (rect) {
          console.log(rect.height)
          a.setData({
            cartHeight:rect.height
          })
          a.carhe()
        }).exec();
      }
    });
  },
  carhe:function(){
    this.setData({
      dibuche:parseInt(this.data.navbarHeight)+parseInt(this.data.cartHeight)
    })
  },
  onShow: function () {


  },

  //记录swiper滚动的
  HZL_swiperchange: function(e){
    var that = this;
    that.setData({
      HZL_swiper_ID: e.detail.current,
    })
  },
  //点击分类栏
  HZL_categories:function(e){
    var that = this;
    that.setData({
      HZL_swiper_ID: e.currentTarget.dataset.index
    })
  },

  // 获取每个右侧的 bar 到顶部的距离，用来做后面的计算。
  HZL_getEachRightItemToTop: function () {  
    var obj = {};
    var totop = 0;
    var constants  = this.data.constants
    // console.log(constants)
    if(constants.length == 0){
      return false;
    }
     // 右侧第一类肯定是到顶部的距离为 0
    obj[constants[0].id] = totop     
    // 循环来计算每个子类到顶部的高度
    for (let i = 1; i < (constants.length + 1); i++) {  
      totop += (RIGHT_BAR_HEIGHT + constants[i - 1].category.length * RIGHT_ITEM_HEIGHT)
      // 这个的目的是 例如有两类，最后需要 0-1 1-2 2-3 的数据，所以需要一个不存在的 'last' 项，此项即为第一类加上第二类的高度。
      obj[constants[i] ? constants[i].id : 'last'] = totop    
    }
    return obj
  },
  // 监听右侧的滚动事件与 HZL_eachRightItemToTop 的循环作对比 从而判断当前可视区域为第几类，从而渲染左侧的对应类。
  right: function (e) {
    // console.log(e)
    for (let i = 0; i < this.data.constants.length; i++) {
      let left = this.data.HZL_eachRightItemToTop[this.data.constants[i].id]
      let right = this.data.HZL_eachRightItemToTop[this.data.constants[i + 1] ? this.data.constants[i + 1].id : 'last']
      // console.log(left)
      // console.log(right)
      if (e.detail.scrollTop < right && e.detail.scrollTop >= left) {
        console.log(this.data.constants[i].id)
        this.setData({
          HZL_currentLeftSelect: this.data.constants[i].id,
          HZL_leftToTop: LEFT_ITEM_HEIGHT * i
        })
      }
    }
  },
  // 左侧类的点击事件，点击时，右侧会滚动到对应分类
  left: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    var ids = 'id' + id
    console.log(ids)
    this.setData({
      HZL_toView: ids,
      HZL_currentLeftSelect: id
    })
  },


  //是否显示下面的购物车
  HZL_isCat:function(e){
    var that = this;
    if (that.data.HZL_isCat == 0 && that.data.HZL_num > 0) {
      that.setData({
        HZL_isCat: 1
      })
    } else if (that.data.HZL_isCat == 1 && that.data.HZL_num > 0) {
      that.setData({
        HZL_isCat: 0
      })
    }
  },

  //关闭
  HZL_isCat_close:function(e){
    this.setData({
      HZL_isCat: 0
    })
  },

  //清空
HZL_zero:function(e){

  var that = this;
  wx.showModal({
    content:'确定要清空购物车吗？',
      success(res) {
        if (res.confirm) {
          for (var i = 0; i < that.data.constants.length; i++) {
            for (var j = 0; j < that.data.constants[i].category.length; j++) {
              that.data.constants[i].category[j].num = 0
            }
          }
          that.setData({
            HZL_isCat: 0,
            HZL_num: 0,
            HZL_my_cat: [],
            total:0,
            constants: that.data.constants,
          })
        }

      }
  })

    
},
//  总价
  totalPrice:function(){
    var mycat = this.data.HZL_my_cat
    console.log(mycat)
    var total = 0
    for(var i=0;i<mycat.length;i++){
      total+=parseFloat(mycat[i].fprice)
    }
    console.log(total)
    this.setData({
      total:total.toFixed(2)
    })
  },
  // 增加
  HZL_jia:function(e){
    var index = e.currentTarget.dataset.index;   //当前下标
    var parentIndex = e.currentTarget.dataset.parentindex;    //左侧下标
    console.log(index)
    console.log(parentIndex)
    var that = this
    var constants = that.data.constants
    // constants[parentIndex].category[index].num = this.data.constants[parentIndex].category[index].num
   
    var HZL_my_cat = that.HZL_my_jia(parentIndex, index)
    that.setData({
      HZL_num: that.data.HZL_num,
      HZL_my_cat: HZL_my_cat,
      constants: that.data.constants,
    })
    that.totalPrice()
    console.log(that.data.constants[that.data.myparentIndex].category[that.data.myindex].num)
    that.setData({
        myuunum:that.data.constants[that.data.myparentIndex].category[that.data.myindex].num
    })
  },

  //减少
  HZL_jian:function(e){
    var index = e.currentTarget.dataset.index;
    var parentIndex = e.currentTarget.dataset.parentindex;
    var HZL_my_cat = this.HZL_my_jian(parentIndex, index)

    if (this.data.HZL_num == 0) {
      this.data.HZL_isCat = 0;
    } else {
      this.data.HZL_isCat = 1;
    }

    this.setData({
      HZL_num: this.data.HZL_num,
      HZL_my_cat: HZL_my_cat,
      constants: this.data.constants,
    })
    this.totalPrice()
    this.setData({
      myuunum:this.data.constants[this.data.myparentIndex].category[this.data.myindex].num
  })
  },

  // 下面购物车增加
  HZL_jia1: function (e) {
    var index = e.currentTarget.dataset.index;
    var parentIndex = e.currentTarget.dataset.parentindex;
    var HZL_my_cat = this.HZL_my_jia(parentIndex, index)
    // var mynum = this.data.constants[this.data.myparentIndex].goodsLlist[this.data.myindex].num
    // console.log(mynum)
    this.setData({
      HZL_num: this.data.HZL_num,
      HZL_my_cat: HZL_my_cat,
      constants: this.data.constants,
    })
    this.totalPrice()
  },

  //下面购物车减少
  HZL_jian1: function (e) {
    var index = e.currentTarget.dataset.index;
    var parentIndex = e.currentTarget.dataset.parentindex;
    console.log(index)
    console.log(parentIndex)
    var HZL_my_cat = this.HZL_my_jian(parentIndex, index)

    if (this.data.HZL_num == 0) {
      this.data.HZL_isCat = 0;
    } else {
      this.data.HZL_isCat = 1;
    }

    this.setData({
      HZL_num: this.data.HZL_num,
      HZL_my_cat: HZL_my_cat,
      constants: this.data.constants,
      HZL_isCat: this.data.HZL_isCat
    })
    this.totalPrice()
  },

  //封装加的方法
  HZL_my_jia: function (parentIndex, index) {
    this.data.HZL_num++;
    var index = index;
    var parentIndex = parentIndex;
    var dishId = this.data.constants[parentIndex].category[index].id;
    var name = this.data.constants[parentIndex].category[index].fname;
    var cover_pic = this.data.constants[parentIndex].category[index].img;
    var num = ++this.data.constants[parentIndex].category[index].num ;
    var fprice = num * this.data.constants[parentIndex].category[index].fprice;
    var fid = this.data.constants[parentIndex].category[index].fid;
    //弄一个元素判断会不会是重复的
    var mark = 'a' + index + 'b' + parentIndex + 'c' + '0' + 'd' + '0'
    var obj = { dishId:dishId,num: num,fprice:fprice, name: name,mark: mark, index: index, parentIndex: parentIndex,fid:fid,cover_pic:cover_pic};

    var HZL_my_cat = this.data.HZL_my_cat;
    HZL_my_cat.push(obj)

    var arr = [];
    //去掉重复的
    for (var i = 0; i < HZL_my_cat.length; i++) {
      if (obj.mark == HZL_my_cat[i].mark) {
        HZL_my_cat.splice(i, 1, obj)
      }
      if (arr.indexOf(HZL_my_cat[i]) == -1) {
        arr.push(HZL_my_cat[i]);
      }
    }

    return arr
  },

  //封装减的方法
  HZL_my_jian: function (parentIndex, index) {
    this.data.HZL_num--;
    var index = index;
    var parentIndex = parentIndex;
    var dishId = this.data.constants[parentIndex].category[index].id;
    var name = this.data.constants[parentIndex].category[index].fname;
    var cover_pic = this.data.constants[parentIndex].category[index].img;
    var num = --this.data.constants[parentIndex].category[index].num;
    var fprice = num * this.data.constants[parentIndex].category[index].fprice;
    var img = this.data.constants[parentIndex].category[index].img;

    //弄一个元素判断会不会是重复的
    var mark = 'a' + index + 'b' + parentIndex + 'c' + '0' + 'd' + '0'
    var obj = { dishId:dishId, num: num,fprice:fprice, name: name, mark: mark, index: index, parentIndex: parentIndex,cover_pic:cover_pic};
    var HZL_my_cat = this.data.HZL_my_cat;
    HZL_my_cat.push(obj)

    var arr = [];
    //去掉重复的
    for (var i = 0; i < HZL_my_cat.length; i++) {
      if (obj.mark == HZL_my_cat[i].mark) {
        HZL_my_cat.splice(i, 1, obj)
      }
    }
    

    var arr1 = [];
    //当数量大于1的时候加
    for (var i = 0; i < HZL_my_cat.length; i++) {
      if (arr1.indexOf(HZL_my_cat[i]) == -1) {
        arr1.push(HZL_my_cat[i]);
        if (HZL_my_cat[i].num > 0) {
          arr.push(arr1[i])
        }
      }
    }

    return arr
  },
  gotoMoney: function() {
    let arr = this.data.HZL_my_cat;
    console.log(arr)
    if(arr.length == 0) {
      wx.showToast({
        title: '购物车为空',
        icon: 'error',
        mask: true
      })
      return ;
    }
    wx.navigateTo({
      url: 'orderList/orderList?orderList=' + JSON.stringify(arr)
    })
  },
  fresh() {
    this.getAllDish()
  }

})