import { useCallback } from 'react';
import { View, Text, Button, Image } from '@tarojs/components';
import { useEnv, useNavigationBar, useModal, useToast } from 'taro-hooks';
import Taro from '@tarojs/taro';
import {getLocation } from '@/JiaZheng/utils/index'
const Index = () => {
  const goOrderList = () => {
    getLocation('goOrderList')
    Taro.navigateTo({
      url: '/JiaZheng/packages/order/pages/orderList/index',
    });
  };
  return <View className="wrapper" onClick={goOrderList}>家政个人中心</View>;
};

export default Index;
