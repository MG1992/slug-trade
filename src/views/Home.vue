<template>
  <div class="home-wrapper">
    <div class="header_box">
      <div class="scan_icon">
        <van-icon @click="scan" color="#FFF" size="26" name="scan" />
      </div>
      <div @click="toOreList">
        <p>{{ $t("home.index.mineBenefit") }}</p>
        <h1>{{ $n(unFrozenCount || 0, "maximumSignificantDigits8") }}</h1>
        <!-- <p class="round_text cash">≈ {{ calAsset }} {{ $t("common.CNY") }}</p> -->
        <p class="round_text">{{ $t("home.index.clickToCheckDetail") }}</p>
      </div>
    </div>

    <div class="content_box">
      <!-- 宫格菜单 -->
      <van-row class="home-row">
        <van-col
          v-for="(item, index) in iconRows"
          :key="index"
          @click="handleIconClick(item)"
          span="6"
          :class="index < 4 && 'margin-bottom-short'"
        >
          <img class="home-icon-img" :src="item.icon" />
          <div class="aui-grid-label">{{ item.name }}</div>
        </van-col>
      </van-row>

      <!-- 最新动态 -->
      <h3 class="tip_title">{{ $t("home.index.newestDynamic") }}</h3>
      <div class="new_active">
        <!-- <van-icon class="new_active_left" size="18" color="#FA4261" name="volume-o" /> -->
        <span class="new_active_center" @click="toNoticeDetail(newsValue.id)">
          {{ newsValue.a_title }}
        </span>
        <span class="new_active_more" @click="toNotice"
          >{{ $t("home.index.checkAllNotification") }}></span
        >
      </div>

      <!-- 灯塔链 slide -->
      <section class="invite_box">
        <img class="invite_friend_img" src="@/assets/img/dengta.png" />
      </section>

      <!-- 币币交易 -->
      <h3 class="market_title">
        <div class="market_title_item active">
          <span>{{ $t("home.index.marketTitle") }}</span>
        </div>
      </h3>
      <section class="market_box">
        <div class="market_box_nav">
          <div class="market_box_nav_left">{{ $t("market.name") }}</div>
          <div class="market_box_nav_center">{{ $t("market.newPrice") }}</div>
          <div class="market_box_nav_right">{{ $t("market.upDownRange") }}</div>
        </div>
        <!-- ws渲染 -->
        <ul class="aui-list">
          <li
            class="aui-list-item"
            v-for="(ticker, index) in marketList"
            :key="index"
          >
            <!-- @click="toKLine(marketData[ticker])" -->
            <van-row v-if="!ticker.notOpened">
              <van-col span="8" class="aui-pull-left">
                <div>
                  <!-- <span
                    class="color_F3_16"
                    v-text="ticker.base_currency"
                  ></span> -->
                  <span class="market-box-light-gary" v-text="ticker.id"></span>
                </div>
                <!-- <div class="aui-padded-t-5 market-box-gary">
                  {{ $t("home.index.24HAmount") }}
                  <span v-text="ticker.rise" class="color_F6_12"> </span>
                </div> -->
              </van-col>
              <van-col span="8" class="aui-font-size-16 text-center">
                <span v-text="ticker.price"></span>
                <!-- <br />
                <span class="market-box-gary">
                  ≈
                  {{ $n(ticker.cny_price, "currency") }}
                </span> -->
              </van-col>
              <van-col
                span="8"
                class="aui-pull-right aui-text-right text-right"
              >
                <div
                  v-text="ticker.rise + '%'"
                  class="aui-padded-t-5 m-t-10 percent"
                  :class="{
                    up: ticker.rise > 0,
                    down: ticker.rise < 0,
                  }"
                ></div>
              </van-col>
            </van-row>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Icon as VanIcon, Col as VanCol, Row as VanRow, Toast } from "vant";
import { getAllTicker, getSurge } from "@/http/modules/home";
import { base_country } from "@/config/globalVariable";
import { getAddressList } from "@/http/modules/mine";
import BigNumber from "bignumber.js";
import { getCurrency } from "@/http/modules/wallet";
import { storage } from "@/utils/oldVersionFunc";
import { getMarketList } from "@/http/modules/home";

export default {
  name: "home",
  components: {
    VanIcon,
    VanCol,
    VanRow,
  },
  data() {
    return {
      currency: base_country,
      quote_currency: "CNY",
      newsValue: {},
      timer: null,
      priceTimer: null,
      BigNumber,
      // USDTtoCNY: 1, //汇率
      // 键值对键名
      msgsKeys: [],
      // 行情数据 object，方便ws获取的数据实时替换
      // marketData: {},
      unFrozenCount: "",
      marketList: [],
    };
  },
  activated() {},
  deactivated() {
    // this.socketClose();
  },
  created() {},
  mounted() {
    // 获取首页行情价格
    getMarketList().then((res) => {
      this.marketList = res;
    });
  },
  computed: {
    // 为了语言切换 放到computed监听
    iconRows() {
      return [
        {
          name: this.$t("home.index.transfer"),
          icon: require("@/assets/img/home_1.svg"),
          router: "TransferAccounts",
        },
        {
          name: this.$t("home.index.receive"),
          icon: require("@/assets/img/home_2.svg"),
          router: "Gathering",
        },
        {
          name: this.$t("home.index.OTC"),
          icon: require("@/assets/img/home_5.svg"),
          router: "/adsList",
        },
        {
          name: this.$t("home.index.accountBook"),
          icon: require("@/assets/img/home_4.svg"),
          router: `/withdrawsRecords?currency=${base_country}`,
        },
        {
          name: this.$t("home.index.purchase"),
          icon: require("@/assets/img/home_5.svg"),
          router: "subscribe",
        },
        {
          name: this.$t("home.index.superNewCoin"),
          icon: require("@/assets/img/home_6.svg"),
          router: "currencyShares",
        },
        {
          name: this.$t("home.index.blackHole"),
          icon: require("@/assets/img/home_7.svg"),
          router: "blackHole",
        },
        {
          name: this.$t("home.index.crowdfunding"),
          icon: require("@/assets/img/home_8.svg"),
          router: "curBorrowing",
        },
      ];
    },
  },
  methods: {
    toOreList: function () {
      // this.$router.push({ path: "/ore" });
      this.$router.push({ path: "/pledge" });
    },
    toNotice: function () {
      this.$router.push({ path: "/systemNotice" });
    },
    async handleIconClick(item) {
      if (!item.router) {
        Toast(this.$t("common.pleaseExpected"));
        return;
      }
      if (item.router === "subscribe") {
        const res = await getAddressList();
        if (res.status && res.data) {
          var isMain = false;
          const results = res.data;
          results.forEach(function (v) {
            if (v.status === 1 && v.is_identity === 1) {
              isMain = true;
            }
          });
          if (!isMain) {
            Toast(this.$t("home.index.subscribeByMainAccount"));
            return;
          }
        }
      }
      if (item.router === "TransferAccounts") {
        storage.set("subChain", null);
        this.$router.push({
          name: item.router,
          params: {
            currencyName: this.currency,
            isMarket: true,
            noTitle: true,
            innerTransfer: true,
          },
        });
        return;
      }
      // 有些页面需要带参数
      this.$router.push({
        path: item.router,
      });
    },
    copy() {
      // new ClipboardJS(".invite_friend_img").on("success", function(e) {
      //   say("用户邀请链接复制成功")
      //   e.clearSelection()
      // })
    },
    scan() {
      const self = this;
      if (process.env.VUE_APP_IS_APP) {
        const FNScanner = window.api.require("FNScanner");
        FNScanner.open(
          {
            autorotation: false,
          },
          function (ret, err) {
            if (ret) {
              if (ret.eventType === "success") {
                const content = ret.content;
                // 转出
                storage.set("subChain", null);
                getCurrency(self.currency).then((res) => {
                  if (res.currency.can_withdraw) {
                    self.$router.push({
                      name: "TransferAccounts", //转账
                      params: {
                        currency: res.currency,
                        currencyName: self.currency,
                        scan: content,
                      },
                    });
                  } else {
                    Toast(self.$t("wallet.wallet.Error2"));
                  }
                });
              } else if (ret.eventType == "fail") {
                // 调用失败
                Toast(self.$t("home.index.callFailed"));
              }
            } else {
              console.log(err);
            }
            return;
          }
        );
      }
    },
    toKLine(ticker) {
      this.$router.push({ path: "kline", query: ticker });
    },
  },
  destroyed() {},
};
</script>
<style lang="scss" scoped>
.header_box {
  background-image: url("./../assets/img/home_banner.gif");
  background-size: 100% auto;
  padding: 40px 25px 50px;
  font-size: 13px;
  position: relative;
}
.header_icon {
  text-align: right;
}
.scan_icon {
  position: absolute;
  right: 25px;
  top: 37px;
}
.round_text {
  font-size: 12px;
}
.header_icon img {
  height: 30px;
  width: 30px;
}
.header_box p {
  color: #fff;
}
.header_box h1 {
  font-size: 21px;
  line-height: 30px;
  padding: 8px 0;
  margin: 3px 0;
  color: #fff;
}
.header_box .cash {
  color: rgba(255, 237, 6, 1);
}

.content_box {
  position: relative;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  margin-top: -25px;
  overflow: hidden;
  padding: 0 15px;
}
.tip_title {
  font-size: 15px;
  color: #333;
  margin-bottom: 15px;
  margin-top: 20px;
}
.row-title {
  margin: 0;
  margin-bottom: -10px;
  padding-top: 20px;
  border-top: 10px solid #f7f6fb;
}
.new_active {
  position: relative;
  background-color: #f6f6f6;
  border-radius: 5px;
  color: #666;
  padding: 0 10px;
  margin-bottom: 15px;
  min-height: 35px;
  width: 100%;
}
.new_active_center {
  font-size: 13px;
  color: #666;
  line-height: 35px;
}
.new_active_left {
  position: absolute;
}
.new_active_more {
  font-size: 12px;
  color: $themeColor;
  line-height: 35px;
  position: absolute;
  right: 15px;
  top: 0;
}
.invite_box {
  padding: 15px 0;
}
.invite_box img {
  border-radius: 5px;
  border: 1px solid #f6f6f6;
}

.amount_box .aui-card-list {
  padding: 10px 8px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #fe3b59;
}
.amount_box .aui-card-list p {
  color: #fff;
  font-size: 12px;
}
.amount_box .amount_num {
  color: #fff;
  text-align: left;
}
.invite_friend_img {
  height: auto;
  border-radius: 4px;
  width: 100%;
}
/*no-login-block*/
.no-login-block {
  padding: 1.5rem;
  padding-top: 7rem;
  color: #999;
  text-align: center;
}
.no-login-block img {
  margin: auto;
  width: 70%;
  display: block;
}
/*end*/
.aui-slide-wrap {
  margin-bottom: 15px;
  border-radius: 5px;
}
.aui-slide-node img {
  width: auto;
  height: 100%;
  position: relative;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.color_F6 {
  color: #999;
}
.color_F6_12 {
  color: #999;
  font-size: 12px;
}
.color_F3_16 {
  color: #333;
  font-size: 16px;
}
.margin_5 {
  padding-top: 5px;
}

.aui-list .aui-list-item {
  padding: 5px 12px;
  // background-color: #f6f6f6;
  border-radius: 5px;
  box-shadow: none;
  // margin-bottom: 10px;
  border-bottom: solid 1px #f4f4f4;
}
.aui-list .aui-list-item:last-child {
  padding: 5px 12px;
  // background-color: #f6f6f6;
  border-radius: 5px;
  box-shadow: none;
  // margin-bottom: 10px;
  border-bottom: solid 1px #f4f4f4;
}

.aui-list .aui-list-item .iconfont {
  padding-right: 0.25rem;
  color: #c7c9da;
  font-size: 0.9rem;
}

.aui-list .aui-list-item .percent {
  display: inline-block;
  width: 65px;
  text-align: center;
  padding: 4px 0px;
  color: #fff;
  border-radius: 2px;
  font-size: 13px;
  background: #9596ab;
  white-space: nowrap;
}

.aui-list .aui-list-item .percent.up {
  background: #03ad90;
}

.aui-list .aui-list-item .percent.down {
  background: #d14b64;
}

/*公告*/
.notice.aui-list .aui-list-item {
  padding: 0;
  padding-left: 0.75rem;
  color: #333;
}
.aui-list .van-col {
  line-height: 25px;
}
/*宫格菜单*/
.aui-grid {
  background-color: #fff;
}
.home-icon-img {
  display: inline-block;
  width: 47px;
  // height: 34px;
  margin: 12px 0 8px 0;
}
.aui-grid-label {
  color: #333;
  white-space: nowrap;
}
.home-wrapper {
  .margin-bottom-short {
    margin-bottom: -10px;
  }
  padding-bottom: 60px;
  .home-row {
    .van-col {
      text-align: center;
      padding: 20px 0 10px 0;
      overflow: hidden;
    }
  }
  .home-row-2 {
    .van-col {
      padding: 10px 0 10px 0;
    }
  }
}
.market-box-gary {
  color: #8a939a;
}
.market-box-light-gary {
  color: #bec2c5;
}
.market_title {
  position: relative;
  margin-top: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 43px;
  line-height: 43px;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid #f4f4f4;
  &::after {
    content: "";
    position: absolute;
    top: -10px;
    left: -15px;
    right: -15px;
    margin: auto;
    height: 10px;
    background: #f7f6fb;
  }
  &_item {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    max-width: 33.33%;
    text-align: center;
    font-size: 16px;
    font-family: "PingFang SC";
    font-weight: bold;
    color: $themeColor;
    &.active {
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: $themeColor;
        border-radius: 1px;
      }
    }
  }
}
.market_box_nav {
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: "PingFang SC";
  font-weight: 500;
  color: #8193a0;
  [class^="market_box_nav"] {
    flex: 1;
  }
  &_center {
    text-align: center;
  }
  &_right {
    text-align: right;
  }
}
</style>
