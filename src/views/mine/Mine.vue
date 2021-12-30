<template>
  <div class="login-wrapper">
    <div class="header">
      <div class="title">
        <span class="mine">{{ $t("mine.index.mine") }}</span>
      </div>
      <div class="flex">
        <div class="img">
          <van-image round width="70px" height="70px" :src="logo" />
        </div>
        <div class="info">
          <div class="f20">{{ curUserInfo.name }}</div>
          <div
            class="gray f13 m-t-10"
            v-clipboard:copy="curUserInfo.address"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >
            {{ curUserInfo.address }}
          </div>
          <div class="gray f13 m-t-10">
            ({{ $t("mine.index.clickToCopy") }})
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <van-cell
        :value="
          hasParentId
            ? $t('mine.index.activated')
            : $t('mine.index.turnMoneyToActivate')
        "
      >
        <template #title>
          <van-icon size="32px" :name="imgs.activeteDigImg" />
          <span class="m-l-10">{{ $t("mine.index.activateDig") }}</span>
        </template>
      </van-cell>
      <van-cell is-link @click="toActivateMiner">
        <template #title>
          <van-icon size="30px" :name="imgs.activeteMinerImg" />
          <span class="m-l-10">{{ $t("mine.index.activateMiner") }}</span>
        </template>
      </van-cell>
      <van-cell is-link @click="toRecommendAward">
        <template #title>
          <van-icon size="30px" :name="imgs.recommendAwardImg" />
          <span class="m-l-10">{{ $t("mine.index.recommendAward") }}</span>
        </template>
      </van-cell>
      <van-cell is-link @click="toManageAward">
        <template #title>
          <van-icon size="30px" :name="imgs.manageAwardImg" />
          <span class="m-l-10">{{ $t("mine.index.manageAward") }}</span>
        </template>
      </van-cell>
      <van-cell is-link @click="toShareApp">
        <template #title>
          <van-icon size="30px" :name="imgs.shareAppImg" />
          <span class="m-l-10">{{ $t("mine.index.shareApp") }}</span>
        </template>
      </van-cell>
      <van-cell is-link @click="toMyAd">
        <template #title>
          <van-icon size="30px" :name="imgs.myAd" />
          <span class="m-l-10">{{ $t("pledge.myAd.title") }}</span>
        </template>
      </van-cell>
      <van-cell is-link @click="toCollectionType">
        <template #title>
          <van-icon size="30px" :name="imgs.collectionType" />
          <span class="m-l-10">{{ $t("pledge.collection.title") }}</span>
        </template>
      </van-cell>

      <div class="mine-divider"></div>

      <van-cell
        is-link
        :value="$t('mine.index.simplifiedChinese')"
        @click="showOptions = true"
      >
        <template #title>
          <van-icon size="30px" :name="imgs.langSettingImg" />
          <span class="m-l-10">{{ $t("mine.index.languageSetting") }}</span>
        </template>
      </van-cell>
      <van-cell is-link @click="toAccountManage">
        <template #title>
          <van-icon size="30px" :name="imgs.accountManageImg" />
          <span class="m-l-10">{{ $t("mine.index.accountManage") }}</span>
        </template>
      </van-cell>
      <van-cell is-link @click="toAssurance">
        <template #title>
          <van-icon size="30px" :name="imgs.assurance" />
          <span class="m-l-10">{{ $t("mine.index.assurance") }}</span>
        </template>
      </van-cell>

      <div class="mine-divider"></div>

      <!--/browserIndex-->
      <van-cell is-link @click="toBlockQuery">
        <template #title>
          <van-icon size="30px" :name="imgs.blockQueryImg" />
          <span class="m-l-10">{{ $t("mine.index.blockQuery") }}</span>
        </template>
      </van-cell>
      <van-cell value="https://github.com/ethereum">
        <template #title>
          <van-icon size="30px" :name="imgs.mineOSAddrImg" />
          <span class="m-l-10">{{ $t("mine.index.openSourceAddress") }}</span>
        </template>
      </van-cell>
      <van-cell value="1.0.7">
        <template #title>
          <van-icon size="30px" :name="imgs.mineVersionImg" />
          <span class="m-l-10">{{ $t("mine.index.version") }}</span>
        </template>
      </van-cell>
    </div>
    <chooseLanguage :show="showOptions" @done="showOptions = false" />
  </div>
</template>

<script>
import {
  Image as VanImage,
  Cell as VanCell,
  Icon as VanIcon,
  Toast
} from "vant";
import activeteDigImg from "@/assets/icons/mine_activate_dig.svg";
import activeteMinerImg from "@/assets/icons/mine_activate_miner.svg";
import shareAppImg from "@/assets/icons/mine_share_app.svg";
import langSettingImg from "@/assets/icons/mine_lang_setting.svg";
import accountManageImg from "@/assets/icons/mine_account_manage.svg";
import blockQueryImg from "@/assets/icons/mine_block_query.svg";
import mineOSAddrImg from "@/assets/icons/mine_os_addr.svg";
import mineVersionImg from "@/assets/icons/mine_version.svg";
import manageAwardImg from "@/assets/icons/mine_manage_award.svg";
import recommendAwardImg from "@/assets/icons/mine_recommend_award.svg";
import assurance from "@/assets/icons/mine_assurance.svg";
import myAd from "@/assets/icons/myAd.svg";
import collectionType from "@/assets/icons/collectionType.svg";

import { mapState, mapActions } from "vuex";
import i18n from "@/langs";
import logo from "@/assets/icons/logo.png";
import chooseLanguage from "@/components/ChooseLanguage";

export default {
  name: "Mine",
  components: {
    VanImage,
    VanCell,
    VanIcon,
    chooseLanguage
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      curUserInfo: state => state.mine.activateAddr || {}
    }),
    hasParentId() {
      return !!this.curUserInfo.parent_id || this.curUserInfo.parent_id === 0;
    }
  },
  data() {
    return {
      logo,
      imgs: {
        myAd,
        collectionType,
        activeteDigImg,
        activeteMinerImg,
        shareAppImg,
        langSettingImg,
        accountManageImg,
        blockQueryImg,
        mineOSAddrImg,
        mineVersionImg,
        manageAwardImg,
        recommendAwardImg,
        assurance
      },
      showOptions: false
    };
  },

  activated() {
    // 获取当前用户地址
    this.GetActivateAddress(this.userInfo.current_maddr_id);
    this.showOptions = false;
  },

  methods: {
    ...mapActions({
      GetActivateAddress: "mine/GetActivateAddress"
    }),
    toBlockQuery() {
      if (window.api) {
        window.api.openApp({
          androidPkg: "android.intent.action.VIEW",
          mimeType: "text/html",
          uri: "https://eth.tokenview.com/"
        });
      }
    },
    onCopy() {
      Toast(i18n.t("mine.accountManage.copySuccess"));
    },
    onError() {
      console.log("复制失败");
    },
    toActivateMiner() {
      this.$router.push("./activateMiner");
    },
    toRecommendAward() {
      this.$router.push("./recommendAward");
    },
    toAssurance() {
      this.$router.push("./assuranceCash");
      // Toast(this.$t("common.pleaseExpected"));
    },
    toManageAward() {
      this.$router.push("./manageAward");
      // Toast(this.$t("common.pleaseExpected"));
    },
    toAccountManage() {
      this.$router.push("./accountManage");
    },
    toShareApp() {
      this.$router.push("./share");
    },
    toMyAd() {
      this.$router.push("./myAd");
    },
    toCollectionType() {
      this.$router.push("./collectionType");
    }
  }
};
</script>
<style lang="scss" scoped>
.login-wrapper {
  .header {
    padding-top: 30px;
    background-image: url("./../../assets/img/mine_banner.png");
    background-size: 100% auto;
    height: 150px;
    .title {
      color: #ffffff;
      width: 345px;
      margin: 0 auto;
      font-size: 16px;
      .mine {
        padding-top: 34px;
      }
    }
    .flex {
      height: 95px;
      width: 345px;
      background-color: #ffffff;
      margin: 22px auto 0;
      border-radius: 4px;
      box-shadow: 1px 1px 2px #f1f1f1;
      justify-content: center;
      align-items: center;
      .img {
        width: 30%;
        text-align: center;
      }
      .info {
        width: 70%;
      }
    }
  }
  .content {
    width: 345px;
    margin: 28px auto 60px auto;
    box-shadow: #dfdfdf 0px 0px 8px;
    border-radius: 8px;
    .van-icon {
      vertical-align: middle;
    }
    .van-cell {
      align-items: center;
      padding-left: 10px;
      &:after {
        border: none;
      }
    }
    .mine-divider {
      border-bottom: 1px solid #ebebeb;
      width: 250px;
      margin: 18px auto;
    }
  }
  .gray {
    color: #9a9a9a;
  }
  .van-cell__value {
    font-size: 12px;
  }
}
</style>
