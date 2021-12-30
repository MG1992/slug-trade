const myOrder = () => import(/* webpackChunkName: "group-mine" */ '@/views/otc/myOrder.vue')

const buyPaymentOrder = () => import('@/views/otc/buyPaymentOrder.vue')
// 广告下单页面
const AdsList = () => import(/* webpackChunkName: "group-mine" */ '@/views/otc/ads/AdsList.vue')
// 发布广告
const PublishAds = () => import(/* webpackChunkName: "group-mine" */ '@/views/otc/ads/PublishAds.vue')
// 广告商
const Advertiser = () => import(/* webpackChunkName: "group-mine" */ '@/views/otc/advertiser.vue')
// 借币记录
const curBorrowingRecord = () => import(/* webpackChunkName: "group-mine" */ '@/views/otc/curBorrowingRecord.vue')
// 借币
const curBorrowing = () => import(/* webpackChunkName: "group-mine" */ '@/views/otc/curBorrowing.vue')
// 黑洞 销毁记录
const blackHole = () => import(/* webpackChunkName: "group-mine" */ '@/views/otc/blackHole.vue')
// 划转
const transfer = () => import(/* webpackChunkName: "group-mine" */ '@/views/otc/transfer.vue')
// 保证金
const assuranceCash = () => import(/* webpackChunkName: "group-mine" */ '@/views/otc/assuranceCash.vue')

export default [
  {
    path: '/myOrder',
    name: 'myOrder',
    component: myOrder
  },
  {
    path: '/buyPaymentOrder',
    name: 'buyPaymentOrder',
    component: buyPaymentOrder
  },
  {
    path: '/adsList',
    name: 'AdsList',
    component: AdsList,
  },
  {
    path: '/publishAds/:type',
    name: 'PublishAds',
    component: PublishAds,
  },
  {
    path: '/advertiser',
    name: 'Advertiser',
    component: Advertiser,
  },
  {
    path: '/curBorrowingRecord',
    name: 'CurBorrowingRecord',
    component: curBorrowingRecord,
  },
  {
    path: '/curBorrowing',
    name: 'CurBorrowing',
    component: curBorrowing,
  },
  {
    path: '/blackHole',
    name: 'BlackHole',
    component: blackHole,
  },
  {
    path: '/transfer',
    name: 'Transfer',
    component: transfer,
  },
  {
    path: '/assuranceCash',
    name: 'AssuranceCash',
    component: assuranceCash,
  }
]
