// export function interceptNumbers(number, digit) {
//   var transNum = Number(number)
//   // var m = transNum.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
//   // 计算小数点位数
//   let maxLength = 0
//   if (String(transNum).indexOf('.') > -1) {
//     maxLength = String(transNum).split('.')[1].length
//   }
//   digit = digit > maxLength ? maxLength : digit
//   return transNum.toFixed(digit)
// }
// 缓存对象
let cacheFileObj = {}
const deviceId = window.api && window.api.deviceId || '869033027897439'

// 本地存取数据
const storage = {
  get: function (key) {
    return localStorage.getItem(key)
  },
  set: function (key, value) {
    if (process.env.VUE_APP_IS_APP) {
      cacheFileObj[key] = value
      // 先读取数据
      this.toReadFile().then(data => {
        console.log('read data = ' + JSON.stringify(data));
        console.log(cacheFileObj);

        if (data && (data instanceof Object)) {
          cacheFileObj = Object.assign({}, data, cacheFileObj)
        }
        console.log(cacheFileObj);
        this.toWriteFile(cacheFileObj)
      }).catch(() => {
        // const data = {}
        // data[key] = value
        this.toWriteFile(cacheFileObj)
      })
    }
    return localStorage.setItem(key, value)
  },
  clear: function () {
    if (process.env.VUE_APP_IS_APP) {
      this.toWriteFile({})
    }
    cacheFileObj = {}
    localStorage.clear()
  },
  //存储文件
  toWriteFile: function (data) {
    console.log('write data = ' + JSON.stringify(data));
    if (window.api) {
      window.api && window.api.writeFile({
        path: window.api.cacheDir + '/item_data' + deviceId,
        data: JSON.stringify(data),
      }, function (ret) {
        if (!ret.status) {
          return
        }
      });
    }
  },
  //读取缓存文件
  toReadFile: function () {
    return new Promise((resolve, reject) => {
      if (window.api) {
        window.api.readFile({
          path: window.api.cacheDir + '/item_data' + deviceId,
        }, function (ret) {
          if (ret && ret.status) {
            if (ret.data && ret.data !== '') {
              let reData = ret
              if (ret instanceof Object) {
                reData = storage.parseObj(ret)
              }
              console.log('read data = ' + JSON.stringify(reData.data));
              return resolve(reData.data)
            } else {
              return resolve({})
            }
          } else {
            reject('error')
            return
          }
        });
      }
    });
  },
  // 读取所有缓存
  toReadAllStorage: function (callback) {
    window.api.readFile({
      path: window.api.cacheDir + '/item_data' + deviceId,
    }, function (ret) {
      console.log(window.api.cacheDir + '/item_data' + deviceId);
      if (ret && ret.status) {
        if (ret.data && ret.data !== '') {
          let reData = ret
          if (ret instanceof Object) {
            reData = storage.parseObj(ret)
          }
          console.log('all Data = ' + JSON.stringify(reData));
          const storages = reData.data
          // 读取后赋值
          cacheFileObj = storages
          Object.keys(storages).forEach(attr => {
            if (storages[attr] && storages[attr] instanceof Object) {
              localStorage.setItem(attr, JSON.stringify(storages[attr]))
            } else {
              localStorage.setItem(attr, storages[attr])
            }
          })
        }
      }
      callback()
    });
  },
  // 过滤取出来的对象
  parseObj: function (obj) {
    // 存储的对象是字符串 而且需要多次json转化
    Object.keys(obj).forEach(attr => {
      if (obj[attr] && /\{/g.test(obj[attr]) && JSON.parse(obj[attr]) instanceof Object) {
        obj[attr] = JSON.parse(obj[attr])
        obj[attr] = storage.parseObj(obj[attr])
      }
    })
    return obj
  }
}
export { storage }