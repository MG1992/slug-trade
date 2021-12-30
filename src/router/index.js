/*
 * @Author: 唐嘉伟
 * @Date: 2020-09-07 10:17:46
 * @LastEditors: 唐嘉伟
 * @LastEditTime: 2020-09-16 19:41:35
 * @FilePath: \html\src\router\index.js
 * @Desc: 描述
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './modules/home'
import user from './modules/user'
import mine from './modules/mine'
import market from './modules/market'
import trade from './modules/trade'
import wallet from './modules/wallet'
import pledge from './modules/pledge'
import otc from './modules/otc'

Vue.use(VueRouter)
const routes = [...home, ...user, ...mine, ...market, ...trade, ...wallet, ...pledge, ...otc]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})
router.afterEach(() => {
  // 回到顶部操作
  window.scrollTo(0, 0)
})
export default router
