<!--
 * @Author: joevin
 * @Date: 2020-09-12 13:57:50
 * @LastEditors: joevin
 * @LastEditTime: 2020-09-24 22:49:49
 * @FilePath: /html/src/views/wallet/TransferAccounts.vue
 * @Desc: 转账
-->
<template>
  <div class="transfer-accounts-wrapper header-page">
    <Header :title="title">
      <van-icon
        v-if="!isMarket"
        slot="right"
        :name="recordBlack"
        size="16"
        @click="gotoHistory"
      />
    </Header>
    <!-- tab切换 -->
    <div class="tab" v-if="innerTransfer">
      <div
        class="tab-item"
        @click="switchCoinBase(urlCurName)"
        :class="{ active: currencyName === urlCurName }"
      >
        {{ urlCurName }}
      </div>
      <div
        class="tab-item"
        @click="switchCoinBase('USDT')"
        :class="{ active: currencyName === 'USDT' }"
      >
        USDT
      </div>
    </div>
    <!-- 选择公链 -->
    <div class="choose-chain-wrap" v-if="subChain">
      <p>{{ $t("wallet.transfer.chooseName") }}</p>
      <div class="type-select">
        <span
          v-for="(item, index) in subChain"
          :key="index"
          :class="{ active: coinLabelId == item.id }"
          @click="changeSubChain(item)"
        >
          {{ item.coin_label }}
        </span>
      </div>
    </div>
    <!-- 选择地址 -->
    <TransferAddr v-model="innerUSDTAddr" @switchAddr="switchAddr" />
    <!-- 转账数量 -->
    <section class="amount-wrap wrap-item">
      <p>{{ $t("wallet.transfer.transferNum") }}</p>
      <van-row type="flex" justify="space-between" align="center">
        <van-col span="20">
          <input
            type="text"
            v-model="amount"
            :placeholder="$t('wallet.transfer.inputNum')"
          />
        </van-col>
        <van-col @click="amount = account.available_balance">
          {{ $t("wallet.transfer.all") }}
        </van-col>
      </van-row>
    </section>
    <p class="stat-row">
      <span>{{ $t("wallet.transfer.canUse") }}</span>
      <em>
        {{ account.available_balance }}
        {{ currency.currency_name }}
      </em>
    </p>
    <!-- 资金密码 -->
    <section class="pwd-wrap wrap-item">
      <p>{{ $t("wallet.transfer.capitalPwd") }}</p>
      <input
        type="password"
        :placeholder="$t('wallet.transfer.capitalPwdPld')"
        v-model="fund_pwd"
      />
    </section>
    <!-- 手续费 -->
    <section class="pwd-wrap wrap-item">
      <p>{{ $t("wallet.transfer.fee") }}</p>
      <van-row type="flex" justify="space-between" align="center">
        <van-col>
          {{
            innerTransfer ? currency.withdraw_inner_fee : currency.withdraw_fee
          }}
        </van-col>
        <van-col>{{ currency.currency_name }}</van-col>
      </van-row>
    </section>
    <p class="stat-row">
      <span>{{ $t("wallet.transfer.actualReceipt") }}</span>
      <em>{{ real_amount }}&nbsp;{{ currency.currency_name }}</em>
      <em v-if="isAPI">（≈ {{ real_amount * usdt_to_cny }} CNY）</em>
    </p>
    <!-- 温馨提示 -->
    <section class="tips-wrap">
      <p>{{ $t("wallet.transfer.tips") }}</p>
      <p>
        1. {{ $t("wallet.transfer.minTransferNum") }}
        {{
          innerTransfer
            ? currency.c_min_inner_withdraw
            : currency.c_min_withdraw
        }}
        {{ currency.currency_name }}
      </p>
      <p>
        2. {{ $t("wallet.transfer.fee") }}
        {{
          innerTransfer ? currency.withdraw_inner_fee : currency.withdraw_fee
        }}
        {{ currency.currency_name }}
      </p>
    </section>

    <ButtonCommon @click="submit">
      {{ $t("requestResponse.SUBMIT") }}
    </ButtonCommon>
  </div>
</template>

<script>
import { Row as VanRow, Col as VanCol, Icon as VanIcon, Toast } from "vant";
import ButtonCommon from "@/components/ButtonCommon";
import TransferAddr from "@/components/TransferAddr";
import Header from "@/components/Header";
import oldKey from "@/config/oldKey";
import {
  getExchange,
  getAccountCurr,
  postWithdraw,
} from "@/http/modules/wallet";
import { getCurrencyInfo } from "@/http/modules/home";
import { storage } from "@/utils/oldVersionFunc";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("wallet");
import recordBlack from "@/assets/icons/recordBlack.svg";
let routeFrom = "";
export default {
  data() {
    return {
      recordBlack,
      title: this.$t("wallet.transfer.insideTransfer"),
      rowData: this.$route.params.rowData,
      subChain: null,
      currencyName: "",
      urlCurName: this.$route.params.currencyName,
      innerTransfer: this.$route.params.innerTransfer,
      innerUSDTAddr: "",
      addrLabel: "",
      account: {},
      currency: {},
      amount: "",
      fund_pwd: "",
      need_googleauth: false,
      need_verify_code: false,
      google_code: "",
      verify_code: "",
      isCanSend: true,
      sendTimeout: 60,
      showKaptcha: false,
      kaptcha_img: "",
      kaptcha_token: "",
      kaptcha_code: "",
      isSubmit: false,
      usdt_to_cny: 0,
      coinLabelId: null,
      scan: this.$route.params.scan,
      isMarket: this.$route.params.isMarket,
      isFromWallet: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    routeFrom = from.name;
    next();
  },
  activated() {
    if (this.$route.query.addrId) {
      const { addr, addr_label } = this.$route.query;
      this.innerUSDTAddr = addr;
      this.addrLabel = addr_label;
    } else {
      this.amount = "";
      this.fund_pwd = "";
    }
    if (routeFrom === "TransferAddr") {
      return;
    } else if (routeFrom === "Wallet") {
      this.isFromWallet = true;
    } else if (routeFrom === "Home") {
      this.isFromWallet = false;
    }

    this.rowData = this.$route.params.rowData;
    this.subChain = JSON.parse(storage.get("subChain"));
    this.urlCurName = this.$route.params.currencyName;
    this.innerTransfer = this.$route.params.innerTransfer;
    this.scan = this.$route.params.scan;
    this.isMarket = this.$route.params.isMarket;

    if (this.subChain && Array.isArray(this.subChain)) {
      this.coinLabelId = this.subChain[0].id;
    }
    this.innerUSDTAddr = "";
    if (this.scan) {
      this.SET_ADDR({
        id: -1,
        addr_label: "LHC_SCAN",
        addr: this.scan,
      });
      this.innerUSDTAddr = this.addr.addr;
    }

    var currency = this.$route.params.currency;
    if (currency) {
      this.currency = currency;
    } else if (this.innerTransfer) {
      var currencyName = this.$route.params.currencyName;
      if (currencyName) {
        this.switchCoinBase(currencyName);
      } else {
        Toast(this.$t("requestResponse.PROGRAM_ERROR"));
      }
    }
  },
  computed: {
    ...mapState(["addr"]),
    isAPI() {
      return this.currency.currency == oldKey.api_currency;
    },
    fee_amount() {
      return this.innerTransfer
        ? this.currency.withdraw_inner_fee
        : this.currency.withdraw_fee;
    },
    real_amount: function () {
      var real = this.amount - this.fee_amount;

      if (real < 0) {
        return 0;
      } else {
        return (this.amount - this.fee_amount).toFixed(
          this.currency.c_precision
        );
      }
    },
  },
  watch: {
    currency() {
      if (this.currency.currency) {
        var self = this;
        if (self.innerTransfer) {
          this.title = this.$t("wallet.transfer.insideTransfer");
        } else {
          this.title =
            this.currency.currency + " " + this.$t("home.index.transfer");
        }

        if (this.isAPI) {
          getExchange().then((res) => {
            this.usdt_to_cny = res.data.sellPrice;
          });
        }

        getAccountCurr(this.currency.currency).then((res) => {
          this.account = res.account;
        });
      }
    },
    amount: function (nVal, oVal) {
      var nValStr = nVal.toString();
      if (nValStr == "" || (!isNaN(nValStr) && parseFloat(nValStr) >= 0)) {
        var amount = +nValStr;
        if (amount > this.account.available_balance) {
          this.amount = this.account.available_balance.toFixed(3);
        } else {
          this.amount = nValStr.trim();
        }
      } else {
        this.amount = oVal;
      }
    },
  },
  methods: {
    ...mapMutations(["SET_ADDR"]),
    changeSubChain(item) {
      this.coinLabelId = item.id;
      this.innerUSDTAddr = "";
      this.addrLabel = "";
    },
    gotoHistory() {
      this.$router.push({
        path: "withdrawsRecords",
        query: {
          currency: this.currency.currency,
        },
      });
    },
    switchCoinBase(currencyName) {
      this.currencyName = currencyName;
      getCurrencyInfo(currencyName).then((res) => {
        this.currency = res.currency;
      });
    },
    switchAddr() {
      this.$router.push({
        path: "/transferAddr",
        query: {
          currency: this.currency.currency,
          isSelect: true,
          coinLabelId: this.coinLabelId,
          addrId: this.$route.query.addrId, // 用于回显
        },
      });
    },
    beforeSubmit() {
      if (!this.innerUSDTAddr) {
        Toast(this.$t("wallet.transfer.PLEASE_SELECT_WITHDRAW_ADDR"));
        return false;
      }

      if (!this.amount) {
        Toast(this.$t("wallet.transfer.PLEASE_ENTER_WITHDRAW_AMOUNT"));
        return false;
      }

      var amount = parseFloat(this.amount.toString());
      var min_withdraw = this.innerTransfer
        ? this.currency.c_min_inner_withdraw
        : this.currency.c_min_withdraw;
      if (min_withdraw > 0 && amount < min_withdraw) {
        Toast(
          this.$t("wallet.transfer.MIN_WITHDRAW_AMOUNT") +
            " " +
            min_withdraw +
            " " +
            this.currency.currency_name
        );
        return false;
      }
      if (amount > this.account.available_balance) {
        Toast(this.$t("wallet.transfer.INSUFFICIENT"));
        return false;
      }

      if (!this.fund_pwd) {
        Toast(this.$t("wallet.transfer.PLEASE_ENTER_FUND_PASSWORD"));
        return false;
      }

      // 内部转账校验LHC地址
      const regExp = /^0x/;
      if (
        regExp.test(this.innerUSDTAddr) &&
        this.innerTransfer &&
        this.currencyName === "USDT"
      ) {
        Toast(this.$t("wallet.transfer.innerTransferOnlyLT"));
        return false;
      }
      return true;
    },
    submit() {
      if (this.beforeSubmit()) {
        var self = this;
        postWithdraw({
          addr: self.innerUSDTAddr,
          addr_label: this.addrLabel,
          amount: this.amount,
          coin_label_id: this.coinLabelId,
          currency: this.currency.currency,
          m_pwd: this.fund_pwd,
        }).then((res) => {
          if (res.status === 1) {
            this.$router.replace({
              name: "TransferSuccess",
              params: {
                isFromWallet: this.isFromWallet,
              },
            });
          }
        });
      }
    },
  },
  components: {
    VanRow,
    VanCol,
    Header,
    VanIcon,
    ButtonCommon,
    TransferAddr,
  },
};
</script>

<style lang="scss" scoped>
.transfer-accounts-wrapper {
  padding: 15px;
  min-height: 100vh;
  background: #f3f3f3;
  font-size: 13px;
  .tab {
    padding: 0 55px;
    display: flex;
    justify-content: space-between;
    .tab-item {
      position: relative;
      padding: 30px 0 16px;
      font-size: 15px;
      font-weight: 500;
      color: #666666;
      &.active::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 10%;
        width: 80%;
        height: 2px;
        background-color: $themeColor;
      }
    }
  }
  .wrap-item {
    padding: 15px 15px 15px 11px;
    margin-top: 15px;
    background: #ffffff;
    box-shadow: 1px 2px 3px 0px rgba(57, 57, 57, 0.06);
    border-radius: 4px;
    overflow: hidden;
    p {
      &:first-child {
        margin-bottom: 13px;
      }
    }
    .van-cell {
      align-items: center;
      padding: 0;
      font-size: 13px;
      line-height: 1;
    }
    input {
      width: 100%;
      border: 0;
      font-size: 12px;
    }
  }

  .address-select {
    padding: 10px 15px 10px 11px;
  }

  .stat-row {
    padding: 11px 0 0 11px;
    span {
      color: #999999;
      font-size: 11px;
    }
    em {
      font-style: normal;
      font-size: 12px;
      color: #333333;
    }
  }

  .choose-chain-wrap {
    margin-top: 25px;
    p {
      margin-bottom: 15px;
      font-size: 13px;
      color: #666666;
    }
    span {
      margin-right: 15px;
      display: inline-block;
      padding: 13px 13px 8px 13px;
      color: #333333;
      background: #f9f9f9;
      border-radius: 4px;
      &.active {
        color: $themeColor;
        background: #ffffff;
        border: 1px solid $themeColor;
      }
    }
  }

  .tips-wrap {
    margin: 40px 0;
    padding: 23px 20px;
    background: #eeeeee;
    border-radius: 4px;
    font-size: 12px;
    color: #666666;
    p {
      padding-bottom: 10px;
      &:last-child {
        padding: 0;
      }
    }
  }
}
</style>
