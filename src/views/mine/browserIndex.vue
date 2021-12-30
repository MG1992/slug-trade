<template>
  <div class="wrapper header-page" @scroll="HandleScroll">
    <Header :title="$t('mine.browserIndex.title')" />
    <van-search
      class="search"
      v-model="searchText"
      show-action
      :placeholder="$t('mine.browserIndex.searchPlaceHolder')"
      :action-text="$t('mine.browserIndex.searchComfirm')"
      @search="searchBlockValue"
    >
      <template #action>
        <div @click="searchBlockValue(false)">
          {{ $t("mine.browserIndex.searchComfirm") }}
        </div>
      </template>
    </van-search>

    <van-grid column-num="2" gutter="15">
      <van-grid-item v-for="(item, index) in coinInfoName" :key="index">
        <div class="content-item">
          <p class="value">{{ coinInfo[index] }}</p>
          <p class="name">{{ item }}</p>
        </div>
      </van-grid-item>
    </van-grid>

    <div class="new-bill" v-if="showCoinBlock">
      <div class="nav-title">{{ $t("mine.browserIndex.newBill") }}</div>
      <div class="bill-item" v-for="(item, index) in coinBlocks" :key="index">
        <div class="title">{{ item.create_time }}</div>
        <div class="row">
          <div class="text-left">{{ $t("mine.browserIndex.boxHeight") }}</div>
          <div class="text-right">{{ item.height }}</div>
        </div>
        <div class="row">
          <div class="text-left">{{ $t("mine.browserIndex.payNum") }}</div>
          <div class="text-right">{{ item.trans_num }}</div>
        </div>
        <div class="row">
          <div class="text-left">{{ $t("mine.browserIndex.pay") }}</div>
          <div class="text-right theme-text">{{ item.trans_total }}</div>
        </div>
        <div class="row">
          <div class="text-left">{{ $t("mine.browserIndex.hach") }}</div>
        </div>
        <div class="row">
          <div class="text-left">{{ item.coin_hash }}</div>
        </div>
      </div>
    </div>

    <div class="new-bill" v-if="!showCoinBlock">
      <div class="nav-title">{{ $t("mine.browserIndex.hach") }}</div>
      <div class="bill-item" v-for="(item, index) in transBlocks" :key="index">
        <div class="title">{{ item.tx_hash }}</div>
        <div class="row">
          <div class="text-left">{{ $t("mine.browserIndex.outputAddr") }}</div>
          <div class="text-right">{{ item.from_address }}</div>
        </div>
        <div class="row">
          <div class="text-left">{{ $t("mine.browserIndex.inputAddr") }}</div>
          <div class="text-right">{{ item.member_coin_addr }}</div>
        </div>
        <div class="row">
          <div class="text-left">{{ $t("mine.browserIndex.transferNum") }}</div>
          <div class="text-right theme-text">{{ item.amount }}</div>
        </div>
        <div class="row">
          <div class="text-left">{{ $t("mine.browserIndex.Casf") }}</div>
          <div class="text-right theme-text">{{ item.w_fee }}</div>
        </div>
        <div class="row">
          <div class="text-left">{{ $t("mine.browserIndex.comfirmNum") }}</div>
          <div class="text-right theme-text">{{ item.confirmations }}</div>
        </div>
        <div class="row">
          <div class="text-left">{{ $t("mine.browserIndex.status") }}</div>
          <div class="text-right theme-text">
            {{
              $t(
                `wallet.deposit.${
                  item.w_status === 1 ? "statusSucceed" : "statusSucceed"
                }`
              )
            }}
          </div>
        </div>
        <div class="row">
          <div class="text-left">{{ $t("mine.browserIndex.payDate") }}</div>
          <div class="text-right theme-text">{{ item.w_create_time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import {
  getBrowserBlocks,
  getBrowserTrans,
  getBrowserCoininfo,
} from "@/http/modules/mine";
import {
  Toast,
  Search as VanSearch,
  Grid as VanGrid,
  GridItem as VanGridItem,
} from "vant";
import i18n from "@/langs";

export default {
  name: "market",
  components: {
    Header,
    VanSearch,
    VanGrid,
    VanGridItem,
  },
  data() {
    return {
      searchText: "",
      page: 1,
      pageSize: 10,
      coinBlocks: [],
      transBlocks: [],
      coinInfo: {},
      showCoinBlock: true,
      hasNextPage: true,
      isLoading: false,
      coinInfoName: {
        height: i18n.t("mine.browserIndex.height"),
        gas: i18n.t("mine.browserIndex.gas"),
        trade_num: i18n.t("mine.browserIndex.trade_num"),
        trade_user_num: i18n.t("mine.browserIndex.trade_user_num"),
        hash_num: i18n.t("mine.browserIndex.hash_num"),
        trans_num: i18n.t("mine.browserIndex.trans_num"),
        team_power: i18n.t("mine.browserIndex.team_power"),
        address_num: i18n.t("mine.browserIndex.address_num"),
      },
    };
  },
  activated() {
    this.searchText = "";
    this.init();
    window.addEventListener("scroll", this.HandleScroll);
  },
  deactivated() {
    window.removeEventListener("scroll", this.menu);
  },
  methods: {
    init() {
      getBrowserBlocks(this.page).then((res) => {
        if (res && res.status === 1) {
          this.coinBlocks = res.coinBlocks;
        }
      });
      this.showCoinBlock = true;
      this.searchBlockValue(true);

      getBrowserCoininfo().then((res) => {
        if (res && res.status === 1) {
          this.coinInfo = res.data;
        }
      });
    },
    searchBlockValue(isLoadMore) {
      if (this.searchText === "") {
        return;
      }
      this.isLoading = true;
      Toast.loading({
        message: this.$t("requestResponse.LOADING"),
        forbidClick: true,
      });
      getBrowserTrans(this.searchText, this.page).then((res) => {
        this.isLoading = false;
        Toast.clear();
        if (res && res.status === 1) {
          if (res.withdraws.length === 0) {
            Toast(i18n.t("mine.browserIndex.hachError"));
          } else {
            this.showCoinBlock = false;
            if (isLoadMore) {
              this.transBlocks = [...this.transBlocks, ...res.withdraws];
            } else {
              this.transBlocks = res.withdraws;
              this.hasNextPage = true;
              this.page = 1;
            }
            if (this.transBlocks.length >= res.total) {
              this.hasNextPage = false;
            }
          }
        }
      });
    },
    HandleScroll() {
      //滚动条在Y轴上的滚动距离
      let documentScrollTop = document.documentElement.scrollTop;
      //页面高度
      let documentScrollHeight = document.documentElement.scrollHeight;
      //浏览器视口的高度
      let windowHeight = document.documentElement.clientHeight;

      let scroll = documentScrollTop + windowHeight - documentScrollHeight;
      if (scroll > -10) {
        if (self.hasNextPage && !self.isLoading) {
          this.page++;
          this.searchBlockValue(true);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$borderGray: #e4e4e4;
.wrapper {
  background: #f3f3f3;
  line-height: 1;
  .van-grid {
    position: relative;
    z-index: 0;
  }
  .search {
    margin: 15px;
    height: 41px;
    border-radius: 4px;
    padding: 0;
    background: #fff;
    overflow: hidden;
    .van-search__action {
      width: 80px;
      text-align: center;
      line-height: 41px;
      font-size: 15px;
      font-weight: 500;
      color: #ffffff;
      background-color: $themeColor;
    }
    .van-search__content {
      padding-left: 15px;
      background: #fff;
      .van-icon-search {
        width: 17px;
        height: 17px;
        color: #000;
        .van-field__control {
          margin-left: 12px;
          font-size: 13px;
          font-weight: 500;
          &::placeholder {
            color: #b3b3b3;
          }
        }
      }
    }
  }
  .van-grid-item__content {
    padding: 0;
    .content-item {
      padding: 5px 15px;
      color: $themeColor;
      font-size: 13px;
      text-align: center;
      .name {
        margin-top: 21px;
      }
    }
  }
  .new-bill {
    padding: 15px;
    .nav-title {
      padding: 15px 0;
      font-size: 15px;
      font-weight: 500;
      color: #333333;
    }
    .bill-item {
      margin-bottom: 14px;
      background: #ffffff;
      box-shadow: 0px 2px 3px 0px rgba(57, 57, 57, 0.06);
      border-radius: 4px;
      padding-bottom: 3px;
      .title {
        margin-bottom: 20px;
        padding: 22px 15px 17px;
        font-size: 13px;
        font-weight: 500;
        color: #666666;
        border-bottom: 1px solid $borderGray;
      }
      .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px 17px;
        .text-left {
          font-size: 13px;
          font-weight: 500;
          color: #666666;
        }
        .text-right {
          font-size: 15px;
          font-weight: bold;
          color: #333333;
        }
      }
    }
  }
}
</style>