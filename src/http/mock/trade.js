/**
 * Mock 模拟接口
 * data里的属性看不懂，需要详细看语法规范,博客链接:https://www.jianshu.com/p/4579f40e6108
 */
import Mock from 'mockjs'

const { Random } = Mock;
let tab_price = 4.1;
let high_price = 4.1, low_price = 4.1, close_price = 4.1, open_price = 4.1;

Random.extend({
  // trade: function () {
  //   let upOrdown = ((Math.random() * 2) - 1) * 5 / 100;
  //   let price = tab_price * (1 + upOrdown);
  //   open_price = price;
  //   if (price > high_price) {
  //     high_price = price;
  //   }
  //   if (price < low_price) {
  //     low_price = price;
  //   }
  //   return open_price;
  // },
  tradeOpen: function () {
    let upOrdown = ((Math.random() * 2) - 1) * 5 / 100;
    let price = tab_price * (1 + upOrdown);
    open_price = price;
    if (price > high_price) {
      high_price = price;
    }
    if (price < low_price) {
      low_price = price;
    }
    return open_price;
  },
  tradeClose: function () {
    let upOrdown = ((Math.random() * 2) - 1) * 5 / 100;
    let price = tab_price * (1 + upOrdown);
    close_price = price;
    if (price > high_price) {
      high_price = price;
    }
    if (price < low_price) {
      low_price = price;
    }
    return close_price;
  },
  tradeHigh: function () {
    let upOrdown = Math.random() * 5 / 100;
    let price = tab_price * (1 + upOrdown);
    if (price > high_price) {
      high_price = price;
    }
    return high_price;
  },
  tradeLow: function () {
    let upOrdown = (Math.random() - 1) * 5 / 100;
    let price = tab_price * (1 + upOrdown);
    if (price < low_price) {
      low_price = price;
    }
    return low_price;
  },
  volume: function (min, max) {
    let price = close_price;
    high_price = price;
    low_price = price;
    open_price = price;
    tab_price = close_price;
    return Random.float(min, max, 1, 2);
  }
})

Mock.mock('/trade/kline/list', 'get', {
  "msg": "成功",
  "status": 1,
  "data|60": [{
    "time|+1": new Date().getTime(),
    "open": "@tradeOpen()",
    "close": "@tradeClose()",
    "high": "@tradeHigh()",
    "low": "@tradeLow()",
    "volume": "@volume(0, 100)",
  }]
});

Mock.mock('/trade/kline/node', 'get', {
  "msg": "成功",
  "status": 1,
  "data": {
    "time|+1": new Date().getTime() + 1000,
    "open": "@tradeOpen()",
    "close": "@tradeClose()",
    "high": "@tradeHigh()",
    "low": "@tradeLow()",
    "volume": "@volume(0, 100)",
  }
});



