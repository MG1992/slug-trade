<template>
  <div class="ore-records header-page">
    <Header :title="$t('home.ore.orePoolEarningRecords')" />
    <div class="header-box">
      <div class="f13">{{ $t("home.ore.orePoolEarning") }}</div>
      <div class="amount">{{ totalRecord }} {{ currency }}</div>
    </div>
    <van-tabs v-model="active" @change="changeTab">
      <van-tab :title="$t('home.ore.personalRankingIncome')" :name="1"></van-tab>
      <van-tab :title="$t('home.ore.teamHashrateIncome')" :name="2"></van-tab>
    </van-tabs>
    <div class="flex title">
      <div class="rank-item">
        {{
        active === 1
        ? $t("home.ore.oreRanking")
        : $t("home.ore.teamPowerBalance")
        }}
      </div>
      <div class="separate-item">{{ $t("home.ore.earningsCount") }}</div>
      <div class="time-item">{{ $t("home.ore.date") }}</div>
    </div>

    <pagination
      :data="pageData"
      @getList="getList"
      @returnList="returnList"
      :finishedText="recordsList.length === 0 ? '' : '没有更多了'"
    >
      <no-data v-if="recordsList.length === 0 && !loading"></no-data>

      <div v-else class="flex" v-for="item in recordsList" :key="item.id">
        <div class="rank-item">{{ active === 1 ? item.rank : item.amount }}</div>
        <div class="separate-item">{{ item.separate }}</div>
        <div class="time-item">{{ item.createdTime }}</div>
      </div>
    </pagination>
  </div>
</template>

<script>
import Header from "@/components/Header"
import { Tab as VanTab, Tabs as VanTabs } from "vant"
import { getEarningsRecords } from "@/http/modules/home"
import NoData from "@/components/NoData"
import Pagination from "@/components/Pagination"

export default {
  components: {
    Header,
    VanTab,
    VanTabs,
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
    }
  },
  activated() {
    this.currency = this.$route.query.currency
    this.active = 1
    this.recordsList = []
    this.getList()
  },
  methods: {
    changeTab() {
      this.recordsList = []
      this.getList()
    },
    getList(data) {
      const param = {
        pageNum: data ? data.pageNum : 1,
        pageSize: data ? data.pageSize : 10,
        currency: this.currency,
        type: this.active,
      }
      this.loading = true
      getEarningsRecords(param).then((res) => {
        this.totalRecord = res.data.separateCount
        this.pageData = res.data.separateVOList
        this.loading = false
      })
    },
    returnList(list) {
      this.recordsList = list || []
    },
  },
}
</script>
<style lang="scss">
.ore-records {
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
  .title {
    color: #999999;
    margin-top: 23px;
  }
}
</style>
