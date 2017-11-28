//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        hasAddress: false,
        address: [],
        test: '',
        goodsList: [],
        rent_period: 12,
        product_sn: '',
        leave_message: '',
        isCheckButton: false,

        rent_period: [],
        current_period: 12,
        rent_price: 999,
        rent_price_rate: 1, // 租金计算比率
        rent_price_per_month: 99, // 单价
        priceMonthSheet: [], // 标价

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
    
        var that = this;

        wx.showLoading({
            title: '加载中',
        })

        //加载内容

        this.setData({
            product_sn: options.product_sn
        })

        console.log(options.product_sn)

        wx.request({
            url: 'https://m.zhiteer.com/api/product/detail',
            data: {
                product_sn: options.product_sn
            },
            success: function (res) {

                console.log([res.data.data.info])

                that.setData({
                    product: res.data.data.info
                })

                that.setData({
                    goodList: [res.data.data.info],
                    rent_price: res.data.data.info.rent_price,
                    rent_price_rate: res.data.data.info.rent_price_rate,
                    current_period: res.data.data.info.rent_period,
                    rent_price_per_month: res.data.data.info.rent_price_per_month,
                    priceMonthSheet: res.data.data.priceMonthSheet
                })

            },
        })

        var rent_period = [
            {
                tab_title: '1个月',
                value: 1,
            },
            {
                tab_title: '2个月',
                value: 2,
            },
            {
                tab_title: '3个月',
                value: 3,
            },
            {
                tab_title: '5个月',
                value: 5,
            },
            {
                tab_title: '6个月',
                value: 6,
            },
            {
                tab_title: '12个月',
                value: 12,
            },
        ]

        this.setData({
            rent_period: rent_period,
        })

        setTimeout(function () {
            wx.hideLoading()
        }, 500)

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
