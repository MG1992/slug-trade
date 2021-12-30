<template>
  <div class="content">
    <!-- 移动端 -->
    <s-tradingview
      :marketName="marketName"
      :marketId="marketId"
      :wsUrl="wsUrl"
      :decimal="decimal"
      class="tradingviewView"
    />
    <!-- pc端 -->
    <!-- <s-tradingview-pc
      :marketName="marketName"
      :marketId="marketId"
      :wsUrl="wsUrl"
      :decimal="decimal"
      class="tradingviewView"
    /> -->
  </div>
</template>

<script>
import sTradingview from "@/components/sTradingview/sTradingview";

export default {
  name: "tradeView",
  components: {
    sTradingview,
  },
  data() {
    return {
      marketId: this.$route.query.marketId,
      marketName: this.$route.query.marketName,
      decimal: this.$route.query.decimal,
      wsUrl: "wss://api.huobipro.com/ws",
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.tradingviewView {
  height: 100vh;
  width: 100vw;
}
</style>