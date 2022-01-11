<template>
  <div class="kline-wrapper">
    <div ref="main" class="main-wrapper">
      <div class="kline-header-wrapper">
        <van-row>
          <van-col span="18">
            <van-icon :name="iconBack" @click="onClose" />
            <span style="display: inline-block; margin: 0 10px">|</span>
            <van-icon :name="iconLines" />
            <!-- <span>{{ ticker.dspName }}</span> -->
            <span>CL03A105MQ3CSNC</span>
          </van-col>
          <van-col span="6" class="text-right">
            <van-icon :name="iconWhole" @click="willComing" />
            <van-icon :name="iconShare" @click="willComing" />
          </van-col>
        </van-row>
      </div>
      <van-row class="volume-statistic">
        <van-col span="12">
          <div
            style="font-size: 28px; line-height: 35px"
            :class="ticker.upOrDown == 1 ? 'up' : 'down'"
          >
            {{ Number(ticker.close).toFixed(ticker.pricePrecision) }}
          </div>
          <!-- <div>
            <span class="color-gray">
              ≈
              {{ $n(calPrice(ticker.close), "currency") }}
            </span>
            <span :class="upOrDown"> {{ percent }}%</span>
          </div> -->
          <div style="font-size: 18px; line-height: 35px">
            <span class="color-gray"> ≈ </span>
            <span class="down"> 5.32%</span>
          </div>
        </van-col>
        <van-col span="12" class="text-right statistic-datas">
          <van-row>
            <van-col span="16" class="span-name text-right"
              >{{ $t("trade.kline.high") }}：</van-col
            >
            <van-col span="8">{{
              Number(ticker.high).toFixed(ticker.pricePrecision)
            }}</van-col>
          </van-row>
          <van-row>
            <van-col span="16" class="span-name text-right"
              >{{ $t("trade.kline.low") }}：</van-col
            >
            <van-col span="8">{{
              Number(ticker.low).toFixed(ticker.pricePrecision)
            }}</van-col>
          </van-row>
          <van-row>
            <van-col span="16" class="span-name text-right"
              >{{ $t("trade.kline.24HourVolume") }}：</van-col
            >
            <van-col span="8">{{ ticker.volume }}</van-col>
          </van-row>
        </van-col>
      </van-row>
      <div class="type-list">
        <!-- 
        <div
          class="type-item"
          :class="{ active: real }"
          @click="switchRealTime"
        >
          {{ $t("trade.kline.timeSharing") + type }}
        </div>
        -->
        <template v-for="t in typeList">
          <div
            class="type-item"
            :class="{ active: t[0] == type }"
            :key="t[0]"
            @click="switchType(t[0])"
          >
            {{ t[1] }}
          </div>
        </template>
      </div>
    </div>

    <div class="content">
      <!-- 移动端 -->

      <s-tradingview
        :marketName="marketName"
        :marketId="marketId"
        :wsUrl="wsUrl"
        :decimal="decimal"
        class="tradingviewView"
      />
    </div>

    <van-tabs v-model="activeName" class="van-tabs-wrapper">
      <van-tab
        :title="$t('trade.kline.consignorOrders')"
        name="orders"
      ></van-tab>
      <!-- <van-tab :title="$t('trade.kline.transactions')" name="history"></van-tab> -->
      <van-tab :title="$t('trade.kline.synopsis')" name="intro"></van-tab>
    </van-tabs>
    <div v-if="activeName === 'orders'" class="orders-wrapper">
      <van-row class="order-header">
        <van-col span="3" class="text-center">
          {{ $t("trade.kline.buyOrder") }}
        </van-col>
        <van-col span="5">
          {{ $t("trade.kline.quantity") }}({{ ticker.baseCurrencyName }})
        </van-col>
        <van-col span="8" class="text-center">
          {{ $t("trade.kline.price") }}(元)
        </van-col>
        <van-col span="5" class="text-right">
          {{ $t("trade.kline.quantity") }}({{ ticker.baseCurrencyName }})
        </van-col>
        <van-col span="3" class="text-center">
          {{ $t("trade.kline.sellOrder") }}
        </van-col>
      </van-row>
      <van-row
        v-if="
          (depth.asks && depth.asks.length) || (depth.bids && depth.bids.length)
        "
        gutter="10"
      >
        <van-col span="12">
          <van-row
            v-for="(dep, index) in depth.bids"
            :key="index"
            class="buyer-wrapper"
            gutter="10"
          >
            <div v-if="index < 20">
              <van-col span="6" class="text-center" style="color: #c0bfd6">
                {{ index + 1 }}
              </van-col>
              <van-col span="10" style="color: #fff"> {{ dep[1] }} </van-col>
              <van-col span="8" class="text-right">
                {{ dep[0] }}
              </van-col>
            </div>
          </van-row>
        </van-col>
        <van-col span="12">
          <van-row
            v-for="(dep, index) in depth.asks"
            :key="index"
            class="seller-wrapper"
            gutter="10"
          >
            <div v-if="index < 20">
              <van-col span="8"> {{ dep[0] }} </van-col>
              <van-col span="10" class="text-right" style="color: #fff">
                {{ dep[1] }}
              </van-col>
              <van-col span="6" class="text-center" style="color: #c0bfd6">
                {{ index + 1 }}
              </van-col>
            </div>
          </van-row>
        </van-col>
      </van-row>
      <div v-else class="nodata text-center">
        {{ $t("trade.kline.noData") }}
      </div>
    </div>
    <div v-if="activeName === 'history'" class="history-wrapper">
      <van-row class="order-header" style="padding: 0 10px">
        <van-col span="6">
          {{ $t("trade.kline.time") }}
        </van-col>
        <van-col span="6">
          {{ $t("trade.kline.direction") }}
        </van-col>
        <van-col span="6" class="text-center">
          {{ $t("trade.kline.price") }}(USDT)
        </van-col>
        <van-col span="6" class="text-right">
          {{ $t("trade.kline.quantity") }}({{ ticker.baseCurrencyName }})
        </van-col>
      </van-row>
      <div v-if="trades.length">
        <van-row
          v-for="(trade, index) in trades"
          :key="index"
          class="trades-wrapper"
          gutter="10"
        >
          <van-col span="5">
            {{ $d(new Date(trade.timestamp), "timeOnly") }}
          </van-col>
          <van-col
            span="5"
            :class="trade.taker === 'buy' ? 'color-green' : 'color-red'"
          >
            {{
              trade.taker === "buy"
                ? $t("trade.kline.buy")
                : $t("trade.kline.sell")
            }}
          </van-col>
          <van-col span="7" class="text-right">
            {{ $n(trade.price, "maximumSignificantDigits8") }}
          </van-col>
          <van-col span="7" class="text-right">
            {{ $n(trade.volume, "maximumSignificantDigits4") }}
          </van-col>
        </van-row>
      </div>
      <div v-else class="nodata text-center">
        {{ $t("trade.kline.noData") }}
      </div>
    </div>
    <div v-if="activeName === 'intro'" class="intros-wrapper">
      <div class="title">{{ intros.currency || "-" }}</div>
      <van-row>
        <van-col span="12" class="gray">{{
          $t("trade.kline.publishTime")
        }}</van-col>
        <van-col span="12">{{ intros.publishTime || "-" }}</van-col>
        <van-col span="12" class="gray">{{
          $t("trade.kline.publishQuantity")
        }}</van-col>
        <van-col span="12">{{ intros.publishQuantity || "-" }}</van-col>
        <van-col span="12" class="gray">{{
          $t("trade.kline.circulateQuantity")
        }}</van-col>
        <van-col span="12">{{ intros.circulateQuantity || "-" }}</van-col>
        <van-col span="12" class="gray">{{
          $t("trade.kline.material")
        }}</van-col>
        <van-col span="12">{{ intros.material || "-" }}</van-col>
        <van-col span="12" class="gray">{{
          $t("trade.kline.package")
        }}</van-col>
        <van-col span="12">{{ intros.package || "-" }}</van-col>
        <van-col span="12" class="gray">{{
          $t("trade.kline.circulation")
        }}</van-col>
        <van-col span="12">{{ intros.circulation || "-" }}</van-col>
        <van-col span="12" class="gray">{{
          $t("trade.kline.circulationMarketValue")
        }}</van-col>
        <van-col span="12">{{ intros.circulationMarketValue || "-" }}</van-col>
      </van-row>
      <!-- <div class="title" style="margin-top: 20px">
        {{ $t("trade.kline.synopsis") }}
      </div> -->
      <div class="intros-summary">{{ intros[`desc_${$i18n.locale}`] }}</div>
    </div>
    <div v-else class="btns" ref="btns">
      <van-row>
        <van-col span="8">
          <div
            class="btn bg-up"
            @click="toTrade('buy')"
            v-text="$t('trade.kline.buy')"
          ></div>
        </van-col>
        <van-col span="8">
          <div
            class="btn bg-down"
            @click="toTrade('sell')"
            v-text="$t('trade.kline.sell')"
          ></div>
        </van-col>
        <van-col class="notice-bell" span="4" @click="willComing">
          <van-icon size="20" :name="iconBell" />
          <p class="color-gray">{{ $t("trade.kline.remind") }}</p>
        </van-col>
        <van-col class="notice-bell" span="4" @click="willComing">
          <van-icon size="20" :name="iconCollect" />
          <p class="color-gray">{{ $t("trade.kline.collect") }}</p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import iconBack from "@/assets/icons/k_back.svg";
import iconLines from "@/assets/icons/k_lines.svg";
import iconShare from "@/assets/icons/k_share.svg";
import iconWhole from "@/assets/icons/k_whole_screen.svg";
import iconCollect from "@/assets/icons/k_collection.svg";
import iconBell from "@/assets/icons/k_bear.svg";
import BigNumber from "bignumber.js";
import { getTicker, currencyIntroduce } from "@/http/modules/market.js";
import {
  Toast,
  Icon as VanIcon,
  Col as VanCol,
  Row as VanRow,
  Tab as VanTab,
  Tabs as VanTabs,
} from "vant";
import i18n from "@/langs";
import { mapState, mapMutations, mapActions } from "vuex";
import sTradingview from "@/components/sTradingview/sTradingview";

export default {
  name: "TradingView",
  data() {
    return {
      marketId: this.$route.query.marketId,
      marketName: this.$route.query.marketName,
      decimal: this.$route.query.decimal,
      wsUrl: "wss://api.huobipro.com/ws",

      ticker: {
        close: 4.9,
        high: 5.1,
        low: 4.1,
        volume: "60000K",
        pricePrecision: 3,
        baseCurrencyName: "KPCS",
      },
      depth: {
        asks: [
          [4.9, 10],
          [4.9, 100],
          [5.0, 50],
          [5.1, 600],
          [5.1, 600],
          [5.0, 60],
          [4.9, 6000],
          [4.8, 6000],
          [4.7, 12000],
          [4.6, 24000],
          [4.5, 100],
          [4.5, 50],
          [4.4, 600],
          [4.3, 600],
          [4.4, 6000],
          [4.3, 6000],
          [4.2, 12000],
          [4.1, 100],
          [4.1, 200],
          [4.1, 600],
        ],
        bids: [
          [4.9, 10],
          [4.9, 100],
          [5.0, 50],
          [5.1, 600],
          [5.1, 600],
          [5.0, 60],
          [4.9, 6000],
          [4.8, 6000],
          [4.7, 12000],
          [4.6, 24000],
          [4.5, 100],
          [4.5, 50],
          [4.4, 600],
          [4.3, 600],
          [4.4, 6000],
          [4.3, 6000],
          [4.2, 12000],
          [4.1, 100],
          [4.1, 200],
          [4.1, 600],
        ],
      },
      intros: {
        currency: "CL03A105MQ3CSNC",
        publishTime: 2021,
        publishQuantity: "三星",
        circulateQuantity: "0.3T",
        material: "X5R",
        package: "10,000PCS",
        circulation: "180,000,000PCS",
        circulationMarketValue: "882,000",
      },
      loading: true,
      // 委托订单栏激活选项
      activeName: "",

      iconBack,
      iconLines,
      iconShare,
      iconWhole,
      iconCollect,
      iconBell,
    };
  },
  components: {
    VanRow,
    VanCol,
    VanIcon,
    VanTab,
    VanTabs,
    sTradingview,
  },
  methods: {
    onClose: function () {
      this.$router.go(-1);
    },

    toTrade: function (tradeType) {
      this.$router.push("trade");
    },
    willComing: function () {
      Toast(this.$t("common.pleaseExpected"));
      return;
    },
    showMoreBox: function () {
      this.showMore = !this.showMore;
    },
  },
};
</script>
<style lang="scss" scoped>
.tradingviewView {
  height: 50vh;
  width: 100vw;
}

.kline-wrapper {
  background: #131e30;
  width: 100%;
  height: 100%;
  padding-bottom: 90px;
  overflow-y: auto;
}
.main-wrapper {
  background: #131e30;
}
.kline-header-wrapper {
  line-height: 30px;
  padding-left: 10px;
  color: #bccdde;
  font-size: 18px;
  .van-icon {
    vertical-align: middle;
  }
  span {
    vertical-align: middle;
    margin-left: 5px;
  }
  .text-right {
    .van-icon {
      padding: 0 10px;
    }
  }
}

.volume-statistic {
  padding: 10px 15px;
  font-size: 14px;
  color: #fff;

  > .van-col {
    padding: 10px 0;
  }
  .span-name {
    color: #a6a9d8;
  }
  .statistic-datas {
    .van-col {
      padding: 5px 0;
    }
  }
}

.type-list {
  display: flex;
  position: relative;
}
.type-list .type-item,
.type-list .deep-box {
  color: #6c88a8;
  font-size: 13px;
  text-align: center;
  margin-bottom: 6px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  position: relative;
}
.type-list .type-item {
  flex: 1;
}
.type-list .deep-box {
  width: 100px;
}
.type-list .more-box {
  position: absolute;
  bottom: 0;
  z-index: 9;
  padding: 15px 6px;
  background: #071724;
  display: flex;
  width: 100%;
  bottom: -60px;
}
.more-box .item-box {
  flex: 1;
  background: #172941;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #6c88a8;
  margin: 0 6px;
}
.split-icon {
  display: inline-block;
  padding: 0 6px;
}

.type-list .type-item.active {
  border-bottom: 2px solid #0162e4;
}

.type-list .type-item.more-active {
  color: #fff;
}

.type-list .type-item.more-item::after {
  content: "";
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0;
  position: absolute;
  right: 5px;
  bottom: 9px;
  border-width: 6px 6px 0 0;
  border-style: solid;
  border-color: transparent #fff transparent transparent;
}

.sk-wave {
  position: absolute;
  top: 30%;
  width: 100%;
  height: 20px;
  margin: auto;
  text-align: center;
}

.sk-wave .sk-item {
  margin: 0 2px;
  width: 8px;
  height: 100%;
  display: inline-block;
  background-color: #337ab7;
  -webkit-animation: cc 1.5s infinite;
  animation: cc 1.5s infinite;
}

@-webkit-keyframes cc {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
  20% {
    -webkit-transform: scaleY(2);
    transform: scaleY(2);
  }
}

@keyframes cc {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
  20% {
    -webkit-transform: scaleY(2);
    transform: scaleY(2);
  }
}

.up {
  color: #15b886;
}

.down {
  color: #fa5352;
}

.btns {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 70px;
  font-size: 14px;
  z-index: 999;
  padding: 10px 0;
  background-color: #172b46;
}

.btns .btn {
  width: 96%;
  height: 42px;
  line-height: 42px;
  color: #fff;
  text-align: center;
  display: inline-block;
  border-radius: 5px;
  margin: 4px 2%;
}

.btns .btn.bg-up {
  background-color: #0dab91;
}

.btns .btn.bg-down {
  background-color: #d04b63;
}
::v-deep.van-tabs-wrapper {
  border-bottom: solid 1px #1e2a3f;
  .van-tabs__nav {
    background-color: #131e30;
  }
  .van-tab {
    color: #7fa0c1;
  }
  .van-tab--active {
    color: #1a89ff;
    font-weight: 500;
  }
  .van-tabs__line {
    z-index: 1;
    width: 33%;
    height: 2px;
    background-color: #1a89ff;
  }
}
.order-header {
  line-height: 40px;
  color: #4a6588;
  font-size: 12px;
}
.nodata {
  line-height: 40px;
  color: #c3c9d2;
}
.buyer-wrapper {
  color: #35efcd;
  font-size: 14px;
  .van-col {
    line-height: 18px;
  }
}
.seller-wrapper {
  color: #f56161;
  font-size: 14px;
  .van-col {
    line-height: 18px;
  }
}
.color-green {
  color: #35efcd;
}
.color-red {
  color: #f56161;
}
.color-gray {
  color: #6f89a9;
}
.trades-wrapper {
  color: #fff;
  padding: 0 10px;
  .van-col {
    line-height: 18px;
  }
}
.intros-wrapper {
  color: #dadada;
  padding: 0 10px;
  .title {
    font-size: 20px;
    font-weight: bold;
    line-height: 50px;
    border-bottom: 1px solid #000;
  }
  .van-row {
    .gray {
      color: #c3c9d2;
    }
    .van-col {
      padding: 5px 0;
      line-height: 1rem;
      border-bottom: 1px solid #000;
    }
  }
  .intros-summary {
    line-height: 20px;
    font-size: 14px;
  }
}
.chart-blocker {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 50px;
  background-color: #101928;
}
.notice-bell {
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
}
</style>

