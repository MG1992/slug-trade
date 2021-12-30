import $http from "../index";


export function getStoreList() {
  return $http({
    url: `/market/store/list`,
    method: "get",
  });
}













export function getTicker(symbol) {
  return $http({
    url: `/m/ticker/${symbol}/${new Date().getTime()}`,
    method: "get",
  });
}

// 获取币种信息
export function currencyIntroduce(currency) {
  return $http({
    url: `/m/currencyInfo/${currency}/${new Date().getTime()}`,
    method: "get",
  });
}
// 获取单个币种价格
export function getTickerPrice(param) {
  return $http({
    url: `/wallet/wealth/calltiker`,
    method: "post",
    data: {
      symbols: param,
    },
  });
}
