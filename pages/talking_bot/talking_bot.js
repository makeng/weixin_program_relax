//index.js
//获取应用实例
var app = getApp();

Page({
    data: {
        botTalk: []
    },

    onLoad: function () {
        this.talkToBot('你好', 1);
    },

    /*  给聊天机器人发送聊天
    *   @param info聊天语句 id对应用户
    * */
    talkToBot: function(info, userid){
        var that = this;
        wx.request({    //发送给机器人的聊天
            url: app.globalData.api.showApi.path.bot,
            data: {
                showapi_appid: app.globalData.api.showApi.appId,
                showapi_sign: app.globalData.api.showApi.sign,
                info: info,
                userid: userid
            },
            success: function (data) {
                var text = data.data.showapi_res_body.text;
                that.setData({
                    botTalk: that.data.botTalk.unshift(text)    //压入话语
                });
            }
        });
    },

    tabClick: function (e) {

    }
});
