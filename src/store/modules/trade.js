import { getAccounts, getStatusZeroOrders } from "@/http/modules/trade";
import { getTickers } from "@/http/modules/home";
import { base_symbol } from "@/config/globalVariable";
import home from './home'
const { sendSocketMsg, setReceiveFun } = home.actions

const user = {
  namespaced: true,
  state: {
    symbol: base_symbol, //初始化程序默认交易对ltusdt lttusdt
    accounts: [], // 用户资金
    orders: [], // 委托单
    tickers: [], // 币种
    tradeType: 'buy',
    amountType: 0,
    price: 0, // 价格
    volume: 0, // 数量
    pwd: '', // 资金密码
    priceType: '', // 市价 限价
    tradeChange: false,
    toHuoBMarket: false,
    HuoBTradePairsArr: ["btcusdt", "ethusdt"],
    msgData: {},
    currencys: ""
  },
  mutations: {
    SET_ACCOUNTS: (state, accounts) => {
      state.accounts = accounts
    },
    SET_ORDERS: (state, orders) => {
      state.orders = orders
    },
    SET_SYMBOL: (state, symbol) => {
      state.symbol = symbol
    },
    SET_TICKERS: (state, tickers) => {
      state.tickers = tickers
    },
    SET_CURRENCYS: (state, currencys) => {
      state.currencys = currencys;
    },
    SET_STATE: (state, data) => {
      for (let i in data) {
        state[i] = data[i]
      }
    },
    SET_STATE_STR: (state, [name, val]) => {
      state[name] = val
    }
  },
  actions: {
    // 获取用户数据 可用余额，当前委托
    refreshUserData({ state, commit }) {
      getAccounts().then((res) => {
        if (res && res.accounts) {
          commit('SET_ACCOUNTS', res.accounts)
          commit('SET_CURRENCYS', res.currencys)
        }
      });
      getStatusZeroOrders(state.symbol, 1, 5).then((res) => {
        if (res && res.orders) {
          commit('SET_ORDERS', res.orders)
        }
      });
    },
    evtRefreshUserData({ dispatch }) {
      dispatch('refreshUserData');
    },
    evtReloadAllTicker({ commit }, data) {
      commit('SET_TICKERS', data);
    },
    evtMainIndexChange({ commit }, data) {
      commit('SET_STOPTOPLOAD', data != 2);
    },
    getTickers({ dispatch }) {
      return new Promise((reslove) => {
        getTickers().then((res) => {
          var tickers = [];
          for (let i in res.data) {
            let close = Number(res.data[i].close);
            let open = Number(res.data[i].open);
            let allUpAndDown = (((close - open) / open) * 100).toFixed(2);
            res.data[i].allUpAndDown = isNaN(allUpAndDown) ? '0%' : allUpAndDown + '%';
            tickers.push(res.data[i]);
          }
          tickers = tickers.sort(function (l, r) {
            return l.symbol > r.symbol ? 1 : -1;
          });
          dispatch('evtReloadAllTicker', tickers);
          reslove();
        });
      });
    },
    // eslint-disable-next-line no-unused-vars
    refreshWsDatas({ state },) {
      const callBack = msg => {
        state.msgData = msg;
      }
      setReceiveFun(home, callBack)

      let socketMessage = [
        {
          key: ['depth', state.symbol, 0].join('_'),
          ts: new Date().getTime()
        },
        {
          key: ['trades', state.symbol, 10].join('_'),
          ts: new Date().getTime()
        },
        {
          key: 'tickers',
          ts: new Date().getTime()
        }
      ];
      const Obj = {
        msgs: socketMessage,
        timeout: 100 * 1000
      }
      sendSocketMsg(home, Obj)
    },
    // eslint-disable-next-line no-unused-vars
    sendSocketMsg({ state }, Obj) {
      sendSocketMsg(home, Obj)
    },
    evtRefreshTrade({ state, commit, dispatch }, data) {
      commit('SET_STATE', {
        symbol: data.symbol,
        tradeType: data.tradeType,
        amountType: 0,
        price: '',
        volume: '',
        pwd: '',
        priceType: {
          name: 'LIMITED',
          value: 'limit',
        },
        toHuoBMarket: data.symbol && state.HuoBTradePairsArr.indexOf(data.symbol) >= 0,
        tradeChange: true
      });
      dispatch('refreshUserData');
      dispatch('refreshWsDatas');
      dispatch('getTickers');
    }
  }
}

export default user
