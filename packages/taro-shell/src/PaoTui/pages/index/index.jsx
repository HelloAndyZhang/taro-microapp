import { useCallback } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import Taro from "@tarojs/taro";
import HelloWorld from '../../components/hello-world/index'
import './index.scss'
const Index = () => {
  const goOrderList = ()=>{
    Taro.navigateTo({
      modules:"PaoTui",
      url:'/packages/order/pages/orderList/index'
    })
  }
  const goJiaZheng =()=>{
    Taro.navigateTo({
      modules:"JiaZheng",
      url:'/pages/index/index'
    })
  }
  return (
    <View className="wrapper" >
      跑腿首页
      <Button  className="wrapper-o" onClick={goOrderList}>跳转订单列表</Button>
      <Button onClick={goJiaZheng}>跳转家政</Button>
      <HelloWorld></HelloWorld>
    </View>
  );
};

export default Index;
