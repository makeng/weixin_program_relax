//index.js
//获取应用实例
var app = getApp();

Page({
    data: {
        articleList: []
    },

    onLoad: function () {
        var that = this;
        wx.request({    //获取搞笑图文
            url: app.globalData.api.showApi.path.mix,
            data: {
                showapi_appid: app.globalData.api.showApi.appId,
                showapi_sign: app.globalData.api.showApi.sign,
                page: 1,
                maxResult: 10
            },
            success: function (data) {
                console.log( data.data.showapi_res_body.contentlist );
                that.setData({
                    articleList: data.data.showapi_res_body.contentlist
                });
            }
        });
    },

    tabClick: function (e) {

    }
});
