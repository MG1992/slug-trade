<template>
  <div class="not-data">
    <img :src="empty_icon" />
    <p>{{ $t("requestResponse.NO_DATA") }}</p>
  </div>
</template>
<script>
import empty_icon from "@/assets/icons/empty_icon.png";
export default {
  name: "notData",
  data() {
    return {
      empty_icon,
    };
  },
};
</script>
<style lang="scss" scoped>
$txtGray: #9a9a9a;
.not-data {
  margin: 70px auto;
  text-align: center;
  font-size: 14px;
  color: $txtGray;
  img {
    width: 168px;
    margin: auto;
  }
}
</style>