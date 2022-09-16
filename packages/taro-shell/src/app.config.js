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
    // 格式一
    // "JiaZheng/app",
    // "PaoTui/app",
    // 格式二
    {
      "name": "JiaZheng",
      "packages":[
        "JiaZheng/app",
      ]
    },
    {
      "name": "PaoTui",
      "packages":[
        "PaoTui/app",
        "JiaZheng/app",
      ]
    }
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
};
