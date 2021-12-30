import router from "@/router";
import { Toast } from "vant";
import { storage } from "@/utils/oldVersionFunc";
import i18n from "@/langs";

// 网络请求报错
/* eslint-disable no-unused-vars */
// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。'
// }

// 不需要提示的code集合
const notHandleCodeList = ["POOL_NO_ADDRESS_EXISTS"];

const defaultConfig = {
  baseURL:
    window.location.hostname === "localhost"
      ? ""
      : process.env.VUE_APP_BASE_BASE_HTTP_URL,

  // 超时设置
  timeout: 25000,

  // 默认请求头
  // fixme: 这里需要具体项目具体配置
  headers: {
    "Content-Type": "application/json",
  },
  getToken: function (config) {
    // 如果不要token则在header传noToken为true
    if (!config.headers.noToken && storage.get("token")) {
      if (!config.headers.noToken) {
        config.headers["ACCESSTOKEN"] = storage.get("token"); // 让每个请求携带自定义token 请根据实际情况自行修改
      }
      // config.contentType &&
      //   (config.headers["Content-Type"] = "multipart/form-data")
    }
    return config;
  },
};

export function defaultRequestCallBack(response, reject, resolve) {
  const res = response.data;
  if (res.status === 1) {
    if (resolve) {
      return resolve(res && res.data);
    }
    return res && res.data;
  } else if (
    res.status === -1 &&
    (res.msg === "ILLEGAL_TOKEN" ||
      res.msg === "NOT_LOGIN" ||
      res.msg === "STOP_EX")
  ) {
    // 401,session超时
    Toast(i18n.t("common.invalidSession"));
    router.push("importOrCreateWords");
  } else {
    // 如果不处理则返回
    if (notHandleCodeList.includes(res.msg)) {
      return
    }
    if (res.msg) {
      Toast(i18n.t(`requestResponse.${res.msg}`));
    } else {
      Toast(i18n.t(`requestResponse.OTHER_ERROR`));
    }
  }
  if (reject) {
    return Promise.reject('error')
  }
  return Promise.reject('error')
}

export default defaultConfig;
