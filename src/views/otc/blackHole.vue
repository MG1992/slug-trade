<template>
  <div class="wrapper blackHole">
    <div class="banner">
      <van-nav-bar
        :title="$t('pledge.blackHole.title')"
        :left-arrow="true"
        @click-left="onClickLeft"
        :border="false"
      />
      <div class="title">{{ $t("pledge.blackHole.allNum") }}</div>
      <div class="content">{{ number }}</div>
    </div>

    <div class="line"></div>

    <pagination
      :data="pageData"
      @getList="getList"
      @returnList="returnList"
      :finishedText="
        orderList.length === 0 ? '' : $t('pledge.blackHole.notMore')
      "
      listName="list"
    >
      <no-data v-if="orderList.length === 0 && !loading"></no-data>

      <div class="border-line"></div>

      <div class="list" v-for="(item, index) in orderList" :key="index">
        <div class="row">
          <div class="row-item">
            <div class="name">{{ $t("pledge.blackHole.Num") }}</div>
            <div class="value">
              {{ item.blackhold }}{{ $t("pledge.pledge.unit") }}
              {{ item.currency }}
            </div>
          </div>
          <div class="row-item">
            <div class="name">{{ $t("pledge.blackHole.time") }}</div>
            <div class="value">{{ item.w_create_time }}</div>
          </div>
        </div>
        <div class="row">
          <div class="row-item">
            <div class="name">{{ $t("pledge.blackHole.addr") }}</div>
            <div class="value">{{ item.member_coin_addr }}</div>
          </div>
        </div>
      </div>
    </pagination>
  </div>
</template>
<script>
import empty_icon from "@/assets/icons/empty_icon.png";
import { getBlackHold } from "@/http/modules/otc";
import NoData from "@/components/NoData";
import Pagination from "@/components/Pagination";
import { NavBar as VanNavBar } from "vant";
import { getBlackHole } from "@/http/modules/home";

export default {
  name: "blackHole",
  components: {
    VanNavBar,
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
      isShowConfirmAgainPop: true,
      password: "",
      number: "",
    };
  },
  activated() {
    this.getList(0);

    getBlackHole().then((res) => {
      if (res.status === 1) {
        this.number = res.data || 0;
      }
    });
  },
  methods: {
    getList(data) {
      const pageNum = data ? data.pageNum : 1;
      const pageSize = data ? data.pageSize : 10;
      this.loading = true;

      getBlackHold(pageNum, pageSize).then((res) => {
        this.pageData = {
          pageNum,
          pageSize,
          list: res.withdraws,
          total: res.total,
        };
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
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss">
.blackHole {
  .van-nav-bar {
    background: transparent !important;
    .van-icon {
      color: $themeColor !important;
    }
    .van-nav-bar__title {
      color: #fff !important;
    }
  }
}
</style>
<style lang="scss" scoped>
@import url("vant/lib/icon/local.css");
$txtBlack: #202028;
$txtGreen: #02ad90;
$txtRed: #ce435d;
$txtGray: #8193a0;
$txtYellow: #efba6b;
$txtNav: #96a8b0;
.wrapper {
  padding: 130px 0 70px;
  min-height: 100%;
  .line {
    width: 100%;
    height: 10px;
    background: #f7f6fb;
  }
  .border-line {
    width: 100%;
    height: 24px;
    border-bottom: 1px solid #f4f4f4;
  }
  .banner {
    position: fixed;
    left: 0;
    top: $appStatusTop;
    width: 100%;
    height: 130px;
    background-image: url("../../assets/img/heidongBanner.png");
    background-size: 100% 100%;
    color: #fff;
    z-index: 10;
    .title {
      padding: 10px 20px 0;
      font-size: 13px;
    }
    .content {
      font-weight: bold;
      font-size: 25px;
      padding: 16px 20px;
    }
  }
  .list {
    padding: 0 15px 25px;
    border-bottom: 1px solid #ececec;
    line-height: 1;
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 25px;
      font-size: 13px;
      color: $txtBlack;
      .name {
        color: $txtGray;
        margin-bottom: 10px;
      }
      &-item {
        flex: 1;
      }
    }
  }
}
</style>