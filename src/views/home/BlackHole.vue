<template>
  <div class="balck-hole-wrapper">
    <Header :title="$t('home.index.blackHold')" />
    <div class="text-wrapper">
      <p>{{ $t("home.index.currentDestroyed") }}</p>
      <p>{{ number || 0 }}</p>
    </div>
  </div>
</template>
<script>
import { getBlackHole } from "@/http/modules/home";
import Header from "@/components/Header";

export default {
  name: "BlackHole",
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
    this.getFrmconfig();
  },
  methods: {
    getFrmconfig() {
      getBlackHole().then(res => {
        if (res.status === 1) {
          this.number = res.data;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.balck-hole-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-image: url("./../../assets/img/black_hole.gif");
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