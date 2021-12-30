<template>
  <div class="lan-wrapper">
    <van-popup v-model="show" position="bottom">
      <van-picker
        show-toolbar
        :title="$t('user.importOrCreateWords.pleaseChooseLanguage')"
        :columns="columns"
        :default-index="defaultIndex"
        @confirm="onConfirm"
        @cancel="onCancel"
        :confirm-button-text="$t('common.confirm')"
        :cancel-button-text="$t('common.cancel')"
      />
    </van-popup>
  </div>
</template>
<script>
import { Picker as VanPicker, Popup as VanPopup } from "vant";
import { setup } from "@/langs";
import { storage } from "@/utils/oldVersionFunc";

export default {
  name: "Footer",
  components: {
    VanPicker,
    VanPopup
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns: [
        {
          text: "中文",
          value: "zh"
        },
        {
          text: "English",
          value: "en"
        }
        // {
        //   text: "にほんご",
        //   value: "jp"
        // },
        // {
        //   text: "한국어",
        //   value: "kr"
        // }
      ],
      defaultIndex: storage.get("defaultIndex") || 0
    };
  },
  created() {},
  methods: {
    // 确认
    onConfirm(row, index) {
      setup(row.value);
      this.defaultIndex = index;
      storage.set("defaultIndex", index);
      this.$emit("done");
    },
    // 取消
    onCancel() {
      this.$emit("done");
    }
  }
};
</script>
<style lang="scss" scoped>
.menu-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100%;
}
.footer-img {
  width: 22px;
  height: 22px;
}
</style>