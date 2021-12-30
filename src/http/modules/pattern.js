import $http from '../index'

// 查询可购买得矿机
export function getInvestinfo(page = 1, pageSize = 20) {
    return $http({
        url: `/pattern/invest/investinfo/${page}/${pageSize}`,
        method: 'get',
    })
}

// 购买矿机
export function transtoration(param) {
    return $http({
        url: '/pattern/invest/transtoration',
        method: 'post',
        data: param,
    })
}

// 查询我的矿机列表
export function rationrecord(page = 1, pageSize = 20) {
    return $http({
        url: `/pattern/invest/rationrecord/${page}/${pageSize}`,
        method: 'get',
    })
}

// 查询释放列表
export function unfrozenrecord(type = 'all', page = 1, pageSize = 20) {
    return $http({
        url: `/pattern/invest/unfrozenrecord/${type}/${page}/${pageSize}`,
        method: 'get',
    })
}

// 查询管理奖和推荐奖
export function getSeparaterecord(type = 'all', page = 1, pageSize = 20) {
    return $http({
        url: `/pattern/wealth/separaterecord/${type}/${page}/${pageSize}`,
        method: 'get',
    })
}

// 计算管理奖
export function getCronAm5Scheduled() {
    return $http({
        url: '/pattern/invest/cronAm5Scheduled',
        method: 'get',
    })
}

// 查询我的币股
export function getContractrecord(page = 1, pageSize = 20) {
    return $http({
        url: `/pattern/invest/contractrecord/${page}/${pageSize}`,
        method: 'get',
    })
}

// 转入币股
export function transtocontract(param) {
    return $http({
        url: '/pattern/invest/transtocontract',
        method: 'post',
        data: param,
    })
}
// 取出币股
export function transincontract(param) {
    return $http({
        url: '/pattern/invest/transincontract',
        method: 'post',
        data: param,
    })
}
// 查询系统配置
export function getFrmconfig() {
    return $http({
        url: `/member/frmconfig/${new Date().getTime()}`,
        method: 'get'
    })
}

// 查询合约余额
export function getContractbalance(currency = 'all') {
    return $http({
        url: `/pattern/invest/contractbalance/${currency}`,
        method: 'get'
    })
}

// 查询合约余额
export function transtocontractbalance(param) {
    return $http({
        url: '/pattern/invest/transtocontractbalance',
        method: 'post',
        data: param,
    })
}

// 将质押本金提现至余额
export function translateAccount(param) {
    return $http({
        url: '/pattern/invest/rationtranstoaccount',
        method: 'post',
        data: param,
    })
}

// 查询我的广告列表
export function getMyadvertise(page = 1) {
    return $http({
        url: `/global/otc/advertise/getmyadvertise/${page}/20/all`,
        method: 'get',
    })
}

// 查询我的所有支付方式列表
export function getPaymentList() {
    return $http({
        url: '/global/payment/getpaymentlist',
        method: 'get',
    })
}

// 上传图片
export function fileUpload(param) {
    return $http({
        url: '/member/fileupload',
        method: 'post',
        headers: {
            contentType: 'multipart/form-data'
        },
        data: param
    })
}

// 添加支付方式
export function addPayment(param) {
    return $http({
        url: '/global/payment/addpayment',
        method: 'post',
        data: param
    })
}

// 启用支付方式
export function activpm(id) {
    return $http({
        url: `/global/payment/activpm/${id}`,
        method: 'get'
    })
}

// 停用支付方式
export function unactivpym(id) {
    return $http({
        url: `/global/payment/unactivpym/${id}`,
        method: 'get'
    })
}

// 下架广告
export function offAds(id) {
    return $http({
        url: `/global/otc/advertise/undercarriageadv/${id}`,
        method: 'get'
    })
}