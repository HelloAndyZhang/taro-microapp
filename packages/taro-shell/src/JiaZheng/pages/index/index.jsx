import { useCallback } from 'react';
import { View, Text, Button, Image } from '@tarojs/components';
import { useEnv, useNavigationBar, useModal, useToast } from 'taro-hooks';
import './index.scss';
import Taro from '@tarojs/taro';
import {getLocation } from '@/JiaZheng/utils/index'
const Index = () => {
  const goOrderList = () => {
    getLocation('goOrderList')
    Taro.navigateTo({
      modules: 'JiaZheng',
      url: '/packages/order/pages/orderList/index',
    });
  };
  // console.log(process.env.PACKAGE_ENV)
  // console.log(process.env.TARO_ENV )
  return (
    <View className="wrapper">
      家政首页
      <Button className="wrapper-btn" onClick={goOrderList}>
        {' '}
        跳转家政订单列表
      </Button>
    </View>
  );
};

export default Index;
