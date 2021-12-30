<template>
  <div class="wrapper header-page">
    <Header title="保证金" />

    <div class="banner">
      <p class="nav">保证金说明</p>
      <div class="content">
        发布广告或进行买卖交易，需缴纳{{ config.be_money_boss_amount
        }}{{ config.be_money_boss_currency }}作为保证金。
        超过72小时没有交易，保证金可以申请退还。
      </div>
    </div>

    <div class="footer">
      <ButtonCommon
        :disabled="
          accountInfo.is_super === 1 && accountInfo.is_super_profit === 0
        "
        class="footer-btn"
        @click="toSubmit"
      >
        {{ accountInfo.is_super === 0 ? "立即缴纳" : "申请退还" }}
      </ButtonCommon>
    </div>
    <safety-verify-popup
      :isShow="showPopup"
      @returnPwd="returnPwd"
      @close="showPopup = false"
    />
  </div>
</template>
<script>
import Header from "@/components/Header";
import { Toast } from "vant";
import ButtonCommon from "@/components/ButtonCommon";
import { mapActions } from "vuex";
import SafetyVerifyPopup from "@/views/mine/components/SafetyVerifyPopup";
import { beVip, returnVip } from "@/http/modules/otc.js";
import { getFrmconfig } from "@/http/modules/pattern.js";

export default {
  name: "currencyShares",
  components: {
    ButtonCommon,
    Header,
    SafetyVerifyPopup
  },
  data() {
    return {
      showPopup: false,
      accountInfo: {},
      config: {}
    };
  },
  watch: {},
  activated() {
    this.getInfo();
  },
  created() {
    this.getFrmconfig();
  },
  methods: {
    ...mapActions({
      GetActivateAddressBeforeAssurance:
        "mine/GetActivateAddressBeforeAssurance"
    }),
    // 获取系统配置
    getFrmconfig() {
      getFrmconfig().then(res => {
        this.config = res.data;
      });
    },
    async getInfo() {
      this.accountInfo = await this.GetActivateAddressBeforeAssurance();
    },
    async returnPwd(pwd) {
      if (!pwd) {
        Toast("请输入密码");
        return;
      }
      if (this.accountInfo.is_super === 0) {
        await beVip(pwd);
        Toast("操作成功");
      } else {
        await returnVip(pwd);
        Toast("操作成功");
      }
      this.showPopup = false;
      this.getInfo();
    },
    toSubmit() {
      this.showPopup = true;
    }
  }
};
</script>
<style lang="scss" scoped>
@import url("vant/lib/icon/local.css");
$txtGreen: #03ad90;
$txtYellow: #edb259;
$txtBlack: #333333;
$txtGray: #8193a0;
.text-yellow {
  color: $txtYellow !important;
}
.wrapper {
  background: #fff;
  padding-bottom: 130px;
  .nav {
    margin-top: 30px;
    font-weight: bold;
    padding-left: 20px;
  }
  .content {
    font-weight: normal;
    padding: 20px;
    line-height: 20px;
  }
  .footer {
    position: fixed;
    width: 100%;
    padding: 10px 0 30px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    .footer-btn {
      width: 345px;
      margin: auto;
    }
  }
}
</style>