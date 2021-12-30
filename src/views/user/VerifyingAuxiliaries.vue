<template>
  <div class="header-page">
    <Header :title="$t('sign.BackupsWallet.title')" />

    <div class="tips">{{ $t("sign.VerifyingAuxiliaries.tips") }}</div>

    <div class="view">
      <div
        class="item"
        v-for="(item, index) in virifyItems"
        :key="index"
        @click="clickVirify(item, index)"
      >{{ item }}</div>
    </div>

    <div class="error" v-if="!isCorrect">{{ $t("sign.VerifyingAuxiliaries.error") }}</div>

    <div class="box">
      <div
        class="item"
        v-for="(item, index) in clickItems"
        :key="index"
        @click="clickWord(item, index)"
      >{{ item }}</div>
    </div>

    <ButtonCommon fixed @click="virifyOrder">
      {{
      $t("requestResponse.CONFIRM")
      }}
    </ButtonCommon>
  </div>
</template>
<script>
import Header from "@/components/Header"
import ButtonCommon from "@/components/ButtonCommon"
import { storage } from "@/utils/oldVersionFunc"

export default {
  components: {
    Header,
    ButtonCommon,
  },
  data() {
    return {
      mnemonic: storage.get("mnemonic"),
      virifyItems: [],
      clickItems: [],
      isCorrect: true,
    }
  },
  activated() {
    this.mnemonic = storage.get("mnemonic")
    this.clickItems = this.shuffle(this.mnemonic.split(" "))
    this.virifyItems = []
    this.isCorrect = true
  },
  methods: {
    shuffle: function (array) {
      var m = array.length,
        t,
        i
      while (m) {
        i = Math.floor(Math.random() * m--)
        t = array[m]
        array[m] = array[i]
        array[i] = t
      }
      return array
    },
    clickWord: function (word, index) {
      var self = this
      self.clickItems.splice(index, 1)
      self.virifyItems.push(word)
    },
    clickVirify: function (word, index) {
      var self = this
      this.virifyItems.splice(index, 1)
      self.clickItems.push(word)
    },
    virifyOrder: function () {
      var virifyingOrder = this.virifyItems.join(" ")
      var correctOrder = this.mnemonic
      if (virifyingOrder === correctOrder) {
        this.isCorrect = true
        this.toCompleted()
      } else {
        this.isCorrect = false
      }
    },
    toCompleted: function () {
      this.$router.push({ path: "/WalletCompleted" })
    },
  },
}
</script>
<style lang="scss" scoped>
.tips {
  padding: 30px 15px 0;
  font-size: 13px;
  font-weight: 500;
  color: #333333;
}
.box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  padding: 5px 15px;
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    margin-right: 22px;
    width: 100px;
    height: 40px;
    padding: 0 10px;
    background: #f8f8f8;
    border-radius: 4px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
.view {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin: 30px 15px 0;
  background: #f8f8f8;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  min-height: 190px;
  .item {
    width: (1 / 3) * 100%;
    padding: 16px 10px;
    text-align: center;
  }
}
.error {
  margin-top: 31px;
  padding: 0 15px;
  font-size: 12px;
  font-weight: 500;
  color: #fc4a68;
}
</style>
