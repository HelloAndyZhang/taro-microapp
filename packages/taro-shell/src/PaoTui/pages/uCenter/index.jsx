import { useCallback, Component } from 'react';
import { View, Text, Button, Image } from '@tarojs/components';
import { useEnv, useNavigationBar, useModal, useToast } from 'taro-hooks';
import { connect } from 'react-redux'
import Taro from '@tarojs/taro';


class uCenter extends Component {
  goOrderList() {
    Taro.navigateTo({
      modules: 'PaoTui',
      url: '/PaoTui/packages/order/pages/orderList/index',
    });
  }
  render() {
    let { getUserSystem, userSystem } = this.props;
    return (
      <View className="wrapper" >
        跑腿个人中心 类组件
        <Button style={{ marginTop: '6px' }} onClick={() => getUserSystem()}>
          获取设备信息 {userSystem.model}
        </Button>
        <Button style={{marginTop:'6px'}} onClick={this.goOrderList.bind(this)}>
          跳转订单列表
        </Button>

      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.app.userInfo, // 用户信息
    regSourceConfig: state.app.regSourceConfig,
    userSystem: state.app.userSystem,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    getRegSourceConfig: _ => dispatch.app.getRegSourceConfig(),
    getUserInfo: _ => dispatch.app.getUserInfo(),
    getUserSystem: _ => dispatch.app.getUserSystem(),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(uCenter)
