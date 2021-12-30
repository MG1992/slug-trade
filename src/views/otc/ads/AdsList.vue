<template>
  <div class="ads-list header-page">
    <Header :title="$t('mine.ads.adsOrderList')" />
    <div class="left-tab">
      <span
        :class="active === '1' ? 'active' : 'common'"
        class="m-r-26"
        @click="handleTab('1')"
        >{{ $t("mine.ads.wantBuy") }}</span
      >
      <span
        :class="active === '2' ? 'active' : 'common'"
        @click="handleTab('2')"
        >{{ $t("mine.ads.wantSale") }}</span
      >
    </div>
    <div class="float-right right-btn">
      <div class="m-r-26" @click="toPublishAds">
        <img src="~@/assets/icons/ads_publish.png" alt="publishAds" />
        <div>{{ $t("mine.ads.publishAds") }}</div>
      </div>
      <div @click="goOrderList">
        <img src="~@/assets/icons/ads_order.png" alt="order" />
        <div>{{ $t("mine.ads.order") }}</div>
      </div>
    </div>
    <van-tabs
      v-model="activeCurrency"
      class="currency"
      @change="changeCurrency"
    >
      <van-tab
        v-for="item in currencyList"
        :key="item.currency"
        :name="item.currency"
        :title="item.currency"
      ></van-tab>
    </van-tabs>
    <!--广告列表-->
    <pagination
      :data="pageData"
      @getList="getList"
      @returnList="returnList"
      showLoadingWhenActivated
      :finishedText="adsList.length === 0 ? ' ' : '没有更多了'"
    >
      <no-data v-if="adsList.length === 0 && !loading"></no-data>

      <div class="ads-item" v-for="(item, index) in adsList" :key="index">
        <p>{{ item.title }}</p>
        <div class="ads-detail">
          <div class="count">
            <div>{{ $t("mine.ads.quantity") }} {{ item.trade_num }}</div>
            <div class="m-t-9">
              {{ $t("mine.ads.limitQuantity") }} {{ item.least_amount }} -
              {{ item.max_amount }}
            </div>
          </div>
          <div class="price">
            {{ $t("mine.ads.unitPrice") }}
            <div class="price-num">￥{{ item.price }}</div>
          </div>
        </div>
        <div class="pay-img">
          <img
            v-if="item.payment_types.indexOf('2') > -1"
            src="~@/assets/icons/ads_ali_pay.png"
            alt="ads_ali_pay"
          />
          <img
            v-if="item.payment_types.indexOf('1') > -1"
            src="~@/assets/icons/ads_wx_pay.png"
            alt="ads_wx_pay"
          />
          <img
            v-if="item.payment_types.indexOf('3') > -1"
            src="~@/assets/icons/ads_card_pay.png"
            alt="ads_card_pay"
          />
          <van-button
            :color="$color.themeColor"
            class="pay-btn"
            @click="toOrder(item)"
            >{{
              active === "1" ? $t("mine.ads.buy") : $t("mine.ads.sale")
            }}</van-button
          >
        </div>
      </div>
    </pagination>
    <place-order-popup
      :isShow="showPopup"
      @close="showPopup = false"
      :adsInfo="adsInfo"
    />
  </div>
</template>

<script>
import Header from "@/components/Header";
import {
  Tab as VanTab,
  Tabs as VanTabs,
  Button as VanButton,
  Dialog
} from "vant";
import Pagination from "@/components/Pagination";
import NoData from "@/components/NoData";
import { getAllAdsList, getAllCurrency } from "@/http/modules/mine.js";
// import i18n from "@/langs"
import placeOrderPopup from "./components/placeOrderPopup";
import { storage } from "@/utils/oldVersionFunc.js";
import { mapActions } from "vuex";

export default {
  components: {
    Header,
    VanTab,
    VanTabs,
    VanButton,
    Pagination,
    NoData,
    [Dialog.Component.name]: Dialog.Component,
    placeOrderPopup
  },
  data() {
    return {
      active: "",
      activeCurrency: "",
      currencyList: [],
      adsList: [],
      pageData: {},
      loading: false,
      showPopup: false,
      adsInfo: {},
      queryCurrency: "", //路由的币种，用于新增后返回列表到对应币种
      currencyImg: ""
    };
  },
  activated() {
    // 判断是从成功添加支付方式返回的
    const adsOrderStorage =
      storage.get("adsOrderStorage") &&
      JSON.parse(storage.get("adsOrderStorage"));
    if (adsOrderStorage) {
      this.showPopup = true;
    } else {
      this.adsList = [];
      this.active = this.$route.query.type || "1";
      this.queryCurrency = this.$route.query.currency;
      this.getCurrencyList();
      this.showPopup = false;
    }
  },
  methods: {
    ...mapActions({
      needAssurance: "mine/needAssurance"
    }),
    // 我要买是所有币种 我要卖是我拥有的币种
    getCurrencyList() {
      // 1出售-我的币种 2购买-所有币种
      getAllCurrency().then(res => {
        this.currencyList = res.currencys || res.data;
        //新增了哪个币种则列表为哪个，没有的话默认为第一个币种
        this.activeCurrency =
          this.queryCurrency ||
          (this.currencyList.length && this.currencyList[0].currency);
        // 获取列表

        !this.adsList.length && this.changeCurrency(this.activeCurrency);
      });
    },
    changeCurrency(currency) {
      this.getList(0);
      this.currencyImg = this.currencyList.find(
        item => item.currency === currency
      ).currency_img;
      console.log(this.currencyImg);
    },
    getList(data) {
      const param = {
        pageNum: data ? data.pageNum : 1,
        pageSize: data ? data.pageSize : 5,
        symbol: this.activeCurrency,
        transType: this.active //我要卖，查买类型广告，反过来亦同  1 我要买  2 我要卖
      };
      this.loading = true;
      getAllAdsList(param).then(res => {
        this.adsList = res.data.list;
        this.pageData = res.data;
        this.loading = false;
      });
    },
    returnList(list) {
      this.adsList = list || [];
    },
    handleTab(flag) {
      this.active = flag;
      this.getList(0);
      this.queryCurrency = "";
    },
    async toPublishAds() {
      const jude = await this.needAssurance();
      console.log(jude);
      if (jude.is_super === 0) return;
      // 进入购买
      this.$router.push({ path: "/publishAds/2" });
    },
    async toOrder(item) {
      const jude = await this.needAssurance();
      if (jude.is_super === 0) return;
      this.adsInfo = {
        ...item,
        currency: this.activeCurrency,
        currencyImg: this.currencyImg
      };
      this.showPopup = true;
    },
    goOrderList() {
      this.$router.push({ path: "/myOrder" });
    }
  }
};
</script>

<style lang="scss">
.ads-list {
  .right-btn img {
    width: 16px;
  }
  .left-tab {
    height: 70px;
    line-height: 70px;
    float: left;
    margin-left: 15px;
  }
  .m-r-26 {
    margin-right: 26px;
  }
  .right-btn {
    display: flex;
    text-align: center;
    align-items: center;
    height: 70px;
    margin-right: 15px;
  }
  .active {
    font-size: 25px;
    color: #202028;
  }
  .common {
    font-size: 17px;
    color: #96a8b0;
  }
  .currency {
    margin-top: 70px;
  }
  .ads-item {
    height: 127px;
    padding: 15px;
    border-bottom: 1px solid #eeeeee;
    p {
      color: #202028;
      font-size: 14px;
      font-weight: bold;
    }
    .ads-detail {
      position: relative;
      font-size: 12px;
      margin-top: 14px;
      color: #7f8a90;
      margin-bottom: 10px;
    }
    .price {
      position: absolute;
      right: 0;
      top: 0;
      text-align: right;
    }
    .price-num {
      color: #efba6b;
      font-size: 20px;
      margin-top: 5px;
    }
  }
  .van-tabs__line {
    background-color: $themeColor;
  }
  .van-tab--active {
    color: $themeColor;
  }
  .van-tabs__wrap {
    border-bottom: 1px solid #eeeeee;
    height: 34px;
  }
  .pay-btn {
    width: 90px;
    height: 30px;
    float: right;
    border-radius: 4px;
  }
  .m-t-9 {
    margin-top: 9px;
  }
  .pay-img {
    img {
      width: 20px;
      margin-right: 10px;
      margin-top: 5px;
    }
  }
}
</style>