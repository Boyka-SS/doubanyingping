// index.js
// 获取应用实例
import { network } from '../../utils/network.js';
const app = getApp();

Page({
  data: {
    value: 6.5,
  },
  onChange: function (e) {
    this.setData({
      value: e.detail.value,
    })
    console.log(e);
  },
  onLoad: function (options) {
    let that = this;
    //电影
    network.getMoviesList({
      success: function (movies) {
        that.setData({
          movies: movies
        })
      }
    });

    //电视剧
    network.getTvsList({
      success: function (tvs) {
        that.setData({
          tvs: tvs
        })
      }
    });
    //综艺
    network.getShowsList({
      success: function (shows) {
        that.setData({
          shows: shows
        })
      }
    });
    
  }
});
