<template>
  <div class="cretae-address-wrapper header-page">
    <Header :title="$t('user.createAddress.title')" />
    <div class="create-content">
      <div class="input-title">{{ $t("user.createAddress.walletName") }}</div>
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
      <div class="input-title">{{ $t("common.confirmPassword") }}</div>
      <div class="input-wrapper">
        <van-field
          v-model="create.repwd"
          type="password"
          :placeholder="$t('common.confirmPassword')"
        />
      </div>
    </div>
    <ButtonCommon fixed @click="submit">
      {{ $t("common.confirm") }}
    </ButtonCommon>
    <!-- <div class="confirm-btn-wrapper">
      <van-button
        @click="submit"
        class="confirm-btn"
      >{{$t('common.confirm')}}</van-button>
    </div>-->
  </div>
</template>
<script>
import Header from "@/components/Header";
import { Toast, Field as VanField } from "vant";
import { storage } from "@/utils/oldVersionFunc";
import { createWallet } from "@/http/modules/user";
import { mapState, mapMutations, mapActions } from "vuex";
import checkRules from "@/utils/checkRules";
import i18n from "@/langs";
import ButtonCommon from "@/components/ButtonCommon";

const Create = () => {
  return {
    m_name: "",
    m_pwd: "",
    repwd: ""
  };
};

export default {
  name: "createAddress",
  components: {
    Header,
    VanField,
    ButtonCommon
  },
  computed: {
    ...mapState({
      deviceId: state => state.home.deviceId
    })
  },
  data() {
    return {
      create: new Create(),
      rules: [
        {
          attr: "m_name",
          cnName: i18n.t("user.createAddress.walletName"),
          rules: {
            regex: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
            regexMsg: i18n.t(
              "user.createAddress.walletNameOnlySupportNumberLetterChinese"
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
        }
      ]
    };
  },
  created() {},
  mounted() {},
  activated() {
    this.create = new Create();
  },
  methods: {
    ...mapMutations("user", ["SET_TOKEN"]),
    ...mapActions({
      GetUserInfo: "user/GetUserInfo"
    }),
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
      this.SET_TOKEN(res.data.token);
      this.GetUserInfo();
      this.$router.push("BackupsWallet");
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
}
</style>
