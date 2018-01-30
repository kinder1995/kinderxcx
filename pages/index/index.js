//index.js
//获取应用实例
const app = getApp();

var WxParse = require('../../wxParse/wxParse.js');
Page({
    data:{
        animationData:{},
        news: [],
        res:[],
        page:1,
    },
    onLoad: function () {
        var that = this;
        wx.request({
        url: app.d.ceshiUrl + '/api/Index/getList',
        method: 'post',
        data: {},
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res){
            var news = res.data.info;
            that.setData({
              news: news,
              res: res
            });
        },
        fail: function (e) {
            wx.showToast({
                title: '网络异常！',
                duration: 2000
            });
        },
      })
    },
    onShow:function(){
      
    },
    onReady: function(){
      var that = this;
      this.data.intervarID = setInterval(function(){
        var date1 = new Date()
        var date2 = new Date('2016/07/14 00:00:00')
        var s1 = date1.getTime(), s2 = date2.getTime();
        var total = (s1 - s2) / 1000;
        var day = parseInt(total / (24 * 60 * 60));
        var afterDay = total - day * 24 * 60 * 60;
        var hour = parseInt(afterDay / (60 * 60));
        var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;
        var min = parseInt(afterHour / 60);
        var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;
        var sec = parseInt(afterMin);
        that.setData({
          mytime_d: day,
          mytime_hour: hour,
          mytime_min: min,
          mytime_sec: sec
        });
      },1000)
    },
    //点击加载更多
    getMore: function (e) {
      var that = this;
      var page = that.data.page;
      wx.request({
        url: app.d.ceshiUrl + '/api/Index/getlist',
        method: 'post',
        data: { page: page },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
            var news = res.data.info;
            if (typeof (news) == 'string') {
            wx.showToast({
                title: '没有更多数据！',
                duration: 2000
            });
            return false;
            }
            that.setData({
                page: page + 1,
                news: that.data.news.concat(news),
            });
        },
        fail: function (e) {
            wx.showToast({
                title: '网络异常！',
                duration: 2000
            });
        }
      })
    },
    onShareAppMessage: function () {
        return {
        title: 'KINDER个人博客',
        path: '/pages/index/index',
        success: function (res) {
            wx.showToast({
                title: '分享成功！',
                duration: 2000
            });
        },
        fail: function (res) {
            wx.showToast({
                title: '分享失败！',
                duration: 2000
            });
        }
      }
    }
})
