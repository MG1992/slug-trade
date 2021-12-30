<template>
  <div class="publish-ads header-page">
    <Header :title="$t('mine.ads.publishAds')" />
    <div class="left-tab">
      <!--orm.trans_type 2购买 1出售-->
      <span
        :class="form.trans_type === '2' ? 'active' : 'common'"
        class="m-r-23"
        @click="handleTab('2')"
        >{{ $t("mine.ads.buy") }}</span
      >
      <span
        :class="form.trans_type === '1' ? 'active' : 'common'"
        @click="handleTab('1')"
        >{{ $t("mine.ads.sale") }}</span
      >
    </div>
    <van-tabs v-model="form.symbol" class="currency" @change="changeSymbol">
      <van-tab
        v-for="item in currencyList"
        :key="item.currency"
        :name="item.currency"
        :title="item.currency"
      ></van-tab>
    </van-tabs>
    <!--广告表单-->
    <van-field
      class="short-title"
      v-model="form.price"
      :label="$t('mine.ads.price')"
      type="number"
      :placeholder="
        form.trans_type === '2'
          ? $t('mine.ads.pleaseInputPurchasePrice')
          : $t('mine.ads.pleaseInputSellPrice')
      "
    >
      <span slot="right-icon">CNY</span>
    </van-field>

    <van-field
      class="short-title"
      v-model="form.trade_num"
      :label="$t('mine.ads.quantity')"
      type="number"
      :placeholder="
        form.trans_type === '2'
          ? $t('mine.ads.pleaseInputPurchaseQuantity')
          : $t('mine.ads.pleaseInputSellQuantity')
      "
    >
      <span slot="right-icon">{{ form.symbol }}</span>
    </van-field>

    <div v-if="form.trans_type === '1'" class="balance">
      {{ $t("mine.ads.accountBalance") }} {{ balance }}
    </div>
    <van-field
      class="long-title"
      v-model="form.least_amount"
      :label="$t('mine.ads.minQuantity')"
      type="number"
      :placeholder="
        form.trans_type === '2'
          ? $t('mine.ads.minQuantityPerPurchase')
          : $t('mine.ads.minQuantityPerSell')
      "
    />

    <van-field
      class="long-title"
      v-model="form.max_amount"
      :label="$t('mine.ads.maxQuantity')"
      type="number"
      :placeholder="
        form.trans_type === '2'
          ? $t('mine.ads.maxQuantityPerPurchase')
          : $t('mine.ads.maxQuantityPerSell')
      "
    />
    <!--交易方式-->
    <div class="gray"></div>
    <div class="deal">
      <p>
        {{
          form.trans_type === "2"
            ? $t("mine.ads.payType")
            : $t("mine.ads.collectType")
        }}
      </p>
      <div
        @click="toAddPayType"
        class="add-type"
        v-if="form.trans_type === '1'"
      >
        {{ $t("mine.ads.addCollectType") }} >
      </div>
      <!--购买时从写死三种任选一种 出售时是自己激活的收款方式-->
      <!-- <div class="pay-type">
        <div
          v-for="item in form.trans_type==='2'? payTypeIconList : payTypeList"
          :key="form.trans_type==='2' ? item.key : item.id"
          @click="selectPayType(item)"
        >
          <p
            :class="payTypeSelect[Number(form.trans_type==='2' ? item.key : item.payment_type)]?'active':'common'"
          >
            <img
              :src="form.trans_type==='2' ? item.value : KeyFilter(item.payment_type, 'otc.paymentTypeIcon')"
            />
          </p>
        </div>
      </div>-->
      <buy-pay-type
        v-if="$route.params.type === '2'"
        ref="buyPayType"
        @returnBuyPayType="returnBuyPayType"
      ></buy-pay-type>
      <sale-pay-type
        v-else
        ref="salePayType"
        @returnSalePayTypes="returnSalePayTypes"
      ></sale-pay-type>
    </div>
    <div class="gray"></div>
    <div>
      <ButtonCommon fixed @click="showPwdPopup">{{
        $t("common.confirm")
      }}</ButtonCommon>
    </div>
    <safety-verify-popup
      :isShow="showPopup"
      @returnPwd="returnPwd"
      @close="showPopup = false"
    />
  </div>
</template>

<script>
import Header from "@/components/Header";
import { Tab as VanTab, Tabs as VanTabs, Field as VanField, Toast } from "vant";
import ButtonCommon from "@/components/ButtonCommon";
import {
  publishAds,
  getAllCurrency,
  getMyEnablePayType
} from "@/http/modules/mine.js";
import { getAccounts, getGAccounts } from "@/http/modules/wallet";
import { getFrmconfig } from "@/http/modules/pattern.js";

import i18n from "@/langs";
import checkRules from "@/utils/checkRules";
import SafetyVerifyPopup from "@/views/mine/components/SafetyVerifyPopup";
// import keys from "@/config/keyValue"
import { KeyFilter } from "@/utils/filter";
import BuyPayType from "./components/buyPayType";
import SalePayType from "./components/salePayType";
function Form() {
  return {
    symbol: "",
    trans_type: "", //1出售  2购买
    price: "",
    trade_num: "",
    least_amount: "",
    max_amount: "",
    payment_types: "",
    payment_ids: "", //卖必填，卖确定哪几个方式可以收
    advertise_status: "1" //1上架 2下架
  };
}
export default {
  components: {
    Header,
    VanTab,
    VanTabs,
    ButtonCommon,
    VanField,
    SafetyVerifyPopup,
    BuyPayType,
    SalePayType
  },
  data() {
    return {
      KeyFilter,
      showPopup: false,
      currencyList: [],
      payTypeList: [],
      form: new Form(),
      accountList: [], //交易账户余额
      balance: 0,
      config: {}
    };
  },
  watch: {
    $route(to) {
      this.form.trans_type = to.params.type;
      if (to.params.type === "1") {
        this.$nextTick(() => {
          this.$refs.salePayType.getMyEnablePayType();
        });
      }
    }
  },
  async activated() {
    this.init(this.$route.params.type);
    this.getFrmconfig();
  },
  methods: {
    // 获取系统配置
    getFrmconfig() {
      getFrmconfig().then(res => {
        this.config = res.data;
      });
    },
    async init(type) {
      this.payTypes = [];
      this.form = new Form();
      this.form.trans_type = type;
      this.showPopup = false;
      // 获取账户余额 所有币种及期余额list
      this.accountList = await this.getGAccounts();
      this.getCurrencyList();
    },
    getRules() {
      return [
        {
          attr: "price",
          cnName:
            this.form.trans_type === "2"
              ? i18n.t("mine.ads.pleaseInputPurchasePrice")
              : i18n.t("mine.ads.pleaseInputSellPrice"),
          rules: {
            allowNull: false,
            customHint: true,
            regex: /^([1-9]\d*(\.\d*[1-9][0-9])?)|(0\.\d*[1-9][0-9])|(0\.\d*[1-9])$/,
            regexMsg:
              i18n.t("mine.ads.price") +
              i18n.t("mine.ads.notAllowNegativeNumbers")
          }
        },
        {
          attr: "trade_num",
          cnName:
            this.form.trans_type === "2"
              ? i18n.t("mine.ads.pleaseInputPurchaseQuantity")
              : i18n.t("mine.ads.pleaseInputSellQuantity"),
          rules: {
            allowNull: false,
            customHint: true,
            regex: /^([1-9]\d*(\.\d*[1-9][0-9])?)|(0\.\d*[1-9][0-9])|(0\.\d*[1-9])$/,
            regexMsg:
              i18n.t("mine.ads.quantity") +
              i18n.t("mine.ads.notAllowNegativeNumbers")
          }
        },
        {
          attr: "least_amount",
          cnName:
            this.form.trans_type === "2"
              ? i18n.t("mine.ads.minQuantityPerPurchase")
              : i18n.t("mine.ads.minQuantityPerSell"),
          rules: {
            allowNull: false,
            regex: /^([1-9]\d*(\.\d*[1-9][0-9])?)|(0\.\d*[1-9][0-9])|(0\.\d*[1-9])$/,
            regexMsg:
              i18n.t("mine.ads.minQuantity") +
              i18n.t("mine.ads.notAllowNegativeNumbers")
          }
        },
        {
          attr: "max_amount",
          cnName:
            this.form.trans_type === "2"
              ? i18n.t("mine.ads.maxQuantityPerPurchase")
              : i18n.t("mine.ads.maxQuantityPerSell"),
          rules: {
            allowNull: false,
            regex: /^([1-9]\d*(\.\d*[1-9][0-9])?)|(0\.\d*[1-9][0-9])|(0\.\d*[1-9])$/,
            regexMsg:
              i18n.t("mine.ads.maxQuantity") +
              i18n.t("mine.ads.notAllowNegativeNumbers")
          }
        },
        {
          attr: "payment_types",
          cnName:
            this.form.trans_type === "2"
              ? i18n.t("mine.ads.pleaseSelectTradeType")
              : i18n.t("mine.ads.pleaseSelectCollectType"),
          rules: {
            allowNull: false,
            customHint: true
          }
        }
      ];
    },
    // 获取可用的支付方式-激活的
    getMyEnablePayType() {
      getMyEnablePayType().then(res => {
        this.payTypeList = res.data;
      });
    },
    // 我要买是所有币种 我要卖是我拥有的币种
    getCurrencyList() {
      // 1出售-我的币种 2购买-所有币种
      const api = {
        1: getAccounts,
        2: getAllCurrency
      };
      api[this.form.trans_type]().then(res => {
        this.currencyList = res.currencys || res.data;
        this.form.symbol =
          this.currencyList.length && this.currencyList[0].currency; //默认为第一个币种
        this.balance = this.getBalance(this.form.symbol);
      });
    },
    // 获取交易账户
    async getGAccounts() {
      const res = await getGAccounts();
      return res && res.accounts;
    },
    // 获取每个币种的账户余额
    getBalance(currency) {
      // 出售才请求余额
      if (this.form.trans_type !== "1") {
        return;
      }
      let balance = 0;
      this.accountList.find(item => {
        if (item.currency === currency) {
          balance = item.available_balance;
        }
      });
      return balance;
    },

    handleTab(flag) {
      this.$router.replace({ path: `/publishAds/${flag}` });
      this.init(this.$route.params.type);
    },
    // 改变币种
    changeSymbol(value) {
      const transType = this.form.trans_type;
      this.form = new Form();
      this.form.symbol = value;
      this.form.trans_type = transType;
      this.$nextTick(() => {
        this.$refs[
          this.form.trans_type === "2" ? "buyPayType" : "salePayType"
        ].reset();
      });
      this.balance = this.getBalance(this.form.symbol);
    },
    returnPwd(pwd) {
      this.form.amount_pwd = pwd;
      this.toPublish();
    },
    // 获取交易方式-购买
    returnBuyPayType(payTypes) {
      this.payTypes = payTypes;
      this.form.payment_types = this.payTypes.toString();
    },
    // 获取交易方式-出售 多选
    returnSalePayTypes(data) {
      this.form.payment_ids = data.paymentIds.toString();
      this.form.payment_types = data.paymentTypes.toString();
    },
    showPwdPopup() {
      if (checkRules(this.form, this.getRules())) return;
      if (Number(this.form.least_amount) > Number(this.form.trade_num)) {
        Toast(i18n.t("mine.ads.minQuantityNeedLessThenQuantity"));
        return;
      }
      if (Number(this.form.max_amount) > Number(this.form.trade_num)) {
        Toast(i18n.t("mine.ads.maxQuantityNeedLessThenQuantity"));
        return;
      }
      if (Number(this.form.max_amount) < Number(this.form.least_amount)) {
        Toast(i18n.t("mine.ads.minQuantityNeedLessThenMaxQuantity"));
        return;
      }
      //OTC买广告价格配置,如：6,7 买入最小价格6，最大7
      // 后台配置 发布购买广告最大最小价格
      if (this.config.buy_price_conf && this.form.trans_type === "1") {
        const arr = this.config.buy_price_conf.split(",");
        const minAmount = arr[0];
        const maxAmount = arr[1];
        if (Number(this.form.price) < Number(minAmount)) {
          Toast(i18n.t("mine.ads.minPriceLessThenSystemMinPrice"));
          return;
        }
        if (Number(this.form.price) > Number(maxAmount)) {
          Toast(i18n.t("mine.ads.maxPriceMaxThenSystemMaxPrice"));
          return;
        }
      }
      //OTC卖广告价格配置,如：6,7 卖出最小价格6，最大7
      // 后台配置 发布出售广告最大最小价格
      if (this.config.sell_price_conf && this.form.trans_type === "2") {
        const arr = this.config.sell_price_conf.split(",");
        const minAmount = arr[0];
        const maxAmount = arr[1];
        if (Number(this.form.price) < Number(minAmount)) {
          Toast(i18n.t("mine.ads.minPriceLessThenSystemMinPrice"));
          return;
        }
        if (Number(this.form.price) > Number(maxAmount)) {
          Toast(i18n.t("mine.ads.maxPriceMaxThenSystemMaxPrice"));
          return;
        }
      }
      this.showPopup = true;
    },
    toPublish() {
      publishAds(this.form).then(() => {
        Toast(i18n.t("mine.ads.publishSuccess"));
        this.showPopup = false;
        this.$emit("close");
        // 购买跳转到我要卖页面  出售跳转到我要买页面
        this.$router.push({
          path: "/adsList",
          query: {
            type: this.form.trans_type,
            currency: this.form.symbol
          }
        });
      });
    },
    toAddPayType() {
      this.$router.push({
        path: "/collectionType",
        query: { fromOrder: true }
      });
    }
  }
};
</script>

<style lang="scss">
.publish-ads {
  .left-tab {
    height: 70px;
    line-height: 70px;
    padding-left: 15px;
    background-color: #f3f3f3;
  }
  .gray {
    height: 10px;
    background-color: #f3f3f3;
  }
  .m-r-23 {
    margin-right: 23px;
  }
  .active {
    font-size: 25px;
    color: #202028;
  }
  .common {
    font-size: 17px;
    color: #96a8b0;
  }
  .van-tabs__line {
    background-color: $themeColor;
  }
  .van-tab--active {
    color: $themeColor;
  }
  .van-tabs__wrap {
    border-bottom: 1px solid #eeeeee;
    height: 36px;
  }
  .van-tab__text {
    padding-top: 4px;
  }
  .van-cell__title {
    color: #202028;
  }
  .long-title {
    .van-cell__title {
      min-width: 118px;
    }
  }
  .short-title {
    .van-cell__title {
      width: 34px;
    }
  }
  .deal {
    background-color: #ffffff;
    padding: 15px;
    // height: 110px;
    position: relative;
    p {
      color: #202028;
      font-size: 15px;
      font-weight: bold;
    }
    .add-type {
      position: absolute;
      right: 15px;
      top: 15px;
      color: #ebac4f;
      font-size: 12px;
    }
  }
  .balance {
    text-align: right;
    margin-top: 7px;
    padding-right: 15px;
  }
  .min-quantity {
    position: relative;
  }
}
</style>