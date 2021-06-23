import { globalUrls } from "../../utils/url"
const network = {
  getMoviesList: function (params) {
    //电影
    wx.request({
      url: globalUrls.movieList,
      data: {
        count: 7
      },
      success: function (res) {
        let movies = res.data.subject_collection_items;
        if (params && params.success) {
          params.success(movies)
        }
      }
    });
  },
  getTvsList: function (params) {
    //电视剧
    wx.request({
      url: globalUrls.tvsList,
      data: {
        count: 7
      },
      success: function (res) {
        let tvs = res.data.subject_collection_items;
        if (params && params.success) {
          params.success(tvs)
        }
      }
    });
  },
  getShowsList: function (params) {
    wx.request({
      url: globalUrls.showsList,
      data: {
        count: 7
      },
      success: function (res) {
        let shows = res.data.subject_collection_items;
        if (params && params.success) {
          params.success(shows)
        }
      }
    });
  }
}
export { network }