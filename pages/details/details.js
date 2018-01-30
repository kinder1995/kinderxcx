
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');

Page({
    data: {
        animationData: {},
        Id:0,
        ListDetails:{},
        url: app.d.ceshiUrl,
    },
    onShow: function () {

    },
    onLoad: function (options){
        var that = this;
        that.setData({
          Id: options.Id,
        })
        that.loadListDetails();
    },
    loadListDetails:function(){
        var that = this;
        wx.request({
          url: app.d.ceshiUrl + '/api/index/getNews',
          method:'post',
          data:{
            id: that.data.Id,
          },
          header:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success:function(res){
            var status = res.data.status;
            if (status == 1) {
              var ListDetails = res.data.info;
              var content = ListDetails.content;
              WxParse.wxParse('content', 'html', content, that,5);
              that.setData({
                ListDetails: ListDetails,
              });
            }
          },
          error: function (e) {
            wx.showToast({
              title: '网络异常！',
              duration: 2000,
            });
          },
        })
    }
})
