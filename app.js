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
        console.log('调用');
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo);
            console.log('失败')
        } else {
            console.log('开始获取用户信息');
            wx.login({      //调用登录接口
                success: function () {
                    console.log('登录成功');
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
        userInfo: null,
        api: {
            showApi: {  //易源的
                appId: 28034,
                sign: '55f74716416141b1ac2d81797a321538',
                path: {
                    mix: 'https://route.showapi.com/341-2',  //搞笑图文
                    gif: 'https://route.showapi.com/341-3',     //搞笑gif
                    bot: 'https://route.showapi.com/60-27'
                }
            }
        }
    }
});