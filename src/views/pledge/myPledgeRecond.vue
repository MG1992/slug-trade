<template>
  <div class="export-spacific-addr header-page">
    <Header :title="$t('pledge.pledge.record')" />

    <div class="banner">
      <p class="title">
        {{ $t("pledge.pledge.allProfit") }}
      </p>
      <div class="content">
        {{ $n(unFrozenCount, "maximumSignificantDigits8") }}
        <span>SSCV</span>
      </div>
    </div>

    <div class="border-bottom"></div>

    <div class="nav">
      <div class="nav-item" :class="{ active: type === 1 }" @click="type = 1">
        质押记录
      </div>
      <div class="nav-item" :class="{ active: type === 2 }" @click="type = 2">
        收益记录
      </div>
    </div>

    <div class="list_box" v-for="(item, index) in list" :key="index">
      <div class="text_left">
        <p class="list_title">{{ $t("pledge.pledge.num") }}</p>
        <p>
          {{ $n(item.amount, "maximumSignificantDigits8") }}
        </p>
      </div>

      <div class="text_left" v-if="type === 1">
        <p class="list_title">{{ $t("mine.browserIndex.status") }}</p>
        <p>
          {{
            item.invest_status == 1 ? $t("pledge.pledge.inOperation") : "已结束"
          }}
        </p>
      </div>
      <div class="text_left" v-else>
        <p class="list_title">{{ $t("home.ore.earningsCount") }}</p>
        <p>
          {{ $n(item.unfrozen_num, "maximumSignificantDigits8") }}
        </p>
      </div>

      <div class="text_right">
        <p class="list_title">
          {{ type === 1 ? "购买时间" : $t("pledge.pledge.profitTime") }}
        </p>
        <p>{{ item.created_time }}</p>
      </div>
    </div>

    <notData v-if="list.length === 0" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import { rationrecord, unfrozenrecord } from "@/http/modules/pattern.js";
import notData from "@/components/notData";

export default {
  name: "myPledgeRecond",
  components: {
    Header,
    notData,
  },
  data() {
    return {
      interestVOList: [], //质押记录
      unFrozenList: [], //收益记录
      page1: 1,
      page2: 1,
      type: 1,
      unFrozenCount: "",
    };
  },
  computed: {
    list() {
      return this.type === 1 ? this.interestVOList : this.unFrozenList;
    },
  },
  mounted() {
    this.rationrecord();
    this.unfrozenrecord();
  },
  methods: {
    //质押记录
    rationrecord() {
      rationrecord(this.page1).then((res) => {
        if (res.status === 1) {
          this.interestVOList.push(...res.data.interestVOList.list);
          if (res.data.interestVOList.hasNextPage) {
            this.page1++;
            this.rationrecord();
          }
        }
      });
    },
    //收益记录
    unfrozenrecord() {
      unfrozenrecord("all", this.page2).then((res) => {
        if (res.status === 1) {
          this.unFrozenCount = res.data.unFrozenCount;
          this.unFrozenList.push(...res.data.unFrozenList.list);
          if (res.data.unFrozenList.hasNextPage) {
            this.page2++;
            this.unfrozenrecord();
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.export-spacific-addr {
  background-color: #f3f3f3;
  min-height: 100vh;
  .banner {
    width: 100%;
    height: 100px;
    background-image: url("../../assets/img/ore_banner.png");
    background-size: cover;
    padding: 26.5px 14.5px 0;
    color: #fff;
    line-height: 1;
    .title {
      font-size: 13px;
    }
    .content {
      margin-top: 20px;
      font-size: 25px;
      font-weight: bold;
      span {
        font-size: 14px;
      }
    }
  }
  .van-cell-group {
    margin-bottom: 10px;
  }
  .van-cell__title {
    color: #919daa;
    font-size: 13px;
  }
  .van-cell__value {
    color: #333333;
    font-size: 13px;
  }
  .list_box {
    display: flex;
    background: #fff;
    padding: 15px 20px;
    line-height: 1.8;
    border-bottom: 1px solid #f4f4f4;
    .list_title {
      color: #8193a0;
    }
    .text_left {
      flex: 1.5;
      text-align: left;
    }
    .text_right {
      flex: 2;
      text-align: right;
    }
  }
  .border-bottom {
    height: 10px;
    background: #f7f6fb;
  }
  .nav {
    height: 47px;
    background: #fff;
    border-bottom: 1px solid #f4f4f4;
    padding: 0 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-item {
      position: relative;
      line-height: 47px;
      padding: 0 7px;
      font-size: 13px;
      color: #8193a0;
      &.active {
        color: #edb259;
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          left: 0;
          bottom: 0;
          background: #edb259;
        }
      }
    }
  }
}
</style>
