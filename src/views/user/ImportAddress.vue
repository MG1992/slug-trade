<template>
  <div class="cretae-address-wrapper header-page">
    <Header :title="$t('user.importAddress.title')" />
    <!-- 内容 -->
    <div class="create-content">
      <div class="input-title">
        {{ $t("user.importAddress.walletName") }}
      </div>
      <div class="input-wrapper">
        <van-field
          class="import-input"
          v-model="create.m_name"
          type="text"
          :placeholder="
            $t('common.pleaseEnter') + $t('user.importAddress.walletName')
          "
        />
      </div>
      <div class="input-title">
        {{ $t("user.importAddress.pleaseSetASecurityPassword") }}
      </div>
      <div class="input-wrapper">
        <van-field
          class="import-input"
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
          class="import-input"
          v-model="create.repwd"
          type="password"
          :placeholder="$t('common.confirmPassword')"
        />
      </div>
      <div class="input-title">
        {{ $t("user.importAddress.mnemonicWords") }}
      </div>
      <div class="input-wrapper">
        <van-field
          v-model="create.mnemonic"
          maxLength="500"
          class="import-textarea"
          type="textarea"
          :placeholder="
            $t('user.importAddress.pleaseInputMnemonicWordsInCorrectOrder')
          "
        />
      </div>
    </div>
    <!-- <div class="confirm-btn-wrapper">
      <van-button
        @click="submit"
        class="confirm-btn"
      >{{$t('user.importAddress.importImmediately')}}</van-button>
    </div> -->
    <ButtonCommon fixed @click="submit">{{
      $t("common.confirm")
    }}</ButtonCommon>
  </div>
</template>
<script>
import Header from "@/components/Header";
import { Toast, Field as VanField } from "vant";
import { importAddress } from "@/http/modules/user";
import { mapState, mapMutations } from "vuex";
import i18n from "@/langs";
import ButtonCommon from "@/components/ButtonCommon";
import checkRules from "@/utils/checkRules";

const Create = () => {
  return {
    m_name: "",
    m_pwd: "",
    repwd: "",
    mnemonic: ""
  };
};

export default {
  name: "importAddress",
  components: {
    Header,
    VanField,
    ButtonCommon
  },
  data() {
    return {
      create: new Create(),
      rules: [
        {
          attr: "m_name",
          cnName: i18n.t("user.importAddress.walletName"),
          rules: {
            regex: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
            regexMsg: i18n.t(
              "user.importAddress.walletNameOnlySupportNumberLetterChinese"
            ),
            maxLength: 20 // 最大长度
          }
        },
        {
          attr: "m_pwd",
          cnName: i18n.t("common.password"),
          rules: {
            regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,50}$/,
            regexMsg: i18n.t(
              "common.passwordCantBeLessThan6AndMustIncludeNumbersAndLetters"
            ),
            minLength: 6,
            maxLength: 50
          }
        },
        {
          attr: "repwd",
          cnName: i18n.t("common.password")
        },
        {
          attr: "mnemonic",
          cnName: i18n.t("user.importAddress.mnemonicWords"),
          rules: {
            maxLength: 500 // 最大长度
          }
        }
      ]
    };
  },
  created() {},
  mounted() {},
  activated() {
    this.create = new Create();
  },
  computed: {
    ...mapState({
      deviceId: state => state.home.deviceId
    })
  },
  methods: {
    ...mapMutations("user", ["SET_USER_INFO", "SET_TOKEN"]),
    // beforeSubmit() {
    //   var regExp = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
    //   if (!this.walletName) {
    //     return Toast(this.$t('user.importAddress.pleaseEnterWalletName'))
    //   } else if (!regExp.test(this.walletName)) {
    //     return Toast(this.$t('user.importAddress.walletNameOnlySupportNumberLetterChinese'))
    //   }
    //   if (this.walletName.length > 18) {
    //     return Toast(this.$t('user.importAddress.walletNameCantLongerThan18'))
    //   }
    //   if (!this.pwd) {
    //     return Toast(this.$t('common.pleaseEnterPassword'))
    //   }
    //   if (this.pwd !== this.repwd) {
    //     return Toast(this.$t('common.theTwoPasswordsYouEnteredDidNotMatch'))
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
      await importAddress(param)
        .then(res => {
          this.SET_TOKEN(res.data.token);
          this.SET_USER_INFO(res.data);
          this.$router.push({
            path: "/",
            query: {
              eventName: "evtSwitchMainIndexTo"
            }
          });
          // $evt.trigger('evtSwitchMainIndexTo', 0)
        })
        .catch(() => {
          this.create.m_pwd = "";
          this.create.repwd = "";
          this.create.mnemonic = "";
        });
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
      .import-input {
        height: 40px;
        background: rgba(248, 248, 248, 1);
        border-radius: 4px;
        font-size: 13px;
      }
    }
    .import-textarea {
      height: 110px;
      background: rgba(248, 248, 248, 1);
      border-radius: 4px;
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