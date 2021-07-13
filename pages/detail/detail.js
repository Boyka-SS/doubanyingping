// pages/detail/detail.js
import { network } from "../../utils/network.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let type = options.type;
    let id = options.id;
    that.setData({
      id:id,
      type:type
    });
    network.getItemDetail({
      type: type,
      id: id,
      success: function (item) {
        let genres = item.genres;
        genres = genres.join("/");
        item.genres = genres;
        let actors = item.actors;
        let actorsName = [];
        if (actors.length > 3) {
          actors = actors.slice(0, 3);
        }
        for (let i = 0; i < actors.length; i++) {
          actorsName.push(actors[i].name);
        }
        let director = item.directors[0].name;
        actorsName = actorsName.join(" / ");
        actorsName = director + "(导演）/ " + actorsName;
        item.actorsName = actorsName;
        that.setData({ item: item });
      },
    });
    network.getItemTags({
      id: options.id,
      type: options.type,
      success: function (tags) {
        that.setData({
          tags: tags,
        });
      },
    });
    //获取评论
    network.getItemComment({
      type: type,
      id: id,
      success: function (data) {
        let totalComment = data.total;
        let comments = data.interests;
        that.setData({
          totalComment: totalComment,
          comments: comments,
        });
      },
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
