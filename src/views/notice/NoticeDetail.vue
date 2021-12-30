<template>
  <div class="notice-detail header-page">
    <Header :title="$t('home.notice.noticeDetail')" />
    <van-loading class="loading" v-model="loading" v-if="loading">
      {{ $t("common.inLoading") }}
    </van-loading>
    <div class="title">{{ noticeDetail.a_title }}</div>
    <div class="logo">
      <div>
        <van-image round width="31px" height="31px" :src="img" />
      </div>
      <div class="m-l-10">
        <div class="f13">{{ $t("home.notice.SSCVOfficialOperationTeam") }}</div>
        <div class="time">{{ noticeDetail.a_time }}</div>
      </div>
    </div>
    <div class="content" v-html="noticeDetail.a_content"></div>
  </div>
</template>

<script>
import { Image as VanImage, Loading as VanLoading } from "vant";
import Header from "@/components/Header";
import img from "@/assets/icons/logo.png";
import { getNoticeDetail } from "@/http/modules/home";
export default {
  components: {
    Header,
    VanImage,
    VanLoading,
  },
  data() {
    return {
      img,
      noticeDetail: {},
      loading: true,
    };
  },
  activated() {
    this.getNoticeDetail(this.$route.query.id);
  },
  methods: {
    getNoticeDetail(id) {
      getNoticeDetail(id)
        .then((res) => {
          this.noticeDetail = res.news || [];
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="scss">
.notice-detail {
  margin: 15px;
  .title {
    margin: 25px auto 45px auto;
    text-align: center;
    font-size: 18px;
    color: #333333;
  }
  .logo {
    display: flex;
    align-items: center;
    margin-bottom: 43px;
  }
  .time {
    color: #999999;
    margin-top: 4px;
    font-size: 11px;
  }
  .content {
    color: #666666;
    p {
      line-height: 24px;
    }
  }
}
</style>
