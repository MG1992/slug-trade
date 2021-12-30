/* eslint-disable vue/no-template-key */
/* eslint-disable vue/no-template-key */
<template>
  <div class="wrapper header-page">
    <div class="header-box">
      <div class="tab-box">
        <div class="item active">
          {{ $t("trade.trade.header1") }}
        </div>
        <div class="item" @click="HandleHeaderClik">
          {{ $t("trade.trade.header2") }}
        </div>
        <div class="item" @click="HandleHeaderClik">
          {{ $t("trade.trade.header3") }}
        </div>
      </div>
      <div class="nav">
        <div class="text-left" @click="slideShow = true">
          <van-icon :name="openlist" />
          <span>
            {{ ticker.baseCurrencyName }} / {{ ticker.quoteCurrencyName }}
          </span>
          <span class="tips" :class="{ down: allUpAndDownIsDown }">
            {{ !allUpAndDownIsDown ? "+" : "" }}{{ ticker.allUpAndDown }}
          </span>
        </div>
        <div class="text-right">
          <span class="multiple-box item" @click="HandleHeaderClik"> 1X </span>
          <van-icon class="item" :name="KlineIcon" size="21" @click="toKLine" />
          <van-icon
            class="item"
            :name="exchangeCompared"
            size="21"
            @click="HandleHeaderClik"
          />
          <van-icon
            class="item"
            :name="moreIcon"
            size="21"
            @click="HandleHeaderClik"
          />
        </div>
      </div>
    </div>

    <div class="content">
      <div class="content-left" :class="{ down: tradeType == 'sell' }">
        <!-- 买入，卖出切换 -->
        <div class="tab">
          <div
            class="tab-item buy"
            :class="{ active: tradeType == 'buy' }"
            @click="switchTradeType('buy')"
          >
            {{ $t("trade.trade.buy") }}
          </div>
          <div
            class="tab-item sell"
            :class="{ active: tradeType == 'sell' }"
            @click="switchTradeType('sell')"
          >
            {{ $t("trade.trade.sell") }}
          </div>
        </div>

        <div
          class="dropdown-box"
          :class="{ active: isShowDropdown }"
          @click="isShowDropdown = true"
        >
          <div class="left black-blod">{{ dropdownTxt }}</div>
          <div class="right"></div>
          <div class="dropdown-list" @click.stop="isShowDropdown = false">
            <div
              class="dropdown-list-item"
              :class="{ active: dropdownTxt == item.name }"
              v-for="(item, index) in priceTypeArray"
              :key="index"
              @click="HandlerSwitchPriceType(item)"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="dropdown-bg" @click.stop="isShowDropdown = false"></div>
        </div>

        <!-- 输入价格 -->
        <div class="price-content" v-if="priceType.value !== 'market'">
          <div class="price-box">
            <div class="input">
              <input
                type="number"
                :value="price"
                @input="SET_STATE_STR(['price', $event.target.value])"
                :placeholder="$t('trade.trade.priceInputPlaceholder')"
              />
            </div>
            <div class="count-box sub" @click="changeValue('price', '-')">
              <van-icon :name="subIcon" size="14" />
            </div>
            <div class="count-box add" @click="changeValue('price', '+')">
              <van-icon :name="addIcon" size="14" />
            </div>
          </div>
          <div class="price-tips">
            ≈{{ $n(price * USDTtoCNY, "maximumSignificantDigits4") }} CNY
          </div>
        </div>
        <div class="price-content" v-else>
          <div class="price-box">
            <div class="input">{{ $t("trade.trade.minPrice") }}</div>
          </div>
        </div>

        <!-- 输入数量 -->
        <div class="number-content">
          <div class="number-box">
            <div class="input">
              <input
                type="number"
                :value="volume"
                @input="SET_STATE_STR(['volume', $event.target.value])"
                :placeholder="
                  $t(
                    `trade.trade.${!isMarketBuy ? 'tradeInputNum' : 'tradeNum'}`
                  )
                "
              />
            </div>
            <div>
              {{
                isMarketBuy ? ticker.quoteCurrencyName : ticker.baseCurrencyName
              }}
            </div>
          </div>
        </div>
        <div class="tips-box">
          <div>{{ $t("trade.trade.numberTips") }}</div>
          <div class="flexCenter">
            {{ canUseAccount }}
            <van-icon
              class="ml5"
              @click="initData"
              :name="changeBlueIcon"
              size="12"
            />
          </div>
        </div>

        <!-- 比例选择 -->
        <div class="slider-box">
          <div class="item-box">
            <template v-for="(item, index) in amountTypeArray">
              <div
                class="item"
                :key="'item' + index"
                :class="{ active: item <= amountPercent, isBuy: isBuy }"
              ></div>
              <div
                class="line"
                :key="'line' + index"
                v-if="index !== amountTypeArray.length - 1"
                :class="{ active: item < amountPercent, isBuy: isBuy }"
              ></div>
            </template>
          </div>
          <van-slider v-model="amountPercent" :min="0" :step="20" :max="100">
            <template #button>
              <van-icon :name="sliderIcon" size="28" />
            </template>
          </van-slider>
        </div>
        <div class="tips-box">
          <div>0</div>
          <div class="flexCenter">{{ maxExchangeNum }}</div>
        </div>

        <div class="trade-value">
          {{ $t("trade.trade.tradeNum") }}
          <span v-if="priceType.value == 'market' && tradeType == 'sell'">
            -- -- {{ ticker.quoteCurrencyName }}
          </span>
          <span v-else>
            {{ totalAccount.toFixed(ticker.pricePrecision) }}
            {{ ticker.quoteCurrencyName }}
          </span>
        </div>
        <!-- 买入卖出按钮 -->
        <van-button class="buy-btn" @click="sale">{{
          $t(`trade.trade.${tradeType}`)
        }}</van-button>
      </div>

      <div class="content-right">
        <div class="title">
          <div>{{ $t("trade.trade.price") }}</div>
          <div class="text-right">{{ $t("trade.trade.number") }}</div>
        </div>
        <!-- 右侧数据栏 -->
        <div class="line-box">
          <div
            class="line-row"
            v-for="(value, index) in getDepthAsks"
            :key="index"
            @click="SET_STATE_STR(['price', value[0] ? value[0] : 0])"
          >
            <div class="line-left">
              {{ value[0] ? value[0].toFixed(ticker.pricePrecision) : "--" }}
            </div>
            <div class="line-right">{{ value[1] || "--" }}</div>
            <div class="line-bg" :style="bgStyle(value[1], 'asks')"></div>
          </div>
        </div>

        <div class="price-num">
          {{ $n(ticker.close, "maximumSignificantDigits4") }}
        </div>
        <div class="price-num-tips">
          ≈{{ $n(USDTtoCNY * ticker.close, "maximumSignificantDigits2") }}
          CNY
        </div>

        <div class="line-box down">
          <div
            class="line-row"
            v-for="(value, index) in getDepthBids"
            :key="index"
            @click="SET_STATE_STR(['price', value[0] ? value[0] : 0])"
          >
            <div class="line-left">
              {{ value[0] ? value[0].toFixed(ticker.pricePrecision) : "--" }}
            </div>
            <div class="line-right">{{ value[1] || "--" }}</div>
            <div class="line-bg" :style="bgStyle(value[1], 'bids')"></div>
          </div>
        </div>

        <div class="shendu-box">
          <div class="dropdown-box" @click="isShowMultiplePop = true">
            <div class="left">{{ $t("trade.trade.depth") }}1</div>
            <div class="right"></div>
          </div>
          <van-icon
            class="right-icon"
            :name="chooseIcon"
            size="26"
            @click="HandleHeaderClik"
          />
        </div>
      </div>
    </div>

    <!-- 当前委托&历史记录 -->
    <div class="entrust-now">
      <div class="entrust-nav">
        <div class="entrust-nav-left">
          <div class="item active">
            {{ $t("trade.trade.entrustNow") }}
          </div>
          <div class="item" @click="HandleHeaderClik">
            {{ $t("trade.trade.entrustPlan") }}
          </div>
        </div>
        <div class="entrust-nav-right" @click="toOrderList">
          <van-icon class="entrust-nav-right-icon" :name="history" size="14" />
          {{ $t("trade.trade.history") }}
        </div>
      </div>

      <div
        class="entrust-item"
        v-for="(order, index) in showOrder"
        :key="index"
      >
        <div class="entrust-item-nav">
          <div
            class="entrust-item-nav-left"
            :class="{
              'text-red': order.o_type == 'sell',
              'text-green': order.o_type == 'buy',
            }"
          >
            {{ $t(`trade.trade.${order.o_type}`) }}
            <span>{{ order.create_time }}</span>
          </div>
          <div class="entrust-item-nav-right" @click="HandleCancel(order)">
            {{ $t("trade.trade.revoke") }}
          </div>
        </div>
        <div class="row margin-top20">
          <div class="text-left">{{ $t("trade.trade.price") }}(USDT)</div>
          <div class="text-center">
            {{ $t("trade.trade.number") }}({{ order.base_currency }})
          </div>
          <div class="text-right">
            {{ $t("trade.trade.ActualTransaction") }}({{ order.base_currency }})
          </div>
        </div>
        <div class="row val margin-top10">
          <div class="text-left">{{ order.price }}</div>
          <div class="text-center">{{ order.volume }}</div>
          <div class="text-right">{{ order.done_volume }}</div>
        </div>
        <!-- <div class="row margin-top20">
          <div class="text-left">{{ $t("trade.trade.time") }}</div>
          <div class="text-center">{{ $t("trade.trade.listPrice") }}(USDT)</div>
          <div class="text-right">
            {{ $t("trade.trade.listNum") }}({{ order.base_currency }})
          </div>
        </div>
        <div class="row val margin-top10">
          <div class="text-left">{{ order.create_time }}</div>
          <div class="text-center">{{ order.price }}</div>
          <div class="text-right">{{ order.volume }}</div>
        </div>
        <div class="row margin-top20">
          <div class="text-left">{{ $t("trade.trade.dealTotal") }}(USDT)</div>
          <div class="text-center">{{ $t("trade.trade.dealPrice") }}(USDT)</div>
          <div class="text-right">
            {{ $t("trade.trade.dealNum") }}({{ order.base_currency }})
          </div>
        </div>
        <div class="row val margin-top10">
          <div class="text-left">{{ order.done_amount }}</div>
          <div class="text-center">{{ order.done_avg_price }}</div>
          <div class="text-right">{{ order.done_volume }}</div>
        </div> -->
      </div>

      <div class="not-orders" v-if="orders.length === 0">
        <img class="img" :src="empty_icon" />
        <p>{{ $t("requestResponse.NO_DATA") }}</p>
      </div>
    </div>

    <transition name="fade">
      <div class="modal" v-show="slideShow" @click="slideShow = false"></div>
    </transition>
    <!-- 侧边栏 -->
    <transition name="slide">
      <div class="search-box" v-show="slideShow">
        <!-- 返回按钮 -->
        <div class="search-back" @click="slideShow = false">
          <van-icon name="arrow-left" size="16" />
        </div>
        <!-- 搜索框 -->
        <div class="search-input">
          <van-icon name="search" size="16" />
          <input
            type="text"
            :placeholder="$t('trade.trade.searchPlaceHolder')"
            v-model="searchText"
          />
        </div>
        <!-- 详情 -->
        <div class="search-content">
          <div class="row text-gary">
            <div>{{ $t("trade.trade.searchTransaction") }}</div>
            <div class="text-center">{{ $t("trade.trade.searchPrice") }}</div>
            <div class="text-center">
              {{ $t("trade.trade.searchtradeNum") }}
            </div>
            <div class="text-center">{{ $t("trade.trade.searchStatus") }}</div>
          </div>
          <div
            class="row"
            v-for="(ticker, index) in filterTickers"
            :key="index"
            @click="toTrade(ticker)"
          >
            <div>
              {{ ticker.baseCurrencyName }}/{{ ticker.quoteCurrencyName }}
            </div>
            <div class="text-center">
              {{ ticker.close.toFixed(ticker.pricePrecision) }}
            </div>
            <div class="text-center">
              {{ ticker.amount.toFixed(ticker.pricePrecision) }}
            </div>
            <div class="text-center">{{ getPercentText(ticker) }}%</div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 挂单深度弹框 -->
    <ActionSheet
      v-model="isShowMultiplePop"
      :actions="multipleActions"
      :cancel-text="$t('common.cancel')"
      close-on-click-action
    />
  </div>
</template>
<script>
import {
  Toast,
  Icon as VanIcon,
  Button as VanButton,
  ActionSheet,
  Slider as VanSlider,
} from "vant";
import {
  getFees,
  postSale,
  deleteOrder,
  getUSDTtoCNY,
} from "@/http/modules/trade";
import { getAllticker } from "@/http/modules/wallet";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("trade");

import empty_icon from "@/assets/icons/empty_icon.png";
import openlist from "@/assets/icons/openlist.png";
import moreIcon from "@/assets/icons/moreIcon.png";
import changeBlueIcon from "@/assets/icons/changeBlueIcon.png";
import chooseIcon from "@/assets/icons/chooseIcon.png";
import sliderBuy from "@/assets/icons/trade_slider_buy.png";
import sliderSell from "@/assets/icons/trade_slider_sell.png";
import exchangeCompared from "@/assets/icons/exchange_compared.png";
import KlineIcon from "@/assets/icons/KlineIcon.png";
import history from "@/assets/icons/history.png";
import addIcon from "@/assets/icons/add.png";
import subIcon from "@/assets/icons/sub.png";

export default {
  name: "trade",
  components: {
    VanIcon,
    VanButton,
    ActionSheet,
    VanSlider,
  },
  data() {
    return {
      addIcon,
      subIcon,
      openlist,
      history,
      exchangeCompared,
      empty_icon,
      moreIcon,
      changeBlueIcon,
      chooseIcon,
      KlineIcon,
      slideShow: false, //左侧边栏开关
      fees: [], // 手续费
      depth: {}, // 买卖盘
      trades: [], // 成交记录
      showTradeRecords: false, // 显示历史成交列表
      need_fund_pwd: false,
      searchText: "",

      isShowMultiplePop: false,
      multipleActions: [{ name: "1" }],
      isShowDropdown: false,
      dropdownTxt: "",
      tickersMap: "",
      cnyOwnMenoy: "",
      usdtOwnMenoy: "",
      btcOwnmenoy: "",
      USDTtoCNY: 7,
      amountPercent: 0,
    };
  },
  created() {
    Toast.loading({
      message: this.$t("requestResponse.LOADING"),
    });
  },
  activated() {
    if (this.$route.params && this.$route.params.symbol) {
      this.SET_SYMBOL(this.$route.params.symbol);
    }

    this.HandlerSwitchPriceType(this.priceTypeArray[0]);

    this.refreshUserData();
    setInterval(() => {
      this.refreshUserData();
    }, 50000);

    this.getInfo();

    this.getTickers().then(() => {
      this.switchTradeType("buy");
    });
    this.refreshWsDatas();
    this.initData();
  },
  watch: {
    amountPercent(val) {
      if (val === 0) {
        this.switchAmountType(0);
      } else {
        this.switchAmountType(val / 100);
      }
    },
    price(nVal, oVal) {
      this.watchNumx(nVal, oVal, "price", this.ticker.pricePrecision);
    },
    volume(nVal, oVal) {
      this.watchNumx(nVal, oVal, "volume", this.ticker.volumePrecision);
    },
    showTradeRecords() {
      var position = this.showTradeRecords ? "fixed" : "static";
      document.body.style.position = position;
    },
    msgData(res) {
      let nVal = res.data;
      let key = res.key;
      if (nVal && nVal.asks && nVal.bids && nVal.symbol === this.symbol) {
        this.depth = nVal;

        if (this.tradeChange) {
          this.SET_STATE({ tradeChange: false });
          this.switchTradeType(this.tradeType);
        }
      } else if (nVal && nVal.trades) {
        this.trades = nVal.trades;
      }

      if (key === "tickers") {
        let tickers = Object.values(nVal);
        for (let i in tickers) {
          let close = Number(tickers[i].close);
          let open = Number(tickers[i].open);
          let allUpAndDown = (((close - open) / open) * 100).toFixed(2);
          tickers[i].allUpAndDown = isNaN(allUpAndDown)
            ? "0%"
            : allUpAndDown + "%";
        }
        tickers = tickers.sort(function (l, r) {
          return l.symbol > r.symbol ? 1 : -1;
        });
        this.SET_STATE({
          tickers,
        });
      }
    },
    USDTtoCNY() {
      getAllticker().then((res) => {
        this.tickersMap = res.data;
        this.ownBanace();
      });
    },
    accounts() {
      getAllticker().then((res) => {
        this.tickersMap = res.data;
        this.ownBanace();
      });
    },
  },
  computed: {
    ...mapState([
      "symbol",
      "accounts",
      "orders",
      "tickers",
      "tradeType",
      "amountType",
      "price",
      "volume",
      "pwd",
      "priceType",
      "tradeChange",
      "toHuoBMarket",
      "HuoBTradePairsArr",
      "msgData",
      "currencys",
    ]),
    // 数量输入框显示金额
    isMarketBuy() {
      return this.isBuy && this.priceType.value == "market";
    },
    // 当前交易对
    sliderIcon() {
      if (this.isBuy) {
        return sliderBuy;
      }
      return sliderSell;
    },
    ticker() {
      var filterTickers = this.tickers.filter((value) => {
        if (this.symbol) {
          return value.symbol == this.symbol;
        } else {
          return value.symbol == "BTC/USDT";
        }
      });
      if (filterTickers.length > 0) {
        return filterTickers[0];
      } else {
        return filterTickers;
      }
    },
    allUpAndDownIsDown() {
      if (this.ticker && this.ticker.allUpAndDown) {
        return this.ticker.allUpAndDown.indexOf("-") > -1;
      }
      return false;
    },
    filterTickers() {
      if (this.searchText) {
        var searchText = this.searchText.toLowerCase();
        return this.tickers.filter(
          (value) => value.symbol.toLowerCase().indexOf(searchText) > -1
        );
      } else {
        return this.tickers.filter((value) => value.areaId == 1);
      }
    },
    // 当前交易对手续费
    ticker_fee() {
      for (var i in this.fees) {
        if (this.fees[i].dsp_name == this.ticker.dspName) {
          var fee = this.fees[i];
          return this.isBuy ? fee.maker_fee + "%" : fee.taker_fee + "%";
        }
      }
      return "0%";
    },
    // 买入 卖出 枚举
    tradeTypeArray() {
      return [
        {
          name: "BUY",
          value: "buy",
        },
        {
          name: "SELL",
          value: "sell",
        },
      ];
    },
    // 限价 市场价 枚举
    priceTypeArray() {
      return [
        {
          name: this.$t("trade.trade.limitOrder"),
          value: "limit",
        },
        {
          name: this.$t("trade.trade.tradeOrder"),
          value: "market",
        },
      ];
    },
    // 25% 50% 75% 100% 枚举
    amountTypeArray() {
      return [0, 20, 40, 60, 80, 100];
    },
    // 是否选择了限价
    isLimit() {
      return this.priceType.value == "limit";
    },
    // 是否选择了买入
    isBuy() {
      return this.tradeType == "buy";
    },
    // 当前可用余额
    canUseAccount() {
      var checkCurrency = this.isBuy
        ? this.ticker.quoteCurrencyName
        : this.ticker.baseCurrencyName;

      for (var i in this.accounts) {
        if (this.accounts[i].currency == checkCurrency) {
          return (
            this.$n(
              this.accounts[i].available_balance,
              "maximumSignificantDigits4"
            ) + checkCurrency
          );
        }
      }
      return 0;
    },
    // 最大转换量
    maxExchangeNum() {
      if (this.priceType.value == "market") {
        return this.canUseAccount;
      }

      var checkCurrency = this.isBuy
        ? this.ticker.quoteCurrencyName
        : this.ticker.baseCurrencyName;

      let price = this.price;
      if (!price || price == 0) return 0 + this.ticker.baseCurrencyName;
      if (this.isBuy) {
        for (var i in this.accounts) {
          if (this.accounts[i].currency == checkCurrency) {
            return (
              this.$n(
                this.accounts[i].available_balance / price,
                "maximumSignificantDigits4"
              ) + this.ticker.baseCurrencyName
            );
          }
        }
      } else {
        return this.canUseAccount;
      }
      return 0;
    },
    // 当前交易额
    totalAccount() {
      if (this.volume && this.volume > 0) {
        if (this.isLimit) {
          return (this.price || 0) * this.volume;
        } else {
          return +this.volume;
        }
      } else {
        return 0;
      }
    },
    // 显示的当前委托
    showOrder() {
      return this.orders.filter(
        (item) =>
          item.o_status === "watting" || item.o_status === "partial-done"
      );
    },
    getDepthAsks() {
      let asks_bids = this.depth.asks;
      if (asks_bids) {
        var arr = [];
        if (asks_bids.length >= 5) {
          arr = asks_bids.slice(0, 5);
        } else {
          for (var i = 0; i < 5; i++) {
            arr.push(asks_bids[i] || []);
          }
        }
        return arr.reverse();
      }
      return [[], [], [], [], []];
    },
    getDepthBids() {
      let asks_bids = this.depth.bids;
      if (asks_bids) {
        var arr = [];
        if (asks_bids.length >= 5) {
          arr = asks_bids.slice(0, 5);
        } else {
          for (var i = 0; i < 5; i++) {
            arr.push(asks_bids[i] || []);
          }
        }
        return arr;
      }
      return [[], [], [], [], []];
    },
  },
  methods: {
    ...mapActions([
      "refreshUserData",
      "evtReloadAllTicker",
      "getTickers",
      "evtRefreshTrade",
      "refreshWsDatas",
      "sendSocketMsg",
    ]),
    ...mapMutations(["SET_SYMBOL", "SET_STATE", "SET_STATE_STR"]),
    // 初始化账户数据
    initData() {
      getUSDTtoCNY().then((res) => {
        this.USDTtoCNY = res.data.USDTCNY;
      });
    },
    ownBanace() {
      let BTCToUSDT = 7533;
      let ETHToUSDT = 419;
      // let USDTToUSDT = 1;
      let usdToCny = this.USDTtoCNY;
      // conversion.getTotalBanace(accountsLst,result.data,usdToCny)
      for (let i in this.tickersMap) {
        let o = this.tickersMap[i];
        var dspNameArr = this.tickersMap[i].dspName.split("/");
        if (dspNameArr[0] == "BTC" && dspNameArr[1] == "USDT") {
          BTCToUSDT = o.close || BTCToUSDT;
        } else if (dspNameArr[0] == "ETH" && dspNameArr[1] == "USDT") {
          ETHToUSDT = o.close || ETHToUSDT;
        }
      }
      let cnyTotal = 0.0;
      this.cnyOwnMenoy = 0;
      this.usdtOwnMenoy = 0;
      this.btcOwnmenoy = 0;

      for (let j = 0; j < this.accounts.length; j++) {
        let currency = this.accounts[j].currency;
        let balance = this.accounts[j].total_balance;
        let toUSDT = 0.0;
        let toBTC = 0.0;
        let toETH = 0.0;
        // let toCNY = 0.0;
        for (let k in this.tickersMap) {
          let s = this.tickersMap[k];
          let dspNameArr = s.dspName.split("/");
          if (dspNameArr[0] == currency && dspNameArr[1] == "USDT") {
            toUSDT = s.close;
          } else if (dspNameArr[0] == currency && dspNameArr[1] == "BTC") {
            toBTC = s.close;
          } else if (dspNameArr[0] == currency && dspNameArr[1] == "ETH") {
            toETH = s.close;
          }
        }
        if (currency == "USDT") {
          cnyTotal += balance * usdToCny;
        } else if (toUSDT > 0) {
          cnyTotal += balance * toUSDT * usdToCny;
        } else if (toBTC > 0) {
          cnyTotal += balance * toBTC * BTCToUSDT * usdToCny;
        } else if (toETH > 0) {
          cnyTotal += balance * toETH * ETHToUSDT * usdToCny;
        }
        this.cnyOwnMenoy = cnyTotal.toFixed(2);
        this.usdtOwnMenoy = (cnyTotal / usdToCny).toFixed(2);
        this.btcOwnmenoy = (cnyTotal / BTCToUSDT / usdToCny).toFixed(4);
      }
    },
    // 限价，市价切换
    HandlerSwitchPriceType(item) {
      this.dropdownTxt = item.name;
      this.SET_STATE({
        priceType: item,
      });
    },
    // 侧边栏点击事件
    toTrade(ticker) {
      if (!ticker.notOpened) {
        this.socketClose();
        this.evtRefreshTrade({
          symbol: ticker.symbol,
          tradeType: "buy",
        });
        this.slideShow = false;
      } else {
        Toast(this.$t("commit.pleaseExpected"));
      }
    },
    getPercent(ticker) {
      return ((ticker.close - ticker.open) / ticker.open) * 100 || 0;
    },
    getPercentText(ticker) {
      var percent = this.getPercent(ticker);
      if (percent == 0) {
        return "0.00";
      } else {
        return (percent > 0 ? "+" : "") + percent.toFixed(2);
      }
    },
    getInfo() {
      getFees().then((res) => {
        if (res && res.data && res.data.exFess) {
          this.fees = res.data.exFess;
        }
      });
    },
    bgStyle(num, type) {
      let allNum = 1;
      if (type === "asks") {
        if (Array.isArray(this.depth.asks)) {
          allNum = this.depth.asks.reduce((old, val) => old + val[1], 0);
        }
      } else {
        if (Array.isArray(this.depth.bids)) {
          allNum = this.depth.bids.reduce((old, val) => old + val[1], 0);
        }
      }
      let width = num ? (num / allNum) * 100 + "%" : 0;
      return {
        width,
      };
    },
    // 切换 买入 卖出
    switchTradeType(tradeType) {
      this.SET_STATE({ tradeType });

      if (this.depth) {
        if (this.isBuy) {
          var asks = this.depth.asks;
          let price = asks && asks.length > 0 ? asks[0][0] || 0 : 0;
          this.SET_STATE({ price });
        } else {
          let price = bids && bids.length > 0 ? bids[0][0] || 0 : 0;
          this.SET_STATE({ price });
          var bids = this.depth.bids;
        }
      }
      this.switchAmountType(this.amountType);
    },
    // 市场价 or 限价 / 切换 25% 50% 75% 100%
    switchAmountType(amountType) {
      this.SET_STATE({ amountType });

      var canUseAmount = 0;
      var currencyName = this.isBuy
        ? this.ticker.quoteCurrencyName
        : this.ticker.baseCurrencyName;

      for (var i in this.accounts) {
        if (this.accounts[i].currency == currencyName) {
          canUseAmount = this.accounts[i].available_balance;
        }
      }
      // console.log(`canUseAmount---->${canUseAmount}`);
      var volumePrice = 0;
      if (this.isBuy) {
        var price = this.isLimit ? this.price : 1;
        volumePrice = price > 0 ? (canUseAmount * this.amountType) / price : 0;
      } else {
        volumePrice = canUseAmount * this.amountType;
      }
      var pow = Math.pow(10, this.ticker.volumePrecision);
      let volume = Math.floor(volumePrice * pow) / pow;
      this.SET_STATE({ volume });
    },
    switchSlide() {
      this.slideShow = !this.slideShow;
    },
    changeValue(key, op) {
      let isState = key in this.$store.state.trade;
      let result = "";
      if (op === "-" && Number(this[key]) - 1 >= 0) {
        result = Number(this[key]) - 1;
      } else if (op === "+") {
        result = Number(this[key]) + 1;
      }
      if (isState) {
        this.SET_STATE_STR([key, result]);
      } else {
        this[key] = result;
      }
    },
    watchNumx(nVal, oVal, name, precision) {
      var nValStr = nVal.toString();
      let isState = name in this.$store.state.trade;
      let val = "";
      if (nValStr == "" || (!isNaN(nValStr) && parseFloat(nValStr) >= 0)) {
        if (nValStr.indexOf(".") > -1) {
          var reg = new RegExp("(\\d\\.\\d{0," + precision + "})(.*)");
          val = nValStr.trim().replace(reg, "$1");
        } else {
          val = nValStr.trim();
        }
      } else {
        val = oVal;
      }
      if (isState) {
        this.SET_STATE_STR([name, val]);
      } else {
        this[name] = val;
      }
    },
    beforeSale(callback) {
      var self = this;
      if (self.priceType.value == "limit") {
        if (!self.price || isNaN(self.price) || parseFloat(self.price) <= 0) {
          return Toast(self.$t("trade.trade.PLEASE_ENTER_LEGAL_PRICE"));
        }
      }
      if (!self.volume || isNaN(self.volume) || parseFloat(self.volume) <= 0) {
        return Toast(self.$t("trade.trade.PLEASE_ENTER_LEGAL_VOLUME"));
      }
      if (
        (self.isBuy ? self.totalAccount : self.volume) * 1 >
        self.canUseAccount * 1
      ) {
        return Toast(self.$t("trade.trade.INSUFFICIENT"));
      }
      //不验证验证码
      if (!this.need_fund_pwd) {
        callback();
      }
    },
    sale() {
      var self = this;
      this.beforeSale(function () {
        postSale({
          is_sec_pwd_effective: 0,
          o_price_type: self.priceType.value, //market
          o_type: self.tradeType, //buy
          price: self.priceType.value == "market" ? 0 : self.price, //
          security_pwd: self.pwd,
          source: "app",
          symbol: self.symbol,
          volume: self.volume,
        }).then((res) => {
          if (res.status === 1) {
            Toast(self.$t("trade.trade.TRADE_SUCCESS"));
            self.SET_STATE({
              price: "",
              volume: "",
              pwd: "",
            });
            self.refreshUserData();
            self.getTickers();
          } else {
            Toast(res.msg);
          }
        });
      });
    },
    toKLine() {
      this.$router.push({
        path: "/kline",
        query: this.ticker,
      });
    },
    toDeposit() {
      var self = this;
      var currencyName = self.isBuy
        ? self.ticker.quoteCurrencyName
        : self.ticker.baseCurrencyName;
      this.openWinFrame("DEPOSIT", "~/home/deposit", {
        currencyName: currencyName,
      });
    },
    toOrderList() {
      this.$router.push({
        name: "OrderDetail",
        params: {
          symbol: this.symbol,
        },
      });
    },
    HandleCancel(order) {
      deleteOrder({
        id: order.id,
        o_no: order.o_no,
        symbol: this.symbol,
      }).then(() => {
        Toast(this.$t("trade.trade.revokeSuccess"));
        this.refreshUserData();
      });
    },
    HandleHeaderClik() {
      Toast(this.$t("common.pleaseExpected"));
    },
    socketClose() {
      let socketMessage = [
        {
          key: ["depth", this.symbol, 0].join("_") + "_cancel",
          ts: new Date().getTime(),
        },
        {
          key: ["trades", this.symbol, 10].join("_") + "_cancel",
          ts: new Date().getTime(),
        },
        {
          key: "tickers_cancel",
          ts: new Date().getTime(),
        },
      ];
      this.sendSocketMsg(socketMessage);
      // this.socket.close();
    },
  },
  deactivated() {
    this.socketClose();
  },
};
</script>
<style lang="scss">
.slider-box {
  margin-top: 20px;
  width: 100%;
  height: 28px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 5px;
  .item-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 5px;
    right: 5px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item {
      width: 7px;
      height: 12px;
      background: #e7ebee;
      border-radius: 2px;
      &.active {
        background: #fb607a;
        &.isBuy {
          background: #03ad90;
        }
      }
    }
    .line {
      flex: 1;
      height: 3px;
      margin: 0 2px;
      background: #e7ebee;
      &.active {
        background: #fb607a;
        &.isBuy {
          background: #03ad90;
        }
      }
    }
  }
  .van-slider {
    background: transparent;
    .van-slider__bar {
      background: transparent;
    }
  }
}
</style>
<style lang="scss" scoped>
@import url("vant/lib/icon/local.css");
$boxBgGreen: #03ad90;
$boxBgGray: #f7f6fb;
$boxBgRed: #ce435d;
$bgRed: #fbf1f2;
$bgGreen: #eaf9f6;
$bgGray: #ececec;
$txtRed: #ce435d;
$txtGreen: #00a07f;
$txtGray: #c8d0d5;
$txtBlack: #13181e;
$txtGrayBlod: #929eaa;
$borderGray: #e2e5e6;
$txtWhite: #ffffff;
$txtBlue: #0162e4;
$inputBgGary: #f8f8f8;
.text-red {
  color: $txtRed;
}
.text-green {
  color: $txtGreen;
}
.text-gary {
  color: $txtGray !important;
}
input {
  border: 0;
  ::placeholder {
    color: $txtGray !important;
    font-weight: 100 !important;
  }
}
.ml5 {
  margin-left: 5px;
}
.flexCenter {
  @include flexCenter;
}
.black-blod {
  font-weight: bold;
  color: #13181e;
}
.dropdown-box {
  margin-top: 11px;
  position: relative;
  height: 24px;
  border: 1px solid #e2e5e6;
  border-radius: 3px;
  padding: 0 10px;
  .left {
    height: 100%;
    line-height: 24px;
    font-size: 14px;
  }
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 10px;
    margin-top: -5px;
    border: 3px solid;
    transform: rotate(-45deg);
    border-color: transparent transparent #929eaa #929eaa;
  }
  &.active {
    color: rgb(25, 137, 250);
    &::after {
      margin-top: -1px;
      border-color: transparent transparent currentColor currentColor;
      transform: rotate(135deg);
    }
    .dropdown-bg {
      display: block;
    }
    .dropdown-list {
      display: block;
    }
  }
  .dropdown-bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #000000;
    opacity: 0.2;
    z-index: 1111;
    display: none;
  }
  .dropdown-list {
    position: absolute;
    left: 0;
    top: 25px;
    padding: 5px 0;
    width: 100%;
    background: #ffffff;
    border-radius: 4px;
    z-index: 1222;
    display: none;
    &-item {
      width: 100%;
      height: 31px;
      line-height: 31px;
      padding-left: 15px;
      font-size: 13px;
      color: #343434;
      &.active {
        background: #f2f2f2;
      }
    }
  }
}

.wrapper {
  font-family: "PingFang SC";
  padding: $appStatusTop + 60px 0 !important;
  .header-box {
    position: fixed;
    top: $appStatusTop;
    width: 100%;
    background: #fff;
    z-index: 100;
    .tab-box {
      box-sizing: border-box;
      width: 345px;
      height: 30px;
      margin: 5px auto 25px;
      display: flex;
      border: 1px solid #dedede;
      border-radius: 3px;
      z-index: 100;
      .item {
        flex: 1;
        height: 100%;
        font-size: 15px;
        text-align: center;
        color: #929eaa;
        line-height: 30px;
        box-sizing: border-box;
        &.active {
          color: $themeColor;
          border: 1px solid $themeColor;
          border-radius: 3px;
        }
      }
    }
    .nav {
      @include flexCenter;
      width: 100%;
      height: 20px;
      background: $txtWhite;
      padding: 0 14px;
      z-index: 1000;
      padding-bottom: 10px;
      .text-left {
        flex: 1;
        display: flex;
        align-items: center;
        span {
          padding-left: 10px;
          font-size: 14px;
          font-family: "DINPro";
          font-weight: bold;
          color: $txtBlack;
          line-height: 1;
        }
        .tips {
          margin-left: 10px;
          padding: 4px 5px;
          border-radius: 3px;
          font-size: 12px;
          font-weight: bold;
          line-height: 13px;
          color: $txtGreen;
          background: $bgGreen;
          &.down {
            color: #fc4a68;
            background: #ffebed;
          }
        }
      }
      .text-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .item {
          margin-left: 15px;
        }
        .multiple-box {
          padding: 3px 4px 2px;
          border: 1px solid $themeColor;
          border-radius: 3px;
          font-size: 13px;
          font-weight: bold;
          color: $themeColor;
        }
      }
    }
  }
  .tips {
    font-size: 10px;
    font-weight: 500;
    color: $txtBlack;
  }
  .content {
    display: flex;
    justify-content: space-between;
    padding: 0 14px;
    &-right {
      position: relative;
      z-index: 0;
      flex: 1;
      overflow: hidden;
      .title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 10px;
        font-size: 10px;
        font-weight: 500;
        color: $txtGray;
      }
      .line-box {
        margin-top: 10px;
        .line-row {
          display: flex;
          justify-content: space-between;
          position: relative;
          width: 100%;
          height: 25px;
          line-height: 25px;
          font-size: 12px;
          font-weight: 500;
          .line-left {
            position: relative;
            color: $txtRed;
            z-index: 2;
          }
          .line-right {
            position: relative;
            z-index: 2;
          }
          .line-bg {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            background: $bgRed;
            max-width: 100%;
            z-index: 1;
          }
        }
        &.down {
          margin-top: 20px;
          .line-left {
            color: $txtGreen;
          }
          .line-bg {
            background: $bgGreen;
          }
        }
      }
      .price-num {
        margin: 13px 0 7px;
        color: $txtRed;
        font-size: 15px;
        font-weight: 500;
        font-family: "DINPro";
        font-weight: bold;
      }
      .price-num-tips {
        font-size: 10px;
        font-family: "DIN";
        font-weight: 500;
        color: $txtGray;
      }
      .shendu-box {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .dropdown-box {
          margin: 0;
          flex: 1;
        }
        .right-icon {
          margin-left: 10px;
        }
      }
    }
    &-left {
      width: 190px;
      margin-right: 15px;
      .tab {
        position: relative;
        z-index: 0;
        display: flex;
        justify-content: space-between;
        text-align: center;
        background: transparent;
        overflow: hidden;
        .tab-item {
          position: relative;
          width: 83px;
          font-size: 14px;
          font-weight: 800;
          line-height: 34px;
          color: $txtGrayBlod;
          border-radius: 2px;
          background-color: $boxBgGray;
          &::after {
            content: "";
            position: absolute;
            top: 0;
            z-index: 99;
          }
          &.buy::after {
            right: -10px;
            border-radius: 0 2px 0 0;
            border-top: 34px solid $boxBgGray;
            border-right: 11px solid transparent;
          }
          &.sell::after {
            left: -10px;
            border-radius: 0 0 0 2px;
            border-bottom: 34px solid $boxBgGray;
            border-left: 11px solid transparent;
          }
          &.active {
            color: $txtWhite;
            background-color: $boxBgGreen;
            &.sell {
              background-color: $boxBgRed;
            }
            &.buy::after {
              border-top: 34px solid $boxBgGreen;
            }
            &.sell::after {
              border-bottom: 34px solid $boxBgRed;
            }
          }
        }
      }
      .price-content {
        margin-top: 16px;
        .price-box {
          @include flexCenter;
          width: 100%;
          height: 40px;
          line-height: 40px;
          border: 1px solid $borderGray;
          border-radius: 4px;
          color: $txtGray;
          font-size: 14px;
          font-weight: 800;
          overflow: hidden;
          input {
            font-size: 14px;
            font-family: "DIN";
            color: #13181e;
          }
          .count-box {
            width: 35px;
            height: 100%;
            font-size: 28px;
            line-height: 1;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            &.sub {
              border-left: 1px solid $borderGray;
            }
            &.add {
              position: relative;
              &::after {
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                margin: auto;
                width: 1px;
                height: 13px;
                background: #e2e5e6;
              }
            }
          }
        }
        .price-tips {
          margin-top: 6px;
          font-size: 11px;
          font-family: "DIN";
          font-weight: 500;
          color: #c8d0d5;
          line-height: 1;
        }
      }
      .number-content {
        margin-top: 16px;
        .number-box {
          @include flexCenter;
          width: 100%;
          height: 40px;
          border: 1px solid $borderGray;
          border-radius: 4px;
          padding-right: 10px;
          font-size: 13px;
          font-family: "DINPro";
          font-weight: 500;
          color: #8c9fad;
          input {
            font-size: 14px;
            font-family: "DIN";
            color: #13181e;
          }
        }
      }
      .tips-box {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        font-size: 11px;
        font-family: "PingFang SC";
        font-weight: 500;
        color: #c8d0d5;
        line-height: 1;
      }
      .input {
        flex: 1;
        padding: 0 10px;
        input {
          font-size: 12px;
          width: 100%;
          color: $txtBlack;
          &::placeholder {
            color: $txtGray;
          }
        }
      }
      .check-box {
        @include flexCenter;
        margin-top: 23px;
        .item {
          flex: 1;
          margin-right: 5px;
          height: 22px;
          line-height: 22px;
          background: $bgGray;
          color: $txtGray;
          border-radius: 3px;
          &:last-child {
            margin: 0;
          }
          &.active {
            color: $txtWhite;
            background-color: $boxBgGreen;
          }
        }
      }
      .trade-value {
        margin-top: 20px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #8193a0;
        span {
          padding-left: 6px;
          font-size: 14px;
          font-family: "DINPro";
          font-weight: bold;
          color: #13181e;
        }
      }
      .buy-btn {
        margin-top: 12px;
        background: $boxBgGreen;
        width: 100%;
        height: 36px;
        font-size: 15px;
        font-weight: 800;
        color: $txtWhite;
        border-radius: 3px;
        font-family: "PingFang SC";
      }
      &.down {
        .item.active {
          background-color: $boxBgRed;
        }
        .buy-btn {
          background: $boxBgRed;
        }
      }
    }
  }
  .entrust-now {
    margin-top: 15px;
    border-top: 10px solid #f7f6fb;
    .entrust-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      padding: 0 17px;
      border-bottom: 1px solid #f1f2f3;
      &-left {
        display: flex;
        align-items: center;
        height: 100%;
        .item {
          position: relative;
          margin-right: 37px;
          line-height: 40px;
          height: 100%;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: bold;
          color: #8193a0;
          &.active {
            color: $themeColor;
            &::after {
              content: "";
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              height: 2px;
              background: $themeColor;
              border-radius: 1px;
            }
          }
        }
      }
      &-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 12px;
        font-family: "PingFang SC";
        font-weight: 500;
        color: #8193a0;
        &-icon {
          margin-right: 6px;
        }
      }
    }
    .entrust-item {
      padding: 20px 15px;
      overflow: hidden;
      border-bottom: 1px solid #f4f4f4;
      .entrust-item-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-left {
          font-size: 16px;
          font-weight: 800;
          span {
            margin-left: 7px;
            font-size: 12px;
            font-family: "DIN";
            font-weight: 500;
            color: $txtGray;
          }
        }
        &-right {
          width: 55px;
          height: 25px;
          line-height: 25px;
          background: #f7f6fb;
          border-radius: 3px;
          font-size: 12px;
          font-family: "PingFang SC";
          font-weight: 500;
          color: $themeColor;
          text-align: center;
        }
      }
      .row {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        font-weight: 500;
        color: $txtGray;
        &.val {
          color: $txtBlack;
        }
        & > div {
          flex: 1;
        }
      }
    }
    .not-orders {
      width: 100%;
      padding: 40px 0;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      color: $txtGray;
      overflow: hidden;
      .img {
        display: inline-block;
        width: 168px;
        height: 118px;
      }
    }
  }
  .search-box {
    position: fixed;
    top: $appStatusTop;
    left: 0;
    width: 345px;
    height: 100%;
    padding: 0 15px;
    background: $txtWhite;
    z-index: 1001;
    .search-back {
      margin-top: 15px;
    }
    .search-input {
      @include flexCenter;
      width: 100%;
      height: 41px;
      margin-top: 33px;
      padding: 0 15px;
      border-radius: 4px;
      background: $inputBgGary;
      input {
        flex: 1;
        font-size: 13px;
        background: $inputBgGary;
      }
    }
    .search-content {
      margin-top: 35px;
      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;
        font-size: 13px;
        font-weight: 500;
        color: $txtBlack;
        & > div {
          flex: 1;
        }
        &.text-gary {
          font-size: 12px;
          margin-bottom: 20px;
        }
      }
    }
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: 0.7;
    z-index: 1000;
  }
  .fade-enter-active,
  .fade-leave-active {
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .slide-enter-active,
  .slide-leave-active {
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }
  .slide-enter,
  .slide-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>`