export default {
  pages: ["pages/index/index"],
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
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
};
