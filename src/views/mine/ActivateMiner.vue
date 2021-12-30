<template>
  <div class="activate-miner header-page">
    <Header :title="$t('mine.index.activateMiner')" />
    <div class="flex-wrapper">
      <div class="flex">
        <div class="flex-item">
          <div>{{ countActiveAddr.total_active }}</div>
          <div>{{ $t("mine.activateMiner.activatedAddressNumber") }}</div>
        </div>
        <div class="flex-item">
          <div>{{ countActiveAddr.total_machine }}</div>
          <div>{{ $t("mine.activateMiner.activatedDeviceNumber") }}</div>
        </div>
      </div>
      <div class="flex">
        <div class="flex-item">
          <div>{{ countActiveAddr.day_active }}</div>
          <div>{{ $t("mine.activateMiner.todayActivatedAddress") }}</div>
        </div>
        <div class="flex-item">
          <div>{{ countActiveAddr.day_machine }}</div>
          <div>{{ $t("mine.activateMiner.todayActivatedDevice") }}</div>
        </div>
        <div class="flex-item">
          <div>{{ countActiveAddr.total_balance }}</div>
          <div>{{ $t("mine.activateMiner.teamBalance") }}</div>
        </div>
      </div>
    </div>
    <pagination
      :data="pageData"
      @getList="getList"
      @returnList="returnList"
      showLoadingWhenActivated
      :finishedText="myActiveAddrList.length === 0 ? '' : '没有更多了'"
    >
      <no-data v-if="myActiveAddrList.length === 0 && !loading"></no-data>

      <div v-else>
        <div class="card" v-for="item in myActiveAddrList" :key="item.address">
          <div class="card-content">
            <div>
              {{ $t("mine.activateMiner.teamTotalBitcion") }}
              <div class="float-right black">
                {{ setNumberCount(item.total_balance, 4) }}
              </div>
            </div>
            <div>
              {{ $t("mine.activateMiner.todayDeviceNumber") }}
              <div class="float-right black">{{ item.day_machine }}</div>
            </div>
            <div>
              {{ $t("mine.activateMiner.totalDeviceNumber") }}
              <div class="float-right black">{{ item.machine }}</div>
            </div>
            <div>
              {{ $t("mine.activateMiner.dayAddressNumber") }}
              <div class="float-right black">{{ item.day_active }}</div>
            </div>
            <div>
              {{ $t("mine.activateMiner.totalAddressNumber") }}
              <div class="float-right black">{{ item.addrctive }}</div>
            </div>

            <div>{{ item.address }}</div>
          </div>
        </div>
      </div>
    </pagination>
  </div>
</template>

<script>
import Header from "@/components/Header";
import { getActivatedAddress } from "@/http/modules/mine.js";
import Pagination from "@/components/Pagination";
import { setNumberCount } from "@/utils/tool.js";
import NoData from "@/components/NoData";

export default {
  components: {
    NoData,
    Header,
    Pagination,
  },

  data() {
    return {
      setNumberCount,
      pageData: {},
      countActiveAddr: {},
      myActiveAddrList: [],
      loading: false,
    };
  },

  activated() {
    this.myActiveAddrList = [];
    this.countActiveAddr = {};
    this.getList(0);
  },

  mounted() {},

  methods: {
    getList(data) {
      const param = {
        pageNum: data ? data.pageNum : 1,
        pageSize: data ? data.pageSize : 5,
      };
      // console.log(param)
      this.loading = true;
      getActivatedAddress(param).then((res) => {
        this.countActiveAddr = res.data.countActiveAddr;
        this.pageData = res.data.myActiveAddrList;
        this.loading = false;
      });
    },
    returnList(list) {
      // console.log(list)
      this.myActiveAddrList = list || [];
    },
  },
};
</script>
<style lang="scss" scoped>
.activate-miner {
  background-color: #f3f3f3;
  min-height: 100vh;

  .flex-wrapper {
    background-color: #ffffff;
    height: 150px;
    margin: 15px 15px 0 15px;
    border-radius: 6px;
  }
  .flex {
    width: 100%;
    height: 74.5px;
    justify-content: center;
    align-items: center;
    text-align: center;
    .flex-item {
      width: 50%;
      div:first-child {
        margin-bottom: 16px;
        font-size: 20px;
        color: $themeColor;
      }
      div:nth-child(2) {
        color: #666666;
      }
    }
  }
  .no-data {
    margin-top: 68px;
  }
  .card {
    margin: 15px;
    background-color: #ffffff;
    border-radius: 6px;
    color: #666666;
    &-content {
      line-height: 28px;
      margin-top: 10px;
      padding: 0 19px;
    }
    .black {
      color: #343434;
    }
  }
}
</style>
