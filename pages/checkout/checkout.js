//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        hasAddress: false,
        address: [],
        test: '',
        goodsList: [
            {
                'product_title': '方法大师傅大师傅士大夫232134552士大夫发射点犯得上犯得上反对大师傅大师傅士大夫顶顶顶',
                'product_price': '19.0',
                'rent_period': 12,
                'pic': 'http://imgcdn.zhiteer.com/images/products/e3bcd0348d9a07bb695b19d7297a3177.jpeg?imageView2/0/w/300'
            },

        ],
        rent_period: 12,
        product_sn: '',
        leave_message: '',
        isCheckButton:false,
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },

    bindUserAddress: function () {
        var that = this;

        // 如果已经点击了 则返回
        if (that.data.isCheckButton) {
            return false;
        }

        that.setData({
            isCheckButton: true
        });
        setTimeout(function () {
            that.setData({
                isCheckButton: false
            });
        }, 2000);

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

    onLoad: function (options) {
    
        this.setData({
            rent_period: options.rent_period,
            product_sn: options.product_sn,
            leave_message: options.leave_message,
        })
    },

    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },

    /**
     * 下单
     */
    makeOrder: function (e) {
        var that = this

        // 如果已经点击了 则返回
        if (that.data.isCheckButton) {
          return false;
        }

        that.setData({
          isCheckButton: true
        });
        setTimeout(function () {
          that.setData({
            isCheckButton: false
          });
        }, 2000);
    
        console.log(that.data.address)

        wx.request({
            url: 'https://m.zhiteer.com/api/order/make',
            data: {
                phone: that.data.address.telNumber,
                rent_period: that.data.rent_period,
                product_sn: that.data.product_sn,
                realname: that.data.address.userName,
                address: that.data.address.detailInfo,
                leave_message: that.data.leave_message
            },
            success: function (res) {
                console.log(res);
                if (res.data.code != '200') {
                    wx.showToast({
                        title: res.data.msg,
                        image: '/images/x_alt.png',
                    })
                } else {
                    wx.showToast({
                        title: '下单成功！',
                    })
                    wx.navigateTo({
                        url: '/pages/success/success',
                        success: function(res) {},
                        fail: function(res) {},
                        complete: function(res) {},
                    })
                }
            }
        })
    }

})
