<template>
  <div class="cretae-address-wrapper">
    <Header :title="$t('user.createAddress.title')" />
    <!-- 内容 -->
    <div class="create-content">
      <div class="input-title">
        {{ $t("user.createAddress.walletName") }}
      </div>
      <div class="input-wrapper">
        <van-field
          v-model="create.m_name"
          type="text"
          :placeholder="
            $t('common.pleaseEnter') + $t('user.createAddress.walletName')
          "
        />
      </div>
      <div class="input-title">
        {{ $t("user.createAddress.pleaseSetASecurityPassword") }}
      </div>
      <div class="input-wrapper">
        <van-field
          v-model="create.m_pwd"
          type="password"
          :placeholder="$t('common.enterPassword')"
        />
      </div>
      <div class="input-title">
        {{ $t("common.confirmPassword") }}
      </div>
      <div class="input-wrapper">
        <van-field
          v-model="create.repwd"
          type="password"
          :placeholder="$t('common.confirmPassword')"
        />
      </div>
    </div>
    <div class="confirm-btn-wrapper">
      <van-button @click="submit" class="confirm-btn">{{
        $t("common.confirm")
      }}</van-button>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import { Button as VanButton, Toast, Field as VanField } from "vant";
import { storage } from "@/utils/oldVersionFunc";
import { createWallet } from "@/http/modules/user";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home");
import checkRules from "@/utils/checkRules";
import i18n from "@/langs";

const Create = () => {
  return {
    m_name: "",
    m_pwd: "",
    repwd: ""
  };
};

export default {
  name: "ireateAddress",
  components: {
    VanButton,
    Header,
    VanField
  },
  data() {
    return {
      create: new Create(),
      rules: [
        {
          attr: "m_name",
          cnName: i18n.t("user.createAddress.walletName"),
          rules: {
            maxLength: 20, // 最大长度
            regex: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
            regexMsg: i18n.t(
              "user.createAddress.walletNameOnlySupportNumberLetterChinese"
            )
          }
        },
        {
          attr: "m_pwd",
          cnName: i18n.t("common.password"),
          rules: {
            regex: /^[A-Za-z0-9]+$/,
            regexMsg: i18n.t(
              "user.createAddress.passwordOnlySupportNumberLetter"
            )
          }
        },
        {
          attr: "repwd",
          cnName: i18n.t("common.password")
        }
      ]
    };
  },
  created() {},
  mounted() {},
  computed: {
    ...mapState(["deviceId"])
  },
  methods: {
    ...mapActions(["GetUserInfo"]),
    // beforeSubmit() {
    //   var regExp = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
    //   if (!this.walletName) {
    //     return Toast(this.$t("user.createAddress.pleaseEnterWalletName"))
    //   } else if (!regExp.test(this.walletName)) {
    //     return Toast(this.$t("user.createAddress.walletNameOnlySupportNumberLetterChinese"))
    //   }
    //   if (this.walletName.length > 18) {
    //     return Toast(this.$t("user.createAddress.walletNameCantLongerThan18"))
    //   }
    //   if (!this.pwd) {
    //     return Toast(this.$t("common.pleaseEnterPassword"))
    //   }
    //   return true
    // },
    async submit() {
      // 规则校验 尽量保持全局统一
      if (checkRules(this.create, this.rules)) return;
      // 两次输入的密码不一致
      if (this.create.m_pwd !== this.create.repwd) {
        Toast(this.$t("common.theTwoPasswordsYouEnteredDidNotMatch"));
        return;
      }
      const param = Object.assign({}, this.create, {
        machine: this.deviceId
      });
      const res = await createWallet(param);
      storage.set("mnemonic", res.data.mnemonic);
      // $acc.setAccData(res.data)
      this.GetUserInfo();
      this.toBackupsWallet();
    },
    // 备份助记词
    toBackupsWallet() {
      // $ui.openWinFrame('BACKUP_MNEMONICS', '~/sign/backups-wallet')
    }
  }
};
</script>
<style lang="scss" scoped>
.cretae-address-wrapper {
  .create-content {
    padding: 15px;
    .input-title {
      color: #343434;
      line-height: 35px;
      margin-top: 25px;
      font-size: 13px;
      text-indent: 10px;
    }
    .input-wrapper {
      .van-field {
        height: 40px;
        background: rgba(248, 248, 248, 1);
        border-radius: 4px;
        font-size: 13px;
      }
    }
  }
  .confirm-btn-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 22px 15px;
    width: 100%;
    .confirm-btn {
      height: 44px;
      background: rgba(254, 60, 90, 1);
      border-radius: 5px;
      width: 100%;
      color: #fff;
    }
  }
}
</style>
