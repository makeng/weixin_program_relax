//index.js
//获取应用实例
var app = getApp();

Page({
    data: {
        articleList: []
    },
    onLoad: function () {
        var that = this;
        wx.request({
            url: 'https://route.showapi.com/341-3',
            data: {
                showapi_appid: 28034,
                showapi_sign: '55f74716416141b1ac2d81797a321538',
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
