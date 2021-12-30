<template>
  <div class="account-manage header-page">
    <Header :title="$t('mine.index.accountManage')" @click-left="goBack">
      <van-icon
        v-if="!hideImportAddr"
        slot="right"
        name="add-o"
        size="20"
        :color="$color.themeColor"
        @click="toAddAccount"
      />
    </Header>
    <div class="gray hint">
      {{
      $t("mine.accountManage.pleaseClickRightSelectboxToChangeWalletAddress")
      }}
    </div>
    <van-loading
      class="loading"
      v-model="loading"
      v-if="loading && !addressNewList.length"
    >{{ $t("common.inLoading") }}</van-loading>
    <template v-if="!loading && addressNewList.length > 0">
      <div class="account-box" v-for="item in addressNewList" :key="item.id">
        <van-checkbox
          class="checkbox"
          :checked-color="$color.themeColor"
          v-model="item.checked"
          @click="activateAddress(item)"
        ></van-checkbox>
        <div>
          <div class="f14" @click="toExportAddr(item)">
            {{ item.name }}
            <span
              v-if="item.checked"
            >({{ $t("mine.accountManage.currentWalletAddress") }})</span>
            <span v-if="item.is_identity === 1">({{ $t("mine.accountManage.status") }})</span>
          </div>
          <div class="gray f12" @click="toExportAddr(item)">{{ item.currency }}</div>
          <div
            class="gray f12"
            v-clipboard:copy="item.address"
            v-clipboard:success="onCopy"
          >{{ item.address }}</div>
        </div>
      </div>
    </template>
    <van-button
      v-if="!hideImportAddr"
      class="m-t-54"
      :color="$color.themeColor"
      block
      @click="toAddAccount"
    >{{ $t("mine.accountManage.addAddress") }}</van-button>
    <van-button
      v-if="!hideImportAddr"
      class="m-t-28"
      :color="$color.themeColor"
      plain
      block
      @click="toImportAddress"
    >{{ $t("mine.accountManage.importAddress") }}</van-button>

    <create-address-popup :isShow="showPopup" @close="showPopup = false" @refresh="getAddressInfo" />
  </div>
</template>
<script>
import {
  Checkbox as VanCheckbox,
  Button as VanButton,
  Icon as VanIcon,
  Toast,
  Loading as VanLoading,
} from "vant"

import CreateAddressPopup from "./components/CreateAddressPopup"
import Header from "@/components/Header"
import i18n from "@/langs"
import { activateAddress, isHideSubAdd } from "@/http/modules/mine.js"
import { mapActions } from "vuex"
export default {
  components: {
    VanCheckbox,
    VanButton,
    VanIcon,
    Header,
    CreateAddressPopup,
    VanLoading,
  },

  data() {
    return {
      addressNewList: [],
      showPopup: false,
      checkedId: "",
      loading: false,
      checkedAddressId: undefined,
      hideImportAddr: true,
    }
  },
  async activated() {
    this.getAddressInfo()
    this.hideImportAddr = (await this.isHideSubAdd()) === "是"
    // 手机自带返回键处理
    if (window.history && window.history.pushState) {
      window.history.pushState(null, null, document.URL)
      window.addEventListener("popstate", this.goBack, false)
    }
  },
  deactivated() {
    window.removeEventListener("popstate", this.goBack, false)
  },

  methods: {
    ...mapActions({
      GetActivateAddress: "mine/GetActivateAddress",
      GetTotalEarnings: "mine/GetTotalEarnings",
      GetAddressInfo: "mine/GetAddressInfo",
      GetUserInfo: "user/GetUserInfo",
      refreshUserData: "trade/refreshUserData",
      getTotalBenefit: "home/getTotalBenefit",
    }),
    // 是否现实导入地址按钮
    async isHideSubAdd() {
      const res = await isHideSubAdd()
      return res.data
    },
    //获取地址列表
    getAddressInfo() {
      this.loading = true
      this.GetAddressInfo()
        .then((res) => {
          this.addressNewList = res.info
          this.setCheckedItem(res.curAddrId)
          this.checkedId = res.curAddrId
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    onCopy() {
      Toast(i18n.t("mine.accountManage.copySuccess"))
    },
    setCheckedItem(id) {
      this.addressNewList = this.addressNewList.map((item) => {
        this.$set(item, "checked", item.id === id)
        return item
      })
    },
    // 新增地址
    toAddAccount() {
      this.showPopup = true
    },
    // 激活地址
    activateAddress(addr) {
      // 拦截当前激活
      if (this.checkedId === addr.id) {
        Toast(i18n.t("mine.accountManage.currentAddressActivated"))
        this.setCheckedItem(addr.id)
        return
      }
      activateAddress(addr.id).then(() => {
        this.setCheckedItem(addr.id)
        this.checkedId = addr.id
        Toast(i18n.t("mine.accountManage.activateSuccess"))
        // 更新激活地址
        this.GetActivateAddress(addr.id)
        // 更新矿池收益合计
        this.GetTotalEarnings()
        // 更新可用余额、当前委托
        this.refreshUserData()
        // 更新用户信息
        this.GetUserInfo()
        // 更新矿池收益合计
        this.getTotalBenefit()
      })
    },
    // 导入地址
    toImportAddress() {
      this.$router.push({ path: "/importNewAddress" })
    },
    // 导出地址
    toExportAddr(item) {
      this.$router.push({
        path: "/exportAddress",
        query: {
          id: item.id,
          walletName: item.name,
          status: item.status,
          isMain: Boolean(item.is_identity === 1),
          isActive: Boolean(this.checkedId === item.id),
        },
      })
    },
    // 返回到我的
    goBack() {
      setTimeout(() => {
        if (this.$route.path !== "/mine") {
          this.$router.push({ path: "/mine" })
        }
      }, 100)
    },
  },
}
</script>
<style lang="scss">
.account-manage {
  background-color: #f3f3f3;
  min-height: 100vh;
  padding: 15px;
  .gray {
    color: #666666;
  }
  .hint {
    padding: 19px 0;
  }
  .account-box {
    background-color: #ffffff;
    border-radius: 6px;
    height: 90px;
    padding: 15px;
    margin-bottom: 15px;
    div {
      margin-bottom: 10px;
    }
    .checkbox {
      float: right;
    }
  }
  .m-t-28 {
    margin-top: 28px;
  }
  .m-t-54 {
    margin-top: 54px;
  }
  .m-t-45 {
    margin-top: 45px;
  }
}
</style>
