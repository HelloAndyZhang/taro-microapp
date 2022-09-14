export default {
  pages: ["pages/index/index", ],

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'UU家政',
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

};
