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
        count: count,
      },
      success: function (res) {
        let items = res.data.subject_collection_items;
        let itemsCount = items.length;
        let left = itemsCount % 3;
        if (left === 2) {
          items.push(null);
        }
        if (params && params.success) {
          params.success(items);
        }
      },
    });
  },
  getItemDetail: function (params) {
    let id = params.id;
    let type = params.type;
    let url = "";
    if (type === "movie") {
      url = globalUrls.movieDetail + id;
    } else if (type === "tv") {
      url = globalUrls.tvDetail + id;
    } else {
      url = globalUrls.showDetail + id;
    }
    wx.request({
      url: url,
      success: (res) => {
        let item = res.data;
        if (params.success) {
          params.success(item);
        }
      },
    });
  },
  getItemTags: function (params) {
    let id = params.id;
    let type = params.type;
    let url = "";
    if (type === "movie") {
      url = globalUrls.movieTags(id);
    } else if (type === "tv") {
      url = globalUrls.tvTags(id);
    } else {
      url = globalUrls.showTags(id);
    }
    wx.request({
      url: url,
      success: (res) => {
        let tags = res.data.tags;
        if (res.success) {
          params.success(tags);
        }
      },
    });
  },
  getItemComment: function (params) {
    let id = params.id;
    let type = params.type;
    let start = params.start ? params.start : 0;
    let count = params.count ? params.count : 3;
    let url = "";
    if (type === "movie") {
      url = globalUrls.movieComments(id, start, count);
    } else if (type === "tv") {
      url = globalUrls.tvComments(id, start, count);
    } else {
      url = globalUrls.showComments(id, start, count);
    }
    wx.request({
      url: url,
      success: (res) => {
         
        let data = res.data;
        if (params.success) {
          params.success(data);
        }
      },
    });
  },
};
export { network };
