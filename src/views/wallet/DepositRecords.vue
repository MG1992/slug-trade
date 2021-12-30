<!--
 * @Author: joevin
 * @Date: 2020-09-13 15:33:46
 * @LastEditTime: 2020-09-28 16:49:34
 * @LastEditors: joevin
 * @Description: 充值记录
 * @FilePath: \html\src\views\wallet\DepositRecords.vue
-->
<template>
  <div class="deposit-records-wrapper">
    <page-header :title="$t('wallet.depositRecords.title')"></page-header>
    <div>
      <!-- 头部 -->
      <section class="records-header">
        <van-row>
          <van-col span="8">{{ $t("wallet.deposit.labelTime") }}</van-col>
          <van-col span="8">{{ $t("wallet.deposit.labelAmount") }}</van-col>
          <van-col span="8">{{ $t("wallet.deposit.labelStatus") }}</van-col>
        </van-row>
      </section>
      <!-- 列表项 -->
      <section class="records-wrap">
        <pagination
          :data="pageData"
          listName="recharges"
          @getList="getData"
          @returnList="returnList"
          showLoadingWhenActivated
          finishedText
        >
          <no-data v-if="list.length === 0 && !loading"></no-data>
          <div v-else>
            <van-row v-for="item in list" :key="item.id" class="record-item">
              <van-col span="8">
                {{
                $d(new Date(item.r_create_time), "short")
                }}
              </van-col>
              <van-col span="8">{{ item.r_amount }}</van-col>
              <van-col span="8">
                <span v-if="item.r_status === 1">
                  {{
                  $t("wallet.deposit.statusSucceed")
                  }}
                </span>
                <span v-else-if="item.r_status === 2">
                  {{
                  $t("wallet.deposit.statusCancel")
                  }}
                </span>
                <span v-else>{{ $t("wallet.deposit.statusPending") }}</span>
              </van-col>
            </van-row>
          </div>
        </pagination>
      </section>
    </div>

    <!-- 空数据 -->
    <!-- <section class="empty-wrap" v-if="!loading && list.length === 0">
      <div class="empty-img">
        <img :src="emptyIcon" alt="空数据图片" />
      </div>
      <p>{{$t('wallet.deposit.noRecord')}}</p>
    </section>-->
  </div>
</template>

<script>
import { Col as VanCol, Row as VanRow } from "vant";
import PageHeader from "@/components/Header";
import Pagination from "@/components/Pagination";
import NoData from "@/components/NoData";
import emptyIcon from "@/assets/icons/empty_icon.png";
import { queryDepositRecords } from "@/http/modules/wallet";

export default {
  components: {
    VanCol,
    VanRow,
    PageHeader,
    Pagination,
    NoData
  },
  data() {
    return {
      list: [],
      pageData: {},
      loading: false,
      emptyIcon,
      currency: ""
    };
  },
  activated() {
    this.currency = this.$route.query.currency || "LHC";
    this.getData(0);
  },
  methods: {
    getData(data) {
      const param = {
        pageNum: data ? data.pageNum : 1,
        pageSize: data ? data.pageSize : 10
      };
      // 请求参数 pageIndex/pageSize/timestamp  LHC/3/10/128232382137123
      const timestamp = new Date().getTime();
      const params = `${this.currency}/${param.pageNum}/${param.pageSize}/${timestamp}`;

      this.loading = true;
      // 异步更新数据
      queryDepositRecords(params).then(resp => {
        // 加载状态结束
        this.loading = false;
        if (resp.status === 1) {
          this.pageData = Object.assign({}, resp, param);
        }
      });
    },
    returnList(list) {
      this.list = list || [];
    }
  }
};
</script>

<style lang="scss" scoped>
.deposit-records-wrapper {
  padding-top: 44px;
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
  .records-header {
    height: 38px;
    line-height: 38px;
    font-size: 12px;
    color: #666666;
  }
  .records-wrap {
    .record-item {
      height: 50px;
      line-height: 50px;
      color: #333333;
    }
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