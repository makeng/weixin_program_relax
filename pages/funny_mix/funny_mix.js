//index.js
//获取应用实例
var app = getApp();
var WXBizDataCrypt = require('utils/RdWXBizDataCrypt.js');  //解密文件
var AppId = 'wx4b765281b01f63c6';
var AppSecret = '4ed24e44e74b9c3b4025e3daeca3e70c';

Page({
    data: {

    },
    onLoad: function () {
        app.getUserInfo(function (data) {
            console.log( data );
            //获取步数
            wx.getWeRunData({
                success: function( data ){

                }
            });
        })
    },
    tabClick: function (e) {

    }
});
