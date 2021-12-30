<!--
发布广告的出售-多选
订单的购买-只需要paymentId,通过returnSalePayId传递
订单的出售-需要paymentId、paymentType,通过returnSalePayTypes传递
-->
<template>
  <div class="sale-pay-type">
    <van-radio-group v-if="isOrder" v-model="paymentId">
      <!-- 购买时显示对方发布时选择的支付方式   出售时显示自己已激活的收款方式-->
      <div
        class="gray-border"
        v-for="item in payments.length ? payments : payTypeList"
        :key="item.id"
      >
        <van-cell class="nomal-cell">
          <div slot="title" class="pay-type-title">
            <img :src="KeyFilter(item.payment_type, 'otc.paymentTypeIcon')" />
            {{ item.payment_no }}
          </div>
          <van-radio
            slot="right-icon"
            :checked-color="$color.themeColor"
            @click="selectPayType(item)"
            :name="item.id"
          />
        </van-cell>
      </div>
    </van-radio-group>
    <van-checkbox-group v-else v-model="paymentIds" @change="changeCheckbox">
      <div class="gray-border" v-for="item in payTypeList" :key="item.id">
        <van-cell class="nomal-cell">
          <div slot="title" class="pay-type-title">
            <img :src="KeyFilter(item.payment_type, 'otc.paymentTypeIcon')" />
            {{ item.payment_no }}
          </div>
          <van-checkbox slot="right-icon" :checked-color="$color.themeColor" :name="item.id" />
        </van-cell>
      </div>
    </van-checkbox-group>
  </div>
</template>

<script>
import {
  RadioGroup as VanRadioGroup,
  Cell as VanCell,
  Radio as VanRadio,
  Checkbox as VanCheckbox,
  CheckboxGroup as VanCheckboxGroup,
} from "vant"
import { KeyFilter } from "@/utils/filter"
import { getMyEnablePayType } from "@/http/modules/mine.js"

export default {
  components: {
    VanRadioGroup,
    VanRadio,
    VanCell,
    VanCheckbox,
    VanCheckboxGroup,
  },

  data() {
    return {
      KeyFilter,
      paymentId: "",
      paymentIds: [], //多选
      payTypeList: [],
    }
  },
  props: {
    isOrder: {
      type: Boolean,
      default: false,
    },
    payments: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    reset() {
      this.paymentId = ""
      this.paymentIds = []
      // 多选
      this.$emit("returnSalePayTypes", {
        paymentIds: [],
        paymentTypes: [],
      })
      // 单选
      this.$emit("returnSalePayId", this.paymentId)
    },
    // 获取可用的支付方式-激活的
    getMyEnablePayType() {
      getMyEnablePayType().then((res) => {
        this.payTypeList = res.data
      })
    },
    selectPayType(item) {
      // if (item.disabled) return
      // 购买时是从列表带过来的支付方式，直接为数组['1','2','3']
      this.paymentId = item.id
      // const paymentType = item.id
      this.$emit("returnSalePayId", this.paymentId)
    },
    changeCheckbox(ids) {
      this.paymentIds = ids
      let paymentTypes = []

      // 获取payment_types
      if (ids.length) {
        ids.map((id) => {
          this.payTypeList.map((type) => {
            if (type.id === id) {
              paymentTypes.push(type.payment_type)
            }
          })
        })
      }
      this.$emit("returnSalePayTypes", {
        paymentIds: this.paymentIds,
        paymentTypes,
      })
    },
  },
}
</script>
<style lang='scss' scoped>
.sale-pay-type {
  .select-pay-type {
    height: 46px;
    line-height: 46px;
    border-bottom: 1px solid #ebedf0;
    font-size: 14px;
  }
  .nomal-cell {
    .van-cell__title {
      color: #919daa;
    }
    .van-cell:after {
      left: 0;
    }
  }
  .pay-type-title {
    line-height: 24px;
    img {
      vertical-align: text-bottom;
      width: 16px;
    }
  }
  .gray-border {
    border-bottom: 1px solid #ebedf0;
  }
}
</style>