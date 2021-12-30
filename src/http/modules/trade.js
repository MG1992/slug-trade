
import $http from '../index'

export function getKlineList() {
    return $http({
        url: '/trade/kline/list',
        method: 'get'
    })
}

// 获取用户数据 可用余额
export function getAccounts() {
    return $http({
        url: `/m/a/accounts/0/${new Date().getTime()}`,
        method: 'get'
    })
}

// 当前委托
export function getOrders(symbol = 'lhcusdt') {
    return $http({
        url: `/m/o/orders/${symbol}/1/5/2/${new Date().getTime()}`,
        method: 'get'
    })
}

export function getOrderTrades(symbol = 'lhcusdt', orderId) {
    return $http({
        url: `/m/o/orders/trades/${symbol}/${orderId}/${new Date().getTime()}`,
        method: 'get'
    })
}
// 获取挂单中的委托
export function getStatusZeroOrders(symbol = 'lhcusdt', page = 1, size = 20) {
    return $http({
        url: `/m/o/orders/${symbol}/${page}/${size}/0/${new Date().getTime()}`,
        method: 'get'
    })
}

export function getFees() {
    return $http({
        url: `/m/fees`,
        method: 'get'
    })
}

export function postSale(param) {
    return $http({
        url: `/order/o/order`,
        method: 'post',
        data: param
    })
}

export function deleteOrder(param) {
    return $http({
        url: `/order/o/order`,
        method: 'delete',
        data: param
    })
}

export function getUSDTtoCNY() {
    return $http({
        url: `/wallet/wealth/calltiker`,
        method: "post",
        data: {
            symbols: "USDT_CNY",
        },
    });
}