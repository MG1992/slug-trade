import pako from 'pako'
import { find } from 'lodash';

export const webSocketMixin = {
  data() {
    return {
      isWebsock: false,
      websockTime: "", //心跳
      arrayData: []
    };
  },
  created() {},
  methods: {
    /**
     * 获取推送数据 （取一个值就好）
     * e {string} load=加载 get=获取
     */
    webSocket(e) {
      const self = this;
      if (e == "load") {
        if (typeof WebSocket === "undefined") {
          alert("您的浏览器不支持socket");
        } else {
          try {
            self.websock.close();
            this.isWebsock = false;
          } catch (e) {}
          // 实例化socket
          self.websock = new WebSocket(self.wsUrl);
          // 监听socket连接
          self.websock.onopen = self.websockOpen;
          // 监听socket错误信息
          self.websock.onerror = self.websockError;
          // 监听socket消息
          self.websock.onmessage = self.websockMessage;
        }
      }
    },
    //链接状态
    websockOpen(e) {
      const self = this;
      // console.log("socket连接成功");
      if (this.websockTime) {
        clearInterval(this.websockTime);
      }
      this.isWebsock = true;
      this.websockSend();
      setTimeout(function() {
        self.websockHeartbeat();
      }, 1000);
    },
    //发送消息
    websockSend(msg) {
      const self = this;
      if (msg) {
        if (this.isWebsock) {
          self.websock.send(msg);
        }
      } else {
        self.websock.send(
          JSON.stringify({
            sub: `market.${self.symbol}.kline.${self.interval}`,
            req: `market.${self.symbol}.kline.${self.interval}`,
            id: self.symbol,
          })
        );
      }
    },
    //错误
    websockError(e) {
      // console.log("连接错误");
      this.websockClose();
    },

    //监听返回消息
    websockMessage(msg) {
      const reader = new FileReader();
      const self = this;
      reader.readAsArrayBuffer(msg.data, 'utf-8');
      reader.onload = function() {
        let ploydata = new Uint8Array(reader.result);
        let res = JSON.parse(pako.inflate(ploydata, {to: 'string'}));
        if (res && res.tick) {
          const { ts, tick: { close = 0, open = 0, high = 0, low = 0, vol = 0 } } = res;
          self.arrayData.push({
            time: Number(ts),
            close: Number(close),
            open: Number(open),
            high: Number(high),
            low: Number(low),
            volume: Number(vol),
          });

          // TODO：容错重复调用删除了
          self.onLoadedCallback && self.onLoadedCallback(self.arrayData);
        }
          
      }
    },
    //心跳
    websockHeartbeat() {
      const self = this;
      // ws在建立连接后，需要5s之内给ws clint 发送一次心跳，否则2次之后会关闭
      self.websockTime = setInterval(function() {
        self.websockSend(JSON.stringify({ ping: new Date().getTime() }));
      }, 3000);
    },
    //连接关闭
    websockClose() {
      // console.log("socket已经关闭");
      clearInterval(this.websockTime);
      this.isWebsock = false;
    },
  },
};
