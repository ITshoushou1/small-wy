// pages/detail/detail.js

var WxParse = require('../../wxParse/wxParse.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            'https://img.neisha.cc/2017/11/17/2f71aa1771694a26b8ec34af57f8871c.jpg',
            'https://img.neisha.cc/2017/11/20/34ff34e7410c4da3a2081a16a21394cb.jpg',
            'https://img.neisha.cc/2017/11/20/075bb8af5743408ba8344e56769baa62.jpg'
        ],

        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        imgheights: [],
        current: 0,
        //图片宽度  
        imgwidth: 750,
        imgheight: 500,

        navbar: ['流程', '商品详情', '用户评论'],
        currentNavbar: 0,

        product_sn: '',
        product: {},

        rent_period: [],
        current_period: 12,
        rent_price: 999,
        rent_price_rate: 1, // 租金计算比率
        rent_price_per_month: 99, // 单价
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

    /**
     * 切换 navbar
     */
    swichNav(e) {
        var qtype = e.currentTarget.dataset.idx + 1
        wx.showLoading({
            title: '加载中',
        })

        //加载内容

        setTimeout(function () {
            wx.hideLoading()
        }, 500)

        console.log(e.currentTarget.dataset.idx)
        this.setData({
            currentNavbar: e.currentTarget.dataset.idx
        })
        
    },

    bindChangePeriod: function (e) {
        var period = e.target.dataset.period
        var rent_price = 1111;

        console.log(period)
        console.log(rent_price)

        this.setData({
            current_period: e.target.dataset.period,
            rent_price: rent_price
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
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
            success: function(res) {

                console.log(res.data.data)

                that.setData({
                    product:res.data.data.info
                })

                var article = res.data.data.info.description.description

                WxParse.wxParse('article', 'markdown', article, that, 5);

                that.setData({
                    product: res.data.data.info,
                    rent_price: res.data.data.info.rent_price,
                    rent_price_rate: res.data.data.info.rent_price_rate,
                    current_period: res.data.data.info.rent_period,
                    rent_price_per_month: res.data.data.info.rent_price_per_month,
                })

            },
        })

        var rent_period = [
            {
                tab_title: '1个月',
                value: 1,
                selected: false
            },
            {
                tab_title: '2个月',
                value: 2,                
                selected: false
            },
            {
                tab_title: '3个月',
                value: 3,                
                selected: false
            },
            {
                tab_title: '5个月',
                value: 5,     
                selected: false
            },
            {
                tab_title: '6个月',
                value: 6,     
                selected: false
            },
            {
                tab_title: '12个月',
                value: 12,     
                selected: false
            },
        ]

        this.setData({
            
            rent_period: rent_period,
            
        })


        setTimeout(function () {
            wx.hideLoading()
        }, 500)
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: this.data.product.product_title,
            path: '/page/detail/detail?product_sn=' + this.data.product.product_sn,
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },

    formSubmit: function (e) {
        var url = "/pages/checkout/checkout?product_sn=" + this.data.product.product_sn + '&rent_period=' + this.data.current_period 
        console.log(url)
        wx.navigateTo({
            url: url
        })
    },
    formReset: function () {
        console.log('form发生了reset事件')
    },

})