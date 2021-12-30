/*
 * @Author: 唐嘉伟
 * @Date: 2020-09-15 16:57:38
 * @LastEditors: joevin
 * @LastEditTime: 2020-09-28 16:40:17
 * @FilePath: \html\src\http\modules\wallet.js
 * @Desc: 描述
 */
import $http from '../index'

// 查询充值记录
export function queryDepositRecords(params) {
  return $http({
    url: '/m/a/recharges/' + params,
    method: 'get',
  })
}

// 查询转账记录
export function queryWithdrawsRecords(params) {
  return $http({
    url: '/m/a/withdraws/' + params,
    method: 'get',
  })
}
// 查询账户列表
export function getAccounts() {
  return $http({
    url: `/m/a/accounts/1/${new Date().getTime()}`,
    method: 'get',
  })
}
// 查询交易账号列表
export function getGAccounts() {
  return $http({
    url: `/m/a/gaccounts/1/${new Date().getTime()}`,
    method: 'get',
  })
}

// 查询交易账号单个币种
export function getGCurrency(currency) {
  return $http({
    url: `/m/a/gaccount/${currency}/${new Date().getTime()}`,
    method: 'get',
  })
}

// 查询当前充值币种对象
export function queryCurrency(params) {
  return $http({
    url: '/m/a/currency/' + params,
    method: 'get',
  })
}

// 充值通知 -猜的
export function getDepositNotify(params) {
  return $http({
    url: '/m/a/essa/chargenotice' + params,
    method: 'get',
  })
}
// 查询账户列表
export function getAllticker() {
  return $http({
    url: `/m/allticker/${new Date().getTime()}`,
    method: 'get',
  })
}

// 获取账户地址
export function getMemberAddress(params) {
  return $http({
    url: '/wallet/member/getmemberaddr/' + params,
    method: 'get',
  })
}

// 生成充值地址 {currency}/{coin_label_id}
export function createDepositAddress(params) {
  return $http({
    url: `/member/deposit/addr`,
    method: 'post',
    data: params,
  })
}

// 获取充值地址 {currency}/{coin_label_id}/{ts}
export function getDepositAddress(params) {
  return $http({
    url: '/m/a/deposit/addr/' + params,
    method: 'get',
  })
}

// 获取多链币
export function getCoinLabels(params) {
  return $http({
    url: '/m/a/getcoinlabels/' + params,
    method: 'get',
  })
}
// 查询账户列表
export function getCurrency(currency) {
  return $http({
    url: `/m/a/currency/${currency}/${new Date().getTime()}`,
    method: 'get',
  })
}

export function getExchange() {
  return $http({
    url: `/m/a/exchange/usdtcny`,
    method: 'get',
  })
}

export function getAccountCurr(currency) {
  return $http({
    url: `/m/a/account/${currency}/${new Date().getTime()}`,
    method: 'get',
  })
}

export function getMemberSendmsg(code, name) {
  return $http({
    url: `/member/sendmsg/${code}${name}`,
    method: 'get',
  })
}

export function getMemberValidmsgcode(code, name, verfiy) {
  return $http({
    url: `/member/validmsgcode/${code}${name}/${verfiy}`,
    method: 'get',
  })
}

export function getKaptcha() {
  return $http({
    url: `/member/kaptcha`,
    method: 'get',
  })
}

export function postWithdraw(param) {
  return $http({
    url: `/order/o/withdraw`,
    method: 'post',
    data: param,
  })
}

// 转账地址列表 m/a/withdraw/addr
export function getTansferAddr(param) {
  return $http({
    url: `/m/a/withdraw/addr/${param.currency}/${param.coinLabelId
      }/${new Date().getTime()}`,
    method: 'get',
  })
}
// 新建转账地址
export function createTansferAddr(param) {
  return $http({
    url: '/member/withdraw/addr',
    method: 'post',
    data: param,
  })
}
// 删除转账地址
export function deleteTansferAddr(param) {
  return $http({
    url: '/member/withdraw/addr',
    method: 'delete',
    data: param,
  })
}
// 通知充值 params: {currency, address}
export function depositNotify(params) {
  return $http({
    url: '/m/a/essa/chargenotice/' + params,
    method: 'get',
  })
}

// 查询提现记录
export function withdrawRecords(params) {
  return $http({
    url: '/m/a/withdraws/' + params,
    method: 'get',
  })
}
