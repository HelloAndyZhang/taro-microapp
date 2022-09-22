import { useCallback } from 'react';
import { View, Text, Button, Image } from '@tarojs/components';
import { useEnv, useNavigationBar, useModal, useToast } from 'taro-hooks';
import Taro from '@tarojs/taro';
const Index = () => {
  const goOrderList = () => {
    Taro.navigateTo({
      modules: 'PaoTui',
      url: '/JiaZheng/packages/order/pages/orderList/index',
    });
  };
  return <View className="wrapper">家政个人中心</View>;
};

export default Index;
