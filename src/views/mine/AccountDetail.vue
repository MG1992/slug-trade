<template>
  <div class="header-page">
    <Header :title="$t('mine.AccountDetail.title')" />
    <div class="container">
      <div class="tips">
        <div class="tips-icon"></div>
        <div class="tips-content">
          <p>{{$t('mine.AccountDetail.tips1')}}</p>
          <p>{{$t('mine.AccountDetail.tips2')}}</p>
        </div>
      </div>

      <div class="item" v-if="privateKey">
        <div class="left">
          <p class="item-name">{{currency}}{{$t('mine.AccountDetail.privateKey')}}</p>
          <p class="item-tips">{{privateKey}}</p>
        </div>
        <div class="right" @click="doCopy(privateKey)">
          <div class="right-icon"></div>
        </div>
      </div>

      <div class="item" v-if="mnemonic">
        <div class="left">
          <p class="item-name">{{currency}}{{$t('mine.AccountDetail.mnemonic')}}</p>
          <p class="item-tips">{{mnemonic}}</p>
        </div>
        <div class="right" @click="doCopy(mnemonic)">
          <div class="right-icon"></div>
        </div>
      </div>

      <div class="item" v-if="address">
        <div class="left">
          <p class="item-name">{{currency}}{{$t('mine.AccountDetail.address')}}</p>
          <p class="item-tips">{{address}}</p>
        </div>
        <div class="right" @click="doCopy(address)">
          <div class="right-icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import { Toast } from "vant";
import i18n from "@/langs";

export default {
  components: {
    Header,
  },
  data() {
    return {
      mnemonic: "",
      address: "",
      privateKey: "",
      currency: "",
    };
  },
  mounted() {
    let { info = {} } = this.$route.params;
    this.mnemonic = info.mnemonic;
    this.address = info.address;
    this.privateKey = info.private_key;
    this.currency = info.currency;
  },
  methods: {
    doCopy(msg) {
      this.$copyText(msg).then(
        () => {
          Toast(i18n.t("mine.AccountDetail.copySuccess"));
        },
        () => {
          Toast(i18n.t("mine.AccountDetail.copyError"));
        }
      );
    },
  },
};
</script>
<style lang="scss">
body {
  background-color: #f3f3f3;
}
.container {
  .tips {
    text-align: center;
    padding: 40px 15px 35px;
    .tips-icon {
      margin: auto;
      width: 36px;
      height: 43px;
      background-image: url("../../assets/icons/mine_security.svg");
      background-size: cover;
      background-position: center;
    }
    .tips-content {
      margin-top: 20px;
      font-size: 13px;
      font-weight: 500;
      color: $themeColor;
      line-height: 24px;
    }
  }
  .item {
    margin: 0 15px 15px;
    background: #ffffff;
    box-shadow: 0px 2px 3px 0px rgba(57, 57, 57, 0.06);
    border-radius: 4px;
    padding: 15px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .left {
      .item-name {
        font-size: 15px;
        font-weight: bold;
        color: #333333;
        line-height: 23px;
        margin-bottom: 10px;
      }
      .item-tips {
        font-size: 13px;
        font-weight: 500;
        color: #666666;
        line-height: 23px;
      }
    }
    .right {
      margin-left: 15px;
      .right-icon {
        width: 20px;
        height: 20px;
        background-image: url("../../assets/icons/mine_copy.svg");
        background-size: cover;
        background-position: center;
      }
    }
  }
}
</style>
