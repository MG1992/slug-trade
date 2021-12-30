<template>
  <div class="ore-detail header-page">
    <Header :title="$t('home.ore.orePool')" />
    <div class="header-box">
      <img
        class="float-right img"
        :src="recordIcon"
        alt="records"
        @click="toRecords"
      />
      <div class="f13">{{ $t("home.ore.orePoolEarning") }}</div>
      <div class="amount">
        {{ oreDetail.day_separate }} {{ oreDetail.currency }}
      </div>
    </div>
    <div class="content-box">
      <div class="amount">
        <div>
          <div class="gray f12">{{ $t("home.ore.availableBalance") }}</div>
          <div class="amount-num">{{ oreDetail.available_balance }}</div>
        </div>
        <div>
          <div class="gray f12">{{ $t("home.ore.teamPowerBalance") }}</div>
          <div class="amount-num">{{ oreDetail.team_power }}</div>
        </div>
      </div>
      <div class="flex">
        <div class="flex-item">{{ $t("home.ore.okavailableBalance") }}</div>
        <div class="flex-item">
          {{ oreDetail.okavailable_balance }}
          {{ oreDetail.quote_currency }}
          ({{ $t("home.ore.earnings") }}: {{ oreDetail.okseparate }}
          {{ oreDetail.currency }})
        </div>
      </div>
      <div class="flex">
        <div class="flex-item">{{ $t("home.ore.lowavailableBalance") }}</div>
        <div class="flex-item">
          {{ oreDetail.lowavailable_balance }}
          {{ oreDetail.quote_currency }}
        </div>
      </div>
      <div class="flex">
        <div class="flex-item">{{ $t("home.ore.powerFormula") }}</div>
        <div class="flex-item">
          <img
            class="rules-img"
            src="~@/assets/img/coinRules.png"
            alt="rules"
          />
        </div>
      </div>
    </div>
    <div class="title">{{ $t("home.ore.latestWeekEarnings") }}</div>
    <ve-line
      :data="earningsData"
      :settings="earninsSettings"
      :legend-visible="false"
    ></ve-line>
    <div class="title">{{ $t("home.ore.balanceEarningsRate") }}</div>

    <ve-line :data="rateData" :legend-visible="false"></ve-line>
  </div>
</template>

<script>
import {
  getOrePoolDetail,
  getOreWeekEarnings,
  getOreWeekEarningsRate,
} from "@/http/modules/home";
import Header from "@/components/Header";
import recordIcon from "@/assets/icons/record.svg";
import Vue from "vue";
import VeLine from "v-charts/lib/line.common";
Vue.component(VeLine.name, VeLine);
export default {
  components: {
    Header,
  },

  data() {
    return {
      recordIcon,
      oreDetail: {},
      earningsData: {
        columns: ["created_time", "separate"],
        rows: [],
      },
      earninsSettings: {},
      rateData: {
        columns: ["created_time", "rate"],
        rows: [],
      },
    };
  },

  activated() {
    const currency = this.$route.query.currency;
    this.getOrePoolDetail(currency);
    this.getOreWeekEarnings(currency);
    this.getOreWeekEarningsRate(currency);
  },

  methods: {
    // 矿池详情
    getOrePoolDetail(currency) {
      getOrePoolDetail(currency).then((res) => {
        this.oreDetail = res.data;
      });
    },
    // 周收益
    getOreWeekEarnings(currency) {
      getOreWeekEarnings(currency).then((res) => {
        this.earningsData.rows = res.data;
      });
    },
    // 收益率
    getOreWeekEarningsRate(currency) {
      getOreWeekEarningsRate(currency).then((res) => {
        this.rateData.rows = res.data;
      });
    },
    // 收益记录
    toRecords() {
      this.$router.push({
        path: "/oreEarningsRecords",
        query: { currency: this.$route.query.currency },
      });
    },
  },
};
</script>
<style lang="scss">
.ore-detail {
  background-color: #f3f3f3;
  min-height: 100vh;
  // .van-nav-bar {
  //   background-color: #005bd6;
  //   .van-icon,
  //   .van-nav-bar__title {
  //     color: #ffffff;
  //   }
  // }
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
  .m-t-18 {
    margin-top: 18px;
  }
  .img {
    width: 15px;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    padding: 15px;
  }

  .content-box {
    background-color: #ffffff;
    margin: 15px;
    .amount {
      height: 76px;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ededed;
    }
    .amount-num {
      color: #333333;
      margin-top: 13px;
      font-size: 17px;
      font-weight: bold;
    }
    .rules-img {
      width: 110px;
    }
  }
  .title {
    background-color: #ffffff;
    margin: 0 15px;
    padding-top: 15px;
    padding-left: 15px;
    font-size: 12px;
    color: #666666;
  }
  .ve-line {
    height: 315px !important;
    div:first-child {
      height: 300px !important;
      div:first-child {
        height: 300px !important;
      }
    }
  }
  canvas {
    background-color: #ffffff;
    left: 15px !important;
    right: 15px !important;
    bottom: 15px !important;
    width: 345px !important;
    height: 300px !important;
  }

  .gray {
    color: #666666;
  }
}
</style>
