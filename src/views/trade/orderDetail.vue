<template>
  <div class="wrapper header-page">
    <Header :title="$t('trade.orderDetail.title')" />

    <div class="content">
      <div class="item" v-for="(order, index) in orders" :key="index">
        <div class="item-title">
          <div class="text-left">
            <div
              class="type"
              :class="{
                'text-red': order.o_type == 'sell',
                'text-green': order.o_type == 'buy',
              }"
            >{{ $t(`trade.trade.${order.o_type}`) }}</div>
            <span>{{ order.base_currency }}</span>
            <div
              class="tag"
              v-if="order.o_price_type == 'limit'"
            >{{ $t("trade.orderDetail.orderTag") }}</div>
          </div>
          <div class="text-right">{{ order.create_time }}</div>
        </div>

        <div class="item-detail">
          <div class="row options">
            <div class="text-left">{{ $t("trade.orderDetail.entrustPrice") }}</div>
            <div class="text-center">{{ $t("trade.orderDetail.entrustNum") }}</div>
            <div class="text-right">{{ $t("trade.orderDetail.dealAmount") }}</div>
          </div>
          <div class="row values">
            <div class="text-left">{{ order.price }} {{ order.quote_currency }}</div>
            <div class="text-center">
              {{ order.volume }}
              <span v-if="order.o_price_type == 'limit'">{{ order.base_currency }}</span>
              <span v-else-if="order.o_type == 'buy'">{{ order.quote_currency }}</span>
              <span v-else-if="order.o_type == 'sell'">{{ order.base_currency }}</span>
            </div>
            <div class="text-right">{{ order.done_volume }}</div>
          </div>

          <div class="row">
            <div>{{ statusTxt(order.o_status) }}</div>
            <button class="btn" @click="HandleCancel(order)">{{ $t("requestResponse.CANCEL") }}</button>
          </div>
        </div>
      </div>

      <div class="not-data" v-if="orders.length === 0">
        <img :src="empty_icon" />
        <p>{{ $t("requestResponse.NO_DATA") }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header"
import { Toast } from "vant"
import i18n from "@/langs"
import empty_icon from "@/assets/icons/empty_icon.png"

import { deleteOrder, getStatusZeroOrders } from "@/http/modules/trade"

export default {
  name: "orderDetail",
  components: {
    Header,
  },
  data() {
    return {
      orders: [],
      empty_icon,
    }
  },
  mounted() {
    Toast.loading({
      message: i18n.t("requestResponse.LOADING"),
      forbidClick: true,
    })
    let { symbol } = this.$route.params
    let page = 1

    console.log(11111111, this.$route)

    this.getStatusZeroOrders(symbol, page)
  },
  methods: {
    HandleCancel(order) {
      const { symbol } = this.$route.params
      deleteOrder({
        id: order.id,
        o_no: order.o_no,
        symbol,
      }).then(() => {
        Toast(this.$t("trade.trade.revokeSuccess"))
        this.orders = []
        this.getStatusZeroOrders(symbol, 1)
      })
    },
    getStatusZeroOrders(symbol, page) {
      getStatusZeroOrders(symbol, page++).then((res) => {
        this.orders.push(...res.orders)
        Toast.clear()
        if (res.orders.length === 20) {
          this.getStatusZeroOrders(symbol, page++)
        }
      })
    },
    statusTxt(status) {
      let result
      switch (status) {
        case "watting":
          result = this.$t("trade.orderDetail.dealWait")
          break
        case "partial-done":
          result = this.$t("trade.orderDetail.PARTIAL_DONE")
          break
        case "done":
          result = this.$t("trade.orderDetail.DONE")
          break
        case "partial-canceled":
          result = this.$t("trade.orderDetail.PARTIAL_CANCELED")
          break
        case "canceled":
          result = this.$t("trade.orderDetail.CANCELED")
          break
      }
      return result
    },
  },
}
</script>
<style lang="scss" scoped>
@import url("vant/lib/icon/local.css");
$borderRed: #fc4a68;
$txtRed: #fc4a68;
$txtGray: #9a9a9a;
$txtBlack: #343434;
$txtBlackTips: #666666;
$txtGreen: #00c49c;
$txtBlue: #3494ff;
$borderGray: #ededed;
$bgGray: #f3f3f3;
$bgWhite: #ffffff;
.text-red {
  color: $txtRed !important;
}
.text-green {
  color: $txtGreen !important;
}
.wrapper {
  font-weight: 500;
  font-family: PingFang SC;
  .content {
    width: 100%;
    min-height: 100vh;
    padding: 15px;
    background: $bgGray;
    .item {
      background: $bgWhite;
      border-radius: 4px;
      box-shadow: 1px 2px 3px 0px rgba(57, 57, 57, 0.06);
      margin-bottom: 15px;
      &-title {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 16px 15px 0;
        font-size: 13px;
        color: $txtBlack;
        .text-left {
          display: flex;
          align-items: flex-end;
          .type {
            color: $txtRed;
            font-size: 18px;
            font-weight: bold;
            margin-right: 8px;
          }
          .tag {
            margin-left: 20px;
            font-size: 10px;
            padding: 2px 4px;
            color: $txtBlue;
            border: 1px solid $txtBlue;
            border-radius: 2px;
            transform: scale(0.9);
          }
        }
      }
      &-detail {
        margin-top: 17px;
        border-top: 1px solid $borderGray;
        padding: 22px 15px;
        .row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          font-size: 13px;
          color: $txtBlackTips;
          & > div {
            flex: 1;
          }
          &.options {
            margin-bottom: 11px;
            font-size: 12px;
            color: $txtGray;
          }
          &.values {
            margin-bottom: 28px;
            color: $txtBlack;
          }
          .btn {
            width: 50px;
            height: 22px;
            color: $txtRed;
            font-size: 12px;
            border: 1px solid $borderRed;
            border-radius: 3px;
            background-color: transparent;
          }
        }
      }
    }
    .not-data {
      margin: 70px auto;
      text-align: center;
      font-size: 14px;
      color: $txtGray;
      img {
        width: 168px;
        margin: auto;
      }
    }
  }
}
</style>