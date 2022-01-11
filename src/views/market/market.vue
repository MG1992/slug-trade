<template>
  <div class="market-wrapper header-page">
    <Header :title="$t('market.market')" :leftArrow="false">
      <template #right>
        <VanIcon name="search" size="18" color="#3E536C" />
      </template>
    </Header>
    <div class="nav">
      <!-- 板块选择 -->
      <div class="tab-box">
        <div
          class="item"
          v-for="(item, index) in typeList"
          @click="HandleHeaderClik"
          :key="index"
          :class="{ active: index === 1 }"
        >
          <span>{{ item.value }}</span>
        </div>
      </div>
      <!-- 货币选择 -->
      <div class="currency-box">
        <div
          class="item"
          v-for="(item, index) in currencyList"
          @click="HandleHeaderClik"
          :key="index"
          :class="{ active: index === 0 }"
        >
          {{ item }}
        </div>
      </div>
      <!-- 排序选择 -->
      <div class="nav-box">
        <div class="nav-box-left">
          <div class="nav-box-left-name">
            {{ $t("market.name") }}
            <van-icon class="nav-icon" :name="sort" size="10"></van-icon>
          </div>
          <div class="nav-box-left-time">
            {{ $t("market.24time") }}
            <van-icon class="nav-icon" :name="sort" size="10"></van-icon>
          </div>
        </div>
        <div class="nav-box-center">
          {{ $t("market.newPrice")
          }}<van-icon class="nav-icon" :name="sort" size="10"></van-icon>
        </div>
        <div class="nav-box-right">
          {{ $t("market.upDownRange")
          }}<van-icon class="nav-icon" :name="sort" size="10"></van-icon>
        </div>
      </div>
    </div>

    <div class="content">
      <div
        class="row"
        v-for="(item, index) in marketsList"
        :key="index"
        :class="getPercentClass(item)"
      >
        <!-- @click="toLine(item)" -->
        <div class="left">
          <p class="currency">
            {{ item.base_currency }}
            <span class="currency-tips"> {{ item.id }} </span>
          </p>
          <p class="tips">
            {{ $t("market.24time") }}
            {{ item.amount }}
          </p>
        </div>
        <div class="text-center center">
          <p class="price">{{ item.price }}</p>
        </div>
        <div class="text-right right">
          <div class="text-center box">
            {{ getPercentText(item) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import { getStoreList } from "@/http/modules/market";
import { Toast, Icon as VanIcon } from "vant";
import { mapActions, mapState } from "vuex";
import BigNumber from "bignumber.js";

import sort from "@/assets/icons/market_selected_default.png";
import sortUp from "@/assets/icons/market_selected_up_light.png";
import sortDown from "@/assets/icons/market_selected_down_light.png";

export default {
  name: "market",
  components: {
    Header,
    VanIcon,
  },
  data() {
    return {
      sort,
      sortUp,
      sortDown,
      marketsList: [],
      timerout: "",
      BigNumber,
    };
  },
  computed: {
    marketDataKey() {
      return this.marketData;
    },
    typeList() {
      return [
        {
          name: 1,
          value: this.$t("market.type1"),
        },
        {
          name: 2,
          value: this.$t("market.type2"),
        },
        {
          name: 3,
          value: this.$t("market.type3"),
        },
        {
          name: 4,
          value: this.$t("market.type4"),
        },
        {
          name: 5,
          value: this.$t("market.type5"),
        },
      ];
    },
    currencyList() {
      return ["三星", "国产", "TCL"];
    },
  },
  activated() {
    this.init();
  },
  deactivated() {},
  methods: {
    init() {
      getStoreList().then((res) => {
        console.log();
        this.marketsList = res;
      });
    },
    HandleHeaderClik() {
      Toast(this.$t("common.pleaseExpected"));
    },
    // eslint-disable-next-line no-unused-vars
    toLine(item) {
      this.$router.push({
        path: "kLine",
        query: item,
      });
    },
    getPercent(ticker) {
      return ((ticker.quote_price - ticker.open) / ticker.open) * 100 || 0;
    },
    getPercentText(ticker) {
      // var percent = this.getPercent(ticker);
      var percent = ticker.rise;
      if (percent == 0) {
        return "0.00%";
      } else {
        return percent + "%";
      }
    },
    getPercentClass(ticker) {
      // var percent = this.getPercent(ticker);
      var percent = ticker.rise;
      if (percent < 0) {
        return "down";
      } else if (percent > 0) {
        return "up";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$txtBlack: #0b1017;
$navBlack: #666;
$txtGary: #8193a0;
$txtGreen: #00c590;
$boxBgGreen: #03ad90;
$percentGray: #9596ab;
$txtRed: #fb607a;
$boxBgRed: #d14b64;
$txtWhite: #ffffff;
.market-wrapper {
  font-family: PingFang SC;
  padding-top: 155px !important;
  .nav {
    position: fixed;
    top: 74px;
    width: 100%;
    font-size: 13px;
    font-weight: 500;
    color: $navBlack;
    background: $txtWhite;
    padding: 0 16px;
    .tab-box {
      box-sizing: border-box;
      width: 345px;
      height: 30px;
      margin: 5px auto 0;
      display: flex;
      border: 1px solid #dedede;
      border-radius: 4px;
      z-index: 100;
      .item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-size: 13px;
        color: #8193a0;
        box-sizing: border-box;
        &.active {
          color: #fff;
          background: $themeColor;
          border-radius: 4px;
        }
      }
    }
    .currency-box {
      position: relative;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 25px;
      height: 32px;
      &::after {
        content: "";
        position: absolute;
        left: -16px;
        right: -16px;
        bottom: -1px;
        margin: auto;
        height: 1px;
        background: #eeeeee;
      }
      .item {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: "DINPro";
        font-weight: bold;
        color: #8c9fad;
        &.active {
          color: $themeColor;
          &::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 2px;
            border-radius: 1px;
            background: $themeColor;
          }
        }
      }
    }
    &-box {
      padding: 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      font-family: "PingFang SC";
      font-weight: 500;
      color: #8193a0;
      &-left {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        &-name {
          display: flex;
          align-items: center;
          margin-right: 16px;
        }
        &-time {
          display: flex;
          align-items: center;
        }
      }
      &-center {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &-right {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .nav-icon {
        display: flex;
        align-items: center;
        margin-left: 5px;
      }
    }
  }
  .content {
    padding-top: 10px;
    .row {
      @include flexCenter;
      width: 100%;
      border-bottom: 1px solid $borderGray;
      padding: 14px 16px;
      line-height: 1;
      .left {
        flex: 1;
        font-weight: bold;
        font-family: "PingFang-SC-Bold";
        .currency {
          font-size: 16px;
          font-family: "DIN";
          font-weight: bold;
          color: #0b1017;
          &-tips {
            font-size: 11px;
            color: #c8d0d5;
            font-family: "DIN-Medium";
          }
        }
        .tips {
          margin-top: 11px;
          font-size: 11px;
          font-family: "PingFang SC";
          font-weight: 500;
          color: $txtGary;
        }
      }
      .center {
        flex: 1;
        .price {
          font-size: 16px;
          font-family: "DIN";
          font-weight: bold;
          color: $txtBlack;
        }
        .cny {
          margin-top: 11px;
          font-size: 11px;
          font-family: "PingFang SC";
          font-weight: 500;
          color: $txtGary;
        }
      }
      .right {
        flex: 1;
        color: $txtWhite;
        font-size: 16px;
        font-family: "DIN";
        font-weight: bold;
        .box {
          display: inline-block;
          width: 76px;
          white-space: nowrap;
          height: 33px;
          line-height: 33px;
          border-radius: 4px;
          background: $percentGray;
        }
      }
      &.down {
        .center {
          color: $txtRed;
        }
        .box {
          background: $boxBgRed;
        }
      }
      &.up {
        .box {
          background: $boxBgGreen;
        }
      }
    }
  }
}
</style>