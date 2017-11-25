//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        imgUrls: [
            'https://img.neisha.cc/2017/11/17/2f71aa1771694a26b8ec34af57f8871c.jpg',
            'https://img.neisha.cc/2017/11/20/34ff34e7410c4da3a2081a16a21394cb.jpg',
            'https://img.neisha.cc/2017/11/20/075bb8af5743408ba8344e56769baa62.jpg'
        ],
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
            { "navigator": "/pages/list/list?id=1", "title": "文本1", "imgurl": "https://img.neisha.cc/2017/5/13/dffc2d6bbf3645d9a4769f6edd2dd39d.jpg" },
            { "navigator": "/pages/list/list?id=1ffff", "title": "文本2", "imgurl": "https://img.neisha.cc/2017/5/13/82cbe37e3a74469881eb3005da12d6e2.jpg" },
            { "navigator": "/pages/list/list?id=1", "title": "文本3", "imgurl": "https://img.neisha.cc/2017/5/13/dffc2d6bbf3645d9a4769f6edd2dd39d.jpg" },
            { "navigator": "/pages/list/list?id=1", "title": "文本4", "imgurl": "https://img.neisha.cc/2017/5/13/9c2c399b68b24d54a9211b9da02a14f9.jpg" },
        ],
        list: [
            { "courseId": 1, "avatar": "https://img.neisha.cc/2017/9/1/ea6a450d0fb847cca77dfce8540f58a1.jpg@80p", "title": "标题", "startTime": 'fsdfsdfsd', "period": '5个月', "price": '4545' },
            { "courseId": 2, "avatar": "https://img.neisha.cc/2017/9/1/ea6a450d0fb847cca77dfce8540f58a1.jpg@80p", "title": "标题", "startTime": 'fsdfsdfsd', "period": '5个月', "price": '4545' },
        ], 
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
