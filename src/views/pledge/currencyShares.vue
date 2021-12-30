<template>
  <div class="wrapper header-page">
    <Header
      :title="$t('pledge.pledge.title')"
      :rightText="$t('pledge.pledge.transfer')"
      @click-right="handleHeaderRightBtn"
    />

    <div class="banner">
      <p class="nav">{{ $t("pledge.pledge.nowPrice") }}</p>
      <div class="content">
        {{ $n(investPrice, "maximumSignificantDigits8") }}
      </div>
    </div>

    <div class="border-bottom"></div>

    <div class="item" v-for="(item, index) in list" :key="index">
      <div class="nav">
        <div class="nav-left">
          {{ $t("pledge.pledge.store") }}
          {{ $n(item.amount, "maximumSignificantDigits8") }}
          {{ $t("pledge.pledge.unit") }} SSCV
        </div>
        <div class="nav-right">
          {{
            item.invest_status == 1
              ? $t("pledge.pledge.inOperation")
              : $t("pledge.pledge.Removed")
          }}
        </div>
      </div>
      <div class="content">
        <div class="content-left">
          <div class="content-left-top">
            {{ $t("pledge.pledge.beginTime") }}{{ item.created_time }}
          </div>
          <div class="content-left-bottom">
            {{ $t("pledge.pledge.endTime") }}{{ item.invest_endtime }}
          </div>
        </div>
        <div
          v-if="item.invest_status == 1"
          class="content-right"
          @click="handleBtnClick(item.id)"
        >
          {{ $t("pledge.pledge.remove") }}
        </div>
      </div>
      <div class="border-bottom"></div>
    </div>

    <div class="footer">
      <ButtonCommon class="footer-btn" @click="isShowBuyPop = true">
        分红
      </ButtonCommon>
    </div>

    <van-popup v-model="isShowBuyPop" round position="bottom">
      <div class="popup">
        <p class="nav">{{ $t("pledge.pledge.buyPopTitle") }}</p>
        <div class="balance">
          <div class="content">
            当前兑换比例: {{ exchangeNum }} SSCV : 1 {{ exchangeCurrency }}
          </div>
          <div class="close" @click="isShowBuyPop = false">
            {{ $t("requestResponse.CANCEL") }}
          </div>
        </div>
        <div class="balance-input">
          <div class="balance-input-left">
            <p>您的可兑换数量为 {{ Contractbalance.amount }} SSCV</p>
            <input
              type="number"
              v-model="buyPopAmount"
              placeholder="请输入兑换数量"
            />
          </div>
        </div>
        <div class="inpot-box">
          <p>{{ $t("mine.accountManage.safetyVerification") }}</p>
          <input
            type="password"
            v-model="password"
            :placeholder="$t('home.subscribe.inputWalletPwd')"
          />
        </div>
        <ButtonCommon class="popup-btn" @click="handleBuyPopupSubmit">
          {{ $t("requestResponse.CONFIRM") }}
        </ButtonCommon>
      </div>
    </van-popup>

    <van-popup v-model="isShowConfirmAgainPop" round position="bottom">
      <div class="popup">
        <p class="nav">{{ $t("pledge.pledge.popNav") }}</p>
        <!-- <div class="balance">
          <div class="content">
            {{ $t("pledge.pledge.balance") }} 888.666 SSCV
          </div>
          <div class="close" @click="isShowConfirmAgainPop = false">
            {{ $t("requestResponse.CANCEL") }}
          </div>
        </div> -->
        <!-- <div class="balance-input">
          <div class="balance-input-left">
            <p>{{ $t("pledge.pledge.inputNum") }}</p>
            <input
              type="number"
              :placeholder="$t('pledge.pledge.balancePlaceHolder')"
            />
          </div>
          <div
            class="balance-input-right"
            @click="isShowConfirmAgainPop = false"
          >
            {{ $t("requestResponse.CANCEL") }}
          </div>
        </div> -->
        <div class="inpot-box">
          <p>{{ $t("mine.accountManage.safetyVerification") }}</p>
          <input
            type="password"
            v-model="password"
            :placeholder="$t('home.subscribe.inputWalletPwd')"
          />
        </div>
        <ButtonCommon class="popup-btn" @click="handlePopupSubmit">
          {{ $t("requestResponse.CONFIRM") }}
        </ButtonCommon>
      </div>
    </van-popup>

    <van-popup v-model="isShowInvestmentPop" round position="bottom">
      <div class="popup">
        <p class="nav">{{ $t("pledge.pledge.InvestmentPopTitle") }}</p>
        <div class="balance-input">
          <div class="balance-input-left">
            <p>{{ $t("pledge.pledge.inputNum") }}</p>
            <input
              v-model="investNum"
              type="number"
              :placeholder="$t('pledge.pledge.balancePlaceHolder')"
            />
          </div>
          <div class="balance-input-right" @click="isShowInvestmentPop = false">
            {{ $t("requestResponse.CANCEL") }}
          </div>
        </div>
        <div class="inpot-box">
          <p>{{ $t("mine.accountManage.safetyVerification") }}</p>
          <input
            type="password"
            v-model="password"
            :placeholder="$t('home.subscribe.inputWalletPwd')"
          />
        </div>
        <ButtonCommon class="popup-btn" @click="handleInvestmentPopSubmit">
          {{ $t("requestResponse.CONFIRM") }}
        </ButtonCommon>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Header from "@/components/Header";
import { Popup as VanPopup, Toast } from "vant";
import ButtonCommon from "@/components/ButtonCommon";
import {
  getContractrecord,
  transincontract,
  getFrmconfig,
  transtocontract,
  getContractbalance,
  transtocontractbalance
} from "@/http/modules/pattern.js";

export default {
  name: "currencyShares",
  components: {
    Header,
    VanPopup,
    ButtonCommon
  },
  data() {
    return {
      isShowConfirmAgainPop: false,
      isShowInvestmentPop: false,
      isShowBuyPop: false,
      list: [],
      page: 1,
      password: "",
      id: "",
      investPrice: 0,
      investNum: "",
      exchangeNum: 0,
      exchangeCurrency: "",
      Contractbalance: {},
      buyPopAmount: ""
    };
  },
  watch: {
    isShowConfirmAgainPop() {
      this.password = "";
    },
    isShowInvestmentPop() {
      this.password = "";
    },
    isShowBuyPop() {
      this.password = "";
      this.buyPopAmount = "";
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.list = [];
      this.getContractrecord();
      this.getFrmconfig();
      this.getContractbalance();
    },
    handlePopupSubmit() {
      if (!this.password) {
        Toast(this.$t("common.pleaseEnterPassword"));
        return;
      }
      transincontract({
        m_security_pwd: this.password,
        contract_id: this.id
      }).finally(() => {
        this.isShowConfirmAgainPop = false;
        this.init();
      });
    },
    handleBuyPopupSubmit() {
      if (!this.password) {
        Toast(this.$t("common.pleaseEnterPassword"));
        return;
      }
      if (
        !this.buyPopAmount ||
        this.buyPopAmount > this.Contractbalance.amount
      ) {
        Toast("请输入正确的可兑换数量");
        return;
      }
      transtocontractbalance({
        m_security_pwd: this.password,
        amount: this.buyPopAmount,
        currency: this.Contractbalance.currency
      }).then(res => {
        if (res.status === 1) {
          this.isShowBuyPop = false;
          Toast("兑换成功");
          this.getContractbalance();
        }
      });
    },
    handleBtnClick(id) {
      this.isShowConfirmAgainPop = true;
      this.id = id;
    },
    getContractrecord() {
      getContractrecord(this.page).then(res => {
        if (res.status === 1) {
          this.list.push(...res.data.list);
          if (res.data.hasNextPage) {
            this.page++;
            this.getContractrecord();
          }
        }
      });
    },
    getFrmconfig() {
      getFrmconfig().then(res => {
        if (res.status === 1) {
          this.investPrice = res.data.invest_contract_price;
          let exchange = res.data.contract_balance_tranto_conf.split(",");
          this.exchangeNum = 1 / exchange[0];
          this.exchangeCurrency = exchange[1];
        }
      });
    },
    getContractbalance() {
      getContractbalance("SSCV").then(res => {
        if (res.status === 1) {
          this.Contractbalance = res.data[0] || { amount: 0 };
        }
      });
    },
    handleHeaderRightBtn() {
      this.isShowInvestmentPop = true;
    },
    handleInvestmentPopSubmit() {
      if (!this.password) {
        Toast(this.$t("common.pleaseEnterPassword"));
        return;
      }
      if (!this.investNum || this.investNum % 10 !== 0) {
        Toast(this.$t("pledge.pledge.balancePlaceHolder"));
        return;
      }
      transtocontract({
        m_security_pwd: this.password,
        amount: this.investNum,
        currency: "SSCV"
      }).finally(() => {
        this.isShowInvestmentPop = false;
        this.init();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import url("vant/lib/icon/local.css");
$txtGreen: #03ad90;
$txtYellow: #edb259;
$txtBlack: #333333;
$txtGray: #8193a0;
.text-yellow {
  color: $txtYellow !important;
}
.wrapper {
  background: #fff;
  padding-bottom: 130px;
  .footer {
    position: fixed;
    width: 100%;
    padding: 10px 0 30px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    .footer-btn {
      width: 345px;
      margin: auto;
    }
  }
  .popup {
    .nav {
      color: $txtGray;
      font-size: 13px;
      padding: 20px 20px 15px;
      border-bottom: 1px solid #ececec;
    }
    .balance {
      padding: 0 20px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ececec;
      .content {
        flex: 1;
        color: $txtBlack;
        font-weight: bold;
        font-size: 16px;
      }
      .close {
        color: $txtGray;
        font-size: 14px;
      }
    }
    .balance-input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 25px 20px 11.5px;
      border-bottom: 1px solid #ececec;
      &-left {
        p {
          color: $txtBlack;
          font-size: 13px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        input {
          font-size: 15px;
          color: $txtBlack;
          &::placeholder {
            color: #bac4cc;
          }
        }
      }
      &-right {
        color: $txtGray;
        font-size: 14px;
      }
    }
    .inpot-box {
      padding: 25px 20px 11.5px;
      border-bottom: 1px solid #ececec;
      p {
        color: $txtBlack;
        font-size: 13px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      input {
        font-size: 15px;
        color: $txtBlack;
        &::placeholder {
          color: #bac4cc;
        }
      }
    }
    .popup-btn {
      margin: 35px 15px 21px;
      width: auto;
    }
  }
  .banner {
    width: 100%;
    height: 100px;
    background-image: url("../../assets/img/ore_banner.png");
    background-size: cover;
    padding: 26.5px 14.5px 0;
    color: #fff;
    line-height: 1;
    .nav {
      font-size: 13px;
    }
    .content {
      margin-top: 20px;
      font-size: 21px;
      font-weight: bold;
    }
  }
  .item {
    .nav {
      height: 44.5px;
      padding: 0 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f4f4f4;
      &-left {
        color: $txtBlack;
        font-size: 15px;
        font-weight: bold;
      }
      &-right {
        color: $txtGray;
        font-size: 12px;
      }
    }
    .content {
      padding: 9.25px 15px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-left {
        line-height: 1;
        font-size: 13px;
        &-top {
          color: $txtGray;
        }
        &-bottom {
          color: $txtYellow;
          margin-top: 10px;
        }
      }
      &-right {
        width: 44px;
        height: 44px;
        background: #efba6b;
        border-radius: 50%;
        text-align: center;
        line-height: 44px;
        font-size: 14px;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
  .border-bottom {
    height: 10px;
    background: #f7f6fb;
  }
}
</style>