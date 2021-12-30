<!--
 * @Author: joevin
 * @Date: 2020-09-14 14:06:54
 * @LastEditors: joevin
 * @LastEditTime: 2020-09-22 21:15:05
 * @FilePath: /html/README.md
 * @Desc: 描述
-->

# 持续保持更新

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# 框架规范说明

# 1.本框架兼容 apiCloud 所处理的一套常用基于 vue 的前端框架，理论上所有 vue 中使用的插件这里均可使用

# 2.框架适兼容用于 apiCloud 打包出来的 app 和独立运行于网页上

# 目录结构

assets 静态资源
config 常量、配置文件等
http 请求
langs 国际化
utils 一些常用 js 函数和自定义函数 库
permission.js 权限 js
public中的app.html 是为了使用输入框的复制粘贴效果，apicloud框架限制

# 框架规范说明

# 1.按需引入

vant 组件按需引入（类似组件也一样），减少打包体积

# 2.权限控制

permission.js 权限控制 js，所有页面默认需要登录才能进入，不需要登录的页面需要在这里配置白名单

# 3.离线数据存储

localStorage 使用 utils/oldVersionFunc.js 的 storage 进行；方便统一处理；

# 4.表单检验

检验填写表单统一使用 utils/checkRiles.js，方便管理维护；（替换 beforeSubmit）

# 5.国际化

框架预留国际化处理，所有文本都使用国际化(i18n)处理， 位置 @/lang，包括： 1.文字 $t('home.mineBenefit') 位置：lang/modules
  2.日期 $d(new Date('2020-09-09'), 'short') 位置：lang/dateTimeFormats 需要不同格式自行添加 3.金钱$n(100, 'currency')、数字 $n(100, 'number')、数字自定义（最大 8 位小数） $n(100, 'maximumSignificantDigits8') 位置：lang/numberFormats
  4.后端返回错误代码 $t(`requestResponse.${res.msg}`) 位置：lang/modules requestResponse 属性；注：接口的错误返回统一处理

# 6.命名

请勿使用中文或拼音命名，文件名、函数名使用驼峰命名，类名(css)用分号隔开

# 7.window.apiready

1.apiCloud 使用需要兼容处理，只允许在 app 端使用的得加判断，使用环境变量 process.env.VUE_APP_IS_APP（websocket 需要兼容处理，存在兼容问题）
2.utils/oldVersionFunc.js 用于存放必须的旧框架函数

# 8.CSS

1.css 统一使用 sass，组件内使用都加上 scope，需要更改组件之外的使用 deep； 2.单位使用 px，框架加了 px2rem 插件； 3.全局 sass 变量写在 styles/variables.scss 里面；主题色等统一用变量写，方便维护；可往里面添加变量；

# 9.文件命名

由于平台的加密打包规范，文件命名不能带有 ~ 符号（实践发现），所以关联模块打包文件不能用~连接，webpack 配置不能去除；

# 10.分页
全局分页统一用分页组件（@/component/Pagination）处理，使用方法见组件内部；

# 11.apicloud模块使用
在使用前加入判断条件即可正常使用，例：
if (process.env.VUE_APP_IS_APP) {
  // 内容
}

# Todo list
# 1.全局防止重复请求处理；
# 2.全局 token 处理；
3.全局多样弹窗封装；
# 4.国际化 金钱、日期、数字处理；
# 5.强制更新处理
# 6.返回键处理
# 7.websocket 封装（兼容）
8.添加返回键匹配列表
# 9.切换页面返回顶部处理


# 旧框架重构的一些说明

1. checkAsyncRet（检查异步返回的结果） 函数 已全局处理 无需再处理
2. err() 弹出信息 改为 Toast
3. say() 弹出信息并关闭当前页面 改为 Toast + go(-1)
4. \$acc.getAccData(function(isLogined) {} 该函数判断是否登录，可以直接删除这函数，系统配置了白名单（permission.js），没登录状态下都无法进入除了白名单的页面
5. \$util.throttle(function(), time) 节流，几秒内只能操作一次，在做了全局防止重复请求之后可以不需考虑这个问题，这里直接去掉函数
6. LAN 国际化的处理，直接换成\$t('home.mineBenefit')
7. setAccData，作用是存入用户信息；
8. $api.setStorage和$util.storage('xx', value) 都是存储数据，用 oldVersionFunc.js 里面的 storage.set；$util.storage('xx')和$api.getStorage，用 oldVersionFunc.js 里面的 storage.get；
9. \$api.getStorage('ticker_price') 不使用 storage，从 store/modules/home 下获取'ticker_price'对象
<!-- 10. $evt.trigger('eventName') 触发事件  统一改由路参数传递 query: { eventName: eventName }
    $evt.on('eventName') 监听事件 统一改由路参数判断
    在 activated 钩子中
    if (this.\$router.query.eventName === 'eventName') {
    // do something
    } -->
11. deviceId 统一从 store/home 中获取；
12. 请求 wsName 如果是数组，原框架则通过/拼接，拼接后如果带有#TS，则用当前时间替换（时间戳）
13. 请求拼接后类似 m/a/withdraws/LHC/1/15/128232382137123
14. $evt.on('') 原型是 api.addEventListener 监听事件，支持系统事件和自定义事件
  //如监听网络连接事件
  api.addEventListener({
      name: 'online'
  }, function(ret, err) {
      alert('已连接网络');
  });
15. $evt.trigger('eventName') 原型是 api.sendEvent({params}) 将任意一个自定义事件广播出去，该事件可在任意页面通过 addEventListener 监听收到；
此方法改成：将触发的事件存在各自的模块中（home，mine...）的Actions里，通过调用Action直接触发，从State中获取值
例：
  位置：store/trade
  state: {
    symbol: "lhcusdt", //初始化程序默认交易对
    accounts: [],
    orders: []
  },
  mutations: {
    SET_ACCOUNTS: (state, accounts) => {
      state.accounts = accounts
    },
    SET_ORDERS: (state, orders) => {
      state.orders = orders
    }
  },
  actions: {
    // 获取用户信息
    refreshUserData({ commit, state }) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        getAccounts().then((res) => {
          if (res && res.accounts) {
            commit('SET_ACCOUNTS', res.accounts)
          }
        })
        getOrders(state.symbol).then((res) => {
          if (res && res.orders) {
            commit('SET_ORDERS', res.orders)
          }
        })
      })
    }
  }
  触发：引入到当前页面后直接调用 this.refreshUserData()
  获取：获取上面store中的accounts和orders
16. 使用版本更新功能需要添加mam模块。
17. $acc.refreshAccData 更新用户信息，换成调用store/user下的 GetUserInfo()
18. $ui.openWinFrame(title, url, params); 改成用router跳转，title不管，params改成用query传参，那么 $util.param('account') 换成从router的query里获取
19. $acc.getLanguage() 等获取语言的改成 this.$i18n.locale
20. \$evt.trigger("activeAddressChange") 对应 store/mine.js GetActivateAddress 方法 更新激活地址
21. \$evt.trigger("accountAddressChange") 对应 store/mine.js GetTotalEarnings 方法 更新矿池收益合计
22. utils/filter.js 其中添加了 keyValue 过滤方法 在 main.js 全局引入了，子厚其他的过滤方法也可以定义在里面
23. $ws.getSecureValue 通过@/config/oldKey.js去获取值
24. 手机回退路径在 config/backMapRouter.js 添加对应的路径

框架开发参考 user/CreateAddress.vue 模板
