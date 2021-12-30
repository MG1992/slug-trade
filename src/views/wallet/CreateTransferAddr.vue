<template>
  <div class="create-transfer-addr header-page">
    <Header :title="$t('wallet.transfer.createTransferAddress')"></Header>
    <div class="form-box f13">
      <van-field
        v-model="form.currency"
        rows="2"
        autosize
        readonly
        :label="$t('wallet.transfer.currentCurrency')"
        :placeholder="$t('wallet.transfer.pleaseEnterLabelInfo')"
      />
      <van-field
        v-model="form.addr_label"
        rows="2"
        autosize
        :label="$t('wallet.transfer.label')"
        type="textarea"
        :placeholder="$t('wallet.transfer.pleaseEnterLabelInfo')"
      />
      <van-field
        v-model="form.addr"
        rows="2"
        maxlength="100"
        autosize
        type="textarea"
        :label="$t('wallet.transfer.address')"
        :placeholder="$t('wallet.transfer.pleaseEnterOrPasteTheAddress')"
      />
      <van-field
        v-model="form.m_pwd"
        type="password"
        :label="$t('wallet.transfer.tradePassword')"
        :placeholder="$t('mine.accountManage.pleaseEnterAccountPassword')"
      />
    </div>

    <ButtonCommon fixed @click="toSubmit">{{
      $t("common.confirm")
    }}</ButtonCommon>
  </div>
</template>

<script>
import Header from "@/components/Header";
import { Field as VanField, Toast } from "vant";
import ButtonCommon from "@/components/ButtonCommon";
import { createTansferAddr } from "@/http/modules/wallet";
import i18n from "@/langs";
import checkRules from "@/utils/checkRules";

const Form = () => {
  return {
    addr: "",
    addr_destination: "",
    addr_label: "",
    coin_label_id: "",
    currency: "",
    m_pwd: "",
    retDataType: 0,
  };
};
export default {
  components: {
    Header,
    VanField,
    ButtonCommon,
  },

  data() {
    return {
      form: new Form(),
      rules: [
        {
          attr: "addr_label", // originObj中的属性
          cnName: i18n.t("wallet.transfer.label"), // 中文名
          rules: {
            // maxLength: 50, // 最大长度
            // minLength: 1, // 最小长度
            allowNull: false, // default: false 是否允许非空 默认是false
            regex: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, // 正则表达式
            regexMsg: i18n.t(
              "wallet.transfer.labelOnlySupportNumberLetterChinese"
            ),
          },
        },
        {
          attr: "addr", // originObj中的属性
          cnName: i18n.t("wallet.transfer.address"), // 中文名
          rules: {
            // maxLength: 50, // 最大长度
            // minLength: 1, // 最小长度
            allowNull: false, // default: false 是否允许非空 默认是false
            regex: /^[A-Za-z0-9]+$/, // 正则表达式
            regexMsg: i18n.t("wallet.transfer.addressOnlySupportNumberLetter"),
          },
        },
        {
          attr: "m_pwd", // originObj中的属性
          cnName: i18n.t("wallet.transfer.tradePassword"), // 中文名
          rules: {
            allowNull: false, // default: false 是否允许非空 默认是false
          },
        },
      ],
    };
  },

  activated() {
    this.form = new Form();
    this.form.currency = this.$route.query.currency;
    this.form.coin_label_id = this.$route.query.coinLabelId;
  },

  mounted() {},

  methods: {
    toSubmit() {
      if (checkRules(this.form, this.rules)) return;
      createTansferAddr(this.form).then(() => {
        Toast(i18n.t("common.createSuccess"));
        this.$router.replace({
          path: "/transferAddr",
          query: {
            currency: this.form.currency,
            isSelect: true,
            coinLabelId: this.form.coin_label_id,
          },
        });
      });
    },
  },
};
</script>
<style lang="scss">
.create-transfer-addr {
  background-color: #f3f3f3;
  min-height: 100vh;
  .form-box {
    margin: 15px;
    .van-cell {
      margin: 10px 0;
    }
    .van-field__label {
      font-size: 13px;
    }
    .van-field__body {
      font-size: 12px;
    }
  }
}
</style>
