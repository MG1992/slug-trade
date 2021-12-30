<!--
 * @Author: joevin
 * @Date: 2020-09-12 13:57:50
 * @LastEditors: joevin
 * @LastEditTime: 2020-10-22 11:41:31
 * @FilePath: \html\src\views\wallet\Deposit.vue
 * @Desc: LHC充值页面
-->
<template>
  <div class="deposit-wrapper">
    <page-header :title="$t('wallet.deposit.title', { name: currencyName })">
      <van-icon
        slot="right"
        :name="recordBlack"
        size="16"
        @click="gotoHistory"
      />
    </page-header>
    <!-- 选择公链 -->
    <div class="choose-chain-wrap" v-if="dataList.length > 0">
      <p>{{ $t("wallet.deposit.pleaseChooseCoin") }}</p>
      <div class="type-select">
        <span
          v-for="item in dataList"
          :key="item.id"
          :class="{ active: coinLabelId === item.id }"
          @click="chooseCoin(item)"
          >{{ item.coin_label }}</span
        >
      </div>
    </div>
    <!-- 头部 -->
    <header class="title">
      {{ $t("wallet.deposit.tipsTitle", { name: currencyName }) }}
    </header>
    <!-- 二维码内容 -->
    <section class="content-wrap">
      <div class="qr-code-wrap" ref="qrCodeWrap">
        <!-- <img src alt="二维码" class="qr-code" /> -->
        <qr-code :value="depositAddr" :options="qrOptions" v-if="depositAddr" />
        <div class="qr-placeholder" v-else :style="qrOptions"></div>
        <p class="code" @click="copy">{{ depositAddr }}</p>
        <p class="tips" @click="copy">
          （{{ $t("wallet.deposit.clickToCopy") }}）
        </p>
      </div>
    </section>
    <!-- 提示信息 -->
    <section class="tips-wrap">
      <p>{{ $t("wallet.deposit.warmPrompt") }}：</p>
      <div v-if="currencyName === 'USDT'">
        <div
          v-html="
            $t('wallet.deposit.tips1', { amount: minAmount, currencyName })
          "
        ></div>
      </div>
      <div v-else>
        <div
          v-html="
            $t('wallet.deposit.tips2', { amount: minAmount, currencyName })
          "
        ></div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  getCoinLabels,
  getDepositAddress,
  createDepositAddress,
  queryCurrency,
  depositNotify,
} from "@/http/modules/wallet";
import { Icon as VanIcon, Toast } from "vant";
import QrCode from "@chenfengyuan/vue-qrcode";
import PageHeader from "@/components/Header";
import i18n from "@/langs";
import recordBlack from "@/assets/icons/recordBlack.svg";
export default {
  components: {
    PageHeader,
    QrCode,
    VanIcon,
  },
  data() {
    return {
      recordBlack,
      title: "充值",
      coinLabelId: -1,
      currency: {},
      depositAddr: "", // 地址
      depositLabel: "",
      isLabelCurrency: false,
      rowData: {},
      currencyName: "",
      dataList: [],
      qrOptions: {
        width: 210,
      },
      coinLabelIds: "",
    };
  },
  activated() {
    this.qrOptions = {
      width: this.$refs.qrCodeWrap.clientWidth,
      height: this.$refs.qrCodeWrap.clientWidth,
    };
    this.init();
  },
  computed: {
    // 最小充值额
    minAmount() {
      let res = 0;
      if (this.currency.currency) {
        const { c_min_recharge } = this.currency;
        res = c_min_recharge;
      }
      return res || 0;
    },
  },
  watch: {
    currency() {
      if (this.currency.currency) {
        this.depositAddr = "";
        this.depositLabel = "";
        this.getDepositAddress();
      }
    },
  },
  methods: {
    async init() {
      // 重置数据
      this.dataList = [];
      this.depositAddr = "";
      this.depositLabel = "";

      this.coinLabelIds = this.$route.query.coinLabelIds;
      this.currencyName = this.$route.query.currencyName;
      // LHC 需要一个参数 currencyName  USDT  coin_label_ids

      if (this.currencyName) {
        // USDT 需要查询子链集合
        if (this.currencyName === "USDT") {
          await this.getCoinLabels();
          // 默认第一个
          if (this.dataList.length > 0) {
            this.coinLabelId = this.dataList[0].id;
          }
        }
        const params = `${this.currencyName}/${new Date().getTime()}`;
        queryCurrency(params).then((resp) => {
          if (resp.status === 1) {
            this.currency = resp.currency;
          }
        });
      } else {
        // Toast + go(-1)
        Toast.fail(i18n.t("requestResponse.PROGRAM_ERROR"), 750);
        this.$router.go(-1);
      }
    },
    getDepositAddress() {
      // 查询充值地址
      const currency = this.currency.currency;
      const coin_label_id = this.coinLabelId;
      const ts = new Date().getTime();
      const params = `${currency}/${coin_label_id}/${ts}`;
      Toast.loading();

      getDepositAddress(params)
        .then((ret) => {
          if (ret.data) {
            const data = ret.data;
            //ESSA代币(地址: fsaff_PAFD)
            if (data.split("_")[1]) {
              this.isLabelCurrency = true;
              this.depositAddr = data.split("_")[0];
              this.depositLabel = data.split("_")[1];

              const address = this.depositAddr + "_" + this.depositLabel;
              const notifyParams = `${currency}/${address}`;
              depositNotify(notifyParams);
            } else {
              //非ESSA代币(地址: fsaff)
              this.isLabelCurrency = false;
              this.depositAddr = data;
            }
          } else {
            // 若无地址则去生成地址
            createDepositAddress({
              coin_label_id,
              currency,
            }).then((res) => {
              if (res.status === 1) {
                this.getDepositAddress();
              } else {
                Toast(this.$t("wallet.deposit.notAddr"));
              }
            });
          }
        })
        .catch(() => {
          createDepositAddress({
            coin_label_id,
            currency,
          }).then((res) => {
            if (res.status === 1) {
              this.getDepositAddress();
            }
          });
        });
    },
    // 获取币种集合
    async getCoinLabels() {
      //  coinLabelIds
      const ret = await getCoinLabels(this.coinLabelIds);

      if (ret && ret.data) {
        this.dataList = ret.data || [];
      }
    },
    chooseCoin(item) {
      if (item.id === this.coinLabelId) {
        return;
      }
      this.depositAddr = "";
      this.coinLabelId = item.id;
      const currencyName = this.currencyName;
      const params = `${currencyName}/${new Date().getTime()}`;
      queryCurrency(params).then((resp) => {
        if (resp.status === 1) {
          this.currency = resp.currency;
        }
      });
    },
    copy: function () {
      if (!this.depositAddr) {
        return;
      }
      this.$copyText(this.depositAddr).then(
        function () {
          Toast.success(i18n.t("common.copySuccess"));
        },
        function () {
          Toast.fail(i18n.t("common.copyFail"));
        }
      );
    },
    gotoHistory() {
      this.$router.push({
        name: "DepositRecords",
        query: {
          currency: this.currencyName,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.deposit-wrapper {
  padding-top: 44px;
  color: #666666;
  .title {
    padding: 30px 0 26px;
    font-size: 14px;
    text-align: center;
  }
  .choose-chain-wrap {
    padding: 15px 15px 0 15px;
    p {
      margin-bottom: 15px;
      font-size: 13px;
    }
    span {
      margin-right: 15px;
      display: inline-block;
      padding: 13px 13px 8px 13px;
      color: #333333;
      background: #f9f9f9;
      border-radius: 4px;
      &.active {
        color: $themeColor;
        background: #ffffff;
        border: 1px solid $themeColor;
      }
    }
  }
  .content-wrap {
    margin: 0 15px 15px 15px;
    padding: 23px 0;
    background: #f9f9f9;
    border-radius: 4px;
    .qr-code-wrap {
      margin: auto;
      width: 210px;
    }
    .qr-code {
      width: 210px;
      height: 210px;
    }
    .qr-placeholder {
      width: 100%;
      height: 50vw;
      background: #cccccc;
    }
    .code {
      padding: 10px 0;
    }
    p {
      text-align: center;
    }
  }
  .tips-wrap {
    margin: 0 15px;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 4px;
    font-size: 12px;
    line-height: 23px;
  }
}
</style>