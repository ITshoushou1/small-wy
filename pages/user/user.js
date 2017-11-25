// pages/personal/personal.js

const app = getApp()

var that

Page({

    /**
     * 页面的初始数据
     */
    data: {
        nosrc: '../../images/nothing.png',
        userInfo: {},
        navbar: ['全部测评', '未完成', '已完成'],
        currentNavbar: 0,
        testList: [],
        hasUserInfo: false
    },
    
    /**
     * 切换 navbar
     */
    swichNav(e) {
        var qtype = e.currentTarget.dataset.idx + 1
        wx.showLoading({
            title: '加载中',
        })

        this.getTestList(app.globalData._3rd_session, qtype);

        setTimeout(function () {
            wx.hideLoading()
        }, 1000)

        console.log(e.currentTarget.dataset.idx)
        this.setData({
            currentNavbar: e.currentTarget.dataset.idx
        })
        // if (e.currentTarget.dataset.idx == 1 && this.data.latest_list.length == 0) {
        //   this.pullUpLoadLatest()
        // }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        //3rd session
        console.log('personal 3rd_session: ' + app.globalData._3rd_session)

        //默认获取所有已支付订单
        this.getTestList(app.globalData._3rd_session, 1);

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

        that = this

        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: (res) => {

                    app.globalData.userInfo = res.userInfo

                    var userInfo = res.userInfo
                    // 完善用户信息
                    wx.request({
                        url: app.globalData.baseUrl + '/api/emotion/improve',
                        data: {
                            _3rd_session: app.globalData._3rd_session,
                            nickname: userInfo.nickName,
                            language: userInfo.language,
                            city: userInfo.city,
                            province: userInfo.province,
                            country: userInfo.country,
                            sex: userInfo.gender,
                            headimgurl: userInfo.avatarUrl
                        },
                        success: function (res) {
                            console.log(res.data)
                        }
                    })

                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }


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
        this.getTestList(app.globalData._3rd_session, this.data.currentNavbar + 1);
        setTimeout(function () {
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        }, 1000)
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

    },

    /**
     * 获取用户所有测评订单
     */
    getTestList: function (_3rd_session, qtype) {
        var that = this;
        wx.request({
            url: app.globalData.baseUrl + "/api/emotion/orders",
            data: {
                _3rd_session: _3rd_session,
                qtype: qtype
            },
            success: function (res) {

                if (res.data.code == '200') {
                    console.log(res.data.data)
                    that.setData({
                        testList: res.data.data.list
                    })
                } else {
                    //console.log(res)
                }
            },
            fail: function (error) {
                // fail
                console.log(error)
            }
        })
    },

})