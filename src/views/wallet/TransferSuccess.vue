<template>
  <div class="header-page">
    <div class="icon-box"></div>

    <p class="title">{{ $t("wallet.transfer.success") }}</p>

    <ButtonCommon fixed @click="submit">
      {{ $t("requestResponse.DONE") }}
    </ButtonCommon>
  </div>
</template>
<script>
import ButtonCommon from "@/components/ButtonCommon";

export default {
  components: {
    ButtonCommon,
  },
  data() {
    return {};
  },
  methods: {
    submit() {
      let path = this.$route.params.isFromWallet ? "/wallet" : "/";
      this.$router.replace(path);
    },
  },
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
</style>
