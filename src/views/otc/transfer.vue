<template>
  <div class="wrapper header-page">
    <Header :title="$t('home.otc.transfer')" />
    <div class="body-wrapper">
      <p class="title">{{ $t("home.otc.transfer") }}</p>
      <div class="transfer-div-wrapper">
        <van-row>
          <van-col span="20" class="left">
            <div class="from">
              <span>从</span
              >{{
                transfer.from_account_type | KeyFilter("transfer.accountType")
              }}
            </div>
            <div class="to">
              <span>到</span
              >{{
                transfer.to_account_type | KeyFilter("transfer.accountType")
              }}
            </div>
          </van-col>
          <van-col span="4" class="right" @click="switchType">
            <img src="@/assets/icons/transfer.png" />
          </van-col>
        </van-row>
      </div>
      <p class="subtitle">{{ "币种" }}</p>
      <van-cell class="currency">
        <template #title>
          <span class="m-l-10">{{ transfer.currency }}</span>
        </template>
      </van-cell>
      <p class="subtitle">{{ "划转数量" }}</p>
      <van-row class="number-wrapper">
        <van-col span="18" class="left">
          <van-field v-model="transfer.w_amount" placeholder="请输入划转数量" />
        </van-col>
        <van-col span="3" class="right">
          {{ transfer.currency }}
        </van-col>
        <van-col
          span="3"
          style="font-size: 15px"
          class="text-right"
          @click="transferAll"
        >
          全部
        </van-col>
      </van-row>
      <div class="available">
        <span>可用 {{ available }}</span
        >{{ transfer.currency }}
      </div>
      <div class="tips">
        币币划转至OTC需要扣{{
          BigNumber(config.transfer_fee)
            .times(100)
            .toNumber()
        }}%手续费。OTC划转至币币不收取任何费用。
      </div>
      <ButtonCommon fixed @click="toPopup">确认</ButtonCommon>
    </div>
    <!-- <safety-verify-popup
      :isShow="showPopup"
      @returnPwd="returnPwd"
      @close="showPopup = false"
    /> -->
  </div>
</template>
<script>
import Header from "@/components/Header";
import {
  Row as VanRow,
  Col as VanCol,
  Cell as VanCell,
  Field as VanField,
  Toast,
  Dialog
} from "vant";
import ButtonCommon from "@/components/ButtonCommon";
import { getFrmconfig } from "@/http/modules/pattern.js";
import { getAccountCurr, getGCurrency } from "@/http/modules/wallet";
import { insideTransfer } from "@/http/modules/otc";
import BigNumber from "bignumber.js";
// import SafetyVerifyPopup from "@/views/mine/components/SafetyVerifyPopup";
function Create() {
  return {
    currency: "SSCV",
    w_amount: "",
    from_account_type: 1,
    to_account_type: 2
  };
}
export default {
  name: "transfer",
  components: {
    Header,
    ButtonCommon,
    VanRow,
    VanCol,
    VanCell,
    VanField
    // SafetyVerifyPopup
  },
  data() {
    return {
      number: "",
      transfer: new Create(),
      available: 0,
      config: {},
      showPopup: false,
      BigNumber
    };
  },
  activated() {
    this.transfer = new Create();
    this.getFrmconfig();
    this.getAccountCurr();
  },
  methods: {
    // 获取系统配置
    getFrmconfig() {
      getFrmconfig().then(res => {
        this.config = res.data;
      });
    },
    switchType() {
      this.transfer.from_account_type =
        this.transfer.from_account_type === 1 ? 2 : 1;
      this.transfer.to_account_type =
        this.transfer.to_account_type === 1 ? 2 : 1;
      this.available = 0;
      if (this.transfer.from_account_type === 1) {
        this.getAccountCurr();
      } else {
        this.getGCurrency();
      }
    },
    toPopup() {
      if (!this.transfer.w_amount || !/\d/.test(this.transfer.w_amount)) {
        Toast("请输入划转数量");
        return;
      }
      const tips =
        this.transfer.from_account_type === 1
          ? `币币划转至OTC需要扣${BigNumber(this.config.transfer_fee)
              .times(100)
              .toNumber()}%手续费`
          : "OTC划转至币币不收取任何费用";
      Dialog.confirm({
        message: tips,
        cancelButtonText: this.$t("common.cancel"),
        confirmButtonText: this.$t("common.confirm"),
        confirmButtonColor: this.$color.themeColor
      })
        .then(() => {
          this.submit();
        })
        .catch(() => {});
    },
    transferAll() {
      this.transfer.w_amount = this.available;
    },
    // 币币查资产
    getAccountCurr() {
      getAccountCurr(this.transfer.currency).then(res => {
        this.available = res.account.available_balance;
      });
    },
    // OTC查资产
    getGCurrency() {
      getGCurrency(this.transfer.currency).then(res => {
        this.available = res.account.available_balance;
      });
    },
    // 提交
    submit() {
      insideTransfer(this.transfer).then(() => {
        Toast(this.$t("common.success"));
        this.transfer.w_amount = "";
        if (this.transfer.from_account_type === 1) {
          this.getAccountCurr();
        } else {
          this.getGCurrency();
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  .body-wrapper {
    padding: 0 15px;
    .title {
      font-size: 25px;
      color: #202028;
      line-height: 25px;
      padding: 13px 0;
    }
    .subtitle {
      font-size: 12px;
      font-weight: bold;
      color: #202028;
      line-height: 20px;
      padding-top: 20px;
    }
    .transfer-div-wrapper {
      height: 80px;
      border: 1px solid #f0f0f0;
      border-radius: 5px;
      .right {
        text-align: center;
        background: #f9f8ff;
        height: 80px;
        padding: 24px 4px;
        img {
          width: 32px;
        }
      }
      .left {
        padding-left: 23px;
        > div {
          position: relative;
          height: 40px;
          line-height: 40px;
          font-size: 13px;
          span {
            color: #8193a0;
            font-size: 12px;
            margin-right: 15px;
          }
        }
        > div::before {
          position: absolute;
          content: "";
          width: 5px;
          height: 5px;
          background: #cc4d61;
          border-radius: 50%;
          left: -15px;
          top: 15px;
        }
        > div:first-child {
          border-bottom: 1px solid #f0f0f0;
        }
        > div:first-child::before {
          background: #efba6b;
        }
      }
    }
    .currency {
      border-bottom: 1px solid #ececec;
      padding-left: 0;
    }
  }
  .number-wrapper {
    line-height: 44px;
    border-bottom: 1px solid #f0f0f0;
  }
  .available {
    line-height: 30px;
    span {
      color: #bac4cc;
      margin-right: 10px;
    }
  }
  .tips {
    margin-top: 27px;
    padding: 18px 11px;
    height: 60px;
    background: #f2f2f2;
    border-radius: 5px;
    font-size: 10px;
    color: #999999;
    line-height: 16px;
  }
}
</style>