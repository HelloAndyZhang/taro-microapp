import { useCallback } from 'react';
import { View, Text, Button, Image } from '@tarojs/components';
import { useEnv, useNavigationBar, useModal, useToast } from 'taro-hooks';
import './index.scss';
import {getLocation } from '@/JiaZheng/utils/index'
const Index = () => {
  const goOrderList = () => {
    getLocation('goOrderList')
  };
  return <View className="wrappe-p">家政 --- 订单列表</View>;
};

export default Index;
