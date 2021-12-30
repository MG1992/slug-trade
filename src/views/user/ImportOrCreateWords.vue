<template>
  <div class="import-words-wrapper">
    <!-- 手机工具栏顶部 -->
    <!-- <header style="background-color:rgba(0,0,0,.3)" ref="header"></header> -->
    <div class="import-header">
      <a @click="showOptions = true">
        {{ $t("common.cn") }}
        <van-icon name="arrow" />
      </a>
    </div>
    <div class="main-wrapper">
      <img class="logo" src="@/assets/icons/logo.png" />
      <div class="btn-area">
        <van-button class="btn-create" @click="toCreate" block>
          {{ $t("user.importOrCreateWords.createAddress") }}
        </van-button>
        <van-button @click="toImport" block plain class="btn-import">
          {{ $t("user.importOrCreateWords.importAddress") }}
        </van-button>
      </div>
      <section class="channel-box">
        <van-checkbox
          :checked-color="$color.themeColor"
          icon-size="18px"
          v-model="chkAgree"
        >
          <span class="clause-privacy">
            {{ $t("user.importOrCreateWords.readAndAcceptClause") }}
            <span class="privacy-link">
              {{ $t("user.importOrCreateWords.serviceClause") }}
            </span>
            <span class="privacy-link">
              {{ $t("user.importOrCreateWords.privacyPolicy") }}
            </span>
          </span>
        </van-checkbox>
      </section>
    </div>
    <chooseLanguage :show="showOptions" @done="showOptions = false" />
  </div>
</template>
<script>
import {
  Icon as VanIcon,
  Button as VanButton,
  Checkbox as VanCheckbox,
  Toast
} from "vant";
import chooseLanguage from "@/components/ChooseLanguage";

export default {
  name: "importOrCreateWords",
  data() {
    return {
      chkAgree: false,
      showOptions: false
    };
  },
  components: {
    VanIcon,
    VanButton,
    VanCheckbox,
    chooseLanguage
  },
  created() {},
  mounted() {},
  activated() {
    this.chkAgree = false;
    this.showOptions = false;
  },
  methods: {
    beforeSubmit() {
      if (!this.chkAgree) {
        Toast(this.$t("user.importOrCreateWords.PleaseReadAndAcceptClause"));
        return false;
      }
      return true;
    },
    // 创建地址
    toCreate() {
      if (this.beforeSubmit()) {
        this.$router.push("createAddress");
      }
    },
    // 导入地址
    toImport() {
      if (this.beforeSubmit()) {
        this.$router.push("importAddress");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.import-words-wrapper {
  .btn-create {
    background-color: $themeColor;
    color: #fff;
  }
  .btn-import {
    border-color: $themeColor;
    color: $themeColor;
  }
  .import-header {
    color: rgba(52, 52, 52, 1);
    font-size: 13px;
    text-align: right;
    line-height: 44px;
    padding: 0 10px;
    a {
      color: rgba(52, 52, 52, 1);
      vertical-align: middle;
    }
    .van-icon {
      color: rgba(52, 52, 52, 1);
      font-size: 14px;
      vertical-align: middle;
      margin: -2px 0 0 10px;
    }
  }
  .main-wrapper {
    .logo {
      display: block;
      width: 83px;
      height: 83px;
      margin: 81px auto;
      border-radius: 6px;
    }
  }
  .btn-area {
    .van-button {
      width: 45%;
      margin: 4% auto;
      padding: 10px;
      border-radius: 4px;
    }
  }
  .channel-box {
    display: flex;
    padding: 5px 15px;
    justify-content: center;
    color: #555;
    font-size: 12px;
    &::v-deep .van-checkbox {
      overflow: visible;
      i {
        margin-top: -2px;
      }
    }
    .clause-privacy {
      color: #666;
      font-size: 12px;
      .privacy-link {
        color: $themeColor;
      }
    }
  }
}
</style>