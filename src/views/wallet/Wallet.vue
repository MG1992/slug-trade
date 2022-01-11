
<template>
  <div class="asset-wrapper">
    <header class="stat-wrap">
      <p>
        <span>{{ $t("wallet.wallet.AllAccountAssets") }}</span>
        <van-icon
          class-prefix="icon-eye"
          :name="eyesIconSrc"
          @click="isOpenEyes = !isOpenEyes"
        />
      </p>
      <p v-show="!isOpenEyes">
        <span class="amount">
          {{ $n(totalAccountAsset, "maximumSignificantDigits4") }}
        </span>
        <span class="to-cny">
          ≈
          <em>{{ $n(totalAccountAsset, "maximumSignificantDigits4") }}</em>
          CNY
        </span>
      </p>
    </header>

    <van-tabs v-model="activeTab">
      <van-tab title="可用" name="tab_1"></van-tab>
      <van-tab title="交易" name="tab_2"></van-tab>
      <van-tab title="划转" name="tab_3"></van-tab>
    </van-tabs>

    <!-- 币币账户资产 -->
    <section v-if="activeTab != 'tab_2'" class="bb-wrap">
      <van-row type="flex" justify="space-between">
        <van-col>
          <span class="title">{{ $t("wallet.wallet.AccountAssets") }}</span>
        </van-col>
      </van-row>
      <div class="stat">
        <span class="amount">{{
          $n(coinAccountAsset, "maximumSignificantDigits4")
        }}</span>
        <span class="to-cny">
          ≈
          <em>{{ $n(coinAccountAsset, "maximumSignificantDigits4") }}</em>
          CNY
        </span>
      </div>
    </section>

    <!-- 条件搜索 -->
    <section class="search-wrap">
      <van-row type="flex" justify="space-between" align="center">
        <van-col span="12">
          <van-checkbox
            v-model="isHideZeroAsset"
            shape="square"
            :checked-color="$color.themeColor"
            class="hidden-minasset"
            icon-size=".4rem"
            >{{ $t("wallet.wallet.hideLittleAssets") }}</van-checkbox
          >
        </van-col>

        <van-col>
          <form action="/">
            <van-search
              class="search"
              v-model="searchText"
              :placeholder="$t('wallet.wallet.searchCurrencyType')"
            />
          </form>
        </van-col>
      </van-row>
    </section>
    <van-divider hairline :style="{ margin: 0, color: '#F4F4F4' }" />
    <!-- 币列表 -->
    <section v-if="activeTab == 'tab_1'" class="coin-list">
      <div class="coin-item" v-for="(account, index) in accounts" :key="index">
        <div class="coin-title">
          <i>
            <img :src="account.currencyImg" />
          </i>
          <span>{{ account.currency }}</span>
        </div>
        <van-divider hairline :style="{ margin: 0, color: '#F4F4F4' }" />
        <div class="coin-detail">
          <div class="label-row">
            <van-row type="flex" justify="flex-start">
              <van-col span="8">{{ $t("wallet.wallet.haveCurrency") }}</van-col>
              <van-col span="8">单价</van-col>
            </van-row>
          </div>
          <div class="num-row">
            <van-row type="flex" justify="flex-start">
              <van-col span="8">
                {{ $n(account.available_balance, "maximumSignificantDigits4") }}
              </van-col>
              <van-col span="8">{{
                $n(account.price, "maximumSignificantDigits4")
              }}</van-col>
            </van-row>
          </div>
        </div>

        <div v-if="account.currency !== 'USDT'" class="coin-handle">
          <van-button @click="toDeposit(account)">
            {{ $t("wallet.wallet.RechargeCurrency") }}
          </van-button>
          <span class="split"></span>
          <van-button @click="toWithdraw(account)">
            {{ $t("wallet.wallet.WithdrawCurrency") }}
          </van-button>
        </div>
        <div v-else class="coin-handle">
          <van-button @click="toMultiDeposit(account)">
            {{ $t("wallet.wallet.RechargeCurrency") }}
          </van-button>
          <span class="split"></span>
          <van-button @click="toMultiWithdraw(account)">
            {{ $t("wallet.wallet.WithdrawCurrency") }}
          </van-button>
        </div>
      </div>
    </section>

    <!-- 交易tab -->
    <section v-if="activeTab == 'tab_2'" class="coin-list">
      <div class="coin-item" v-for="(account, index) in accounts" :key="index">
        <div class="coin-title">
          <i>
            <img :src="account.currencyImg" />
          </i>
          <span>{{ account.currency }}</span>
        </div>
        <van-divider hairline :style="{ margin: 0, color: '#F4F4F4' }" />
        <div class="coin-detail">
          <div class="label-row">
            <van-row type="flex" justify="flex-start">
              <van-col span="8">{{ $t("wallet.wallet.haveCurrency") }}</van-col>
              <van-col span="8"></van-col>
            </van-row>
          </div>
          <div class="num-row">
            <van-row type="flex" justify="flex-start">
              <van-col span="8">
                {{ $n(account.available_balance, "maximumSignificantDigits4") }}
              </van-col>
              <van-col span="8"></van-col>
            </van-row>
          </div>
        </div>

        <!-- <div class="trade_btn" @click="toTradeNow(account)">
          {{ $t("wallet.wallet.toTrade") }}
        </div> -->
      </div>
    </section>
  </div>
</template>

<script>
// import Cookies from "js-cookie"
import {
  Icon as VanIcon,
  Checkbox as VanCheckbox,
  Divider as VanDivider,
  Search as VanSearch,
  Button as VanButton,
  Row as VanRow,
  Col as VanCol,
  Tab as VanTab,
  Tabs as VanTabs,
  Toast,
} from "vant";
import eyeIcon from "@/assets/icons/eye_icon.svg";
import closeEyeIcon from "@/assets/icons/hidden_icon.svg";
import timeIcon from "@/assets/icons/time_icon.svg";
import { getWalletList } from "@/http/modules/wallet";

import BigNumber from "bignumber.js";

export default {
  name: "Wallet",
  components: {
    VanIcon,
    VanCheckbox,
    VanDivider,
    VanSearch,
    VanButton,
    VanRow,
    VanCol,
    VanTab,
    VanTabs,
  },
  data() {
    return {
      isOpenEyes: false,
      timeIconSrc: timeIcon,
      searchText: "",
      isHideZeroAsset: false,
      accounts: [],
      currencys: [],
      // tickersMap: "",
      totalAccountAsset: 0, // 替换之前的 cnyOwnMenoy
      coinAccountAsset: 0,
      // cnyOwnMenoy: 0,
      // usdtOwnMenoy: 0,
      // btcOwnmenoy: 0,
      activeTab: "tab_1",
      BigNumber,
    };
  },
  computed: {
    eyesIconSrc() {
      return this.isOpenEyes ? closeEyeIcon : eyeIcon;
    },
  },
  mounted() {
    getWalletList().then((res) => {
      console.log(res);
      this.accounts = res;
    });
  },
  methods: {
    toTradeNow() {
      this.$router.push("adsList");
    },
    comingSoon() {
      Toast(this.$t("common.pleaseExpected"));
    },
  },
};
</script>
<style lang="scss" scoped>
.asset-wrapper {
  padding-bottom: 50px;
}
section {
  padding: 0 15px;
}
.stat-wrap {
  padding: 52px 20px 33px 20px;
  height: 130px;
  background-image: url("./../../assets/img/wallet_banner.png");
  background-size: 100% auto;
  color: #ffffff;
  p {
    display: flex;
    align-items: center;
    font-size: 13px;
    &:last-child {
      margin-top: 18px;
    }
  }
  .amount {
    margin-right: 7px;
    font-size: 18px;
  }
  .to-cny {
    font-size: 13px;
    em {
      margin: 0 5px;
    }
  }
  .icon-eye {
    margin-left: 21px;
    width: 16px;
    height: 12px;
  }
}
.bb-wrap {
  padding: 20px 20px 0;
  .van-cell {
    padding: 0;
  }
  .title {
    font-size: 15px;
  }
  .van-icon__image {
    width: 13px;
    height: 13px;
  }
  .stat {
    margin-top: 15px;
    display: flex;
    align-items: flex-end;
    .amount {
      margin-right: 5px;
      font-size: 21px;
    }
    .to-cny {
      font-size: 12px;
    }
    em {
      margin: 0 5px;
    }
  }
}
::v-deep.van-tabs {
  border-bottom: 1px solid #f4f4f4;
  .van-tabs__line {
    background-color: $themeColor;
    height: 2px;
  }
  .van-tab--active {
    color: $themeColor;
  }
}
.search-wrap {
  margin: 20px 0;
  padding: 0 20px;
  color: #919da9;
  .van-cell {
    padding: 0;
  }
  ::v-deep.hidden-minasset {
    font-size: 12px;
    .van-checkbox__label {
      color: #919da9;
    }
  }
  ::v-deep.van-search {
    width: 106px;
    height: 31px;
    padding: 0;
    border: 1px solid #ededed;
    border-radius: 2px;
    .van-field__left-icon {
      margin-right: 10px;
    }
    .van-icon-search:before {
      content: "";
      width: 16px;
      height: 16px;
      background: url("../../assets/icons/search_icon.svg") no-repeat;
    }
    .van-search__content {
      padding-left: 9px;
      background: #fff;
    }
    .van-cell {
      padding: 0;
    }
    .van-field__control {
      font-size: 13px;
    }
  }
}
.coin-list {
  padding-top: 11px;
}
.coin-item {
  margin-bottom: 20px;
  box-shadow: 1px 3px 3px 0px rgba(57, 57, 57, 0.06);
  border-radius: 5px;
  overflow: hidden;
  .coin-title {
    display: flex;
    align-items: center;
    height: 47px;
    i {
      display: inline-block;
      width: 50px;
      height: 22px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    span {
      margin-left: 12px;
      font-size: 18px;
    }
  }
  .trade_btn {
    font-size: 14px;
    text-align: center;
    padding: 16px 0;
    color: $themeColor;
    border-top: 1px solid #f4f4f4;
  }
  .coin-detail {
    padding: 22px 15px 18px 15px;
    font-size: 13px;
    .label-row {
      margin-bottom: 12px;
      color: #666666;
    }

    ::v-deep.van-col {
      &:nth-child(2) {
        text-align: center;
      }
      &:last-child {
        text-align: right;
      }
    }
  }
  .coin-handle {
    display: flex;
    align-items: center;
    height: 46px;
    background: #f6f7f9;
    border-radius: 0px 0px 5px 5px;
    font-size: 14px;
    color: #333333;
    .van-button {
      flex: 1;
      font-size: 14px;
      color: #333333;
      background: #f6f7f9;
      border: 0;
    }
    .split {
      width: 1px;
      height: 35px;
      background: #e9ebf3;
    }
  }
}
</style>
