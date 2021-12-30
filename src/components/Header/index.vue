<!--
 * @Author: joevin
 * @LastEditors: joevin
 * @Date: 2020-09-19 17:38:36
 * @LastEditTime: 2020-09-19 17:44:14
 * @FilePath: /html/src/components/Header/index.vue
-->
<template>
  <div class="header-wrapper">
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      :left-arrow="leftArrow"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #title>
        <slot name="title" v-if="!title" />
        <span v-else>{{ title }}</span>
      </template>
      <template #right>
        <slot name="right" v-if="!rightText" />
        <span v-else>{{ rightText }}</span>
      </template>
      <template #left>
        <slot name="left" v-if="!leftText" />
        <span v-else>{{ leftText }}</span>
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
import { NavBar as VanNavBar } from "vant";

export default {
  name: "Header",
  components: {
    VanNavBar,
  },
  props: {
    title: {
      type: String,
      default: () => {
        return "标题";
      },
    },
    leftText: {
      type: String,
      default: () => {
        return "";
      },
    },
    rightText: {
      type: String,
      default: () => {
        return "";
      },
    },
    leftArrow: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
      this.$emit("click-left");
    },
    onClickRight() {
      this.$emit("click-right");
    },
  },
};
</script>
<style lang="scss">
.header-wrapper {
  position: fixed;
  top: $appStatusTop;
  left: 0;
  z-index: 99999;
  width: 100%;
  height: 44px;
  overflow: hidden;
  background-color: #fff;
  .van-nav-bar .van-icon {
    color: $themeColor;
  }
}
</style>
