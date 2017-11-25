//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        hasAddress: false,
        address: [],
        test:'',
        goodsList: [
            { 'pic':'http://imgcdn.zhiteer.com/images/products/e3bcd0348d9a07bb695b19d7297a3177.jpeg?imageView2/0/w/300'},
            
        ]
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },

    bindUserAddress: function () {
        var that = this;
        if (wx.chooseAddress) {
            wx.chooseAddress({
                success: function (res) {
                    console.log('获取地址成功')
                    console.log(res)
                    that.setData({
                        address: res,
                        hasAddress: true,
                        test: res.countyName
                    })
                },
                fail: function (res) {
                    console.log('获取地址失败')
                },
            })
        } else {
            // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
    },

    onLoad: function () {

    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },

})
