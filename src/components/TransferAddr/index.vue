<template>
  <section class="amount-wrap wrap-item">
    <p>{{ $t("wallet.transfer.transferAddr") }}</p>
    <van-row type="flex" justify="space-between" align="center">
      <van-col span="20">
        <input
          type="text"
          :value="inputValue"
          @input="HandleInput"
          maxlength="100"
          :placeholder="$t('wallet.transfer.inputTransferAddr')"
        />
      </van-col>
      <van-col @click="switchAddr">
        <van-icon name="contact" />
      </van-col>
    </van-row>
  </section>
</template>
<script>
/**
 * 选择转账地址组件
 * <TransferAddr v-model="innerUSDTAddr" @switchAddr="switchAddr" />
 * @props {value} 双向数据绑定地址值
 * @emit {switchAddr} 点击选择右边头像响应事件
 */
import { Row as VanRow, Col as VanCol, Icon as VanIcon } from "vant";

export default {
  name: "TransferAddr",
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      inputValue: "",
    };
  },
  watch: {
    value(nVal) {
      this.inputValue = nVal;
    },
  },
  components: {
    VanRow,
    VanCol,
    VanIcon,
  },
  methods: {
    switchAddr() {
      this.$emit("switchAddr");
    },
    HandleInput(e) {
      let nVal = e.target.value;
      nVal = nVal.replace(/[^\w]/gi, "");
      e.target.value = nVal;
      this.$emit("input", nVal);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap-item {
  padding: 15px 15px 15px 11px;
  margin-top: 15px;
  background: #ffffff;
  box-shadow: 1px 2px 3px 0px rgba(57, 57, 57, 0.06);
  border-radius: 4px;
  overflow: hidden;
  p {
    &:first-child {
      margin-bottom: 13px;
    }
  }
  .van-cell {
    align-items: center;
    padding: 0;
    font-size: 13px;
    line-height: 1;
  }
  input {
    width: 100%;
    border: 0;
    font-size: 12px;
  }
}
</style>