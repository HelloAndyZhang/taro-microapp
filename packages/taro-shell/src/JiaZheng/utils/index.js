import Taro from '@tarojs/taro'

 const getLocation = (log) => {
  console.log(log);
}
const formatNumber = n => {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
/**
 * 过滤手机号
 * @param {Number} tel
 */
const filterPhone = tel => {
  var phone = String(tel)
    .replace(/[^\d.]+/g, '')
    .replace(/^\+?86/g, '')
    .substring(0, 11)
  return phone
}
/**
 * @method session同步存、读取
 * @param {String} key
 * @param {any} val
 */
const session = (key, val) => {
  try {
    if (!key || typeof key != 'string') {
      throw new Error('key must be a String!')
    }
    if (val != undefined) {
      if (val instanceof Object) {
        val = JSON.stringify(val)
      }
      Taro.setStorageSync(key, val)
      return
    }
    let value = Taro.getStorageSync(key)
    try {
      value = JSON.parse(value)
    } catch (error) {}
    return value
  } catch (error) {
    console.log('缓存读取失败', error)
  }
}

/**
 * @method setStorage 异步 存、读取
 * @param {String} key
 * @param {any} val
 */
const setStorage = (key, val) => {
  try {
    if (!key || typeof key != 'string') {
      throw new Error('key must be a String!')
    }
    if (val != undefined) {
      if (val instanceof Object) {
        val = JSON.stringify(val)
      }
      Taro.setStorage({
        key: key,
        data: val
      })
      return
    }
  } catch (error) {
    console.log('缓存读取失败', error)
  }
}

/**
 * @method removeStorage 异步 删除
 * @param {String} key
 * @param {any} val
 */
const removeStorage = key => {
  if (!key || typeof key != 'string') return
  Taro.removeStorage({ key: key })
}
/**
 * @method 删除session
 * @param {String} key
 */
const removeStorageSync = key => {
  if (key == undefined) {
    return
  }
  Taro.removeStorageSync(key)
}

/**
 * @method 删除session
 * @param {String} key
 */
const removeSession = key => {
  if (key == undefined) {
    return
  }
  Taro.removeStorageSync(key)
}
/**
 * @method 替换url中参数
 * @param {String} url 需要替换路径  findText 查找文案 repText替换文案
 */

const replaceQuery = (url, findText, repText) => {
  var reg = new RegExp(findText.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g, '\\$1'), 'ig')
  return url.replace(reg, repText)
}

//检测手机号
const checkPhone = m => {
  var regTel = /^[1]{1}\d{10}$/
  if (regTel.test(m)) {
    return true
  } else {
    return false
  }
}
/**
 * @method  检测座机号
 * @param {String} landPhone
 */
const checkLandPhone = landPhone => {
  const reg = /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/
  return reg.test(landPhone)
}
/**
 * @method toast提示
 * @param {String} text
 */
const msg = (text, icon = 'none') => {
  Taro.showToast({
    title: text,
    icon: icon
  })
}
/**
 * @method 显示加载框
 * @param {Boolean} mask 是否显示蒙层
 * @param {String} title 提示文字
 */
const showLoading = (title = '加载中...', mask = true) => {
  Taro.showLoading({
    title,
    mask
  })
}

/**
 * @method 隐藏加载框
 */
const hideLoading = () => {
  Taro.hideLoading()
}
/**
 * @method 设置剪贴板内容
 * @param {String} data
 */
const copy = data => {
  Taro.setClipboardData({
    data,
    success: () => {
    },
    fail: error => {}
  })
}
/**
 * @method 拨打电话
 * @param {Number} tel
 */
const call = tel => {
  // return new Promise((resovle, reject) => {
  Taro.makePhoneCall({
    phoneNumber: tel.trim(),
    success: res => {
      // resovle()
    },
    fail: err => {
      // reject();
    }
  })
  // })
}
/**
 * @method 下载图片
 * @param {String} url
 */
const downLoadImg = url => {
  return new Promise((resolve, reject) => {
    Taro.downloadFile({
      url,
      success: res => {
        if (res.statusCode == 200) {
          resolve({
            Success: true,
            data: res.tempFilePath
          })
        } else {
          resolve({
            Success: false
          })
          msg('下载图片失败')
        }
      },
      fail: error => {
        msg('下载图片失败', 'error')
        resolve({
          Success: false
        })
      }
    })
  })
}
//跳转小程序
const goMiniProgram = item => {
  Taro.navigateToMiniProgram({
    appId: item.appId || '',
    path: item.path || '',
    extraData: item.extraData || {},
    envVersion: uuSmallApp.debugMode ? 'develop' : 'release',
    success(res) {
      console.log(res)
    },
    fail(err) {
      console.log(err)
    }
  })
}

const wxSubscribeMsg = list => {
  return new Promise((resolve, reject) => {
    if (typeof wx.requestSubscribeMessage === 'function') {
      Taro.requestSubscribeMessage({
        tmplIds: [...list],
        success: res => {
          if (res.errMsg.indexOf('ok') > 0) {
            let ids = Object.keys(res).filter(e => res[e] === 'accept')
            resolve(ids)
          } else {
            reject(res)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    } else {
      reject('当前版本不支持订阅消息')
    }
  })
}

/**
 * @description: 比较微信版本
 * @param {type} v1 版本号
 * @return:('1.11.0','1.9.9') => 1 // 1 表示 1.11.0 比 1.9.9 要新 ('1.11.0','1.11.0')// => 0 // 0 表示 1.11.0 和 1.11.0 是同一个版本 ('1.11.0','1.99.0')// => -1 // -1 表示 1.11.0 比 1.99.0 要老
 */
const compareVersion = (v1, v2) => {
  v1 = v1.split('.')
  v2 = v2.split('.')
  var len = Math.max(v1.length, v2.length)
  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }
  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i])
    var num2 = parseInt(v2[i])
    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}



const formatQuery = query => {
  if (typeof query == 'string') {
    return query
  }
  return Object.entries(query || {})
    .filter(e => !e[0].startsWith('_'))
    .map(e => `${e[0]}=${e[1]}`)
    .join('&')
    .replace(/\s/g, '')
}

const rpxToPx = (rpx, base) => {
  return (rpx / 750) * base
}
const getHeaderTop = sys => {
  if (!sys) return '-64rpx'
  return sys.statusBarHeight + rpxToPx(10, sys.windowWidth) + 'px'
} // 顶部微信气泡高度



const fixCityCounty = addrInfo => {
  let _cityCountyFixList = session('cityCountyFixList') || cityCountyFixList
  if (!_cityCountyFixList) return addrInfo
  let result = _cityCountyFixList.find(
    item => item.city == addrInfo.cityName && item.county == addrInfo.countyName
  )
  if (result) {
    console.warn('开始数据修正', result)
    addrInfo.cityName = result.fixCity
    addrInfo.countyName = result.fixCounty
  }
  return addrInfo
}

const validateWxMsgVer = userSystem => {
  let { system, version } = userSystem
  // iOS客户端7.0.6版本、Android客户端7.0.7版本之后
  system = system.toLowerCase().indexOf('ios') > -1 ? 'iOS' : 'Android'
  return (system == 'iOS' && compareVersion(version, '7.0.6') > 0) ||
    (system == 'Android' && compareVersion(version, '7.0.7') > 0)
    ? true
    : false
}
/**
 * @method 获取中文字符
 * @param {String} string
 */
const getChineseStr = string => {
  if (!string) return ''
  let reg = /[\u4e00-\u9fa5]/g
  let matchResult = string.match(reg)
  if (matchResult) {
    return matchResult.join('')
  } else {
    return ''
  }
}
/**
 * @method 判断当前字符串是否有手机号
 * @param {String} string
 */
const hasPhoneNumber = string => {
  if (!string) return false
  let reg = /\+?\d{11,}/g
  let matchResult = string.match(reg)
  if (!matchResult) return false
  return matchResult.some(str => checkPhone(str.replace(/\+86/, '')))
}

/**
 * @method 检验是否超过每天最大次数
 * @param {*} key 缓存key
 * @param {*} maxNum 最大展示次数
 * @returns
 */
const getModuleShowTimes = (key = '', maxNum = 1) => {
  let _homePopup = session(key)
  let _nowTimeStamp = new Date().getTime() // 当前时间戳
  // 若本地无此值 新用户]
  if (!_homePopup) {
    session(key, {
      timeStamp: _nowTimeStamp,
      showCount: 1
    })
    return !0 //可展示
  }
  //缓存时间小于今天 00:00 新的一天
  if (hasYesterday(_homePopup.timeStamp)) {
    session(key, {
      timeStamp: _nowTimeStamp,
      showCount: 1
    })
    return !0 //可展示
  }
  //展示次数小于最大展示次数
  if (_homePopup.showCount < maxNum) {
    session(key, {
      timeStamp: _nowTimeStamp,
      showCount: _homePopup.showCount + 1
    })
    return !0 //可展示
  }
  return !1 //不可展示
}

/**
 * 根据Key获取是否显示过
 * @param {*} key
 * @returns {Number} false 不可显示 true可以显示
 */
const getModuleShowByKey = (key = '') => {
  if (!key) return false
  let storage = session('MODULE_KEYS_STORAGE') || ''
  if (storage.indexOf(key) == -1) {
    return false
  }
  return true
}

/**
 * 存储key值
 * @param {*} key
 */
const setModuleShowByKey = (key = '') => {
  if (!key) return
  let storage = session('MODULE_KEYS_STORAGE') || ''
  if (storage.indexOf(key) == -1) {
    storage += `${key};`
    session('MODULE_KEYS_STORAGE', storage)
  }
}

const hasYesterday = timeStamp => {
  let _timeStamp = new Date(timeStamp).getTime()
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const today = `${year}/${month}/${day} 00:00:00`
  // console.log(today)
  const _nowTimeStamp = new Date(today).getTime()
  // console.log(_timeStamp , _nowTimeStamp, _timeStamp < _nowTimeStamp )
  if (_timeStamp < _nowTimeStamp) {
    return !0
  }
  return !1
}
/**
 * @method 获取用户某项信息授权
 * @param {string} authname
 */
const getAuthState = authname => {
  return new Promise((resolve, reject) => {
    Taro.getSetting({
      success: res => {
        //未获取到授权
        if (!res.authSetting[authname]) {
          Taro.authorize({
            scope: authname,
            success: () => {
              resolve([true, ''])
            },
            fail: error => {
              console.log(error)
              resolve(['', error])
            }
          })
        } else {
          resolve([true, ''])
        }
      },
      fail: error => {
        console.log(error, `获取${authname}授权失败`)
        // Taro.openSetting();
        resolve(['', error])
      }
    })
  })
}
/**
 * @method 保存相册
 */
const savePhotoToAlbum = url => {
  return new Promise(async (resolve, reject) => {
    let [success, error] = await getAuthState('scope.writePhotosAlbum')
    if (success) {
      Taro.saveImageToPhotosAlbum({
        filePath: url,
        success: () => {
          resolve()
        },
        fail: err => {
          reject(err)
        }
      })
    } else {
      Taro.showModal({
        content: '需要您同意保存图片到相册，点击确定按钮将跳转到设置页操作',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        success: e => {
          e.confirm && Taro.openSetting()
        }
      })
      reject(error)
    }
  })
}


export {
  formatNumber,
  msg,
  showLoading,
  hideLoading,
  setStorage,
  session,
  removeSession,
  removeStorageSync,
  removeStorage,
  copy,
  call,
  checkPhone,
  filterPhone,
  downLoadImg,
  goMiniProgram,
  replaceQuery,
  wxSubscribeMsg,
  compareVersion,
  getLocation,
  formatQuery,
  getHeaderTop,
  fixCityCounty,
  validateWxMsgVer,
  getChineseStr,
  hasPhoneNumber,
  rpxToPx,
  getModuleShowTimes,
  getModuleShowByKey,
  setModuleShowByKey,
  getAuthState,
  savePhotoToAlbum,
}
