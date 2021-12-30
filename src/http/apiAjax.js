/**
 * todo
 * 目前进行的是简单的封装，后续逐渐优化，以axios方式实现为准
 */
import axios from 'axios'
import defaultConfig, { defaultRequestCallBack } from './defaultConfig'
// import { Toast } from 'vant'
import repeatRequest from './repeatRequest'

const apiAjax = function (param) {
  return new Promise((resolve, reject) => {
    const headers = Object.assign({}, defaultConfig.headers, param.headers)
    const conf = defaultConfig.getToken({ headers, ...param })
    const config = repeatRequest.beforeRequest(conf)
    // 防止重复请求
    if (config.cancel) {
      console.log('重复请求')
      return
    }
    console.log('config', JSON.stringify(config))
    if (window.api) {
      // form表单提交 文件上传 delete 等方法api不支持
      if (config.method === 'delete' || config.method === 'DELETE' || config.headers.contentType === 'multipart/form-data') {
        axios.request({
          url: defaultConfig.baseURL + config.url,
          method: config.method,
          headers: headers,
          data: config.data
        }).then(function (res) {
          repeatRequest.afterRequest(config)
          console.log(JSON.stringify(res));
          defaultRequestCallBack(res, reject, resolve)
        }).catch(function (err) {
          repeatRequest.afterRequest(config)
          reject(defaultRequestCallBack({ data: {}, msg: err }))
        });
        return
      }
      window.api.ajax({
        url: defaultConfig.baseURL + config.url,
        method: config.method,
        data: {
          body: config.data
        },
        headers: headers,
        timeout: defaultConfig.timeout / 1000
      }, function (response, error) {
        repeatRequest.afterRequest(config)
        console.log('response = ', JSON.stringify(response))
        if (response) {
          defaultRequestCallBack({ data: response }, reject, resolve)
        } else {
          reject(defaultRequestCallBack({ data: {}, msg: error }))
          return
        }
      })
    }

  }).catch((e) => {
    console.log(e)
  })
}

export default apiAjax