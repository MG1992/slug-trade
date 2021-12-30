<template>
  <div class="header-page">
    <div class="icon-box"></div>

    <p class="title">{{$t('sign.WalletCompleted.success')}}</p>

    <p class="tips">{{$t('sign.WalletCompleted.tips1')}}</p>
    <p class="tips">{{$t('sign.WalletCompleted.tips2')}}</p>

    <ButtonCommon fixed @click="submit">{{$t("requestResponse.DONE")}}</ButtonCommon>
  </div>
</template>
<script>
import ButtonCommon from "@/components/ButtonCommon";

export default {
  components: {
    ButtonCommon
  },
  data() {
    return {};
  },
  methods: {
    submit() {
      this.$router.push({
        path: "/",
        query: {
          eventName: "evtSwitchMainIndexTo"
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.icon-box {
  margin: 120px auto 0;
  width: 83px;
  height: 83px;
  background-image: url("../../assets/icons/sign_success.svg");
  background-size: contain;
}
.title {
  margin: 40px auto 75px;
  font-size: 15px;
  font-weight: 500;
  color: $themeColor;
  text-align: center;
}
.tips {
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  color: #666666;
  line-height: 22px;
}
</style>
