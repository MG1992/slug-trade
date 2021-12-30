import $http from "../index";
import i18n from "@/langs";
import { KeyFilter } from "@/utils/filter";

export function getMarketList() {
  return $http({
    url: `/home/market/list`,
    method: "get",
  });
}

export function getPrice(currency) {
  return $http({
    url: `/wallet/wealth/huobi/price/${currency}`,
    method: "get",
  });
}
// 获取币种
export function getAllPrice() {
  return $http({
    url: `/wallet/wealth/calltiker`,
    method: "post",
    data: {
      symbols: "",
    },
  });
}

// 获取首页行情
export function getAllTicker() {
  return $http({
    url: `/wallet/wealth/getalltikers`,
    method: "get"
  });
}

// 获取黑洞总数
export function getBlackHole() {
  return $http({
    url: `/m/a/blackhold/all/${new Date().getTime()}`,
    method: "get"
  });
}

// 获取黑洞总数
export function getFund() {
  return $http({
    url: `/pattern/invest/fundrecord/1/${9999}`,
    method: "get"
  });
}

// 获取首页行情
export function getTickers() {
  return $http({
    url: `/m/allticker/${new Date().getTime()}`,
    method: "get",
  });
}

// 获取首页公告
export function getNews(lang) {
  return $http({
    url: `/news/${lang}/1/1/1/${new Date().getTime()}`,
    method: "get",
  });
}

// 判断账户是否被冻结
export function layout() {
  return $http({
    url: "wallet/member/layout",
    method: "get",
  });
}

// 获取公告
export function getNotice() {
  return $http({
    url: `/news/1/${KeyFilter(
      i18n.locale,
      "common.langNum"
    )}/1/15/${new Date().getTime()}`,
    method: "get",
  });
}
// 获取公告详情  ['news', this.newsId, $acc.getLanguage(), '#TS']
export function getNoticeDetail(id) {
  return $http({
    url: `/news/${id}/${KeyFilter(
      i18n.locale,
      "common.langNum"
    )}/${new Date().getTime()}`,
    method: "get",
  });
}
// 矿池列表
export function getOrePool() {
  return $http({
    url: `/wallet/wealth/separategroupcount`,
    method: "get",
  });
}
// 获取货币信息
export function getCurrencyInfo(currency) {
  return $http({
    url: `/m/a/currency/${currency}/${new Date().getTime()}`,
    method: "get",
  });
}

// 矿池详情
export function getOrePoolDetail(currency) {
  return $http({
    url: `/wallet/wealth/separategroupcountdetail/${currency}`,
    method: "get",
  });
}
// 周收益
export function getOreWeekEarnings(currency) {
  return $http({
    url: `/wallet/wealth/separateweektotal/${currency}`,
    method: "get",
  });
}
// 持币收益率
export function getOreWeekEarningsRate(currency) {
  return $http({
    url: `/wallet/wealth/separateweekrate/${currency}`,
    method: "get",
  });
}
// 矿池收益记录
export function getEarningsRecords(param) {
  return $http({
    url: `/wallet/wealth/separaterecord/${param.type}/${param.currency}/${param.pageNum}/${param.pageSize}`,
    method: "get",
  });
}

// 退出钱包 退出登陆
export function logout(pwd) {
  return $http({
    url: "/wallet/member/layout",
    method: "post",
    data: {
      m_pwd: pwd,
    },
  });
}

// 获取众筹详情
export function getSubscribeInfo(params) {
  return $http({
    url: `/wallet/wealth/getnutboltsufficient/${params}`,
    method: "get",
  });
}

// 提交众筹
export function submitSubscribe(params) {
  return $http({
    url: "/wallet/wealth/nutbolttransfer",
    method: "post",
    data: params,
  });
}

// 获取众筹的列表
export function getSubscribeList() {
  return $http({
    url: "/wallet/wealth/getperfectnutboltprofit",
    method: "get",
  });
}
// 退出子地址 退出登陆
export function logoutSubAddress(id, pwd) {
  return $http({
    url: "/wallet/member/deladdr",
    method: "post",
    data: {
      id: id,
      m_pwd: pwd,
    },
  });
}
// 获取节点奖
export function getNodeRewardList(param) {
  return $http({
    url: `/member/nodeAwardList/${param.currency}/${param.pageNum}/${param.pageSize
      }/${new Date().getTime()}`,
    method: "get",
  });
}
