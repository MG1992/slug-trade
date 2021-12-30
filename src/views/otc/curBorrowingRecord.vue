<template>
  <div class="wrapper header-page">
    <Header :title="$t('pledge.curBorrowingRecord.title')" />

    <pagination
      :data="pageData"
      @getList="getList"
      @returnList="returnList"
      :finishedText="
        orderList.length === 0 ? '' : $t('pledge.blackHole.notMore')
      "
      listName="list"
    >
      <no-data v-if="orderList.length === 0 && !loading"></no-data>

      <div class="list" v-for="(item, index) in orderList" :key="index">
        <p class="nav">{{ $t("pledge.curBorrowingRecord.content") }}</p>
        <p
          class="content"
          v-html="
            $t('pledge.curBorrowingRecord.contentTxt', {
              num1: item.w_amount,
              num2: item.w_quote_amount,
              curr1: item.currency,
              curr2: item.quote_currency,
            })
          "
        ></p>
        <p class="nav">{{ $t("pledge.curBorrowingRecord.time") }}</p>
        <p class="content">{{ item.w_create_time }}</p>
        <ButtonCommon
          class="btn"
          @click="HandleBtnClick(item)"
          :disabled="item.sell_status == 1"
        >
          {{
            item.sell_status == 1
              ? $t("pledge.curBorrowingRecord.disableBtn")
              : $t("pledge.curBorrowingRecord.btn")
          }}
        </ButtonCommon>
      </div>
    </pagination>

    <van-popup v-model="isShowConfirmAgainPop" round position="bottom">
      <div class="popup">
        <div class="balance">
          <div class="content">
            {{ $t("pledge.curBorrowingRecord.popNav") }}
            {{ item.w_quote_amount }} {{ item.quote_currency }}
          </div>
          <div class="close" @click="isShowConfirmAgainPop = false">
            {{ $t("requestResponse.CANCEL") }}
          </div>
        </div>
        <div class="inpot-box">
          <p>{{ $t("mine.accountManage.safetyVerification") }}</p>
          <input
            type="password"
            v-model="password"
            :placeholder="$t('home.subscribe.inputWalletPwd')"
          />
        </div>
        <ButtonCommon class="popup-btn" @click="HandlePopSubmit">
          {{ $t("requestResponse.CONFIRM") }}
        </ButtonCommon>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Header from "@/components/Header";
import empty_icon from "@/assets/icons/empty_icon.png";
import NoData from "@/components/NoData";
import Pagination from "@/components/Pagination";
import ButtonCommon from "@/components/ButtonCommon";
import { Popup as VanPopup, Toast } from "vant";
import { getCoinTransferList, coinTransfer } from "@/http/modules/otc";

export default {
  name: "orderDetail",
  components: {
    Header,
    NoData,
    Pagination,
    ButtonCommon,
    VanPopup,
  },
  data() {
    return {
      empty_icon,
      loading: false,
      Pagination,
      pageData: {},
      orderList: [],
      isShowConfirmAgainPop: false,
      password: "",
      item: {},
    };
  },
  watch: {
    isShowConfirmAgainPop() {
      this.password = "";
    },
  },
  activated() {
    this.getList(0);
  },
  methods: {
    getList(data) {
      const pageNum = data ? data.pageNum : 1;
      const pageSize = data ? data.pageSize : 10;
      this.loading = true;

      getCoinTransferList(pageNum, pageSize).then((res) => {
        this.pageData = res.data;
        this.loading = false;
      });
    },
    returnList(list) {
      this.orderList = list || [];
    },
    HandleBtnClick(item) {
      if (item.sell_status !== 1) {
        this.isShowConfirmAgainPop = true;
        this.item = item;
      }
    },
    HandlePopSubmit() {
      if (!this.password) {
        Toast(this.$t("home.subscribe.inputWalletPwd"));
        return false;
      }
      coinTransfer({
        sell_id: this.item.id,
        direction: "buy",
        m_security_pwd: this.password,
      }).then((res) => {
        if (res.status === 1) {
          Toast(this.$t("pledge.curBorrowingRecord.success"));
          this.isShowConfirmAgainPop = false;
          this.getList(0);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("vant/lib/icon/local.css");
$txtBlack: #202028;
$txtGreen: #02ad90;
$txtRed: #ce435d;
$txtGray: #8193a0;
$txtYellow: #efba6b;
$txtNav: #96a8b0;
.wrapper {
  .list {
    padding: 0 15px 26px;
    border-bottom: 1px solid #ececec;
    line-height: 1;
    .nav {
      color: $txtGray;
      font-size: 12px;
      margin: 23px 0 11px;
    }
    .content {
      font-size: 13px;
      color: $txtBlack;
      span {
        color: $txtYellow;
      }
    }
    .btn {
      margin-top: 30px;
    }
  }
  .popup {
    .nav {
      color: $txtGray;
      font-size: 13px;
      padding: 20px 20px 15px;
      border-bottom: 1px solid #ececec;
    }
    .balance {
      padding: 0 20px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ececec;
      .content {
        flex: 1;
        color: $txtBlack;
        font-weight: bold;
        font-size: 16px;
      }
      .close {
        color: $txtGray;
        font-size: 14px;
      }
    }
    .inpot-box {
      padding: 25px 20px 11.5px;
      border-bottom: 1px solid #ececec;
      p {
        color: $txtBlack;
        font-size: 13px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      input {
        font-size: 15px;
        color: $txtBlack;
        &::placeholder {
          color: $txtGray;
        }
      }
    }
    .popup-btn {
      margin: 35px 15px 21px;
      width: auto;
    }
  }
}
</style>