import {commonRequest, ERR_OK, INVALID_TOKEN} from './config'
// import {postFile, commonRequest, ERR_OK, ERROR_SERVICE, INVALID_TOKEN, ERR_MSG, LOG_OUT} from './config'
import axios from 'axios'
// import Vue from 'vue'

// POST/GET/PUT/DELETE 请求
function Request (url, method, params, data, visible = true, errcb) {
  // if (visible) Vue.prototype.$loading()
  return new Promise(function (resolve, reject) {
    axios(commonRequest(url, method, params, data)).then((res) => {
      // Vue.prototype.$loading.close()
      if (res.data.code === ERR_OK) {
        resolve(res.data)
      } else if (res.data.code === INVALID_TOKEN) {
        // token 失效
      } else if (errcb) {
        resolve(res.data)
      } else {
        if (sessionStorage.isMobile === '1') {
          resolve(res.data)
        } else {
          // Vue.prototype.$alert(res.data.message, '提示', {confirmButtonText: '确定'})
        }
      }
    }).catch(err => {
      reject(err)
    })
  })
}

// 接口

/**
 * 获取全局配置信息
 */
export function GLOBAL_GET () {
  return Request('/v6/stock/toc/config/global/get', 'post', undefined, undefined)
}