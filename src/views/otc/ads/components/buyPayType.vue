<template>
  <div class="buy-pay-type">
    <div v-for="item in payTypeIconList" :key="item.key" @click="selectPayType(item)">
      <p :class="payTypeSelect[Number( item.key)]?'active':'common'">
        <img :src="item.value" />
      </p>
    </div>
  </div>
</template>

<script>
import keys from "@/config/keyValue"

export default {
  components: {},

  data() {
    return {
      payTypeIconList: keys.otc.paymentTypeIcon,
      payTypeSelect: {
        1: false,
        2: false,
        3: false,
      },
      payTypes: [],
    }
  },

  activated() {
    this.reset()
  },
  methods: {
    reset() {
      this.payTypes = []
      this.$emit("returnPayType", this.payTypes)
      this.payTypeSelect = {
        1: false,
        2: false,
        3: false,
      }
    },
    selectPayType(item) {
      const type = item.key
      const numberType = Number(type)
      this.payTypeSelect[numberType] = !this.payTypeSelect[numberType]
      if (this.payTypeSelect[numberType]) {
        // 存在新增
        this.payTypes.push(type)
        this.payTypes = Array.from(new Set(this.payTypes))
      } else {
        // 不存在删除
        const itemIndex = this.payTypes.findIndex((item) => item === type)
        this.payTypes.splice(itemIndex, 1)
      }
      this.$emit("returnBuyPayType", this.payTypes)
    },
  },
}
</script>
<style lang='scss' scoped>
.buy-pay-type {
  display: flex;
  // justify-content: center;
  margin-top: 21px;
  img {
    width: 30px;
    vertical-align: middle;
  }
  & > div {
    line-height: 45px;
    text-align: center;
    box-sizing: border-box;
    width: 33.3%;
  }
  .active {
    border: 1px solid #efba6b;
    border-radius: 3px;
    width: 45px;
    margin: 0 auto;
  }
  .common {
    border: 1px solid transparent;
  }
}
</style>