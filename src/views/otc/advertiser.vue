<template>
  <div class="wrapper header-page">
    <Header :title="'广告商'" />
    <div class="tips_box">
      <p class="normal_text">实名认证</p>
      <h2>
        未认证
        <span class="float_text">立即前往认证 ></span>
      </h2>
    </div>
    <!-- 为了测试添加的假数据 -->
    <div class="text_box">
      <p class="text_title">如何成为广告商？</p>
      <p>
        申请广告商需进行实名认证，并缴纳10000枚USDT押金。实名认证审核成功后，缴纳10000枚USDT即可成为广告商。
      </p>
    </div>
    <div class="text_box">
      <p class="text_title">广告商收益</p>
      <p>广告商可通过商家兑换进行手动搬砖获利，详情联系客服。</p>
    </div>

    <div class="submit_box">
      <van-button
        class="submit_btn"
        :color="$color.themeColor"
        block
        @click="toImportAddress"
        >立即申请</van-button
      >
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import empty_icon from "@/assets/icons/empty_icon.png";
import { getMyOrderList } from "@/http/modules/otc";
import { Button as VanButton } from "vant";
export default {
  name: "orderDetail",
  components: {
    Header,
    VanButton,
  },
  data() {
    return {
      empty_icon,
      navStatus: 1,
      loading: false,
      pageData: {},
      orderList: [],
      transTypeText: {
        1: "出售",
        2: "购买",
      },
      receiveStatusText: {
        1: "待收款",
        2: "未收款",
        3: "已完成",
      },
    };
  },
  activated() {
    this.getList(0);
  },
  mounted() {
    this.orderList = [];
    this.getList(0);
  },
  methods: {
    getList(data) {
      const pageNum = data ? data.pageNum : 1;
      const pageSize = data ? data.pageSize : 10;
      this.loading = true;

      getMyOrderList(this.navStatus, pageNum, pageSize).then((res) => {
        this.pageData = res.data;
        this.loading = false;
      });
    },
    returnList(list) {
      this.orderList = list || [];
    },
    switchTab(tab) {
      this.navStatus = tab;
      this.getList(0);
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
$txtYellow: #dfa464;
$txtNav: #96a8b0;
.wrapper {
  .tips_box {
    background: $txtYellow;
    padding: 20px 15px;
    color: #fff;
    margin-bottom: 40px;
    .normal_text {
      font-size: 13px;
      margin-bottom: 12px;
    }
    .float_text {
      font-size: 13px;
      float: right;
    }
  }
  .text_box {
    margin-bottom: 50px;
    color: #555;
    font-size: 12px;
    padding: 0 15px;
    line-height: 18px;
    .text_title {
      font-weight: 500;
      color: #1d1d1d;
      font-size: 13px;
      margin-bottom: 15px;
    }
  }
  .submit_box {
    padding: 0 15px;
    position: fixed;
    width: 100%;
    bottom: 35px;
  }
}
</style>