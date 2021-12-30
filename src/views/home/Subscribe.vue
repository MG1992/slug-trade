<template>
  <div class="body_box">
    <Header :title="$t('home.subscribe.subscribe')" />

    <div class="round-box">
      <p class="round-box-open">
        {{
          profits
            ? profits.nut_currency + $t("home.subscribe.xxOpenSubscribe")
            : $t("home.subscribe.platformOpenSubscribe")
        }}
      </p>
      <h3 class="round-box-time">{{ mapShowTime }}</h3>
      <p class="round-box-limit">{{ $t("home.subscribe.curLimit") }}</p>
      <h3 class="round-box-num">{{ profitLimit }}</h3>
    </div>

    <p v-if="profits" class="round-box-open">
      {{ $t("home.subscribe.partCondition") }}
      <span>
        {{
          checkIsOk
            ? $t("home.subscribe.conditionMet")
            : $t("home.subscribe.conditionNotMet")
        }}
      </span>
    </p>

    <van-grid v-if="profits" :border="false" :column-num="3" class="van-grid">
      <van-grid-item>
        <h4>{{ profits.real_machine || 0 }}</h4>
        <p>{{ $t("home.subscribe.usefulMachine") }}</p>
        <span
          >{{ profits.ureal_machine || 0 }}
          {{ $t("home.subscribe.platform") }}</span
        >
      </van-grid-item>
      <van-grid-item>
        <h4>{{ profits.last_u_balance || 0 }}</h4>
        <p>{{ $t("home.subscribe.platformSaveU") }}</p>
        <span>{{ setNumberCount(profits.ulast_u_balance, 4) || 0 }}U</span>
      </van-grid-item>
      <van-grid-item>
        <h4>{{ profits.real_addrs || 0 }}</h4>
        <p>{{ $t("home.subscribe.usefulAddr") }}</p>
        <span
          >{{ profits.ureal_addrs || 0 }} {{ $t("home.subscribe.the") }}</span
        >
      </van-grid-item>
    </van-grid>

    <van-grid v-else :border="false" :column-num="3" class="van-grid">
      <van-grid-item>
        <p>{{ $t("home.subscribe.usefulMachine") }}</p>
      </van-grid-item>
      <van-grid-item>
        <p>{{ $t("home.subscribe.platformSaveU") }}</p>
      </van-grid-item>
      <van-grid-item>
        <p>{{ $t("home.subscribe.usefulAddr") }}</p>
      </van-grid-item>
    </van-grid>

    <div v-if="profits" class="van-btn-1">
      <van-button
        class="van-btn-2"
        v-for="(item, idx) in profits.bolt_currency.split(',')"
        :key="idx"
        @click="openPop(item)"
        :block="true"
        :color="$color.themeColor"
      >
        {{ $t("home.subscribe.use") }} {{ item }}
        {{ $t("home.subscribe.subscribe") }}
      </van-button>
    </div>
    <!-- <van-button v-if="profits" class="van-btn-2" @click="openPop(profits.nut_currency)" :block="true" :color="$color.themeColor">使用{{ profits.nut_currency }}众筹</van-button> -->

    <van-popup
      :style="{ height: '393px' }"
      closeable
      position="bottom"
      v-model="showPop"
    >
      <van-form v-if="profits" @submit="onSubmit" class="submit-box">
        <div class="submit-title">
          {{ $t("home.subscribe.subscribe") }} {{ profits.nut_currency }}
        </div>
        <p class="submit-last">
          {{ $t("home.subscribe.wallet") }} {{ currency }}
          {{ $t("home.subscribe.balance") }} {{ currencyLimit }}
        </p>
        <div>
          <van-field
            v-model="w_amount"
            label
            type="number"
            :placeholder="$t('home.subscribe.inputSubscribeNum')"
            class="submit-input"
          />
        </div>
        <div>
          <van-field
            v-model="m_security_pwd"
            type="password"
            label
            :placeholder="$t('home.subscribe.inputWalletPwd')"
            class="submit-input"
          />
        </div>

        <van-button
          class="van-btn-3"
          :color="$color.themeColor"
          block
          type="info"
          native-type="submit"
          >{{ $t("home.subscribe.subscribeNow") }}</van-button
        >
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import {
  getSubscribeInfo,
  submitSubscribe,
  getSubscribeList,
} from "@/http/modules/home";
import { getAccounts } from "@/http/modules/wallet";
import { setNumberCount } from "@/utils/tool.js";

import {
  Toast,
  Grid as VanGrid,
  GridItem as VanGridItem,
  Popup as VanPopup,
  Button as VanButton,
  Form as VanForm,
  Field as VanField,
} from "vant";

import Header from "@/components/Header";

export default {
  components: {
    Header,
    VanGrid,
    VanGridItem,
    VanPopup,
    VanButton,
    VanForm,
    VanField,
  },

  data() {
    return {
      setNumberCount,
      showPop: false,
      seI_autoFn: null,
      showTime: 60,
      w_amount: "",
      m_security_pwd: "",
      profits: null,
      currency: "",
      currencyLimit: 0,
      profitLimit: 0,
      accounts: null,
      currencys: null,
      isMainUser: false,
    };
  },
  watch: {
    w_amount: function (nVal, oVal) {
      const regExp = /\.\d{4}$/;
      const parseVal = Number(nVal);
      if (isNaN(parseVal) || parseFloat(nVal) < 0 || regExp.test(nVal)) {
        this.w_amount = oVal;
      } else {
        this.w_amount = nVal;
      }
    },
  },
  activated() {
    this.init();
    this.getUserValue();
  },

  mounted() {},
  computed: {
    mapShowTime() {
      if (this.showTime <= 0) {
        if (this.seI_autoFn) {
          clearInterval(this.seI_autoFn);
        }
        return this.$t("common.pleaseExpected");
      }
      const sec = this.showTime % 60;
      const miu = Math.floor(this.showTime / 60) % 60;
      const hor = Math.floor(this.showTime / 60 / 60);
      return `${hor} : ${miu} : ${sec}`;
      // return this.$t("home.subscribe.comingSoon");
    },
    checkIsOk() {
      // if (this.profits.ureal_machine < this.profits.real_machine) {
      //   return false;
      // } else
      if (this.profits.ulast_u_balance < this.profits.last_u_balance) {
        return false;
      } else if (this.profits.ureal_addrs < this.profits.real_addrs) {
        return false;
      }
      return true;
    },
  },
  methods: {
    getUserValue: function () {
      getAccounts().then((res) => {
        this.accounts = res.accounts;
        this.currencys = res.currencys;
      });
    },
    getProfitLimit: function (id) {
      getSubscribeInfo(id).then((res) => {
        this.profitLimit = res.data.nut_balance;
      });
    },
    init: function () {
      getSubscribeList().then((res) => {
        if (res.data) {
          if (
            this.checkTimeIsOk(res.data.nutbolt_start, res.data.nutbolt_end)
          ) {
            this.getProfitLimit(res.data.id);
            this.profits = res.data;
            this.mapTime(res.data.nutbolt_end);
          } else {
            this.showTime = 0;
          }
        } else {
          this.showTime = 0;
        }
      });
    },
    onSubmit: function () {
      if (this.w_amount === "") {
        return Toast(this.$t("home.subscribe.inputSubscribeNum"));
      }

      if (this.m_security_pwd === "") {
        return Toast(this.$t("wallet.transfer.PLEASE_ENTER_FUND_PASSWORD"));
      }

      // const bolt_currency = this.profits.bolt_currency.split(",");

      submitSubscribe({
        nutbolt_id: this.profits.id,
        quote_currency: this.currency,
        // price: this.profits.bolt_price.split(",")[
        //   bolt_currency.indexOf(this.currency)
        // ],
        w_amount: this.w_amount,
        m_security_pwd: this.m_security_pwd,
      }).then((res) => {
        if (res && res.status) {
          Toast(this.$t("home.subscribe.subscribeSuccess"));
          this.m_security_pwd = "";
          this.w_amount = "";
          this.showPop = false;
          this.getUserValue();
          this.init();
        }
      });
    },
    openPop: function (currency) {
      if (!this.profits) {
        return Toast(this.$t("home.subscribe.comingSoon"));
      }
      this.m_security_pwd = "";
      this.w_amount = "";
      this.showPop = true;
      this.currency = currency;
      this.currencyLimit = 0;
      for (let idx = 0; idx < this.accounts.length; idx++) {
        if (this.accounts[idx].currency === this.currency) {
          this.currencyLimit = this.accounts[idx].available_balance || 0;
        }
      }
    },

    mapTime: function (end) {
      this.showTime = (Date.parse(end) - Date.parse(new Date())) / 1000;
      this.updateTime();
    },
    updateTime: function () {
      const self = this;
      clearInterval(this.seI_autoFn);
      this.seI_autoFn = null;
      this.seI_autoFn = setInterval(function () {
        if (self.showTime <= 1) {
          clearInterval(this.seI_autoFn);
          self.seI_autoFn = null;
          self.showTime = 0;
          self.profits = null;
        }
        self.showTime -= 1;
      }, 1000);
    },
    checkTimeIsOk: function (start, end) {
      return (
        Date.parse(start) < Date.parse(new Date()) &&
        Date.parse(new Date()) < Date.parse(end)
      );
    },
  },
  deactivated() {
    if (this.seI_autoFn) clearInterval(this.seI_autoFn);
    this.showTime = 0;
  },
};
</script>
<style lang="scss" scoped>
.body_box {
  background: #f3f3f3;
  min-height: 100vh;
  padding: 45px 15px 0;
}
.round-box {
  width: 206px;
  height: 206px;
  border-radius: 50%;
  text-align: center;
  margin: 30px auto;
  font-size: 12px;
  padding: 30px 0;
  line-height: 1;
  background-image: url("../../assets/img/cricular.png");
  background-size: 100%;
}
.round-box-open {
  color: #666;
  margin-bottom: 8px;
}
.round-box-open span {
  float: right;
  color: #666;
}
.van-grid {
  border-radius: 15px;
  overflow: hidden;
}
.van-grid-item__content {
  background-color: #1c2e40;
}
.van-grid h4 {
  font-size: 19px;
  color: $themeColor;
  margin-bottom: 12px;
}
.van-grid p {
  font-size: 12px;
  color: #9a9a9a;
  margin-bottom: 8px;
}
.van-grid span {
  font-size: 12px;
  color: #666;
}
.round-box-time {
  font-size: 22px;
  margin-bottom: 60px;
  color: $themeColor;
}
.round-box-limit {
  color: #fff;
  margin-bottom: 18px;
}
.round-box-num {
  color: #fff;
  font-size: 22px;
}
.van-btn-1 {
  margin-top: 50px;
}
.van-btn-2 {
  margin-top: 20px;
}
.van-btn-3 {
  margin-top: 45px;
}
.submit-box {
  padding: 0 15px;
}
.submit-title {
  color: #202028;
  font-size: 16px;
  margin-top: 25px;
  padding-bottom: 25px;
  text-align: center;
  border-bottom: 1px solid #ececec;
}
.submit-last {
  margin-top: 38px;
}
.submit-input {
  margin-top: 25px;
  background-color: #f8f8f8;
}
</style>
