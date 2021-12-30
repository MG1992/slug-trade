<template>
  <div class="market-wrapper">
    <ul class="aui-list">
      <li
        class="aui-list-item"
        v-for="(ticker, index) in Object.keys(marketData)"
        :key="index"
      >
        <!-- @click="toKLine(marketData[ticker])" -->
        <van-row v-if="!marketData[ticker].notOpened">
          <van-col span="8" class="aui-pull-left">
            <div>
              <span
                class="color_F3_16"
                v-text="marketData[ticker].baseCurrencyName"
              ></span>
              <span
                class="market-box-light-gary"
                v-text="' /' + marketData[ticker].quoteCurrencyName"
              ></span>
            </div>
            <div class="aui-padded-t-5 market-box-gary">
              {{ $t("home.index.24HAmount") }}
              <span class="color_F6_12">
                {{
                  $n(
                    calTotal(
                      marketData[ticker].close,
                      marketData[ticker].volume
                    ),
                    "currency"
                  )
                }}
              </span>
            </div>
          </van-col>
          <van-col span="8" class="aui-font-size-16 text-center">
            <span
              :class="getPercentClass(marketData[ticker])"
              v-text="
                marketData[ticker].close
                  ? marketData[ticker].close.toFixed(
                      marketData[ticker].pricePrecision
                    )
                  : 0
              "
            ></span>
            <br />
            <span class="market-box-gary">
              ≈
              {{ $n(calPrice(marketData[ticker].close), "currency") }}
              <!-- {{ ticker_price[marketData[ticker].symbol.toUpperCase()] }} -->
            </span>
          </van-col>
          <van-col span="8" class="aui-pull-right aui-text-right text-right">
            <div class="aui-padded-t-5 m-t-10">
              <span
                class="percent"
                :class="getPercentClass(marketData[ticker])"
                v-text="getPercentText(marketData[ticker])"
              ></span>
            </div>
          </van-col>
        </van-row>
      </li>
    </ul>
  </div>
</template>
<script>
import { getAllTicker } from "@/http/modules/home";
import { Tabbar as VanTabbar, TabbarItem as VanTabbarItem } from "vant";

export default {
  name: "Market",
  components: {
    VanTabbar,
    VanTabbarItem
  },
  data() {
    return {
      marketData: {}
    };
  },
  created() {
    this.getAllTicker();
  },
  methods: {
    // 获取首页行情价格 并保存
    async getAllTicker() {
      const res = await getAllTicker();
      this.marketData = res.data;
    },
    getPercent: function(ticker) {
      return ((ticker.close - ticker.open) / ticker.open) * 100 || 0;
    },
    getPercentText: function(ticker) {
      var percent = this.getPercent(ticker);
      if (percent === 0) {
        return "0.00%";
      } else {
        return percent
          ? (percent > 0 ? "+" : "") + percent.toFixed(2) + "%"
          : "";
      }
    },
    getPercentClass: function(ticker) {
      var percent = this.getPercent(ticker);
      if (percent > 0) {
        return "up";
      } else if (percent < 0) {
        return "down";
      } else {
        return "";
      }
    }
  }
};
</script>
<style lang="scss">
.menu-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  .van-tabbar-item__icon {
    margin-bottom: 0;
  }
  .footer-img {
    width: 32px;
    height: 32px;
  }
}
</style>