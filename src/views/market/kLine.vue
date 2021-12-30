<template>
  <div class="kline-wrapper">
    <div ref="main" class="main-wrapper">
      <div class="kline-header-wrapper">
        <van-row>
          <van-col span="12">
            <van-icon :name="iconBack" @click="onClose" />
            <span style="display: inline-block; margin: 0 10px">|</span>
            <van-icon :name="iconLines" />
            <span>{{ ticker.dspName }}</span>
          </van-col>
          <van-col span="12" class="text-right">
            <van-icon :name="iconCollect" @click="willComing" />
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
          <div>
            <span class="color-gray">
              ≈
              {{ $n(calPrice(ticker.close), "currency") }}
            </span>
            <span :class="upOrDown"> {{ percent }}%</span>
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
        <!-- 更多 -->
        <div
          class="type-item"
          :class="{
            'more-active': false,
            'more-item': true
          }"
          @click="showMoreBox"
        >
          {{ $t("trade.kline.more") }}
        </div>
        <div v-show="showMore" class="more-box">
          <template v-for="t in moreTypeList">
            <div
              class="item-box"
              :class="{ active: t[0] == type }"
              :key="t[0]"
              @click="switchType(t[0])"
            >
              {{ t[1] }}
            </div>
          </template>
        </div>

        <!-- 深度图 | 更多操作 -->
        <div class="deep-box" @click="willComing">
          {{ $t("trade.kline.deepDraw") }}
          <span class="split-icon"> | </span>
          <van-icon size="14" name="invition" />
        </div>
      </div>
    </div>
    <div style="position: relative">
      <div v-show="showChart" class="chart-blocker" ref="chartBlock"></div>
      <div id="chart_container" ref="chart"></div>
      <div class="sk-wave" ref="loading" v-if="loading">
        <div
          class="sk-item"
          style="-webkit-animation-delay: 0.2s; animation-delay: 0.2s"
        ></div>
        <div
          class="sk-item"
          style="-webkit-animation-delay: 0.4s; animation-delay: 0.4s"
        ></div>
        <div
          class="sk-item"
          style="-webkit-animation-delay: 0.6s; animation-delay: 0.6s"
        ></div>
        <div
          class="sk-item"
          style="-webkit-animation-delay: 0.8s; animation-delay: 0.8s"
        ></div>
        <div
          class="sk-item"
          style="-webkit-animation-delay: 1s; animation-delay: 1s"
        ></div>
      </div>
    </div>
    <van-tabs v-model="activeName" class="van-tabs-wrapper">
      <van-tab
        :title="$t('trade.kline.consignorOrders')"
        name="orders"
      ></van-tab>
      <van-tab :title="$t('trade.kline.transactions')" name="history"></van-tab>
      <van-tab :title="$t('trade.kline.synopsis')" name="intro"></van-tab>
    </van-tabs>
    <div v-if="activeName === 'orders'" class="orders-wrapper">
      <van-row class="order-header">
        <van-col span="2">
          {{ $t("trade.kline.buyOrder") }}
        </van-col>
        <van-col span="6">
          {{ $t("trade.kline.quantity") }}({{ ticker.baseCurrencyName }})
        </van-col>
        <van-col span="8" class="text-center">
          {{ $t("trade.kline.price") }}(USDT)
        </van-col>
        <van-col span="6" class="text-right">
          {{ $t("trade.kline.quantity") }}({{ ticker.baseCurrencyName }})
        </van-col>
        <van-col span="2" class="text-right">
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
              <van-col span="4" class="text-right" style="color: #c0bfd6">
                {{ index + 1 }}
              </van-col>
              <van-col span="8" style="color: #fff"> {{ dep[1] }} </van-col>
              <van-col span="12" class="text-right">
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
              <van-col span="12"> {{ dep[0] }} </van-col>
              <van-col span="8" class="text-right" style="color: #fff">
                {{ dep[1] }}
              </van-col>
              <van-col span="4" style="color: #c0bfd6">
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
        <van-col span="12">{{ intros.publish_time || "-" }}</van-col>
        <van-col span="12" class="gray">{{
          $t("trade.kline.publishQuantity")
        }}</van-col>
        <van-col span="12">{{ intros.publish_num || "-" }}</van-col>
        <van-col span="12" class="gray">{{
          $t("trade.kline.circulateQuantity")
        }}</van-col>
        <van-col span="12">{{ intros.circulate_num || "-" }}</van-col>
        <van-col span="12" class="gray">{{
          $t("trade.kline.crowdfundingPrice")
        }}</van-col>
        <van-col span="12">{{ intros.crowdfunding_price || "-" }}</van-col>
        <van-col span="12" class="gray">{{
          $t("trade.kline.whiteBook")
        }}</van-col>
        <van-col span="12">{{ intros.white_paper || "-" }}</van-col>
        <van-col span="12" class="gray">{{
          $t("trade.kline.officialWebsite")
        }}</van-col>
        <van-col span="12">{{ intros.official_website || "-" }}</van-col>
        <van-col span="12" class="gray">{{
          $t("trade.kline.blockQuery")
        }}</van-col>
        <van-col span="12">
          {{ intros.block_search || "-" }}
        </van-col>
      </van-row>
      <div class="title" style="margin-top: 20px">
        {{ $t("trade.kline.synopsis") }}
      </div>
      <div class="intros-summary">{{ intros[`desc_${$i18n.locale}`] }}</div>
    </div>
    <!-- 去火币 目前没有 -->
    <div v-if="toHuoBMarket" class="btns flex" ref="btns">
      <div
        class="btn bg-up"
        @click="toHuoBTrade(1)"
        v-text="$t('trade.kline.buy')"
      ></div>
      <div
        class="btn bg-down"
        @click="toHuoBTrade(2)"
        v-text="$t('trade.kline.sell')"
      ></div>
    </div>
    <div v-else class="btns" ref="btns">
      <van-row>
        <van-col span="10">
          <div
            class="btn bg-up"
            @click="toTrade('buy')"
            v-text="$t('trade.kline.buy')"
          ></div>
        </van-col>
        <van-col span="10">
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
  Tabs as VanTabs
} from "vant";
import i18n from "@/langs";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "kline",
  data() {
    return {
      // ticker: $util.param("ticker"),
      ticker: {},
      chart: 2,
      // 目前k线类型 默认15min
      type: "15min",
      // 请求中的k线类型，用于断开请求
      requestType: "15min",
      // HuoBTradePairsArr: ["btcusdt","ethusdt"],
      toHuoBMarket: false,
      //登录权限
      isLogined: false,
      accData: null,
      // 第一次请求socket数据
      isFirstRequset: true,
      tickerTimer: null,
      loading: true,
      // 委托订单栏激活选项
      activeName: "",
      // 深度 成交 简介
      depth: {},
      trades: [],
      intros: {},
      // 展示K线图
      showChart: true,
      iconBack,
      iconLines,
      iconShare,
      iconWhole,
      iconCollect,
      iconBell,
      showMore: false
    };
  },
  components: {
    VanRow,
    VanCol,
    VanIcon,
    VanTab,
    VanTabs
  },
  created() {
    this.ticker = this.$route.query;
  },
  activated: function() {
    const self = this;
    this.ticker = this.$route.query;
    // $api.fixStatusBar(this.$refs.main);
    // this.$refs.chart.style.height =
    //   api.winHeight -
    //   this.$refs.main.offsetHeight -
    //   this.$refs.btns.offsetHeight +
    //   "px";
    this.loading = true;
    this.showChart = true;
    this.$refs.chart.style.height =
      window.innerHeight -
      this.$refs.main.offsetHeight -
      this.$refs.btns.offsetHeight -
      44 +
      "px";
    this.$refs.chartBlock.style.height =
      window.innerHeight -
      this.$refs.main.offsetHeight -
      this.$refs.btns.offsetHeight +
      "px";
    this.isFirstRequset = true;
    this.intervalTicker();
    this.getIntro();
    // 闪白处理
    // this.$refs.chart.style.visibility = "invisible";
    //火币行情
    // var tradePairs = this.ticker.symbol;
    // if(tradePairs && self.HuoBTradePairsArr.indexOf(tradePairs) >= 0){
    //   this.toHuoBMarket = true;
    //   // console.log(tradePairs+"是否包含在火币行情中----"+self.HuoBTradePairsArr.indexOf(tradePairs));
    // }else{
    //   this.toHuoBMarket = false;
    // }
    // console.log("行情ticker数据----"+JSON.stringify(this.ticker));
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-undef
    this.chart = new TradingView.widget({
      fullscreen: false,
      autosize: true,
      symbol: this.ticker.dspName,
      container_id: "chart_container",
      datafeed: this.datafeed,
      library_path: "./custom_scripts/chart_main/",
      loading_screen: {
        backgroundColor: "#101928",
        foregroundColor: "#101928"
      },

      locale: this.$i18n.locale,
      timezone: "Asia/Shanghai",
      charts_storage_api_version: "1.1",
      client_id: "tradingview.com",
      user_id: "public_user_id",
      debug: false,
      interval: "60",
      toolbar_bg: "#101928",
      allow_symbol_change: true,
      drawings_access: {
        type: "black",
        tools: [
          {
            name: "Trend Line",
            grayed: true
          },
          {
            name: "Trend Angle",
            grayed: true
          }
        ]
      },
      disabled_features: [
        "header_fullscreen_button", // 全屏按钮
        "border_around_the_chart",
        "compare_symbol",
        "context_menus",
        "datasource_copypaste",
        "display_market_status",
        "edit_buttons_in_legend",
        "go_to_date",
        "header_chart_type",
        "header_compare",
        "header_indicators",
        "header_interval_dialog_button",
        "header_resolutions",
        "header_screenshot",
        "header_symbol_search",
        "header_undo_redo",
        "left_toolbar",
        "legend_context_menu",
        "main_series_scale_menu",
        "move_logo_to_main_pane",
        "remove_library_container_border",
        "right_bar_stays_on_scroll",
        "show_hide_button_in_legend",
        "show_interval_dialog_on_key_press",
        "snapshot_trading_drawings",
        "star_some_intervals_by_default",
        "study_dialog_search_control",
        "symbol_info",
        "symbol_search_hot_key",
        "timezone_menu",
        // "use_localstorage_for_settings",
        "vert_touch_drag_scroll",
        "volume_force_overlay",
        "chart_scroll",
        "legend_context_menu",
        "control_bar"
      ],
      enabled_features: [
        "use_localstorage_for_settings",
        "constraint_dialogs_movement",
        "disable_resolution_rebuild",
        "hide_last_na_study_output",
        "side_toolbar_in_fullscreen_mode",
        "dont_show_boolean_study_arguments",
        "adaptive_logo",
        "legend_widget",
        "mouse_wheel_scale",
        "seconds_resolution", // 支持秒的周期
        "fix_left_edge" // 阻止滚动到第一个历史 K 线的左侧
      ],
      studies_overrides: {
        "volume.volume.color.0": "#E04B4C",
        "volume.volume.color.1": "#15b886",
        "volume.volume.transparency": 75
      },
      overrides: {
        editorFontsList: [
          "Lato",
          "Arial",
          "Verdana",
          "Courier New",
          "Times New Roman"
        ],
        "mainSeriesProperties.areaStyle.color1": "#0CBEF3",
        "mainSeriesProperties.areaStyle.color2": "#0098C4",
        "mainSeriesProperties.areaStyle.linecolor": "#0CBEF3",
        "mainSeriesProperties.areaStyle.linestyle": 0,
        "mainSeriesProperties.areaStyle.linewidth": 1,
        "mainSeriesProperties.areaStyle.transparency": 80,
        "mainSeriesProperties.areaStyle.priceSource": "close",
        "mainSeriesProperties.barStyle.upColor": "#15b886",
        "mainSeriesProperties.barStyle.downColor": "#E04B4C",
        "mainSeriesProperties.barStyle.dontDrawOpen": false,
        "mainSeriesProperties.barStyle.barColorsOnPrevClose": false,
        "mainSeriesProperties.candleStyle.barColorsOnPrevClose": false,
        "mainSeriesProperties.candleStyle.upColor": "#15b886",
        "mainSeriesProperties.candleStyle.downColor": "#E04B4C",
        "mainSeriesProperties.candleStyle.borderColor": "#15b886",
        "mainSeriesProperties.candleStyle.borderUpColor": "#15b886",
        "mainSeriesProperties.candleStyle.borderDownColor": "#E04B4C",
        "mainSeriesProperties.candleStyle.drawWick": true,
        "mainSeriesProperties.candleStyle.drawBorder": true,
        "mainSeriesProperties.candleStyle.wickColor": "#737375",
        "mainSeriesProperties.candleStyle.wickUpColor": "#15b886",
        "mainSeriesProperties.candleStyle.wickDownColor": "#E04B4C",
        "mainSeriesProperties.extendedHours": false,
        "mainSeriesProperties.hollowCandleStyle.upColor": "#15b886",
        "mainSeriesProperties.hollowCandleStyle.downColor": "#E04B4C",
        "mainSeriesProperties.hollowCandleStyle.borderColor": "#15b886",
        "mainSeriesProperties.hollowCandleStyle.borderUpColor": "#15b886",
        "mainSeriesProperties.hollowCandleStyle.borderDownColor": "#E04B4C",
        "mainSeriesProperties.hollowCandleStyle.drawWick": true,
        "mainSeriesProperties.hollowCandleStyle.drawBorder": true,
        "mainSeriesProperties.hollowCandleStyle.wickColor": "#737375",
        "mainSeriesProperties.hollowCandleStyle.wickUpColor": "#15b886",
        "mainSeriesProperties.hollowCandleStyle.wickDownColor": "#E04B4C",
        "mainSeriesProperties.haStyle.upColor": "#15b886",
        "mainSeriesProperties.haStyle.downColor": "#E04B4C",
        "mainSeriesProperties.haStyle.borderColor": "#15b886",
        "mainSeriesProperties.haStyle.borderUpColor": "#15b886",
        "mainSeriesProperties.haStyle.borderDownColor": "#E04B4C",
        "mainSeriesProperties.haStyle.drawWick": true,
        "mainSeriesProperties.haStyle.drawBorder": true,
        "mainSeriesProperties.haStyle.wickColor": "#737375",
        "mainSeriesProperties.haStyle.wickUpColor": "#15b886",
        "mainSeriesProperties.haStyle.wickDownColor": "#E04B4C",
        "mainSeriesProperties.haStyle.barColorsOnPrevClose": false,
        "mainSeriesProperties.lineStyle.color": "#0CBEF3",
        "mainSeriesProperties.lineStyle.linestyle": 0,
        "mainSeriesProperties.lineStyle.linewidth": 1,
        "mainSeriesProperties.lineStyle.priceSource": "close",
        "mainSeriesProperties.lockScale": false,
        "mainSeriesProperties.minTick": "default",
        "mainSeriesProperties.priceLineWidth": 1,
        "mainSeriesProperties.priceAxisProperties.autoScale": true,
        "mainSeriesProperties.priceAxisProperties.autoScaleDisabled": false,
        "mainSeriesProperties.priceAxisProperties.percentage": false,
        "mainSeriesProperties.priceAxisProperties.percentageDisabled": false,
        "mainSeriesProperties.priceAxisProperties.log": false,
        "mainSeriesProperties.priceAxisProperties.logDisabled": false,
        "mainSeriesProperties.style": 1,
        "mainSeriesProperties.showCountdown": false,
        "mainSeriesProperties.showPriceLine": false,
        "mainSeriesProperties.visible": false,
        "paneProperties.topMargin": 15,
        "paneProperties.bottomMargin": 15,
        "paneProperties.leftAxisProperties.autoScale": true,
        "paneProperties.leftAxisProperties.autoScaleDisabled": false,
        "paneProperties.leftAxisProperties.percentage": false,
        "paneProperties.leftAxisProperties.percentageDisabled": false,
        "paneProperties.leftAxisProperties.log": false,
        "paneProperties.leftAxisProperties.logDisabled": false,
        "paneProperties.leftAxisProperties.alignLabels": true,
        "paneProperties.legendProperties.showStudyTitles": true,
        "paneProperties.legendProperties.showStudyValues": true,
        "paneProperties.legendProperties.showSeriesTitle": true,
        "paneProperties.legendProperties.showSeriesOHLC": true,
        "paneProperties.background": "#101928",
        "paneProperties.vertGridProperties.color": "#344568",
        "paneProperties.horzGridProperties.color": "#344568",
        "paneProperties.crossHairProperties.color": "#58637A",
        "paneProperties.crossHairProperties.style": 2,
        "scalesProperties.showSeriesLastValue": true,
        "scalesProperties.showLeftScale": false,
        "scalesProperties.showRightScale": true,
        "scalesProperties.backgroundColor": "#101928",
        "scalesProperties.lineColor": "#46587B",
        "scalesProperties.textColor": "#8F98AD",
        "scalesProperties.scaleSeriesOnly": false,
        "symbolWatermarkProperties.color": "rgba(0,0,0,0)",
        volumePaneSize: "medium"
      },
      custom_css_url: "chart.css"
    });

    this.chart.onChartReady(function() {
      self.chart.maStudies = [];
      self.maLine.forEach(function(value) {
        console.log(self.chart);
        // self.chart.createStudy(
        self.chart.chart().createStudy(
          "Moving Average",
          false,
          false,
          [value.index],
          function(ret) {
            return self.chart.maStudies.push(ret);
          },
          {
            precision: "",
            "plot.color.0": value.color
          }
        );
      });
    });
  },
  watch: {
    type: function() {
      if (this.datafeed.resetCacheNeededCallback != null) {
        this.datafeed.resetCacheNeededCallback();
        this.datafeed.resetCacheNeededCallback = null;
      }
      this.chart.chart().resetData();
    }
  },
  computed: {
    ...mapState({
      ticker_price: state => state.home.ticker_price
    }),
    // typeList: function () {
    //   return [
    //     ["5min", i18n.t("trade.kline.5min")],
    //     ["15min", i18n.t("trade.kline.15min")],
    //     ["30min", i18n.t("trade.kline.30min")],
    //     ["60min", i18n.t("trade.kline.60min")],
    //     ["1day", i18n.t("trade.kline.1day")],
    //     ["1week", i18n.t("trade.kline.1week")],
    //     ["1mon", i18n.t("trade.kline.1mon")],
    //   ];
    // },
    typeList: function() {
      return [
        ["15min", i18n.t("trade.kline.15min")],
        ["60min", i18n.t("trade.kline.1hour")],
        ["240min", i18n.t("trade.kline.4hour")],
        ["1day", i18n.t("trade.kline.1day")],
        ["1week", i18n.t("trade.kline.1week")]
      ];
    },
    moreTypeList: function() {
      return [
        ["1s", i18n.t("trade.kline.minHour")],
        ["1min", i18n.t("trade.kline.1min")],
        ["5min", i18n.t("trade.kline.5min")],
        ["30min", i18n.t("trade.kline.30min")],
        ["1mon", i18n.t("trade.kline.1mon")]
      ];
    },
    maLine: function() {
      return [
        {
          index: 5,
          color: "#965FC4"
        },
        {
          index: 15,
          color: "#84AAD5"
        },
        {
          index: 30,
          color: "#55B263"
        },
        {
          index: 60,
          color: "#B7248A"
        }
      ];
    },
    upOrDown: function() {
      return this.ticker.close - this.ticker.open > 0 ? "up" : "down";
    },
    percent: function() {
      var p = ((this.ticker.close - this.ticker.open) / this.ticker.open) * 100;
      return (p > 0 ? "+" : "") + (p || 0).toFixed(2);
    },
    datafeed: function() {
      var self = this;
      return {
        onReady: function(callback) {
          setTimeout(function() {
            callback({
              supports_search: false,
              supports_group_request: false,
              supported_resolutions: [
                "1",
                "5",
                "15",
                "30",
                "60",
                "240",
                "1D",
                "1W",
                "1M"
              ],
              supports_marks: true,
              supports_timescale_marks: true
            });
          }, 0);
        },
        resolveSymbol: function(
          symbolName,
          onSymbolResolvedCallback
          // onResolveErrorCallback
        ) {
          setTimeout(function() {
            onSymbolResolvedCallback({
              name: self.ticker.dspName,
              ticker: self.ticker.symbol,
              description: "",
              type: "bitcoin",
              session: "24x7",
              "exchange-traded": "bb100",
              "exchange-listed": "bb100",
              timezone: "Asia/Shanghai",
              pricescale: Math.pow(10, self.ticker.pricePrecision),
              minmov: 1,
              minmove2: 0,
              has_intraday: true,
              intraday_multipliers: ["60"],
              has_weekly_and_monthly: false,
              has_no_volume: false,
              regular_session: "24x7"
            });
          }, 0);
        },
        getBars: function(
          symbolInfo,
          resolution,
          from,
          to,
          onHistoryCallback,
          onErrorCallback,
          firstDataRequest
        ) {
          if (firstDataRequest) {
            self.requestType = self.type;
            // 需要发送的消息
            const msgs = [
              // k线图
              {
                key: `kline_${self.ticker.symbol}_${self.type}`,
                ts: new Date().getTime()
              },
              // 深度
              {
                key: `depth_${self.ticker.symbol}_0`,
                ts: new Date().getTime()
              },
              // 最新成交
              {
                key: `trades_${self.ticker.symbol}_10`,
                ts: new Date().getTime()
              }
            ];

            // $ws.openSubscribe([socketMessage], function(isFirst, ret) {
            // 连通websocket后的回调
            const callback = ret => {
              self.loading = false;
              // console.log(msgs[0]);
              // 深度和成交历史处理
              if (!ret.key) return;
              if (ret.key.includes("depth_") || ret.key.includes("trades_")) {
                self.dealWithDepthAndHistoryData(ret);
              } else {
                // k线图处理
                self.showChart = false;
                ret = ret.data;
                if (!ret) return;
                if (ret.datas) {
                  if (self.isFirstRequset) {
                    self.isFirstRequset = false;
                    setTimeout(() => {
                      onHistoryCallback(
                        ret.datas.reverse().map(self.toKLineDataFunc)
                      );
                    }, 500);
                  } else {
                    // if (typeof self.datafeed.realtimeCallback !== "function") {
                    //   return;
                    // }
                    console.log("enter=========");
                    self.datafeed.realtimeCallback(
                      self.toKLineDataFunc(ret.datas[0])
                    );
                  }
                }
              }
            };
            self.getSocket(msgs, callback);
          } else {
            onHistoryCallback([], {
              noData: true
            });
          }
        },
        realtimeCallback: null,
        resetCacheNeededCallback: null,
        subscribeBars: function(
          symbolInfo,
          resolution,
          onRealtimeCallback,
          subscriberUID,
          onResetCacheNeededCallback
        ) {
          this.realtimeCallback = onRealtimeCallback;
          this.resetCacheNeededCallback = onResetCacheNeededCallback;
        },
        unsubscribeBars: function() {
          self.socketClose();
          self.isFirstRequset = true;
        }
      };
    }
  },
  deactivated() {
    this.socketClose();
  },
  methods: {
    ...mapActions({
      refreshUserData: "trade/refreshUserData",
      sendSocketMsg: "home/sendSocketMsg",
      setReceiveFun: "home/setReceiveFun"
    }),
    ...mapMutations({
      SET_SYMBOL: "trade/SET_SYMBOL",
      SET_STATE: "trade/SET_STATE"
    }),
    onClose: function() {
      this.$router.go(-1);
    },
    // 处理深度和成交历史数据
    dealWithDepthAndHistoryData(ret) {
      const data = ret.data;
      if (data && data.asks && data.bids) {
        this.depth = data;
      } else if (data && data.trades) {
        this.trades = data.trades;
      }
    },
    // 计算价格
    calPrice(num) {
      if (!this.ticker_price["USDTCNY"]) return "";
      return BigNumber(num)
        .times(this.ticker_price["USDTCNY"])
        .toNumber();
    },
    // 计算总额
    calTotal(num1, num2) {
      if (!this.ticker_price["USDTCNY"]) return "";
      return BigNumber(num1)
        .times(num2)
        .times(this.ticker_price["USDTCNY"])
        .toNumber();
    },
    toKLineDataFunc: function(value) {
      return {
        time: value[0] * 1000,
        open: value[1] * 1,
        high: value[2] * 1,
        low: value[3] * 1,
        close: value[4] * 1,
        volume: value[5]
      };
    },
    /**
     * msgs 消息数组
     */
    getSocket(msgs, callback) {
      const recieveFunc = msgData => {
        // console.log(msgData);
        callback(msgData);
      };
      this.setReceiveFun(recieveFunc);
      console.log(msgs);
      const obj = {
        msgs: msgs,
        timeout: 10 * 1000
      };
      this.sendSocketMsg(obj);
    },
    // 关闭socket
    socketClose() {
      // 关闭消息。
      // 需要发送的消息
      const msgs = [
        {
          key: `kline_${this.ticker.symbol}_${this.requestType}_cancel`,
          ts: new Date().getTime()
        },
        // 深度
        {
          key: `depth_${this.ticker.symbol}_0_cancel`,
          ts: new Date().getTime()
        },
        // 最新成交
        {
          key: `trades_${this.ticker.symbol}_10_cancel`,
          ts: new Date().getTime()
        }
      ];
      console.log(msgs);
      this.sendSocketMsg(msgs);
    },
    // 获取币种信息 用于简介
    async getIntro() {
      const res = await currencyIntroduce(this.ticker.dspName.split("/")[0]);
      this.intros = res.data;
    },
    // 循环获取ticker 行情
    intervalTicker() {
      this.intervalTickerFunc();
      if (this.tickerTimer) clearInterval(this.tickerTimer);
      this.tickerTimer = setInterval(() => {
        this.intervalTickerFunc();
        // }, 3 * 1000);
      }, 60 * 1000);
    },
    async intervalTickerFunc() {
      const res = await getTicker(this.ticker.symbol);
      this.ticker = res;
    },
    // 切换时间
    switchRealTime: function() {
      this.chart.applyOverrides({
        "mainSeriesProperties.style": 3
      });
    },
    // 切换k线时间类型
    switchType: function(type) {
      if (type === "240min") {
        Toast(this.$t("trade.kline.notOpen"));
        return;
      }
      console.log(type);
      this.type = type;
      this.showMore = false;
      this.chart.applyOverrides({
        "mainSeriesProperties.style": 1
      });
    },
    toTrade: function(tradeType) {
      this.SET_STATE({ tradeType });
      this.SET_SYMBOL(this.ticker.symbol);
      this.refreshUserData();
      this.$router.push("trade");
    },
    toHuoBTrade: function() {
      // toHuoBTrade: function(viewIndex) {
      // var self = this;
      // $ui.openWinFrame("", "~/market/exchange", {
      //   ticker: self.ticker,
      //   viewIndex: viewIndex,
      //   noTitle: true
      // });
    },
    willComing: function() {
      Toast(this.$t("common.pleaseExpected"));
      return;
    },
    showMoreBox: function() {
      this.showMore = !this.showMore;
    }
  }
};
</script>
<style lang="scss" scoped>
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
  .van-col {
    line-height: 18px;
  }
}
.seller-wrapper {
  color: #f56161;
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
  }
  .van-row {
    .gray {
      color: #c3c9d2;
    }
    .van-col {
      padding: 5px 0;
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
