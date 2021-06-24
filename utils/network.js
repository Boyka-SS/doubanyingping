import { globalUrls } from "url.js";
const network = {
  getMoviesList: function (params) {
    params.type = "movie";
    this.getItemsList(params);
  },
  getTvsList: function (params) {
    params.type = "tv";
    this.getItemsList(params);
  },
  getShowsList: function (params) {
    params.type = "show";
    this.getItemsList(params);
  },
  getItemsList: function (params) {
    let count = params.count ? params.count : 7;
    let url = "";
    if (params.type === "movie") {
      url = url + globalUrls.movieList;
    } else if (params.type === "tv") {
      url = url + globalUrls.tvsList;
    } else if (params.type === "show") {
      url = url + globalUrls.showsList;
    }
    wx.request({
      url: url,
      data: {
        count: count
      },
      success: function (res) {
        let items = res.data.subject_collection_items;
        let itemsCount = items.length;
        let left = itemsCount%3;
        if (left === 2) {
          items.push(null)
        } 
        if (params && params.success) {
          params.success(items)
        }
      }
    });
  }
}
export { network }