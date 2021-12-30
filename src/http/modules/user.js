import $http from '../index'

// 登录
export function login() {
  // return $http.post('/yunc2c/member/login', param)
}

// 注册
export function register() {
  // return $http.post('/yunc2c/member/login', param)
}

// 检测手机号是否被注册
export function checkPhone() {
  // return $http.post('/yunc2c/member/login' + phone, {})
}

export function logout() {
  // return $http.post('/yunc2c/member/login', param)
}

export function getUserInfo() {
  return $http({
    url: '/wallet/member/getmember',
    method: 'get',
  })
}

// 创建钱包
export function createWallet(param) {
  return $http({
    url: '/wallet/member/registeridentity',
    method: 'post',
    data: param,
  })
}

// 导入地址
export function importAddress(param) {
  return $http({
    url: '/wallet/member/importidentity',
    method: 'post',
    data: param,
  })
}
