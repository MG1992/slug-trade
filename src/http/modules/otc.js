
import $http from '../index'

export function getMyOrderList(type, page, pageSize) {
  // type 交易类型  1 出售  2 购买  all 全部  page 第几页 pageSize每页几条
  return $http({
    url: `/global/otc/order/getmyorder/${type}/${page}/${pageSize}`,
    method: 'get',
  })
}

// 查询订单详情
export function orderDetail(id) {
  return $http({
    url: `/global/otc/order/getorderinfo/${id}`,
    method: 'get'
  })
}

// 更新订单状态
export function updateOrder(data) {
  return $http({
    url: '/global/otc/order/confirmorder',
    method: 'post',
    data
  })
}

// 上传图片
export function fileUpload(data) {
  return $http({
    url: '/member/fileupload',
    method: 'post',
    headers: {
      contentType: 'multipart/form-data'
    },
    data
  })
}

// 更新订单上传支付截图
export function uploadPayAuth(data) {
  return $http({
    url: '/global/otc/order/uploadpayauth',
    method: 'post',
    data
  })
}

// 查询所有人黑洞记录
export function getBlackHold(page, pageSize) {
  return $http({
    url: `/m/a/blackholds/all/${page}/${pageSize}/${new Date().getTime()}`,
    method: 'get',
  })
}

// 查询我的基金记录
export function getUnfrozenfundRecord(page, pageSize) {
  return $http({
    url: `/pattern/invest/unfrozenfundrecord/all/${page}/${pageSize}`,
    method: 'get',
  })
}

// 抵押借贷币价配置
export function getFrmConfig() {
  return $http({
    url: `/member/frmconfig/${new Date().getTime()}`,
    method: 'get',
  })
}

// 抵押借币，还币
export function coinTransfer(data) {
  return $http({
    url: '/pattern/wealth/cointransfer',
    method: 'post',
    data
  })
}

// 查询借币记录
export function getCoinTransferList(page, pageSize) {
  return $http({
    url: `/pattern/wealth/cointransferlist/${page}/${pageSize}`,
    method: 'get',
  })
}

// 内部账户划转
export function insideTransfer(data) {
  return $http({
    url: `/order/o/insidetransfer`,
    method: 'post',
    data: data
  })
}

// 申请成为钱老板
export function beVip(secPwd) {
  return $http({
    url: `/global/member/prosupervip/${secPwd}`,
    method: 'get',
  })
}

// 申请退还钱老板
export function returnVip(secPwd) {
  return $http({
    url: `/global/member/oversupervip/${secPwd}`,
    method: 'get',
  })
}
