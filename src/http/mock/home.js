/**
 * Mock 模拟接口
 * data里的属性看不懂，需要详细看语法规范,博客链接:https://www.jianshu.com/p/4579f40e6108
 */
import Mock from 'mockjs'

const { Random } = Mock;
/**
 *  测试
 */
Mock.mock('/home/market/list', 'get', {
  "msg": "成功",
  "status": 1,
  "data|3-5": [{
    "id|1": [
      'CL03A105MQ3CSNC',
      "CL03A105MQ3CSNC",
      "CL03A105MQ3CSNH",
      "CL03A105MP3NSNC",
      "CL03A105MO5NRNH",
      "CL05A105KQ5NNNC",
      "CL05A105KP5NNNC",
      "CL05A105KO5NNNC",
      "CL05A105KA5NQNC",
    ],
    "price|1-800": 800,//随机生成1-800的数字
    "rise|1": [Random.float(-10, 10, 1, 2), Random.float(-10, 10, 1, 2), Random.float(-10, 10, 1, 2), Random.float(-10, 10, 1, 2)],//随机生成1-100的数字
  }]
});





