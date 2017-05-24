//app.js
App({
    /*启动函数
    * */
    onLaunch: function () {
        var logs = wx.getStorageSync('logs') || [];     //调用API从本地缓存中获取数据
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);    //存入缓存
    },
    /*获取用户信息
    *   @param cb获取成功时的回调
    * */
    getUserInfo: function (cb) {
        var that = this;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            wx.login({      //调用登录接口
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo;
                            typeof cb == "function" && cb(that.globalData.userInfo);
                        }
                    })
                }
            })
        }
    },
    /*全局变量
    * */
    globalData: {
        userInfo: null
    }
});