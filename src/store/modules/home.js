import Socket from "@/utils/socket.js"
const home = {
  namespaced: true,
  state: {
    // 首页行情
    tickers: [],
    // 货币价格
    ticker_price: {},
    // 设备ID
    deviceId: '869033027897439',
    // websocket
    socket: null,
    marketData: []
  },
  mutations: {
    SET_TICKERS: (state, tickers) => {
      state.tickers = tickers
    },
    SET_DEVICE_ID: (state, deviceId) => {
      state.deviceId = deviceId
    },
    SET_TICKER_PRICE: (state, tickers) => {
      state.ticker_price = tickers
    },
    SET_AMOUNT: (state, amount) => {
      state.amount = amount
    },
    SET_MARKET_DATA: (state, marketData) => {
      state.marketData = marketData
    }
  },
  actions: {
    /**
     * websocket调用接口，全局打开和关闭，无需另外调用，只需要接入发送消息函数和接收消息函数
     */
    // 发消息
    // eslint-disable-next-line no-unused-vars
    sendSocketMsg({ state }, msgs) {
      console.log(JSON.stringify(msgs));
      state.socket.sendMsg(msgs)
    },
    // 接消息 切换接收消息函数
    setReceiveFun({ state }, callback) {
      state.socket.setReceiveFun(callback)
    },
    // 关闭
    closeSocket({ state }) {
      state.socket.close()
    },
    // 初始化
    initSocket({ state, dispatch }) {
      console.log(dispatch);
      console.log(this);
      const config = {
        url: "/socket/websocket",
        // onmessage: evt => {
        //   const msgData = JSON.parse(evt.data);
        //   dispatch('receiveSocketMsg', msgData);
        // }
      };
      state.socket = new Socket(config);
    }
  }
}
export default home