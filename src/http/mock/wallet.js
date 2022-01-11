
import SAMSUNG from './image/SAMSUNG.png';
import SAMWHA from './image/SAMWHA.png';
import WALSIN from './image/WALSIN.jpg';
import YAGEO from './image/YAGEO.png';
import MURATA from './image/MURATA.png';

import Mock from 'mockjs'

const { Random } = Mock;
/**
 *  测试
 */
Mock.mock('/wallet/list', 'get', {
  "msg": "成功",
  "status": 1,
  "data|3-5": [{
    "currency": '三星',
    "currencyImg": SAMSUNG,
    "available_balance|1-800": 800,//随机生成1-800的数字
    "price": Random.integer(5, 100),
  }, {
    "currency": '三和',
    "currencyImg": SAMWHA,
    "available_balance|1-800": 800,//随机生成1-800的数字
    "price": Random.integer(5, 100),
  }, {
    "currency": '华新',
    "currencyImg": WALSIN,
    "available_balance|1-800": 800,//随机生成1-800的数字
    "price": Random.integer(5, 100),
  }, {
    "currency": '国巨',
    "currencyImg": YAGEO,
    "available_balance|1-800": 800,//随机生成1-800的数字
    "price": Random.integer(5, 100),
  }, {
    "currency": '村田',
    "currencyImg": MURATA,
    "available_balance|1-800": 800,//随机生成1-800的数字
    "price": Random.integer(5, 100),
  }]
});





