//index.js
//获取应用实例
var app = getApp();

Page({
    /*-------------------------------------------- 数据 ----------------------------------------------*/
    data: {
        talk: [{
            isBot: true,
            sentence: '你好，我是聊天图灵机器人，我很聪明哦，你想要和我聊点什么呢？'
        }],
        sendText: '',   //发送的语句
        c: '',   //发送语句的input值
        isSendMsgBtnDisabled: true, //发送按钮禁止
        scrollTop: 0,   //滚动位置
        userHead: ''    //用户头像
    },

    /*-------------------------------------------- 自定义函数 ----------------------------------------------*/
    /*  给聊天机器人发送聊天
     *   @param info聊天语句 id对应用户
     * */
    talkToBot: function (info, userid, cb) {
        wx.request({    //发送给机器人的聊天
            url: app.globalData.api.showApi.path.bot,
            data: {
                showapi_appid: app.globalData.api.showApi.appId,
                showapi_sign: app.globalData.api.showApi.sign,
                info: info,
                userid: userid
            },
            success: function (data) {
                cb && cb(data);
            }
        });
    },
    /*  清空发送框，禁止发送按钮
     * */
    clearTextAndBanSend: function () {
        this.setData({
            inputMsg: '',   //清空对话框
            isSendMsgBtnDisabled: true //发送按钮禁止
        })
    },
    /*  点击清除文本
     * */
    clearMsgTap: function () {
        this.clearTextAndBanSend();
    },
    /*-------------------------------------------- 绑定函数 ----------------------------------------------*/
    /*  窗口加载函数
     * */
    onLoad: function () {
        var that = this;
        //获取用户头像
        app.getUserInfo(function (data) {
            that.setData({
                userHead: data.avatarUrl
            })
        });
    },
    /*分享设置*/
    onShareAppMessage: function () {
        return {
            title: '轻松一哈-聊天机器人',
            path: '/pages/talking_bot/talking_bot'
        }
    },
    /*  键盘输入事件
     * */
    bindKeyInput: function (e) {
        var text = e.detail.value;
        var that = this;
        var textSpaceCnt = 0;
        this.setData({
            sendText: text
        });
        for (var i = 0; i < text.length; i++) {   //如果输入的全部是空格
            if (text[i] == ' ') {
                textSpaceCnt++;
            }
        }
        if (text != '' && textSpaceCnt != text.length) {
            //输入内容后按钮可以按下
            this.setData({
                isSendMsgBtnDisabled: false
            });
        } else {
            this.setData({
                isSendMsgBtnDisabled: true
            });
        }
    },
    /*  点击了信息发送
     * */
    sendMsgTap: function (e) {
        var that = this;
        var text = that.data.sendText;  //获取文本
        var talk = that.data.talk;
        talk.push({
            isBot: false,
            sentence: text
        });    //压入话语
        that.setData({
            talk: talk
        });
        this.talkToBot(text, app.globalData.userInfo.nickName, function (data) {
            var text = data.data.showapi_res_body.text;
            if (text == '' || text == undefined || text == ' ') {   //如果返回错误数据
                text = '?';
            }
            talk.push({
                isBot: true,
                sentence: text
            });    //压入话语
            that.setData({
                talk: talk,
                scrollTop: 9999 //版面滚动到底部
            });
        });
        that.clearTextAndBanSend();
    }
});
