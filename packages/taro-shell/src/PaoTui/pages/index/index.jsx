import { useCallback } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";

import Taro from "@tarojs/taro";
const Index = () => {
  const goOrderList = ()=>{
    Taro.navigateTo({
      modules:'PaoTui',
      url:'/PaoTui/packages/order/pages/orderList/index'
    })
  }
  return (
    <View className="wrapper" onClick={goOrderList}>
      跑腿首页
    </View>
  );
};

export default Index;
