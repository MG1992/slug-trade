/**
 *
 * config 类型 Object
 * config.url 地址
 * config.intervalMsgInfo 定时发送的消息对象
 * config.intervalMsgInfo.msgs 定时发送的消息对象的消息 类型 Array
 * config.intervalMsgInfo.timeout 定时发送的消息对象的时间间隔 Number
 * config.onmessage 接收消息的函数
 * 
 * 页面调用实例
    import { socket } from "@/utils/socket.js";
    data() {
      return{
        socket: null
      }
    }

    getSocket(msgs, callback) {
      const config = {
        url: "/socket/websocket",
        intervalMsgInfo: {
          msgs: msgs, // 消息数组 需要发送的消息数组
          timeout: 10 * 1000
        },
        onmessage: evt => {
          const msgData = JSON.parse(evt.data);
          callback(msgData);
        }
      };
      this.socket = socket(config);
    }

    // socket主动发消息
    this.socket.send(JSON.stringify(msg)); msg 类型 对象
    
    // socket主动关闭
    this.socket.close();
 *
 */
export default class Socket {
  constructor(config) {
    this.config = config
    // ws对象
    this.ws = null
    // 心跳消息定时器
    this.timer = null
    // 锁定重连 true代表重连中
    this.lockReconnect = false
    // 重连次数
    this.reconnectCount = 0
    // 接受ws消息函数
    this.receiveFun = null
    // 都改为wss 下面就先暂时不换了
    this.socketUrl = `${(window.location.hostname === "www.wdh.pw" || window.location.hostname === "localhost") ? "ws" : "ws"}://${window.location.host || process.env.VUE_APP_BASE_BASE_HTTP_URL.replace(/http:\/\/|https:\/\//g, '')}${config.url}`
    this.init()
    // return this.init()
  }

  // 声明对象
  // apicloud的ws需要引入模块，否则打包报错 window.api表示app运行
  // 此处兼容2个平台
  init() {
    if (window.api) {
      return this.initAppWS()
    } else {
      return this.initWebWS()
    }
  }

  initWebWS(callback) {
    try {
      if ('WebSocket' in window) {
        this.ws = new WebSocket(this.socketUrl)

        // eslint-disable-next-line no-unused-vars
        this.ws.onopen = function (evt) {
          // startTimerMsg() // 心跳检测
          console.log("Connection open ...")
          if (callback) callback()
        }

        this.ws.onmessage = (evt) => {
          // 执行回调
          const msgData = JSON.parse(evt.data);
          if (this.receiveFun) this.receiveFun(msgData)
        }

        this.ws.onerror = () => {
          if (this.reconnectCount > 5) {
            console.log(`重连5次不成功，取消重连`)
            return
          }
          this.reconnect(this.socketUrl)
          this.reconnectCount++
          console.log(`ws连接错误!，重连第${this.reconnectCount}次`)
        }

        // eslint-disable-next-line no-unused-vars
        this.ws.onclose = (evt) => {
          if (this.timer) clearInterval(this.timer)
          console.log("Connection closed." + new Date().toLocaleString())
        }
        return this.ws
      }
    } catch (e) {
      console.log('err')
      this.reconnect(this.socketUrl)
      console.log(e)
    }
  }
  // apiCloud的ws初始化
  initAppWS(callback) {
    const self = this
    this.ws = window.api.require('myWebSocket');
    return new Promise((resolve) => {
      this.ws.open({
        url: this.socketUrl,
        pingInterval: 30,
        pingData: 'ping',
        autoReconnect: false //开启自动重连
      }, function (ret) {
        console.log('ret ======= ' + JSON.stringify(ret));
        if (ret) {// eslint-disable-next-line no-unused-vars
          self.ws.bindEvent(function (ret, err) {
            var type = ret.type;
            switch (type) {
              case 'opened':
                //登录...
                // startTimerMsg() // 心跳检测
                console.log("Connection open ...")
                resolve(self.ws)
                break;
              case 'receive':
                // self.config.onmessage(ret)
                if (self.receiveFun) self.receiveFun(JSON.parse(ret.data))
                break;
              case 'error':
                //do something ...
                if (self.reconnectCount > 5) {
                  console.log(`重连5次不成功，取消重连`)
                  return
                }
                self.reconnect(self.socketUrl)
                self.reconnectCount++
                console.log(`self.连接错误!，重连第${self.reconnectCount}次`)
                break;
              case 'closed':
                //do something ...
                console.log("Connection closed." + new Date().toLocaleString())
                if (self.timer) clearInterval(self.timer)
                break;
            }
          });
          if (callback) callback()
        } else {
          console.log('打开websocket失败');
        }
      });
    })
  }

  // 设置接收函数
  setReceiveFun(func) {
    this.receiveFun = func
  }

  reconnect() {
    if (this.lockReconnect) return
    this.lockReconnect = true
    setTimeout(function () { // 没连接上会一直重连，设置延迟避免请求过多
      if (window.api) {
        this.initAppWS(this.socketUrl)
      } else {
        this.initWebWS(this.socketUrl)
      }
      this.lockReconnect = false
    }, 1000)
  }

  // 发送消息
  sendMsg(msg) {
    if (window.api) {
      // 不在连接状态
      if (this.ws.readyState() !== 1) {
        setTimeout(() => {
          this.initAppWS(this.sendMsg(msg))
        }, 1000)
        return
      }
    } else {
      if (this.ws.readyState !== 1) {
        setTimeout(() => {
          this.initWebWS(this.sendMsg(msg))
        }, 1000)
        return
      }
    }
    if (msg instanceof Array) {
      this.toSendMsg(msg)
    } else {
      this.startTimerMsg(msg)
    }
  }
  // eslint-disable-next-line no-unused-vars
  /**
   * 定时器消息函数
   * @param {Object} msgsObj
   * @param {Array} msgsObj.msgs 发送的消息数组
   * @param {Number} msgsObj.timeout 发送时间间隔
   */
  startTimerMsg(msgsObj) {
    const msgs = msgsObj.msgs
    this.toSendMsg(msgs)
    // 每多久发一次消息 心跳设置
    this.timer = setInterval(() => {
      this.toSendMsg(msgs)
    }, msgsObj.timeout)
  }

  /**
   * 发送消息数组函数
   * @param {Array} msgs 
   */
  toSendMsg(msgs) {
    let cancel = false
    if (window.api) {
      // if (this.ws.readyState() !== 1) { return }
      msgs.forEach(msg => {
        if (msg.key.includes('cancel')) {
          cancel = true
        }
        const re = this.ws.send({ msg: JSON.stringify(msg) })
        console.log(re);
      })
    } else {
      // if (this.ws.readyState !== 1) return
      msgs.forEach(msg => {
        if (msg.key.includes('cancel')) {
          cancel = true
        }
        this.ws.send(JSON.stringify(msg))
      })
    }
    if (cancel) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
