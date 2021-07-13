// pages/search/search.js
import { network } from "../../utils/network";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    histories: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: "searched",
      success: (res) => {
        let data = res.data;
        that.setData({
          histories: data
        })
      }
    })
  },
  onClearEvent: function (event) {
    wx.removeStorage({
      key: 'searched',
      success: (res) => {
        console.log("delete");
      }
    });
    this.setData({
      histories: null
    })
  },
  onItemTapEvent: function (e) {

    let that = this;
    let id = e.currentTarget.dataset.id;
    let title = e.currentTarget.dataset.title;
    let histories = that.data.histories;
    let isExisted = false;
    if (histories) {
      for (let index = 0; index < histories.length; index++) {
        let movie = histories[index];
        if (movie.id === id) {
          isExisted = true;
          break;
        }
      }
    }
    if (!isExisted) {
      
      histories.push({ title: title, id: id });
      wx.setStorage({
        key: "searched",
        data: histories,
      })
    }
    wx.navigateTo({
      url: '/pages/detail/detail?type=movie&id=' + id,
    })
  },
  onSearch: function (e) {
    let that = this;
    let inputValue = e.detail;
    if (!inputValue || inputValue === '') {
      that.setData({
        subjects: null,
      });
      return;
    }
    network.getSearch({
      q: inputValue,
      success: (subjects) => {
        that.setData({
          items: subjects.items
        })
      }
    });


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})