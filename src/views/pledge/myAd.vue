<template>
  <div class="wrapper header-page">
    <Header title="我的广告"></Header>

    <div class="content">
      <div class="list" v-for="(item, index) in list" :key="index">
        <div class="nav">
          <div class="sell" v-if="item.trans_type == 1">
            {{ $t("pledge.myAd.sell") }}
          </div>
          <div class="buy" v-else>{{ $t("pledge.myAd.buy") }}</div>
          <div class="currency">{{ item.symbol }}</div>
          <div class="tips">
            {{
              item.advertise_status == "1"
                ? $t("pledge.myAd.statusOn")
                : $t("pledge.myAd.statusOff")
            }}
          </div>
          <div
            class="btn"
            v-if="item.advertise_status == '1'"
            @click="turnOff(item)"
          >
            {{ $t("pledge.myAd.off") }}
          </div>
        </div>
        <div class="row">
          <div class="item">
            <div class="item-name">{{ $t("mine.ads.unitPrice") }}</div>
            <div class="item-value">
              {{ $n(item.price, "maximumSignificantDigits4") }}
            </div>
          </div>
          <div class="item">
            <div class="item-name">{{ $t("mine.ads.quantity") }}</div>
            <div class="item-value">{{ item.trade_num }}</div>
          </div>
          <div class="item text-right">
            <div class="item-name">{{ $t("mine.ads.limitQuantity") }}</div>
            <div class="item-value">
              {{ item.least_amount }}-{{ item.max_amount }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <div class="item-name">{{ $t("wallet.deposit.labelTime") }}</div>
            <div class="item-value">{{ item.created_date }}</div>
          </div>
          <div class="icon-box">
            <VanIcon
              v-for="(items, index) in item.payment_types"
              :key="index"
              class="icon"
              :name="items == 1 ? wechat : items == 2 ? ali : bank"
              size="16"
            />
          </div>
        </div>
      </div>
    </div>
    <notData v-if="!list.length" />
  </div>
</template>
<script>
import Header from "@/components/Header";
import { Icon as VanIcon } from "vant";
import notData from "@/components/notData";
import wechat from "@/assets/icons/wechat.png";
import ali from "@/assets/icons/ali.png";
import bank from "@/assets/icons/bank.png";
import { getMyadvertise, offAds } from "@/http/modules/pattern.js";

export default {
  name: "pledge",
  components: {
    notData,
    Header,
    VanIcon
  },
  data() {
    return {
      ali,
      bank,
      wechat,
      list: [],
      page: 1
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      getMyadvertise().then(res => {
        if (res.status === 1) {
          let list = res.data.list.map(item => {
            item.payment_types = item.payment_types
              ? item.payment_types.split(",")
              : [];
            return item;
          });
          this.list = list;
        }
      });
    },
    turnOff(item) {
      offAds(item.id).then(() => {
        this.init();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
$txtGreen: #03ad90;
$txtRed: #ce435d;
$txtYellow: #edb259;
$txtBlack: #333333;
$txtGray: #8193a0;
.text-yellow {
  color: $txtYellow !important;
}
.wrapper {
  background: #fff;
  .content {
    .list {
      padding: 20px 16px;
      border-bottom: 1px solid #f4f4f4;
      .nav {
        position: relative;
        display: flex;
        align-items: center;
        @mixin fontCss {
          font-size: 16px;
          font-weight: 800;
        }
        .buy {
          @include fontCss;
          color: $txtGreen;
        }
        .sell {
          @include fontCss;
          color: $txtRed;
        }
        .currency {
          margin-left: 7px;
          font-size: 16px;
        }
        .tips {
          width: 55px;
          background: #f0f0f0;
          border-radius: 10px;
          text-align: center;
          line-height: 20px;
          color: $txtGray;
          margin-left: 12px;
        }
        .btn {
          position: absolute;
          top: 0px;
          right: 20px;
          text-align: right;
          width: 24px;
          height: 20px;
          font-size: 12px;
          font-weight: bold;
          color: #efba6b;
          line-height: 20px;
        }
      }
      .row {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .text-right {
          text-align: right;
        }
        .item {
          &-name {
            font-size: 12px;
            color: $txtGray;
          }
          &-value {
            margin-top: 8px;
            font-size: 13px;
            color: $txtBlack;
          }
        }
        .icon-box {
          .icon {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>