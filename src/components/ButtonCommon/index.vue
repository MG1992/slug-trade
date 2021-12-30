<template>
  <div class="confirm-btn-wrapper" :style="calStyle">
    <van-button
      class="confirm-btn"
      :class="disabled"
      @click="handleClick"
      :disabled="disabled"
    >
      <slot />
    </van-button>
  </div>
</template>
<script>
import { Button as VanButton } from "vant";

export default {
  name: "buttonCommon",
  props: {
    fixed: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
  },
  components: {
    VanButton,
  },
  computed: {
    calStyle() {
      return (
        this.fixed && {
          position: "fixed",
          bottom: 0,
          left: 0,
          padding: "0 15px 22px 15px",
        }
      );
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>
<style lang="scss" scoped>
.confirm-btn-wrapper {
  width: 100%;
  .confirm-btn {
    height: 44px;
    background: $themeColor;
    border-radius: 5px;
    width: 100%;
    color: #fff;
  }
}
</style>