<template>
  <div class="wrapper curBorrowing">
    <div class="banner">
      <van-nav-bar
        :title="$t('pledge.curBorrowing.title')"
        :left-arrow="true"
        @click-left="onClickLeft"
        :border="false"
      >
        <van-icon :name="history" @click="gotoRecord" slot="right" />
      </van-nav-bar>
      <div class="title">{{ $t("pledge.blackHole.allTransfer") }}</div>
      <div class="content">{{ number }} SSCV</div>
    </div>

    <div class="line"></div>

    <pagination
      :data="pageData"
      @getList="getList"
      @returnList="returnList"
      :finishedText="
        orderList.length === 0 ? '' : $t('pledge.blackHole.notMore')
      "
      listName="list"
    >
      <no-data v-if="orderList.length === 0 && !loading"></no-data>

      <div class="border-line"></div>

      <div class="list" v-for="(item, index) in orderList" :key="index">
        <div class="row">
          <div class="row-left">
            <div class="name">
              {{ $t("pledge.curBorrowing.allShareProfit") }}
            </div>
            <div class="value">{{ item.amount }}</div>
          </div>
          <div class="row-center">
            <div class="name">
              {{ $t("pledge.curBorrowing.transferProportion") }}
            </div>
            <div class="value">
              {{
                BigNumber(item.rate)
                  .times(100)
                  .toNumber()
              }}%
            </div>
          </div>
          <div class="row-right">
            <div class="name">
              {{ $t("pledge.curBorrowing.transferNum") }}
            </div>
            <div class="value">{{ item.unfrozen_num }} {{ item.currency }}</div>
          </div>
        </div>
        <div class="row">
          <div class="row-left">
            <div class="name">
              {{ $t("pledge.curBorrowing.time") }}
            </div>
            <div class="value">{{ item.created_time }}</div>
          </div>
        </div>
      </div>
    </pagination>

    <div class="footer">
      <ButtonCommon class="popup-btn" @click="isShowConfirmAgainPop = true">
        {{ $t("pledge.curBorrowing.buy") }}
      </ButtonCommon>
    </div>

    <van-popup v-model="isShowConfirmAgainPop" round position="bottom">
      <div class="popup">
        <div class="balance">
          <div class="content">
            {{ $t("pledge.curBorrowing.NowPrice") }}
            {{
              BigNumber(1)
                .dividedBy(price_conf[2])
                .toNumber()
            }}{{ price_conf[0] }}，
            {{ $t("pledge.curBorrowing.canBorrowing") }}
            1{{ price_conf[1] }}
          </div>
        </div>
        <div class="balance">
          <div class="content input-padding">
            <p>{{ $t("pledge.curBorrowing.canBorrowingNum") }}</p>
            <input
              type="text"
              v-model="amount"
              @input="HandleAmountInput"
              :placeholder="$t('pledge.curBorrowing.canBorrowingNumPld')"
            />
          </div>
          <div class="close" @click="isShowConfirmAgainPop = false">
            {{ $t("requestResponse.CANCEL") }}
          </div>
        </div>
        <div class="input-box">
          <p>{{ $t("mine.accountManage.safetyVerification") }}</p>
          <input
            type="password"
            v-model="password"
            :placeholder="$t('home.subscribe.inputWalletPwd')"
          />
        </div>
        <ButtonCommon class="popup-btn" @click="HandleSubmit">
          {{ $t("requestResponse.CONFIRM") }}
        </ButtonCommon>
      </div>
    </van-popup>
  </div>
</template>
<script>
import empty_icon from "@/assets/icons/empty_icon.png";
import history from "@/assets/icons/record.svg";
import {
  getUnfrozenfundRecord,
  getFrmConfig,
  coinTransfer
} from "@/http/modules/otc";
import NoData from "@/components/NoData";
import Pagination from "@/components/Pagination";
import ButtonCommon from "@/components/ButtonCommon";
import { getFund } from "@/http/modules/home";
import BigNumber from "bignumber.js";

import {
  Popup as VanPopup,
  NavBar as VanNavBar,
  Toast,
  Icon as VanIcon
} from "vant";

export default {
  name: "curBorrowing",
  components: {
    VanNavBar,
    NoData,
    Pagination,
    ButtonCommon,
    VanPopup,
    VanIcon
  },
  data() {
    return {
      history,
      empty_icon,
      loading: false,
      Pagination,
      pageData: {},
      orderList: [],
      isShowConfirmAgainPop: false,
      password: "",
      price_conf: [],
      amount: "",
      number: "",
      BigNumber
    };
  },
  watch: {
    isShowConfirmAgainPop() {
      this.amount = "";
      this.password = "";
    }
  },
  activated() {
    this.getList(0);
    this.isShowConfirmAgainPop = false;
    getFrmConfig().then(res => {
      this.price_conf = res.data.circulate_price_conf.split("&");
    });

    getFund().then(res => {
      if (res.status === 1) {
        this.number =
          (res.data.list && res.data.list[0] && res.data.list[0].amount) || 0;
      }
    });
  },
  methods: {
    getList(data) {
      const pageNum = data ? data.pageNum : 1;
      const pageSize = data ? data.pageSize : 10;
      this.loading = true;

      getUnfrozenfundRecord(pageNum, pageSize).then(res => {
        this.pageData = res.data;
        this.loading = false;
      });
    },
    returnList(list) {
      this.orderList = list || [];
    },
    onClickLeft() {
      this.$router.back();
    },
    gotoRecord() {
      this.$router.push("/curBorrowingRecord");
    },
    HandleAmountInput(e) {
      this.amount = e.target.value.replace(/[^\d.]/g, "");
    },
    HandleSubmitBefore() {
      if (!this.amount) {
        Toast(this.$t("pledge.curBorrowing.canBorrowingNumPld"));
        return false;
      }
      if (!this.password) {
        Toast(this.$t("home.subscribe.inputWalletPwd"));
        return false;
      }
      return true;
    },
    HandleSubmit() {
      if (!this.HandleSubmitBefore()) return;
      coinTransfer({
        currency: this.price_conf[0],
        quote_currency: this.price_conf[1],
        w_quote_amount: this.amount,
        direction: "sell",
        m_security_pwd: this.password
      }).then(res => {
        if (res.status === 1) {
          Toast(this.$t("pledge.curBorrowing.buySuccess"));
          this.isShowConfirmAgainPop = false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.curBorrowing {
  .van-nav-bar {
    background: transparent !important;
    .van-icon {
      color: $themeColor !important;
    }
    .van-nav-bar__title {
      color: #fff !important;
    }
  }
}
</style>
<style lang="scss" scoped>
@import url("vant/lib/icon/local.css");
$txtBlack: #202028;
$txtGreen: #02ad90;
$txtRed: #ce435d;
$txtGray: #8193a0;
$txtYellow: #efba6b;
$txtNav: #96a8b0;
.wrapper {
  padding: 130px 0 70px;
  min-height: 100%;
  .line {
    width: 100%;
    height: 10px;
    background: #f7f6fb;
  }
  .border-line {
    width: 100%;
    height: 24px;
    border-bottom: 1px solid #f4f4f4;
  }
  .banner {
    position: fixed;
    left: 0;
    top: $appStatusTop;
    width: 100%;
    height: 130px;
    background-image: url("../../assets/img/borrowBanner.png");
    background-size: 100% 100%;
    color: #fff;
    z-index: 10;
    .title {
      padding: 10px 20px 0;
      font-size: 13px;
    }
    .content {
      font-weight: bold;
      font-size: 25px;
      padding: 16px 20px;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 0 15px 25px;
    width: 100%;
    background: #fff;
  }
  .list {
    padding: 0 15px 25px;
    border-bottom: 1px solid #ececec;
    line-height: 1;
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 25px;
      font-size: 13px;
      color: $txtBlack;
      .name {
        color: $txtGray;
        margin-bottom: 10px;
      }
      &-center {
        text-align: center;
      }
      &-right {
        text-align: right;
      }
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
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ececec;
      .content {
        flex: 1;
        color: $txtBlack;
        font-weight: bold;
        font-size: 16px;
        &.input-padding {
          padding: 25px 0 11.5px;
        }
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
            color: $txtGray;
          }
        }
      }
      .close {
        color: $txtGray;
        font-size: 14px;
      }
    }
    .input-box {
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
          color: $txtGray;
        }
      }
    }
    .popup-btn {
      margin: 35px 15px 21px;
      width: auto;
    }
  }
}
</style>