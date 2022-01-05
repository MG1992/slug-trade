/**
 * Mock 模拟接口
 * data里的属性看不懂，需要详细看语法规范,博客链接:https://www.jianshu.com/p/4579f40e6108
 */
import Mock from 'mockjs'

const { Random } = Mock;

Random.extend({
  random: function (min, max) {
    return Random.float(min, max, 1, 2);
  }
})

Mock.mock('/trade/kline/list', 'get', {
  "msg": "成功",
  "status": 1,
  "data|60": [{
    "time|+1": new Date().getTime(),
    "close": "@random(0, 100)",
    "open": "@random(0, 100)",
    "high": "@random(50, 100)",
    "low": "@random(0, 50)",
    "volume": "@random(0, 100)",
  }]
});

Mock.mock('/trade/kline/node', 'get', {
  "msg": "成功",
  "status": 1,
  "data": {
    "time|+1": new Date().getTime() + 1000,
    "close": "@random(0, 100)",
    "open": "@random(0, 100)",
    "high": "@random(50, 100)",
    "low": "@random(0, 50)",
    "volume": "@random(0, 100)",
  }
});



