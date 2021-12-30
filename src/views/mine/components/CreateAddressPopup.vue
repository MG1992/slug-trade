<template>
  <van-popup
    class="create-address-popup"
    v-model="show"
    v-if="isShow"
    round
    position="bottom"
    :style="{ height: '314px' }"
    safe-area-inset-bottom
    :close-on-click-overlay="false"
  >
    <div class="popup-content">
      <div class="p-b-5 f16">
        {{ title }}
        <span class="f14 float-right gray" @click="$emit('close')">{{
          $t("common.cancel")
        }}</span>
      </div>
      <van-divider />
      <van-field
        class="m-t-20"
        v-model="form.name"
        :placeholder="$t('mine.accountManage.pleaseEnterWalletName')"
        maxlength="20"
        v-if="!popupType.includes('Pwd')"
      />
      <van-field
        v-model="form.pwd"
        type="password"
        :placeholder="$t('mine.accountManage.pleaseEnterTradePassword')"
        v-if="popupType !== 'wallet'"
        maxlength="50"
      />

      <ButtonCommon fixed @click="toSubmit">
        {{ $t("common.confirm") }}
      </ButtonCommon>
    </div>
  </van-popup>
</template>

<script>
import {
  Popup as VanPopup,
  Divider as VanDivider,
  Field as VanField,
  Toast
} from "vant";
import i18n from "@/langs";
import checkRules from "@/utils/checkRules";
import { createAddress, updateWalletName } from "@/http/modules/mine.js";
import ButtonCommon from "@/components/ButtonCommon";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    VanPopup,
    VanDivider,
    VanField,
    ButtonCommon
  },
  props: {
    title: {
      type: String,
      default: i18n.t("mine.accountManage.createAddress")
    },
    isShow: {
      type: Boolean,
      default: false
    },
    popupType: {
      type: String,
      default: ""
    },
    walletName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: false,
      form: {
        name: "",
        pwd: ""
      },
      nameRule: [
        {
          attr: "name", // originObj中的属性
          cnName: i18n.t("mine.accountManage.walletName"), // 中文名
          rules: {
            maxLength: 20, // 最大长度
            minLength: 1, // 最小长度
            allowNull: false, // default: false 是否允许非空 默认是false
            regex: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, // 正则表达式
            regexMsg: i18n.t(
              "mine.accountManage.walletNameOnlySupportNumberLetterChinese"
            )
          }
        }
      ],
      pwdRule: [
        {
          attr: "pwd", // originObj中的属性
          cnName: i18n.t("mine.accountManage.tradePassword"), // 中文名
          rules: {
            allowNull: false // default: false 是否允许非空 默认是false
            // regex: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, // 正则表达式
            // regexMsg: i18n.t(
            //   "mine.accountManage.walletNameOnlySupportNumberLetterChinese"
            // ),
          }
        }
      ]
    };
  },
  computed: {
    ...mapState({
      deviceId: state => state.home.deviceId
    })
  },
  watch: {
    isShow(val) {
      this.form.name = this.walletName || "";
      this.form.pwd = "";
      this.show = val;
    }
  },
  methods: {
    ...mapActions({
      GetActivateAddress: "mine/GetActivateAddress",
      GetAddressInfo: "mine/GetAddressInfo"
    }),

    toSubmit() {
      const { name, pwd } = this.form;
      // 没有类型就是创建地址
      !this.popupType && this.createAddress(name, pwd);
      // 修改钱包名称
      this.popupType === "wallet" && this.updateWalletName(name);
      // 密码输入之后回调
      if (
        this.popupType.includes("Pwd") &&
        !checkRules(this.form, this.pwdRule)
      ) {
        this.$emit("returnPwd", {
          pwd: this.form.pwd,
          type: this.popupType
        });
      }
    },
    // 创建地址
    createAddress(name, pwd) {
      if (checkRules(this.form, [...this.nameRule, ...this.pwdRule])) return;
      const params = {
        m_pwd: pwd,
        name,
        machine: this.deviceId
      };
      createAddress(params).then(() => {
        Toast(i18n.t("common.createSuccess"));
        this.$emit("close");
        this.$emit("refresh", this.popupType);
      });
    },
    //修改钱包名称
    updateWalletName(name) {
      if (checkRules(this.form, this.nameRule)) return;
      const params = {
        id: this.$route.query.id,
        name
      };
      updateWalletName(params).then(() => {
        Toast(i18n.t("common.updateSuccess"));
        //更新我的地址名称
        this.GetActivateAddress(this.$route.query.id);
        //更新账户地址列表
        this.GetAddressInfo();
        this.$emit("refresh", this.popupType);
        this.$emit("close");
      });
    }
  }
};
</script>
<style lang="scss">
.create-address-popup {
  .popup-content {
    margin: 22px 15px;
    div {
      text-align: center;
    }
    .van-field__control {
      background-color: #f8f8f8;
      height: 40px;
      padding: 0 10px;
      border-radius: 6px;
    }
    .van-cell:after {
      border: none;
    }
  }
  .gray {
    color: #666666;
  }
}
</style>
