import Taro from "@tarojs/taro"
export default {
  name:'app',
  state: {
    userInfo:{},
    userSystem: {
      navigationBarHeight: 44,
      screenHeight: 667,
      screenWidth: 375,
      statusBarHeight: 20,
      windowHeight: 603,
      windowWidth: 375,
      model:"未知设备",
    }, // 系统信息
  },
  reducers: {
    updateState(state, payload) {
      return Object.assign({}, state, payload)
    },
    updateUserInfo(state, userInfo) {
      return Object.assign({}, state, {userInfo})
    }
  },
  effects: dispatch => ({
    getUserInfo(payload, rootState) {
      this.updateUserInfo({name:'hello',Mobile:13333333333,sex:1})
    },
    getUserSystem(){
      this.updateState({userSystem:Taro.getSystemInfoSync()})
    }
  })
}
