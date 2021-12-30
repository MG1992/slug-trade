<template>
  <div class="system-notice header-page">
    <Header :title="$t('home.notice.systemNotice')" />
    <van-loading
      class="loading"
      v-model="loading"
      v-if="!noticeList.length && loading"
    >
      {{ $t("common.inLoading") }}
    </van-loading>
    <template v-if="noticeList.length > 0 && !loading">
      <div
        v-for="item in noticeList"
        :key="item.id"
        class="notice"
        @click="toDetail(item)"
      >
        <van-icon class="icon" name="arrow" color="#656565" />
        <div class="title">{{ item.a_title }}</div>
        <div class="time">{{ item.a_time }}</div>
      </div>
    </template>
  </div>
</template>

<script>
import Header from "@/components/Header";
import { Icon as VanIcon, Loading as VanLoading } from "vant";
import { getNotice } from "@/http/modules/home";

export default {
  components: {
    Header,
    VanIcon,
    VanLoading,
  },

  data() {
    return {
      noticeList: [],
      loading: false,
    };
  },

  activated() {
    this.getData();
  },

  methods: {
    getData() {
      this.loading = true;
      getNotice()
        .then((res) => {
          this.noticeList = res.news;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    toDetail(item) {
      this.$router.push({ path: "/noticeDetail", query: { id: item.id } });
    },
  },
};
</script>
<style lang='scss' scoped>
.system-notice {
  background-color: #f3f3f3;
  min-height: 100vh;
  .notice {
    background-color: #ffffff;
    margin: 10px 0;
    height: 90px;
    padding: 15px;
    clear: both;
    .title {
      position: relative;
      height: 32px;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 32px;
        width: 300px;
        height: 1px;
        border-bottom: 1px solid #ededed;
      }
    }
    .time {
      margin-top: 15px;
    }
    .icon {
      float: right;
      margin-top: 25px;
    }
  }
}
</style>