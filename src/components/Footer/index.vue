<template>
  <div
    v-if="
      $route.path === '/' ||
      $route.name === 'Market' ||
      $route.name === 'TradeView' ||
      $route.name === 'Wallet' ||
      $route.name === 'Mine'
    "
    class="menu-wrapper"
  >
    <van-tabbar v-model="active" :active-color="$color.themeColor">
      <van-tabbar-item to="/">
        <span>{{ $t("common.home") }}</span>
        <template #icon="props">
          <img
            class="footer-img"
            :src="props.active ? icon.active : icon.inactive"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="market">
        <span>{{ $t("common.market") }}</span>
        <template #icon="props">
          <img
            class="footer-img"
            :src="props.active ? icon.active1 : icon.inactive1"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="tradeView">
        <span>{{ $t("common.trade") }}</span>
        <template #icon="props">
          <img
            class="footer-img"
            :src="props.active ? icon.active2 : icon.inactive2"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="wallet">
        <span>{{ $t("common.assets") }}</span>
        <template #icon="props">
          <img
            class="footer-img"
            :src="props.active ? icon.active3 : icon.inactive3"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="mine">
        <span>{{ $t("common.mine") }}</span>
        <template #icon="props">
          <img
            class="footer-img"
            :src="props.active ? icon.active4 : icon.inactive4"
          />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Tabbar as VanTabbar, TabbarItem as VanTabbarItem } from "vant";

export default {
  name: "Footer",
  components: {
    VanTabbar,
    VanTabbarItem,
  },
  data() {
    return {
      active: 0,
      icon: {
        active: require("@/assets/icons/index_icon1_active.svg"),
        inactive: require("@/assets/icons/index_icon1.svg"),
        active1: require("@/assets/icons/index_icon2_active.svg"),
        inactive1: require("@/assets/icons/index_icon2.svg"),
        active3: require("@/assets/icons/index_icon4_active.svg"),
        inactive3: require("@/assets/icons/index_icon4.svg"),
        active4: require("@/assets/icons/index_icon5_active.svg"),
        inactive4: require("@/assets/icons/index_icon5.svg"),
      },
    };
  },
  watch: {
    "$route.name"(val) {
      switch (val) {
        case "Home":
          this.active = 0;
          break;
        case "Market":
          this.active = 1;
          break;
        // case "Trade":
        //   this.active = 2;
        //   break;
        case "Wallet":
          this.active = 2;
          break;
        case "Mine":
          this.active = 3;
          break;
      }
    },
  },
  created() {},
};
</script>
<style lang="scss">
.menu-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  .van-tabbar-item__icon {
    margin-bottom: 0;
  }
  .footer-img {
    width: 32px;
    height: 32px;
  }
}
</style>