<template>
  <div class="wrapper header-page">
    <Header :title="$t('trade.orderDetail.title')" />

    <div class="nav">
      <div
        class="item"
        :class="{ active: navStatus === 1 }"
        @click="switchTab(1)"
      >
        进行中
      </div>
      <div
        class="item"
        :class="{ active: navStatus === 2 }"
        @click="switchTab(2)"
      >
        已完成
      </div>
    </div>

    <pagination
      :data="pageData"
      @getList="getList"
      @returnList="returnList"
      :finishedText="' '"
      listName="list"
    >
      <no-data v-if="orderList.length === 0 && !loading"></no-data>

      <div
        class="order-content"
        v-for="item in orderList"
        :key="item.id"
        @click="toDetail(item)"
      >
        <div :class="`content ${item.trans_type == '1' ? 'sell' : 'buy'}`">
          <div class="content-nav">
            <div class="left">
              <span>{{ transTypeText[item.trans_type] }}</span>
              {{ item.symbol }}
            </div>
            <div class="right">
              {{
                navStatus == 1
                  ? item.trans_type == "1"
                    ? receiveStatusText[item.receive_status]
                    : payStatusText[item.pay_status]
                  : orderStatusText[item.order_status]
              }}
              >
            </div>
          </div>

          <div class="content-box">
            <div class="item">
              <p class="name">订单编号</p>
              <p class="value">{{ item.order_no }}</p>
            </div>
            <div class="item">
              <p class="name">订单数量</p>
              <p class="value">{{ item.trade_num }}</p>
            </div>
            <div class="item">
              <p class="name">交易总额</p>
              <p class="value">{{ item.total_price }}</p>
            </div>
            <div class="item_full">
              <p class="name">下单时间</p>
              <p class="value">{{ item.created_date }}</p>
            </div>
          </div>
        </div>
      </div>
    </pagination>
  </div>
</template>
<script>
import Header from "@/components/Header";
import empty_icon from "@/assets/icons/empty_icon.png";
import { getMyOrderList } from "@/http/modules/otc";
import NoData from "@/components/NoData";
import Pagination from "@/components/Pagination";

export default {
  name: "orderDetail",
  components: {
    Header,
    NoData,
    Pagination,
  },
  data() {
    return {
      empty_icon,
      navStatus: 1,
      loading: false,
      Pagination,
      pageData: {},
      orderList: [],
      transTypeText: {
        1: "出售",
        2: "购买",
      },
      receiveStatusText: {
        1: "待收款",
        2: "未收款",
        3: "已收款",
      },
      payStatusText: {
        1: "待支付",
        2: "已支付",
        3: "已取消",
      },
      orderStatusText: {
        2: "已完成",
        3: "已取消",
      },
    };
  },
  activated() {
    this.getList(0);
  },
  methods: {
    getList(data) {
      const pageNum = data ? data.pageNum : 1;
      const pageSize = data ? data.pageSize : 10;
      this.loading = true;

      getMyOrderList(this.navStatus, pageNum, pageSize).then((res) => {
        this.pageData = res.data;
        this.loading = false;
      });
    },
    returnList(list) {
      this.orderList = list || [];
    },
    toDetail(item) {
      this.$router.push(`buyPaymentOrder?id=${item.id}`);
    },
    switchTab(tab) {
      this.navStatus = tab;
      this.getList(0);
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("vant/lib/icon/local.css");
$txtBlack: #202028;
$txtGreen: #02ad90;
$txtRed: #ce435d;
$txtGray: #8193a0;
$txtYellow: #efba6b;
$txtNav: #96a8b0;
.wrapper {
  .nav {
    padding: 18px 15px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    .item {
      margin-right: 34px;
      font-size: 17px;
      font-weight: 800;
      color: $txtNav;
      &.active {
        color: $txtBlack;
        font-size: 25px;
      }
    }
  }
  .content {
    padding: 20px 15px;
    border-bottom: 1px solid #f4f4f4;
    &.sell {
      .content-nav {
        .left {
          span {
            color: $txtRed;
          }
        }
      }
    }
    &-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        color: $txtBlack;
        font-size: 16px;
        span {
          margin-right: 6px;
          font-size: 16px;
          color: $txtGreen;
        }
      }
      .right {
        color: $txtYellow;
        font-size: 12px;
      }
    }
    .content-box {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      .item,
      .item_full {
        margin-top: 20px;
        .name {
          color: $txtGray;
          font-size: 12px;
        }
        .value {
          margin-top: 10px;
          color: $txtBlack;
          font-size: 13px;
        }
        &:nth-of-type(3n-1) {
          text-align: center;
        }
        &:nth-of-type(3n-3) {
          text-align: right;
        }
      }
      .item {
        width: 33.33%;
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
</style>