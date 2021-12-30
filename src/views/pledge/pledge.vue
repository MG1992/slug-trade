<template>
  <div class="wrapper header-page">
    <Header :title="$t('pledge.pledge.treaty')">
      <van-icon
        slot="right"
        :name="recordBlack"
        size="16"
        @click="gotoHistory"
      />
    </Header>

    <div class="pledeg-box" v-for="(item, index) in list" :key="index">
      <p class="nav">
        {{
          $t(
            `pledge.pledge.${
              item.invest_vertype == 1 ? "experience" : "formal"
            }`
          )
        }}
        {{ item.currency }}
      </p>

      <div class="content">
        <div class="item">
          <div class="item-name">{{ $t("pledge.pledge.num") }}</div>
          <div class="item-value">
            {{ item.amount }} {{ $t("pledge.pledge.unit") }}
          </div>
        </div>
        <div class="item">
          <div class="item-name">{{ $t("pledge.pledge.time") }}</div>
          <div class="item-value">
            {{ item.invest_days }} {{ $t("pledge.pledge.day") }}
          </div>
        </div>

        <div class="item" v-if="hasInvest">
          <div class="item-name">购买日期</div>
          <div class="item-value">
            {{ item.created_time }}
          </div>
        </div>
        <div class="item" v-else>
          <div class="item-name">{{ $t("pledge.pledge.dayRemaining") }}</div>
          <div class="item-value">
            {{ item.invest_days }}
            {{ $t("pledge.pledge.day") }}
          </div>
        </div>
      </div>

      <div class="btn" v-if="!hasInvest" @click="handleBtnClick(item.id)">
        {{ $t("pledge.pledge.begin") }}
      </div>
      <div class="btn text-yellow" v-else>
        {{ $t("pledge.pledge.inOperation") }}
      </div>

      <div class="border-bottom"></div>
    </div>

    <van-button
      class="fixed_btn"
      v-if="balance > 0"
      @click="handleTranslateAccount"
    >
      {{ $t("pledge.pledge.cashWithdrawal") }}
    </van-button>

    <notData v-if="list.length === 0" />

    <van-popup v-model="isShowConfirmAgainPop" round position="bottom">
      <div class="popup">
        <p class="nav">
          {{
            balance > 0
              ? $t("pledge.pledge.pledgeBalancePopNav")
              : $t("pledge.pledge.pledgePopNav")
          }}
        </p>
        <div class="balance">
          <div v-if="balance > 0" class="content">
            {{ $t("pledge.pledge.Withdrawal") }}
            {{ $n(balance || 0, "maximumSignificantDigits8") }}
            {{ balanceCurr }}
          </div>
          <div v-else class="content">
            {{ $t("pledge.pledge.balance") }}
            {{
              $n(account.available_balance || 0, "maximumSignificantDigits8")
            }}
            {{ account.currency }}
          </div>
          <div class="close" @click="isShowConfirmAgainPop = false">
            {{ $t("requestResponse.CANCEL") }}
          </div>
        </div>
        <div class="inpot-box">
          <p>{{ $t("mine.accountManage.safetyVerification") }}</p>
          <input
            type="password"
            v-model="passsword"
            :placeholder="$t('home.subscribe.inputWalletPwd')"
          />
        </div>
        <ButtonCommon class="popup-btn" @click="handlePopupSubmit">
          {{ $t("requestResponse.CONFIRM") }}
        </ButtonCommon>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Header from "@/components/Header";
import {
  Popup as VanPopup,
  Toast,
  Icon as VanIcon,
  Button as VanButton,
} from "vant";
import ButtonCommon from "@/components/ButtonCommon";
import {
  getInvestinfo,
  rationrecord,
  transtoration,
  translateAccount,
} from "@/http/modules/pattern.js";
import { getAccounts } from "@/http/modules/wallet";
import notData from "@/components/notData";
import recordBlack from "@/assets/icons/recordBlack.svg";

export default {
  name: "pledge",
  components: {
    VanIcon,
    notData,
    Header,
    VanPopup,
    ButtonCommon,
    VanButton,
  },
  data() {
    return {
      recordBlack,
      list: [],
      InvestinfoList: [], //可购买矿机列表
      interestVOList: [], //我的矿机列表
      account: {},
      passsword: "",
      investId: "",
      balance: 0,
      balanceCurr: "",
      interest_id: "",
      isShowConfirmAgainPop: false,
      hasInvest: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      getAccounts().then((res) => {
        if (res.status === 1) {
          this.account =
            res.accounts.find((res) => res.currency === "SSCV") ||
            res.accounts[0] ||
            {};
        }
      });

      try {
        let res1 = await getInvestinfo();
        if (res1.status === 1) {
          this.InvestinfoList = res1.data.list;
        }

        let res2 = await rationrecord();
        if (res2.status === 1) {
          this.interestVOList = res2.data.interestVOList.list;
        }

        if (this.interestVOList.length > 0) {
          this.balance = this.interestVOList[0].balance || 0;
          this.balanceCurr = this.interestVOList[0].currency || "";
          this.interest_id = this.interestVOList[0].id;
        }

        let list =
          this.interestVOList.filter((item) => item.invest_status == 1) || [];
        if (this.interestVOList.length > 0 && list.length > 0) {
          this.hasInvest = true;
          this.list = list;
        } else {
          this.hasInvest = false;
          this.list = this.InvestinfoList;
        }
      } catch (error) {
        console.error(error);
      }
    },
    handleBtnClick(id) {
      if (this.balance > 0) {
        Toast(this.$t("pledge.pledge.inGoing"));
      } else {
        this.investId = id;
        this.isShowConfirmAgainPop = true;
      }
    },
    handlePopupSubmit() {
      if (this.passsword.length > 0) {
        if (this.balance > 0) {
          translateAccount({
            m_security_pwd: this.passsword,
            interest_id: this.interest_id,
          })
            .then((res) => {
              if (res.status === 1) {
                Toast(this.$t("pledge.pledge.translateSuccess"));
              }
            })
            .finally(() => {
              this.isShowConfirmAgainPop = false;
              this.passsword = "";
              this.init();
            });
        } else {
          transtoration({
            m_security_pwd: this.passsword,
            invest_id: this.investId,
          })
            .then((res) => {
              if (res.status === 1) {
                Toast(this.$t("pledge.pledge.buySuccess"));
              }
            })
            .finally(() => {
              this.isShowConfirmAgainPop = false;
              this.passsword = "";
              this.init();
            });
        }
        return;
      }
      Toast(this.$t("home.subscribe.inputWalletPwd"));
    },
    handleTranslateAccount() {
      if (this.balance > 0) {
        this.isShowConfirmAgainPop = true;
      }
    },
    getDaysBetween(dateString1, dateString2) {
      var startDate = Date.parse(dateString1);
      var endDate = Date.parse(dateString2);
      if (startDate > endDate) {
        return 0;
      }
      if (startDate == endDate) {
        return 1;
      }
      var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
      return days;
    },
    gotoHistory() {
      this.$router.push("/myPledgeRecond");
    },
  },
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
  padding-bottom: 60px;
  .fixed_btn {
    background-color: $themeColor;
    position: fixed;
    bottom: 0;
    width: 100%;
    color: #fff;
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
          color: $txtGray;
        }
      }
    }
    .popup-btn {
      margin: 35px 15px 21px;
      width: auto;
    }
  }
  .pledeg-box {
    .nav {
      padding: 15px;
      color: $txtBlack;
      font-size: 15px;
      font-weight: 800;
    }
    .content {
      padding: 4px 15px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item {
        &-name {
          color: $txtGray;
          font-size: 12px;
        }
        &-value {
          margin-top: 8px;
          color: $txtBlack;
          font-size: 14px;
        }
      }
    }
    .btn {
      border-top: 1px solid #f4f4f4;
      color: $txtGreen;
      line-height: 42.5px;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
    }
    .border-bottom {
      height: 10px;
      background: #f7f6fb;
    }
  }
}
</style>