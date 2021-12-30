<template>
  <div class="transfer-addr header-page">
    <Header :title="$t('wallet.transfer.transferAddress')">
      <van-icon
        slot="right"
        name="add-o"
        size="20"
        :color="$color.themeColor"
        @click="toAddAddr"
      />
    </Header>

    <van-loading
      class="loading"
      v-model="loading"
      v-if="loading && !addrList.length"
      >{{ $t("common.inLoading") }}</van-loading
    >

    <no-data
      v-if="addrList.length === 0 && !loading"
      :description="$t('wallet.transfer.noAddress')"
    ></no-data>

    <template v-if="!loading && addrList.length > 0">
      <div class="gray hint">
        {{ $t("wallet.transfer.pleaseClickRightSelectboxToSelectAddress") }}
      </div>
      <div class="account-box" v-for="item in addrList" :key="item.id">
        <van-checkbox
          :checked-color="$color.themeColor"
          class="checkbox"
          v-model="item.checked"
          @click="selectAddr(item)"
        ></van-checkbox>
        <van-icon
          class="del-icon"
          name="delete"
          size="20"
          color="#666666"
          @click="toDeleteAddr(item)"
        />
        <div>
          <div class="f14">{{ item.addr_label }}</div>
          <div class="gray f12">{{ item.currency }}</div>
          <div
            class="gray f12"
            v-clipboard:copy="item.addr"
            v-clipboard:success="onCopy"
          >
            {{ item.addr }}
          </div>
        </div>
      </div>
    </template>
    <ButtonCommon
      fixed
      @click="toAddAddr"
      v-if="addrList.length === 0 && !loading"
      >{{ $t("wallet.transfer.createNow") }}</ButtonCommon
    >
  </div>
</template>

<script>
import Header from "@/components/Header";
import ButtonCommon from "@/components/ButtonCommon";
import { getTansferAddr, deleteTansferAddr } from "@/http/modules/wallet";
import {
  Checkbox as VanCheckbox,
  Icon as VanIcon,
  Loading as VanLoading,
  Toast,
  Dialog,
} from "vant";
import i18n from "@/langs";
import NoData from "@/components/NoData";
export default {
  components: {
    Header,
    VanCheckbox,
    VanIcon,
    VanLoading,
    ButtonCommon,
    NoData,
    [Dialog.Component.name]: Dialog.Component,
  },

  data() {
    return {
      loading: false,
      addrList: [],
      coinLabelId: "",
      checkedAddrId: undefined,
    };
  },

  activated() {
    this.getAddrInfo();
  },

  methods: {
    getAddrInfo() {
      const { currency, coinLabelId, addrId } = this.$route.query;
      this.coinLabelId = coinLabelId || -1;
      this.checkedAddrId = addrId;
      this.getTansferAddr(currency, this.coinLabelId);
    },
    getTansferAddr(currency, coinLabelId) {
      this.loading = true;
      getTansferAddr({ currency, coinLabelId })
        .then((res) => {
          this.loading = false;
          this.addrList = res.data || [];
          this.setCheckedItem(this.checkedAddrId);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    setCheckedItem(id) {
      this.addrList = this.addrList.map((item) => {
        this.$set(item, "checked", item.id == id);
        return item;
      });
    },
    selectAddr(item) {
      this.checkedAddrId = item.id;
      this.setCheckedItem(item.id);

      this.$router.replace({
        path: "/transferAccounts",
        query: {
          addr: item.addr,
          addr_label: item.addr_label,
          addrId: this.checkedAddrId,
        },
      });
    },
    toAddAddr() {
      this.$router.push({
        path: "/createTransferAddr",
        query: {
          currency: this.$route.query.currency,
          coinLabelId: this.coinLabelId,
        },
      });
    },
    toDeleteAddr(item) {
      Dialog.confirm({
        title: i18n.t("mine.accountManage.hint"),
        message: i18n.t(
          "wallet.transfer.doYouMakeSureToDeleteThisWithdrawAddress"
        ),
        cancelButtonText: i18n.t("common.cancel"),
        confirmButtonText: i18n.t("common.confirm"),
      })
        .then(() => {
          const param = {
            id: item.id,
            currency: item.currency,
            retDataType: 0,
          };
          deleteTansferAddr(param).then(() => {
            this.getAddrInfo();
          });
        })
        .catch(() => {});
    },
    onCopy() {
      Toast(i18n.t("mine.accountManage.copySuccess"));
    },
    toSubmit() {},
  },
};
</script>
<style lang="scss" scoped>
.transfer-addr {
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
    position: relative;
    div {
      margin-bottom: 10px;
    }
    .checkbox {
      float: right;
    }
    .del-icon {
      position: absolute;
      right: 15px;
      top: 56px;
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
