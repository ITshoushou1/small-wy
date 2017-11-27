//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        slideList: {},
        hotList: {},
        plist: {},
        info:[],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        imgheights: [],
        current: 0,
        //图片宽度  
        imgwidth: 750,
        imgheight: 500,
        nav: [
            { "navigator": "/pages/list/list?id=1", "title": "冰箱", "imgurl": "https://img.neisha.cc/2017/5/13/dffc2d6bbf3645d9a4769f6edd2dd39d.jpg" },
            { "navigator": "/pages/list/list?id=3", "title": "洗衣机", "imgurl": "https://img.neisha.cc/2017/5/13/9c2c399b68b24d54a9211b9da02a14f9.jpg" },
            { "navigator": "/pages/list/list?id=2", "title": "智能产品", "imgurl": "https://img.neisha.cc/2017/5/13/82cbe37e3a74469881eb3005da12d6e2.jpg" },

        ],
        plist: {}, 
    },

    imageLoad: function (e) {
        //获取图片真实宽度  
        var imgwidth = e.detail.width,
            imgheight = e.detail.height,
            //宽高比  
            ratio = imgwidth / imgheight;
        console.log(imgwidth, imgheight)
        //计算的高度值  
        var viewHeight = 750 / ratio;
        var imgheight = viewHeight
        var imgheights = this.data.imgheights
        //把每一张图片的高度记录到数组里  
        imgheights.push(imgheight)
        this.setData({
            imgheights: imgheights,
        })
    },
    bindchange: function (e) {
        console.log(e.detail.current)
        this.setData({ current: e.detail.current })
    },
    //事件处理函数
    bindViewTap: function (e) {
        var url = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: url
        })
    },
    onLoad: function () {

        var that = this;

        wx.showLoading({
            title: '加载中...',
        })

        wx.request({
            url: 'https://m.zhiteer.com/api/home/slide',
            success: function(res) {
                console.log(res.data.data.list)
                that.setData({
                    slideList:res.data.data.list
                })
                that.slideList = res.data.data.list
            },
        })


        wx.request({
            url: 'https://m.zhiteer.com/api/home/plist',
            success: function (res) {
                console.log(res.data.data.list)
                that.setData({
                    plist: res.data.data.list
                })
                that.plist = res.data.data.list
            },
        })

        wx.request({
            url: 'https://m.zhiteer.com/api/home/hot',
            success: function(res) {
                console.log(res.data.data.list)
                that.setData({
                    hotList:res.data.data.list
                })
                that.hotList = res.data.data.list
            },
        })

        wx.request({
            url: 'https://m.zhiteer.com/api/home/plist',
            success: function(res) {
                console.log(res.data.data.list)
                that.setData({
                    plist:res.data.data.list
                })
                that.plist = res.data.data.list
            },
        })

        wx.request({
            url: 'https://m.zhiteer.com/api/home/info',
            success: function(res) {
                console.log(res.data.data)
                that.setData({
                    info:res.data.data
                })
                that.info = res.data.data
            },
        })

        wx.hideLoading();
        // if (app.globalData.userInfo) {
        //   this.setData({
        //     userInfo: app.globalData.userInfo,
        //     hasUserInfo: true
        //   })
        // } else if (this.data.canIUse){
        //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //   // 所以此处加入 callback 以防止这种情况
        //   app.userInfoReadyCallback = res => {
        //     this.setData({
        //       userInfo: res.userInfo,
        //       hasUserInfo: true
        //     })
        //   }
        // } else {
        //   // 在没有 open-type=getUserInfo 版本的兼容处理
        //   wx.getUserInfo({
        //     success: res => {
        //       app.globalData.userInfo = res.userInfo
        //       this.setData({
        //         userInfo: res.userInfo,
        //         hasUserInfo: true
        //       })
        //     }
        //   })
        // }
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    calling: function () {
        wx.makePhoneCall({
            phoneNumber: '13650962253',
            success: function () {
                console.log("拨打电话成功！")
            },
            fail: function () {
                console.log("拨打电话失败！")
            }
        })
    }  
})
