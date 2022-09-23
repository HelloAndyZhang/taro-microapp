import {printLog} from '@/utils'
export default {
  name:'app',
  state: {
    regSourceConfig: {
      pCode: 0, //推荐关系
      channelId: 0, // 渠道id
      sceneId: 0 // 场景id
    }, // 注册来源参数
  },
  reducers: {
    updateState(state, payload) {
      return Object.assign({}, state, payload)
    },
    updateRegSourceConfig(state, regSourceConfig) {
      return Object.assign({}, state, {regSourceConfig})
    },
  },
  effects: dispatch => ({
    getRegSourceConfig(payload, rootState) {
      printLog(payload)
      this.updateRegSourceConfig(payload)
      return payload
    }
  })
}
