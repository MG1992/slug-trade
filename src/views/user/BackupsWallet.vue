<template>
  <div class="header-page">
    <Header :title="$t('sign.BackupsWallet.title')" />

    <div class="tips">
      {{ $t("sign.BackupsWallet.tips1") }}
      <span class="bule-text">{{ $t("sign.BackupsWallet.tips2") }}</span>
      {{ $t("sign.BackupsWallet.tips3") }}
    </div>

    <div class="box">
      <div v-for="(item, index) in calcMnemonic" :key="index" class="item">
        {{ item }}
      </div>
    </div>

    <ButtonCommon fixed @click="submit">{{
      $t("requestResponse.NEXT")
    }}</ButtonCommon>
  </div>
</template>
<script>
import Header from "@/components/Header";
import ButtonCommon from "@/components/ButtonCommon";
import { storage } from "@/utils/oldVersionFunc";

export default {
  components: {
    Header,
    ButtonCommon,
  },
  data() {
    return {
      mnemonic: storage.get("mnemonic"),
    };
  },
  activated() {
    this.mnemonic = storage.get("mnemonic");
  },
  computed: {
    calcMnemonic() {
      return this.mnemonic.split(" ");
    },
  },
  methods: {
    submit() {
      this.$router.push({ path: "/verifyingAuxiliaries" });
    },
  },
};
</script>
<style lang="scss" scoped>
.tips {
  padding: 30px 15px;
  font-size: 13px;
  font-weight: 500;
  color: #333333;
}
.box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 15px;
  background: #f8f8f8;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  .item {
    width: (1 / 3) * 100%;
    padding: 22px 10px;
    text-align: center;
  }
}
</style>
