const Trade = () => import('@/views/trade/trade.vue')
const OrderDetail = () => import('@/views/trade/orderDetail.vue')

export default [
  {
    path: '/trade',
    name: 'Trade',
    component: Trade
  }, {
    path: '/orderDetail',
    name: 'OrderDetail',
    meta: {
      notkeepAlive: true
    },
    component: OrderDetail
  }
]