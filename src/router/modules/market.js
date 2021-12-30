const Market = () => import('@/views/market/market.vue')
const KLine = () => import('@/views/market/kLine.vue')
const TradeView = () => import('@/views/market/tradeView.vue')

export default [
  {
    path: '/market',
    name: 'Market',
    component: Market
  },
  {
    path: '/kLine',
    name: 'KLine',
    component: KLine
  },
  {
    path: '/tradeView',
    name: 'TradeView',
    component: TradeView
  }
]