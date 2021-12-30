<!--
 * @Author: joevin
 * @Date: 2020-09-13 15:33:46
 * @LastEditTime: 2020-09-28 16:50:59
 * @LastEditors: joevin
 * @Description: 转账记录
 * @FilePath: \html\src\views\wallet\WithdrawsRecords.vue
-->
<template>
  <div class="deposit-records-wrapper">
    <page-header :title="$t('wallet.withDrawsRecords.title')"></page-header>
    <div>
      <!-- 列表项 -->
      <pagination
        :data="pageData"
        listName="withdraws"
        @getList="getData"
        @returnList="returnList"
        showLoadingWhenActivated
        finishedText
      >
        <no-data v-if="list.length === 0 && !loading"></no-data>
        <div v-else>
          <div v-for="item in list" :key="item.id" class="list">
            <div class="table">
              <div class="box">
                <div class="left">
                  <h4>{{$t("wallet.deposit.labelTime")}}</h4>
                  <div>
                    {{
                    $d(new Date(item.w_create_time), "short")
                    }}
                  </div>
                </div>
                <div class="middle">
                  <h4>{{$t("wallet.deposit.currency")}}</h4>
                  <div>{{$route.query.currency}}</div>
                </div>
                <div class="right">
                  <h4>{{$t("wallet.deposit.labelStatus")}}</h4>
                  <div class="status">
                    <span v-if="item.w_status === 1">
                      {{
                      $t("wallet.deposit.statusSucceed")
                      }}
                    </span>
                    <span v-else-if="item.w_status === 2">
                      {{
                      $t("wallet.deposit.statusCancel")
                      }}
                    </span>
                    <span v-else>{{ $t("wallet.deposit.statusPending") }}</span>
                  </div>
                </div>
              </div>
              <div class="box">
                <div class="left">
                  <h4>{{$t("wallet.deposit.serviceCharge")}}</h4>
                  <div>{{item.w_fee}}</div>
                </div>
                <div class="middle">
                  <h4>{{$t("wallet.deposit.actualAccount")}}</h4>
                  <div>{{ item.w_amount-item.w_fee }}</div>
                </div>
              </div>
            </div>
            <div>
              <h4>{{$t("wallet.deposit.reciprocalAccount")}}</h4>
              <div>{{ item.member_coin_addr }}</div>
            </div>
          </div>
        </div>
      </pagination>
    </div>

    <!-- 空数据 -->
    <!-- <section class="empty-wrap" v-if="!loading && list.length === 0">
      <div class="empty-img">
        <img :src="emptyIcon" />
      </div>
      <p>{{$t('wallet.deposit.noRecord')}}</p>
    </section>-->
  </div>
</template>

<script>
import PageHeader from "@/components/Header"
import Pagination from "@/components/Pagination"
import NoData from "@/components/NoData"
import emptyIcon from "@/assets/icons/empty_icon.png"
import { queryWithdrawsRecords } from "@/http/modules/wallet"

export default {
  components: {
    PageHeader,
    Pagination,
    NoData,
  },
  data() {
    return {
      list: [],
      pageData: {},
      loading: false,
      emptyIcon,
      currency: "",
    }
  },
  activated() {
    this.currency = this.$route.query.currency || "LHC"
    this.getData()
  },
  methods: {
    async getData(data) {
      // 请求参数 pageIndex/pageSize/timestamp  LHC/3/10/128232382137123
      const timestamp = new Date().getTime()
      const param = {
        pageNum: data ? data.pageNum : 1,
        pageSize: data ? data.pageSize : 10,
      }
      const params = `${this.currency}/${param.pageNum}/${param.pageSize}/${timestamp}`

      this.loading = true
      // 异步更新数据
      const resp = await queryWithdrawsRecords(params)

      // 加载状态结束
      this.loading = false
      if (resp.status === 1) {
        // 加载状态结束
        this.loading = false
        if (resp.status === 1) {
          this.pageData = Object.assign({}, resp, param)
        }
      }
    },
    returnList(list) {
      this.list = list || []
    },
  },
}
</script>

<style lang="scss" scoped>
.deposit-records-wrapper {
  padding-top: 44px;
  .list {
    border-bottom: 1px solid #f4f4f4;
    padding: 16px;
    h4 {
      color: #8193a0;
      margin-bottom: 9px;
    }
  }
  .table {
    display: table;
    width: 100%;
  }
  .box {
    display: table-row;
    & > div {
      display: table-cell;
      padding-bottom: 19px;
    }
    .left {
      width: 40%;
    }
    .middle {
      width: 40%;
      padding-left: 20px;
    }
    .right {
      width: 20%;
      padding-left: 20px;
    }
    .status {
      color: $themeColor;
    }
  }

  .van-row {
    position: relative;
    &:after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      right: 0;
      bottom: 0;
      left: 0;
      border-bottom: 1px solid #f4f4f4;
      transform: scaleY(0.5);
    }
  }
  .van-col {
    text-align: center;
  }
  .empty-wrap {
    .empty-img {
      margin: 97px auto 47px;
      img {
        margin: auto;
        display: block;
        width: 168px;
      }
    }
    p {
      color: #999999;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>