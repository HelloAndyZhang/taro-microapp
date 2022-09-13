import { useCallback } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import Taro from "@tarojs/taro";

const Index = () => {
  const goPaoTui =()=>{
    Taro.navigateTo({
      url: '/PaoTui/pages/index/index'
    })


    // '/PaoTui/packages/order/pages/orderList/index'
    // '/JiaZheng/packages/order/pages/orderList/index'
    // '/JiaZheng/pages/index/index'
    // '/PaoTui/pages/index/index'
  }
  return (
    <View className="wrapper">
      启动屏
      <Button onClick={goPaoTui}>跳转跑腿</Button>
    </View>
  );
};

export default Index;
