export default {
  pages: [], //"pages/launch-screen/index"
  // 主包中的声明
  // pages: [
  //   {
  //     "src": "@PaoTui/pages/index/index",
  //     "path": "PaoTui/pages/index/index" // 注意保持 path 的唯一性
  //   }
  // ],
  subPackages:[],
  packages: [
    // "{npmPackage || relativePathToPackage}/index"
    "PaoTui/app",
    "JiaZheng/app",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
};
