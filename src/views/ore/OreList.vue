<template>
  <div class="ore header-page">
    <Header :title="$t('home.ore.orePool')" />

    <van-loading class="loading" v-if="loading">
      {{ $t("common.inLoading") }}
    </van-loading>
    <no-data v-if="oreList.length === 0 && !loading"></no-data>

    <template v-if="oreList.length > 0 && !loading">
      <div
        class="card"
        v-for="item in oreList"
        :key="item.addr_id"
        @click="toDetail(item)"
      >
        <div class="card-header">
          <div class="logo-item">
            <!-- <van-image
              class="img"
              round
              width="31px"
              height="31px"
              :src="item.currencyImg || logo"
            />-->
            <span>{{ item.quote_currency }}</span>
          </div>
          <div class="lowest-item">
            <div class="blue f12 m-b-10">
              {{ $t("home.ore.lowavailableBalance") }}
            </div>
            <div>
              {{
                item.lowavailable_balance
                  ? item.lowavailable_balance.toFixed(3)
                  : 0
              }}
            </div>
          </div>
          <div class="best-item">
            <div class="blue f12 m-b-10">
              {{ $t("home.ore.okavailableBalance") }}
            </div>
            <div>
              {{
                item.okavailable_balance
                  ? item.okavailable_balance.toFixed(3)
                  : 0
              }}
            </div>
          </div>
        </div>
        <div class="card-content">
          <div>
            <div>{{ $t("home.ore.dayEarnings") }}</div>
            <div class="m-t-20">
              {{ item.day_separate ? item.day_separate.toFixed(3) : 0 }}
            </div>
          </div>
          <div>
            <div>{{ $t("home.ore.accumulateEarnings") }}</div>
            <div class="m-t-20">
              {{ item.separate_total ? item.separate_total.toFixed(3) : 0 }}
            </div>
          </div>
          <div>
            <div>{{ $t("home.ore.teamPower") }}</div>
            <div class="m-t-20">
              {{ item.team_power ? item.team_power.toFixed(3) : 0 }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Header from "@/components/Header";
import { Loading as VanLoading } from "vant";
import { getOrePool, getCurrencyInfo } from "@/http/modules/home";
import NoData from "@/components/NoData";
import logo from "@/assets/icons/logo.png";

export default {
  components: {
    Header,
    // VanImage,
    VanLoading,
    NoData,
  },
  data() {
    return {
      logo,
      oreList: [],
      coinImage: {},
      loading: false,
    };
  },
  created() {},
  activated() {
    this.getOrePool();
  },
  methods: {
    async getOrePool() {
      this.loading = true;
      try {
        const res = await getOrePool();
        this.oreList = res.data;
        // this.oreList = []
        // for (let item of res.data) {
        //   const currencyImg = await this.getCurrencyInfo(item.currency)
        //   this.oreList.push({ ...item, currencyImg })
        // }
        this.loading = false;
      } catch {
        this.loading = false;
      }
    },
    // 获取货币信息-货币图片--先隐藏 不获取
    async getCurrencyInfo(currency) {
      const res = await getCurrencyInfo(currency);
      return res?.currency?.currency_img;
    },
    // 详情
    toDetail(item) {
      this.$router.push({
        path: "/oreDetail",
        query: { currency: item.currency },
      });
    },
  },
};
</script>
<style scoped lang="scss">
.ore {
  background-color: #f3f3f3;
  min-height: 100vh;
  // padding: 15px;
  .card {
    background-color: #ffffff;
    margin: 15px;
    &-header,
    &-content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
    }
    &-header {
      height: 57px;
      border-bottom: 1px solid #ededed;
      padding: 12px 16px 13px;

      .logo-item {
        width: 50%;
      }
      .lowest-item {
        width: 32%;
      }
      .best-item {
        width: 18%;
      }
      .img {
        vertical-align: middle;
        margin-right: 7px;
      }
    }
    &-content {
      padding: 16px;
      font-size: 12px;
      color: #999999;
      & > div {
        width: 33.3%;
      }
    }
    .blue {
      color: $themeColor;
    }
  }
}
</style>