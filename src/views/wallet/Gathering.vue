<!--
 * @Author: joevin
 * @LastEditors: joevin
 * @Date: 2020-09-13 17:55:29
 * @LastEditTime: 2020-09-26 22:19:24
 * @FilePath: /html/src/views/wallet/Gathering.vue
-->
<template>
  <div class="gathering-wrapper">
    <page-header :title="$t('wallet.gathering.title')"></page-header>
    <section class="qr-code-wrap">
      <div class="img-wrap">
        <qr-code :value="addr" :options="{ width: 210 }" />
      </div>
      <div class="tips-wrap">
        <p class="code" @click="copy">{{ addr }}</p>
        <p class="tips" @click="copy">
          （{{ $t("wallet.deposit.clickToCopy") }}）
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import { getMemberAddress } from "@/http/modules/wallet";
import { Toast } from "vant";
import { mapState } from "vuex";
import QrCode from "@chenfengyuan/vue-qrcode";
import PageHeader from "@/components/Header";
import i18n from "@/langs";
export default {
  components: {
    PageHeader,
    QrCode,
  },
  data() {
    return {
      addr: "loading",
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  activated() {
    this.getCurrencyInfo();
  },
  methods: {
    async getCurrencyInfo() {
      var self = this;
      Toast.loading();
      //获取账户地址
      const { current_maddr_id } = this.userInfo;
      const ret = await getMemberAddress(current_maddr_id);
      Toast.clear();
      if (ret && ret.data) {
        self.addr = ret.data.address;
      } else {
        Toast.error(self.$t(ret.msg));
      }
    },
    copy: function () {
      this.$copyText(this.addr).then(
        function () {
          Toast.success(i18n.t("common.copySuccess"));
        },
        function () {
          Toast.error(i18n.t("common.copyFail"));
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.gathering-wrapper {
  padding: 60px 0 0;
  width: 100%;
  height: 100vh;
  background: #f3f3f3;
  .qr-code-wrap {
    margin: 0 20px;
    background: #ffffff;
    border-radius: 12px;
  }
  .img-wrap {
    margin: auto;
    padding: 36px 0 47px 0;
    text-align: center;
    img {
      width: 202px;
      height: 203px;
    }
  }
  .tips-wrap {
    padding: 31px 0 24px 0;
    text-align: center;
    border-top: 1px dotted #cfcfcf;
    .code {
      margin-bottom: 10px;
      font-size: 15px;
    }
    .tips {
      font-size: 12px;
    }
  }
}
</style>