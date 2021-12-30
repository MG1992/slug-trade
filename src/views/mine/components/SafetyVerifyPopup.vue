<template>
  <van-popup
    class="safety-verify-popup"
    v-model="isShow"
    round
    position="bottom"
    :style="{ height: '254px' }"
    safe-area-inset-bottom
    :close-on-click-overlay="false"
  >
    <div class="popup-content">
      <div class="p-b-5 f16">
        {{ $t('mine.accountManage.safetyVerification') }}
        <span
          class="f14 float-right gray"
          @click="$emit('close')"
        >{{ $t('common.cancel') }}</span>
      </div>
      <van-divider />
      <van-field
        class="m-t-20"
        v-model="form.pwd"
        :type="showPwd ? 'text' : 'password'"
        :placeholder="$t('mine.accountManage.pleaseEnterAccountPassword')"
        :right-icon="showPwd ? 'eye-o' : 'closed-eye'"
        @click-right-icon="showPwd =! showPwd"
      />
      <ButtonCommon fixed @click="toSubmit">{{ $t("common.confirm") }}</ButtonCommon>
    </div>
  </van-popup>
</template>

<script>
import {
  Popup as VanPopup,
  Divider as VanDivider,
  Field as VanField,
} from "vant"
import checkRules from "@/utils/checkRules"
import i18n from "@/langs"
import ButtonCommon from "@/components/ButtonCommon"

export default {
  components: {
    VanPopup,
    VanDivider,
    VanField,
    ButtonCommon,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showPwd: false,
      form: {
        pwd: "",
      },
      rules: [
        {
          attr: "pwd", // originObj中的属性
          cnName: i18n.t("mine.accountManage.accountPassword"), // 中文名
          rules: {
            allowNull: false, // default: false 是否允许非空 默认是false
          },
        },
      ],
    }
  },
  watch: {
    isShow() {
      this.form.pwd = ""
    },
  },
  methods: {
    toSubmit() {
      if (checkRules(this.form, this.rules)) return
      this.$emit("returnPwd", this.form.pwd)
    },
  },
}
</script>
<style lang="scss">
.safety-verify-popup {
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
  .m-t-46 {
    margin-top: 46px;
  }
  .gray {
    color: #666666;
  }
}
</style>
