const servers = [
  // information
  // { name: "/dev-api" }
  { name: '/wallet' },
  { name: '/m' },
  { name: '/news' },
  { name: '/browser' },
  { name: '/socket' },
  { name: '/order' },
  { name: '/member' },
  { name: '/global' },
  { name: '/pattern' }
]
let proxyObj = {}

servers.forEach(function (item) {
  const serverObj = {}

  serverObj[item.name] = {
    // fixme: 这里替换成需要代理的服务器端口
    target: item.target || 'http://sscv-www.hrwallet.xyz',
    // target: item.target || 'http://www.goccoin.xyz',
    // target: item.target || 'http://goc-www.hrwallet.xyz',
    // target: item.target || 'http://image.hrwallet.xyz',
    // target: item.target || 'http://www.wdh.pw',
    changeOrigin: true,
  }

  proxyObj = Object.assign(proxyObj, serverObj)
})

module.exports = proxyObj
