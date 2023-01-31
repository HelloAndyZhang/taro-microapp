import { useCallback, useEffect } from 'react';
import { View, Text, Button, Image } from '@tarojs/components';
import { useEnv, useNavigationBar, useModal, useToast } from 'taro-hooks';
import Taro from '@tarojs/taro';
import HelloWorld from '../../components/hello-world/index';
import { useStore } from 'react-redux'
import {useSelector,useDispatch} from 'react-redux'
import './index.scss';
const Index =  () => {
	const dispatch = useDispatch()
  const userSystem = useSelector(state => state.app.userSystem)
  console.log(useStore())
  const goOrderList = () => {
    Taro.navigateTo({
      modules: 'PaoTui',
      url: '/packages/order/pages/orderList/index',
    });
  };
  const goJiaZheng = () => {
    Taro.navigateTo({
      modules: 'JiaZheng',
      url: '/pages/index/index',
    });
  };
  useEffect(() => {
    dispatch.app.getRegSourceConfig({pCode:'100028979',channelId:10008622})
  },[])

  return (
    <View className="wrapper">
      跑腿首页 函数组件
      <Button style={{marginTop:'6px'}} onClick={()=> dispatch.app.getUserSystem()}>
        获取设备信息 {userSystem.model}
      </Button>
      <Button style={{marginTop:'6px'}} onClick={goOrderList}>
        跳转订单列表
      </Button>

      <Button style={{marginTop:'6px'}} onClick={goJiaZheng}>跳转家政</Button>
      <HelloWorld></HelloWorld>
    </View>
  );
};
export default  Index;

