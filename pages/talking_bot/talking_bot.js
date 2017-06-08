//index.js
//获取应用实例
var app = getApp();

Page({
    data: {
        talk: [     //聊天信息
            {
                isBot: false,
                sentence: '你好'
            },
            {
                isBot: true,    //语句是否属于机器人
                sentence: '你好，我是聪明的图灵聊天机器人'
            }
        ],
        userHead: ''    //用户头像
    },

    onLoad: function () {
        var that = this;
        //加载用户头像
        app.getUserInfo(function (data) {
            console.log(data);
            that.setData({
                userHead: data.avatarUrl
            })
        });

    },

    /*  给聊天机器人发送聊天
     *   @param info聊天语句 id对应用户
     * */
    talkToBot: function (info, userid) {
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
                    talk: that.data.talk.unshift(text)    //压入话语
                });
            }
        });
    },

    tabClick: function (e) {

    }
});
