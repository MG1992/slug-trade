// 防止重复频繁请求
import axios from 'axios'

const cancelToken = axios.CancelToken;
const requestList = []
const repeatRequest = {
  // 请求前
  beforeRequest: function (requestObj) {
    // 末尾带时间戳处理
    const url = this.dealWithTimestampUrl(requestObj.url)
    const isIncludes = requestList.find(element => {
      return element === url
    })

    // 如果是重复请求 则取消发送
    if (isIncludes) {
      if (process.env.VUE_APP_IS_APP) {
        requestObj.cancel = true
      } else {
        // eslint-disable-next-line no-unused-vars
        requestObj.cancelToken = new cancelToken((c) => {
          // console.log(c);
        });
      }
    } else {
      if (process.env.VUE_APP_IS_APP) {
        requestObj.cancel = false
      }
      requestList.push(url)
    }
    return requestObj
  },
  // 请求后
  afterRequest: function (requestObj) {
    // 末尾带时间戳处理
    const url = this.dealWithTimestampUrl(requestObj.url)
    const index = requestList.findIndex((element) => {
      return element === url
    })
    if (index > -1) {
      requestList.splice(index, 1)
    }
  },
  // 末尾带时间戳处理
  dealWithTimestampUrl: function (url) {
    const arr = url.split('/')
    const timeStr = arr[arr.length - 1]
    if (timeStr && timeStr.length > 8 && (/^\d*$/.test(timeStr))) {
      url = url.split(`/${timeStr}`)[0]
    }
    return url
  }
}
export default repeatRequest
