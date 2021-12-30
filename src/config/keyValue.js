/*
 * @Author: joevin
 * @Date: 2020-09-16 19:33:34
 * @LastEditors: joevin
 * @LastEditTime: 2020-09-16 20:02:54
 * @FilePath: \lhc_h5\widget\html\src\config\keyValue.js
 * @Desc: 描述
 */
import i18n from '@/langs'
import aliIcon from '@/assets/icons/ali.png'
import wxIcon from '@/assets/icons/wechat.png'
import bankIcon from '@/assets/icons/bank.png'
export default {
  // 通用
  common: {
    exampleAttr: [
      {
        key: '1',
        value: i18n.t('user.importAddress.walletName'),
      },
      {
        key: '2',
        value: i18n.t('user.importAddress.title'),
      },
    ],
    langNum: [
      {
        key: 'zh',
        value: 1,
      },
      {
        key: 'en',
        value: 0,
      },
    ],
  },
  home: {
    rewardStatus: [
      {
        key: '0',
        value: i18n.t('home.nodeReward.notReceive'),
      },
      {
        key: '1',
        value: i18n.t('home.nodeReward.received'),
      },
    ],
  },
  market: {},
  trade: {},
  asset: {},
  otc: {
    paymentType: [
      {
        key: '1',
        value: i18n.t('home.otc.weChat'),
      },
      {
        key: '2',
        value: i18n.t('home.otc.aPay'),
      },
      {
        key: '3',
        value: i18n.t('home.otc.bankCard'),
      },
    ],
    payStatus: [
      {
        key: '1',
        value: i18n.t('home.otc.pleasePay'),
      },
      {
        key: '2',
        value: i18n.t('home.otc.paid'),
      },
      {
        key: '3',
        value: i18n.t('home.otc.canceled'),
      },
    ],
    paymentTypeIcon: [
      {
        key: '1',
        value: wxIcon
      },
      {
        key: '2',
        value: aliIcon
      },
      {
        key: '3',
        value: bankIcon
      },
    ]
  },
  transfer: {
    accountType: [
      {
        key: '1',
        value: '币币账户',
      },
      {
        key: '2',
        value: 'OTC账户',
      },
      {
        key: '3',
        value: '挖矿账户',
      },
    ],
  },
  mine: {

  },
  wallet: {
  },

}
