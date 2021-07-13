// pages/comment/comment.js
import { network } from "../../utils/network";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    start: 1,
    count: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData(options);
    that.getComments(1);
  },
  getComments(start) {
    let that = this;
    let type = that.data.type;
    let id = that.data.id;
    if (start > that.data.start) {
      that.setData({
        nextLoading: true
      })
    } else {
      that.setData({
        preLoading: true
      })
    }
    network.getItemComment({
      type: type,
      id: id,
      start: start,
      count: 20,
      success: (data) => {
        let total = data.total;
        let comments = data.interests;
        that.setData({
          start,
          total,
          comments,
          preLoading: false,
          nextLoading: false
        });
        wx.pageScrollTo({
          scrollTop: 0,
        });
      }
    });
    
  },
  onPrePageTap(event) {
    let that = this;
    let oldStart = that.data.start;
    let count = that.data.count;
    if (oldStart - count > 0) {
      let newStart = oldStart - that.data.count;
      that.getComments(newStart);
    }
  },
  onNextPageTap(event) {
    let that = this;
    let oldStart = that.data.start;
    let newStart = oldStart + that.data.count;
    that.getComments(newStart);
  },
  onItemTapEvent: function (event) {
    wx.navigateBack({});
  },


});
