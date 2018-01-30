//index.js
//获取应用实例
const app = getApp();

var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    animationData: {},
    news: [],
    res: [],
    page: 1,
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/api/Index/getList',
      method: 'post',
      data: {cat:3},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
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
  onShow: function () {

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
