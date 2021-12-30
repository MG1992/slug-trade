<template>
  <div class="snail-fund-wrapper">
    <Header :title="$t('home.index.snailFund')" />
    <div class="text-wrapper">
      <p>{{ $t("home.index.snailFund") }}</p>
      <p class="color-yellow">{{ number }}</p>
    </div>
  </div>
</template>
<script>
import { getFund } from "@/http/modules/home";
import Header from "@/components/Header";

export default {
  name: "SnailFund",
  data() {
    return {
      number: 0
    };
  },
  components: {
    Header
  },
  created() {},
  activated() {
    this.number = 0;
    this.getFund();
  },
  methods: {
    getFund() {
      getFund().then(res => {
        if (res.status === 1) {
          this.number = res.data.list && res.data.list[0].amount;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.snail-fund-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-image: url("./../../assets/img/snail_fund.gif");
  background-size: 100% 100%;
}
.text-wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 25px;
  line-height: 40px;
  .color-yellow {
    color: yellow;
  }
}
</style>