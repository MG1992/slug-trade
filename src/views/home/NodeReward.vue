<template>
  <div class="node-reward header-page">
    <Header :title="$t('home.index.nodeReward')" />
    <div class="header-box">
      <div class="f13">{{ $t("home.nodeReward.totalNodeReward") }}</div>
      <div class="amount">{{ totalRecord }} {{ currency }}</div>
    </div>
    <div class="list-title">{{ $t("home.nodeReward.rewardRecords") }}</div>
    <div class="flex title">
      <div class="rank-item">{{ $t("home.nodeReward.currency") }}</div>
      <div class="separate-item">{{ $t("home.nodeReward.quantity") }}</div>
      <div class="time-item">{{ $t("home.nodeReward.status") }}</div>
      <div class="time-item">{{ $t("home.nodeReward.time") }}</div>
    </div>
    <pagination
      :data="pageData"
      @getList="getList"
      @returnList="returnList"
      :finishedText="recordsList.length === 0 ? '' : '没有更多了'"
      listName="awards"
    >
      <no-data v-if="recordsList.length === 0 && !loading"></no-data>

      <div v-else class="flex" v-for="item in recordsList" :key="item.id">
        <div class="rank-item">{{ item.award_currency }}</div>
        <div class="separate-item">{{ item.result_amount }}</div>
        <div class="time-item">
          {{ item.status | KeyFilter("home.rewardStatus") }}
        </div>
        <div class="time-item">{{ item.create_time }}</div>
      </div>
    </pagination>
  </div>
</template>

<script>
import Header from "@/components/Header";
import { getNodeRewardList } from "@/http/modules/home";
import { base_country } from "@/config/globalVariable";
import NoData from "@/components/NoData";
import Pagination from "@/components/Pagination";

export default {
  components: {
    Header,
    NoData,
    Pagination,
  },
  data() {
    return {
      currency: "",
      active: 1,
      recordsList: [],
      pageData: {},
      loading: false,
      Pagination,
      totalRecord: 0,
    };
  },
  activated() {
    this.currency = base_country;
    this.active = 1;
    this.recordsList = [];
    this.getList();
  },
  methods: {
    getList(data) {
      const param = {
        currency: this.currency,
        pageNum: data ? data.pageNum : 1,
        pageSize: data ? data.pageSize : 10,
      };
      this.loading = true;
      getNodeRewardList(param).then((res) => {
        this.totalRecord = res.total_amount;
        this.pageData = res;
        this.loading = false;
      });
    },
    returnList(list) {
      this.recordsList = list || [];
    },
  },
};
</script>
<style lang="scss">
.node-reward {
  .header-box {
    padding: 20px;
    height: 100px;
    background-color: $themeColor;
    background-image: url("./../../assets/img/ore_banner.png");
    background-size: 100% auto;
    color: #ffffff;
  }
  .amount {
    margin-top: 19px;
    font-size: 21px;
  }
  .van-tabs__line {
    background-color: $themeColor;
  }
  .van-tab__text {
    color: #666666;
  }
  .flex {
    text-align: center;
    // padding-left: 15px;

    height: 50px;
    border-bottom: 1px solid #f4f4f4;
    align-items: center;
    color: #333333;

    .rank-item {
      width: 30%;
    }
    .separate-item {
      width: 30%;
    }
    .time-item {
      width: 40%;
    }
  }
  .list-title {
    color: #333333;
    margin-top: 23px;
    font-size: 15px;
    padding-left: 18px;
  }
  .title {
    color: #999999;
  }
}
</style>
