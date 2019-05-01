// pages/show/show.js
let constUrl = require("../../utils/const.js");
let utils = require("../../utils/util.js");

const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showInfors: [],
    img: "",
    author: ""
  },

  addShare(e){
    wx.showShareMenu({
      withShareTicket: true
    })
    // let that=this;
    // if (!e.currentTarget.dataset.isshare) {
    //   wx.cloud.callFunction({
    //     name: "getShareData",
    //     data: {
    //       showid: e.currentTarget.dataset.id,
    //       sharecount: e.currentTarget.dataset.sharecount + 1,
    //       isshare: !e.currentTarget.dataset.isshare
    //     }
    //   }).then((res) => {

    //     db.collection('publish-list').where({}).orderBy('time', 'desc').limit(20).get().then(res => {
    //       that.setData({
    //         showInfors: res.data
    //       });
    //     })

    //   });
    // } else {
    //   wx.cloud.callFunction({
    //     name: "getShareData",
    //     data: {
    //       showid: e.currentTarget.dataset.id,
    //       sharecount: e.currentTarget.dataset.sharecount - 1,
    //       isshare: !e.currentTarget.dataset.isshare
    //     }
    //   }).then((res) => {
    //     db.collection('publish-list').where({}).orderBy('time', 'desc').limit(20).get().then(res => {
    //       that.setData({
    //         showInfors: res.data
    //       });
    //     })
    //   });
    // }
  },

  addGood(e) {
    let that=this;
    // console.log(e.currentTarget.dataset);
    if (!e.currentTarget.dataset.isgood) {
      wx.cloud.callFunction({
        name: "getShowData",
        data: {
          showid: e.currentTarget.dataset.id,
          goodcount: e.currentTarget.dataset.goodcount + 1,
          isgood: !e.currentTarget.dataset.isgood
        }
      }).then((res) => {

        db.collection('publish-list').where({}).orderBy('time', 'desc').limit(20).get().then(res => {
          that.setData({
            showInfors: res.data
          });
        })

      });
    } else {
      wx.cloud.callFunction({
        name: "getShowData",
        data: {
          showid: e.currentTarget.dataset.id,
          goodcount: e.currentTarget.dataset.goodcount -1,
          isgood: !e.currentTarget.dataset.isgood
        }
      }).then((res) => {
        db.collection('publish-list').where({}).orderBy('time', 'desc').limit(20).get().then(res => {
          that.setData({
            showInfors: res.data
          });
        })
      });
    }

  },

  showComment(e) {
    Object.assign(e.currentTarget.dataset, {
      img: this.data.img,
      author: this.data.author
    });
    let query = utils.default.dealQuery(e.currentTarget.dataset);
    wx.navigateTo({
      url: './show-comment/show-comment?' + query
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    db.collection('publish-list').where({}).orderBy('time', 'desc').limit(20).get().then(res => {
      that.setData({
        showInfors: res.data
      });
    })

    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              that.setData({
                img: res.userInfo.avatarUrl,
                author: res.userInfo.nickName
              });
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})