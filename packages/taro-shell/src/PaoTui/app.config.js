export default {
  pages: ["pages/index/index", "pages/uCenter/index"],
  subPackages: [
    {
      root: "packages/order",
      name: "PaoTuiOrder",
      pages: [
        "pages/orderList/index",
      ],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'UU跑腿',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: false,
  },
  networkTimeout: {
    connectSocket: 30000,
    request: 60000,
    uploadFile: 30000,
    downloadFile: 30000
  },

  permission: {
    "scope.userLocation": {
      "desc": "您的位置将用于准确定位寄收件的地址"
    }
  },
  requiredPrivateInfos: [
    "getLocation"
  ],
  tabBar: {
    color: "#7A7E83",
    selectedColor: "#FF7A07",
    borderStyle: "black",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "PaoTui/pages/index/index",
        text: "首页",
        iconPath: "PaoTui/static/tabbar/uu-home-icon.png",
        selectedIconPath: "PaoTui/static/tabbar/uu-home-icon-on.png",
      },
      {
        pagePath: "PaoTui/pages/uCenter/index",
        text: "我的",
        iconPath: "PaoTui/static/tabbar/uu-main-icon.png",
        selectedIconPath: "PaoTui/static/tabbar/uu-main-icon-on.png",
      }
    ]
  }
};
