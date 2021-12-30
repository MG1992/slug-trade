<template>
  <div class="export-spacific-addr header-page">
    <Header :title="$t('mine.index.recommendAward')" />

    <div class="list_box" v-for="(item, index) in list" :key="index">
      <div class="text_left">
        <p class="list_title">{{ $t("mine.manageAward.awardType") }}</p>
        <p>分享算力</p>
      </div>
      <div class="text_left">
        <p class="list_title">{{ $t("mine.manageAward.awardNum") }}</p>
        <p>{{ item.separate }}</p>
      </div>
      <div class="text_right">
        <p class="list_title">{{ $t("mine.manageAward.awardTime") }}</p>
        <p>{{ item.createdTime }}</p>
      </div>
    </div>

    <notData v-if="list.length === 0" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import { getSeparaterecord } from "@/http/modules/pattern.js";
import notData from "@/components/notData";

export default {
  components: {
    Header,
    notData,
  },
  data() {
    return {
      list: [],
      page: 1,
    };
  },
  activated() {
    this.list = [];
    this.page = 1;
    this.getSeparaterecord();
  },
  methods: {
    getSeparaterecord() {
      getSeparaterecord(1, this.page).then((res) => {
        if (res.status === 1) {
          this.list.push(...res.data.separateVOList.list);
          if (res.data.separateVOList.hasNextPage) {
            this.page++;
            this.getSeparaterecord();
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
}
</style>
