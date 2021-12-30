<template>
  <van-popup
    class="place-order-popup"
    v-model="isShow"
    round
    position="bottom"
    :style="{ height: '80%' }"
    safe-area-inset-bottom
    :close-on-click-overlay="false"
    @click-overlay="handleClose"
    @close="handleClose"
  >
    <div class="f16 header">
      {{
        adsInfo.trans_type === "2" ? $t("mine.ads.sale") : $t("mine.ads.buy")
      }}
      {{ adsInfo.currency }}
      <img class="float-right" :src="adsInfo.currencyImg" />
      <div class="f14 m-t-15 unit-price">
        {{ $t("mine.ads.unitPrice") }}
        <span class="theme-color">¥ {{ adsInfo.price }}</span>
      </div>
    </div>
    <div class="popup-content">
      <van-tabs class="tab">
        <van-tab
          :title="
            adsInfo.trans_type === '2'
              ? $t('mine.ads.sellInQuantity')
              : $t('mine.ads.buyInQuantity')
          "
        ></van-tab>
        <div class="trade-transfer" @click="$router.push('transfer')">
          <img src="~@/assets/icons/trade_transfer.png" />
          {{ $t("mine.ads.tradeTransfer") }}
        </div>
      </van-tabs>
      <van-field
        class="quantity"
        v-model="form.trade_num"
        type="number"
        :placeholder="
          adsInfo.trans_type === '2'
            ? $t('mine.ads.pleaseInputSellQuantity')
            : $t('mine.ads.pleaseInputPurchaseQuantity')
        "
      >
        <span slot="right-icon">
          {{ adsInfo.currency }}
          <span class="sell-all-btn" @click="handleTradeAll">
            {{
              adsInfo.trans_type === "2"
                ? $t("mine.ads.sellItAll")
                : $t("mine.ads.buyItAll")
            }}
          </span>
        </span>
      </van-field>
      <div class="m-t-10 m-b-10 gray">
        {{ $t("mine.ads.limitQuantity") }} {{ adsInfo.least_amount }} -
        {{ adsInfo.max_amount }}
      </div>

      <van-cell
        class="nomal-cell number"
        :title="$t('mine.ads.tradeQuantity')"
        :value="`${form.trade_num} ${adsInfo.currency}`"
      />

      <van-cell
        class="nomal-cell price number"
        :title="$t('mine.ads.payActually')"
        :value="
          form.trade_num
            ? `¥ ${BigNumber(form.trade_num)
                .times(adsInfo.price)
                .toNumber()}`
            : form.trade_num
        "
      />

      <div class="select-pay-type">
        {{
          adsInfo.trans_type === "2"
            ? $t("mine.ads.selectCollectType")
            : $t("mine.ads.selectPayType")
        }}
      </div>
      <!-- 购买时显示对方发布时选择的支付方式   出售时显示自己已激活的收款方式-->
      <sale-pay-type
        isOrder
        ref="salePayType"
        :payments="adsInfo.trans_type === '2' ? [] : adsInfo.payments"
        @returnSalePayId="returnSalePayId"
      ></sale-pay-type>
      <div
        class="add-pay-type"
        @click="toAddPayType"
        v-if="adsInfo.trans_type === '2'"
      >
        <van-icon name="add" size="15" />
        {{ $t("mine.ads.addCollectType") }}
      </div>
    </div>
    <div class="bottom-btn m-t-46">
      <van-button class="left" type="default">
        <van-count-down
          ref="countDown"
          :time="time"
          format="ss"
          @finish="handleClose"
        />
        s {{ $t("mine.ads.autoCancel") }}
      </van-button>
      <van-button
        class="right"
        :color="$color.themeColor"
        @click="showPwdPopup"
        :disabled="!canOrder"
        >{{ $t("mine.ads.placeOrder") }}</van-button
      >
    </div>
    <safety-verify-popup
      :isShow="showPopup"
      @returnPwd="returnPwd"
      @close="showPopup = false"
    />
  </van-popup>
</template>

<script>
import {
  Button as VanButton,
  Popup as VanPopup,
  Field as VanField,
  Tab as VanTab,
  Tabs as VanTabs,
  Cell as VanCell,
  CountDown as VanCountDown,
  Icon as VanIcon,
  Toast
} from "vant";
import BigNumber from "bignumber.js";
import checkRules from "@/utils/checkRules";
import i18n from "@/langs";
import { placeOrder } from "@/http/modules/mine.js";
import SafetyVerifyPopup from "@/views/mine/components/SafetyVerifyPopup";
import { getFrmconfig } from "@/http/modules/pattern.js";

import { storage } from "@/utils/oldVersionFunc.js";
import { KeyFilter } from "@/utils/filter";
import SalePayType from "./salePayType";
function Form() {
  return {
    trade_num: "",
    advertise_id: "",
    trans_type: "", //1 出售  2 购买
    m_security_pwd: "",
    payment_id: ""
  };
}
export default {
  components: {
    VanPopup,
    VanButton,
    VanField,
    VanTab,
    VanTabs,
    VanCell,
    SafetyVerifyPopup,
    VanIcon,
    SalePayType,
    VanCountDown
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    adsInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      KeyFilter,
      showPopup: false,
      payTypeList: [],
      form: new Form(),
      time: 60000,
      adsOrderStorage: null,
      BigNumber,
      rules: [
        {
          attr: "m_security_pwd",
          cnName: i18n.t("common.password"),
          rules: {
            regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,50}$/,
            regexMsg: i18n.t(
              "common.passwordCantBeLessThan6AndMustIncludeNumbersAndLetters"
            ),
            minLength: 6,
            maxLength: 50
          }
        }
      ],
      config: {}
    };
  },
  created() {
    this.getFrmconfig();
  },
  computed: {
    canOrder() {
      const { trade_num, payment_id } = this.form;
      return trade_num && payment_id;
    }
  },
  watch: {
    isShow(val) {
      this.showPopup = false;
      this.$nextTick(() => {
        this.$refs.salePayType.reset();
      });
      if (!val) {
        return;
      }
      // 获取激活的收款方式--出售时
      if (this.adsInfo.trans_type === "2") {
        this.$nextTick(() => {
          this.$refs.salePayType.getMyEnablePayType();
        });
      }
      this.adsOrderStorage =
        storage.get("adsOrderStorage") &&
        JSON.parse(storage.get("adsOrderStorage"));
      if (!this.adsOrderStorage) {
        this.$nextTick(() => {
          this.$refs.countDown.reset();
        });
        this.form = new Form();
        this.form.advertise_id = this.adsInfo.id;
        // 下单1出售 2购买   与1我要买  2我要卖 相反
        this.form.trans_type = this.adsInfo.trans_type === "1" ? "2" : "1";
      }
      storage.set("adsOrderStorage", null);
    }
  },

  methods: {
    getRules() {
      return [
        {
          attr: "trade_num",
          cnName:
            this.adsInfo.trans_type === "2"
              ? i18n.t("mine.ads.pleaseInputSellQuantity")
              : i18n.t("mine.ads.pleaseInputPurchaseQuantity"),
          rules: {
            allowNull: false,
            customHint: true
          }
        },
        {
          attr: "payment_id",
          cnName:
            this.adsInfo.trans_type === "2"
              ? i18n.t("mine.ads.pleaseSelectCollectType")
              : i18n.t("mine.ads.pleaseSelectPayType"),
          rules: {
            allowNull: false,
            customHint: true
          }
        }
      ];
    },
    // 获取系统配置
    getFrmconfig() {
      getFrmconfig().then(res => {
        this.config = res.data;
      });
    },
    // 全部卖出/购买
    handleTradeAll() {
      this.form.trade_num =
        this.adsInfo.trade_num <= this.adsInfo.max_amount
          ? this.adsInfo.trade_num
          : this.adsInfo.max_amount;
    },
    // 获取支付id
    returnSalePayId(id) {
      this.form.payment_id = id;
    },
    showPwdPopup() {
      if (checkRules(this.form, this.getRules())) return;
      const { least_amount, trade_num, max_amount } = this.adsInfo;
      if (
        Number(this.form.trade_num) < Number(least_amount) ||
        Number(this.form.trade_num) > Number(max_amount)
      ) {
        const hint = `${
          this.adsInfo.trans_type === "2"
            ? i18n.t("mine.ads.currectSellQuantity")
            : i18n.t("mine.ads.currectBuyQuantity")
        }${least_amount}-${max_amount}`;
        Toast(hint);
        return;
      }
      if (Number(this.form.trade_num) > Number(trade_num)) {
        Toast(i18n.t("mine.ads.quantityNotEnough"));
        return;
      }
      const orderPrice = BigNumber(this.form.trade_num)
        .times(this.adsInfo.price)
        .toNumber();
      //OTC买广告价格配置,如：6,7 买入最小价格6，最大7
      // 后台配置 发布购买广告最大最小价格
      if (this.config.buy_price_conf && this.adsInfo.trans_type === "1") {
        const arr = this.config.buy_price_conf.split(",");
        const minAmount = arr[0];
        const maxAmount = arr[1];
        if (Number(orderPrice) < Number(minAmount)) {
          Toast(i18n.t("mine.ads.minPriceLessThenSystemMinPrice"));
          return;
        }
        if (Number(orderPrice) > Number(maxAmount)) {
          Toast(i18n.t("mine.ads.maxPriceMaxThenSystemMaxPrice"));
          return;
        }
      }
      //OTC卖广告价格配置,如：6,7 卖出最小价格6，最大7
      // 后台配置 发布出售广告最大最小价格
      if (this.config.sell_price_conf && this.adsInfo.trans_type === "2") {
        const arr = this.config.sell_price_conf.split(",");
        const minAmount = arr[0];
        const maxAmount = arr[1];
        if (Number(orderPrice) < Number(minAmount)) {
          Toast(i18n.t("mine.ads.minPriceLessThenSystemMinPrice"));
          return;
        }
        if (Number(orderPrice) > Number(maxAmount)) {
          Toast(i18n.t("mine.ads.maxPriceMaxThenSystemMaxPrice"));
          return;
        }
      }
      this.showPopup = true;
    },
    returnPwd(pwd) {
      this.form.m_security_pwd = pwd;
      if (checkRules(this.form, this.rules)) return;
      this.toPlaceOrder();
    },
    toPlaceOrder() {
      placeOrder(this.form).then(res => {
        //跳转到订单详情页面
        this.$router.push({
          path: "buyPaymentOrder",
          query: {
            id: res.data
          }
        });
        this.handleClose();
      });
    },
    handleClose() {
      this.$emit("close");
    },
    toAddPayType() {
      this.handleClose();
      setTimeout(() => {
        this.$router.push({
          path: "/collectionType",
          query: { fromOrder: true }
        });
        storage.set(
          "adsOrderStorage",
          JSON.stringify({
            id: this.adsInfo.id,
            trasType: this.adsInfo.trans_type,
            paymentTypes: this.adsInfo.payment_types
          })
        );
      });
    }
  }
};
</script>
<style lang="scss">
.place-order-popup {
  .popup-content {
    padding: 22px 15px;
    overflow: auto;
    position: relative;
    height: calc(100% - 65px);
  }
  .header {
    position: fixed;
    z-index: 2;
    background-color: #f7f6fb;
    width: 100%;
    padding: 23px 15px 9px;
    height: 75px;
    img {
      width: 41px;
      margin-top: -6px;
    }
  }
  .tab {
    margin-top: 65px;
    position: relative;
    .van-tab {
      justify-content: space-between;
      padding: 0;
    }
    .van-tabs__line {
      transform: none !important;
      z-index: 0;
    }
  }
  .trade-transfer {
    position: absolute;
    right: 0;
    top: 5px;
    color: $themeColor;
    img {
      vertical-align: text-bottom;
      width: 16px;
    }
  }
  .quantity.van-cell {
    border: 1px solid #e1e1e1;
    margin-top: 22px;
    border-radius: 4px;
    padding-left: 11px;
    padding-right: 11px;
  }
  .nomal-cell.van-cell {
    padding-left: 0;
    padding-right: 0;
  }
  .nomal-cell {
    .van-cell__title {
      color: #919daa;
    }
    .van-cell:after {
      left: 0;
    }
  }
  .number {
    .van-cell__title {
      width: 20%;
      flex: none;
    }
    .van-cell__value {
      width: 80%;
      flex: none;
    }
  }
  .nomal-cell.price .van-cell__value {
    color: $themeColor;
    font-size: 20px;
  }
  .sell-all-btn {
    padding-left: 21px;
    color: $themeColor;
  }
  .pay-type-title {
    line-height: 24px;
    img {
      vertical-align: text-bottom;
      width: 16px;
    }
  }
  .select-pay-type {
    height: 46px;
    line-height: 46px;
    border-bottom: 1px solid #ebedf0;
    font-size: 14px;
  }
  .add-pay-type {
    margin-top: 15px;
    line-height: 20px;
    height: 20px;
    .van-icon {
      vertical-align: text-bottom;
      color: #c5ced5;
    }
  }

  .bottom-btn {
    position: absolute;
    bottom: 15px;
    left: 15px;
    right: 15px;
    .left,
    .right {
      width: 160px;
    }
    .right {
      margin-left: 25px;
    }
    .van-count-down {
      display: inline-block;
    }
  }
  .gray {
    color: #919daa;
  }
  .theme-color {
    color: $themeColor;
  }
  .gray-border {
    border-bottom: 1px solid #ebedf0;
  }
}
</style>
