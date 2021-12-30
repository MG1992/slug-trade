/*
 * @Author: 唐嘉伟
 * @Date: 2020-09-07 10:17:46
 * @LastEditors: joevin
 * @LastEditTime: 2020-09-26 22:14:20
 * @FilePath: /html/src/router/modules/wallet.js
 * @Desc: 描述
 */
const Wallet = () =>
  import(/* webpackChunkName: "group-wallet" */ "@/views/wallet/Wallet.vue");
// L充值页面
const Deposit = () =>
  import(/* webpackChunkName: "group-deposit" */ "@/views/wallet/Deposit.vue");
// 充值记录
const DepositRecords = () =>
  import(
    /* webpackChunkName: "group-depositRecords" */ "@/views/wallet/DepositRecords.vue"
  );
// 收款页面
const Gathering = () =>
  import(
    /* webpackChunkName: "group-gathering" */ "@/views/wallet/Gathering.vue"
  );
// 收款页面
const TransferAccounts = () =>
  import(
    /* webpackChunkName: "group-transferAccounts" */ "@/views/wallet/TransferAccounts.vue"
  );
// 收款页面
const WithdrawsRecords = () =>
  import(
    /* webpackChunkName: "group-withdrawsRecords" */ "@/views/wallet/WithdrawsRecords.vue"
  );
const TransferSuccess = () =>
  import(/* webpackChunkName: "group-transferAccounts" */ "@/views/wallet/TransferSuccess.vue");
//转账地址
const TransferAddr = () =>
  import(/* webpackChunkName: "group-transferAccounts" */ "@/views/wallet/TransferAddr.vue");
//新增转账地址 
const CreateTransferAddr = () =>
  import(/* webpackChunkName: "group-transferAccounts" */ "@/views/wallet/CreateTransferAddr.vue");

export default [
  {
    path: "/wallet",
    name: "Wallet",
    component: Wallet,
  },
  {
    path: "/deposit",
    name: "Deposit",
    component: Deposit,
  },
  {
    path: "/depositRecords",
    name: "DepositRecords",
    component: DepositRecords,
  },
  {
    path: "/gathering",
    name: "Gathering",
    component: Gathering,
  },
  {
    path: "/transferAccounts",
    name: "TransferAccounts",
    component: TransferAccounts,
  },
  {
    path: "/withdrawsRecords",
    name: "WithdrawsRecords",
    component: WithdrawsRecords,
  },
  {
    path: "/TransferSuccess",
    name: "TransferSuccess",
    component: TransferSuccess,
  },
  {
    path: "/transferAddr",
    name: "TransferAddr",
    component: TransferAddr,
  },
  {
    path: "/createTransferAddr",
    name: "CreateTransferAddr",
    component: CreateTransferAddr,
  }
];
