var WxParse = require('../../wxParse/wxParse.js');
Page({
    data: {
    },

    onLoad: function (options) {
        var that = this;

        wx.request({
            url: 'https://m.zhiteer.com/api/product/detail',
            data: {
                product_sn: options.product_sn
            },
            success: function (res) {
                console.log(res.data.data)

                var article = res.data.data.info.description.description

                WxParse.wxParse('article', 'markdown', article, that, 5);

                that.setData({
                    product: res.data.data.info
                })
            },
        })
        

        
    }


})
