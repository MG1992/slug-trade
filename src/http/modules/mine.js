import $http from '../index'

// 获取账户地址
export function getAddressList(param) {
  return $http({
    url: '/wallet/member/getmemberaddrs',
    method: 'get',
    data: param,
  })
}

// 创建地址
export function createAddress(param) {
  return $http({
    url: '/wallet/member/createaddr',
    method: 'post',
    data: param,
  })
}
// 激活地址
export function activateAddress(id) {
  return $http({
    url: '/wallet/member/activeaddr/' + id,
    method: 'get',
  })
}
// 导入地址
export function importAddress(param) {
  return $http({
    url: '/wallet/member/importaddr',
    method: 'post',
    data: param,
  })
}

// 根据id获取账户地址欣
export function getAddressInfoById(id) {
  return $http({
    url: '/wallet/member/getmemberaddr/' + id,
    method: 'get',
  })
}
// 获取激活地址-分页 wallet/member/myactiveaddr
export function getActivatedAddress(param) {
  return $http({
    url: `/wallet/member/myactiveaddr/${param.pageNum}/${param.pageSize}`,
    method: 'get',
    data: param,
  })
}

// 矿池收益合计
export function getTotalEarnings(param) {
  return $http({
    url: '/wallet/wealth/separatetotal/all',
    method: 'get',
    data: param,
  })
}

// 我的-区块查询（浏览器首页） 获取模块数据
export function getBrowserBlocks(page) {
  return $http({
    url: `/browser/blocks/${page}/10/${new Date().getTime()}`,
    method: 'get',
  })
}

// 我的-区块查询（浏览器首页） 获取模块数据
export function getBrowserTrans(search, page) {
  return $http({
    url: `/browser/trans/${search}/${page}/10/${new Date().getTime()}`,
    method: 'get',
  })
}

// 我的-区块查询（浏览器首页） 获取模块数据
export function getBrowserCoininfo() {
  return $http({
    url: `/browser/coininfo/${new Date().getTime()}`,
    method: 'get',
  })
}

// 修改钱包名称
export function updateWalletName(param) {
  return $http({
    url: '/wallet/member/updnickname',
    method: 'post',
    data: param,
  })
}

// 助记词
export function exportMnemonicWord(param) {
  return $http({
    url: '/wallet/member/showmnemonic',
    method: 'post',
    data: param,
  })
}

// 导出私钥
export function exportPrivateKey(param) {
  return $http({
    url: '/wallet/member/showaddrsinfo',
    method: 'post',
    data: param,
  })
}
// 是否隐藏导入主地址
export function isHideSubAdd() {
  return $http({
    url: '/global/systemConfig/createImportSubAddress',
    method: 'get',
  })
}

// 分享app
//
export function getShareInfo() {
  return $http({
    url: '/global/systemConfig/shareParam',
    method: 'get',
  })
}

// 获取所有广告下单列表
export function getAllAdsList(param) {
  return $http({
    url: `/global/otc/advertise/getadvertiselist/${param.symbol}/${param.transType}/${param.pageNum}/${param.pageSize}`,
    method: 'get',
  })
}
// 我的广告列表
export function getMyAdsList(param) {
  return $http({
    url: `/global/otc/advertise/getmyadvertise/${param.pageNum}/${param.pageSize}/${param.symbol}`,
    method: 'get',
  })
}

// 发布广告
export function publishAds(param) {
  return $http({
    url: '/global/otc/advertise/addadvertise',
    method: 'post',
    data: param,
  })
}

// 获取所有的币种
export function getAllCurrency() {
  return $http({
    url: `/m/a/listCurrency/${new Date().getTime()}`,
    method: 'get',
  })
}

//查询我启用的支付方式列表
export function getMyEnablePayType() {
  return $http({
    url: '/global/payment/getpayments',
    method: 'get',
  })
}
// 下单
export function placeOrder(param) {
  return $http({
    url: '/global/otc/order/addorder',
    method: 'post',
    data: param,
  })
}