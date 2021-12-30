<template>
  <div class="wrapper">
    <div class="title">
      <van-icon :name="back_icon" size="16" @click="$router.go(-1)" />
    </div>

    <div class="nav">
      <!-- 买家 -->
      <div class="nav-left" v-if="detailData.trans_type === '2'">
        <p v-if="detailData.order_status === '3'">已取消</p>
        <p v-else-if="detailData.order_status === '2'">已完成</p>
        <div v-else>
          <p>
            {{ detailData.pay_status | KeyFilter("otc.payStatus") }}
          </p>
          <div v-if="detailData.pay_status === '1'">
            付款剩余时间
            <div>
              {{ `${Math.floor(leftTime / 60)}:${leftTime % 60}` }}
            </div>
          </div>
        </div>
        <div
          v-if="
            detailData.order_status === '1' && detailData.pay_status === '2'
          "
        >
          等待卖家放币
        </div>
        <div v-if="detailData.order_status === '3'">
          订单已取消
        </div>
        <div v-if="detailData.order_status === '2'">
          订单已完成
        </div>
      </div>
      <!-- 卖家 -->
      <div v-else class="nav-left">
        <div
          v-if="
            detailData.order_status === '1' && detailData.pay_status !== '2'
          "
        >
          <p>
            等待买家付款
          </p>
          <div>
            付款剩余时间
          </div>
          <div>
            {{ `${Math.floor(leftTime / 60)}:${leftTime % 60}` }}
          </div>
        </div>
        <div
          v-if="
            detailData.pay_status === '2' && detailData.order_status !== '2'
          "
        >
          <div v-if="detailData.receive_status === '2'">
            <p>
              已提交申诉
            </p>
            <div>
              买家标记为已付款
            </div>
          </div>
          <div v-else>
            <p>
              买家已付款
            </p>
            <div>
              请确认收款并放币
            </div>
          </div>
        </div>
        <div v-if="detailData.order_status === '2'">
          <p>
            已完成
          </p>
          <div>
            订单已完成
          </div>
        </div>
        <div v-if="detailData.order_status === '3'">
          <p>
            已取消
          </p>
          <div>
            订单已取消
          </div>
        </div>
      </div>
      <div class="nav-right" style="line-height: 35px;padding-left: 5px;">
        L
      </div>
    </div>

    <div class="line"></div>

    <div class="order-content">
      <p class="order-content-nav">
        {{ detailData.trans_type === "1" ? "出售" : "购买"
        }}{{ detailData.symbol }}
      </p>
      <div class="item">
        <div class="item-left">总价</div>
        <div class="item-right text-yellow">
          ￥ {{ detailData.total_price }}
        </div>
      </div>
      <div class="item">
        <div class="item-left">单价</div>
        <div class="item-right">￥ {{ detailData.price }}</div>
      </div>
      <div class="item">
        <div class="item-left">数量</div>
        <div class="item-right">
          {{ detailData.trade_num }} {{ detailData.symbol }}
        </div>
      </div>
      <div class="item">
        <div class="item-left">参考号</div>
        <div class="item-right">
          {{ detailData.amount_pwd }}
          <van-icon
            @click="copy(detailData.amount_pwd)"
            :name="copy_icon"
            size="12"
          />
        </div>
      </div>

      <div class="line"></div>

      <div v-if="detailData.trans_type === '2'">
        <div class="item">
          <div class="item-left">卖家</div>
          <div class="item-right">
            {{ detailData.paymentVO.name }}
            <van-icon
              @click="copy(detailData.paymentVO.name)"
              :name="copy_icon"
              size="12"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left">支付方式</div>
          <div class="item-right">
            {{
              (detailData.paymentVO && detailData.paymentVO.payment_type) ||
                "" | KeyFilter("otc.paymentType")
            }}
          </div>
        </div>
        <div class="item">
          <div class="item-left">支付账号</div>
          <div class="item-right">
            {{ detailData.paymentVO && detailData.paymentVO.payment_no }}
            <van-icon
              :name="copy_icon"
              size="12"
              @click="copy(detailData.paymentVO.payment_no)"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left">收款二维码</div>
          <div
            v-if="detailData.paymentVO.payment_url"
            class="item-right"
            @click="toShowImg(detailData.paymentVO.payment_url)"
          >
            <img
              style="width: 50px; max-height: 100px;"
              :src="'data:image/gif;base64,' + detailData.paymentVO.payment_url"
            />
            <!-- <qr-code
              :value="detailData.paymentVO.payment_url"
              :options="qrOptions"
            /> -->
          </div>
        </div>
      </div>
      <div v-else>
        <div class="item">
          <div class="item-left">买家</div>
          <div class="item-right">
            {{ detailData.m_name }}
            <van-icon
              @click="copy(detailData.m_name)"
              :name="copy_icon"
              size="12"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left">收款方式</div>
          <div class="item-right">
            {{
              (detailData.paymentVO && detailData.paymentVO.payment_type) ||
                "" | KeyFilter("otc.paymentType")
            }}
          </div>
        </div>
        <div class="item">
          <div class="item-left">收款账号</div>
          <div class="item-right">
            {{ detailData.paymentVO && detailData.paymentVO.payment_no }}
            <van-icon
              :name="copy_icon"
              size="12"
              @click="copy(detailData.paymentVO.payment_no)"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left">付款凭证</div>
          <div v-if="detailData.pay_img" @click="toShowImg(detailData.pay_img)">
            <img
              style="width: 150px; max-height: 300px;"
              :src="detailData.pay_img"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="line"></div>

    <div class="footer">
      <div v-if="detailData.trans_type === '2'">
        <p
          v-if="
            detailData.pay_status === '1' && detailData.order_status === '1'
          "
        >
          {{ $t("home.otc.buyerTips2") }}
        </p>
        <p v-else>
          {{ $t("home.otc.buyerTips1") }}
        </p>
      </div>
      <div v-else>
        <p v-if="detailData.order_status === '1'">
          {{ $t("home.otc.buyerTips3") }}
        </p>
        <p
          v-if="
            detailData.order_status === '2' || detailData.order_status === '3'
          "
        >
          {{ $t("home.otc.buyerTips1") }}
        </p>
        <van-row
          v-if="
            detailData.pay_status === '2' &&
              detailData.order_status !== '2' &&
              detailData.receive_status !== '2'
          "
          type="flex"
          justify="space-between"
          :gutter="20"
          align="center"
        >
          <van-col
            span="12"
            class="i-dont-re"
            :class="leftTime <= 0 && 'disabled'"
          >
            <ButtonCommon ButtonCommon @click="toComplain">
              {{
                $t("home.otc.IDidNotReceive") +
                  (leftTime ? ` ${leftTime}S` : "")
              }}
            </ButtonCommon>
          </van-col>
          <van-col span="12">
            <ButtonCommon ButtonCommon @click="confirmReceive">
              {{ $t("home.otc.confirmAndRelease") }}
            </ButtonCommon>
          </van-col>
        </van-row>
      </div>
      <div
        v-if="
          detailData.order_status === '1' &&
            detailData.pay_status === '1' &&
            detailData.trans_type === '2'
        "
      >
        <div v-if="detailData.pay_img && detailData.pay_status !== '1'">
          <img
            style="width: 150px; max-height: 300px;"
            :src="detailData.pay_img"
          />
        </div>
        <van-uploader
          v-else
          v-model="fileList"
          :max-count="1"
          preview-full-image
          :after-read="readPicture"
          @delete="handleDel"
          :max-size="10 * 1024 * 1024"
          @oversize="onOversize"
        >
          <label for="upfile">上传付款凭证</label>
        </van-uploader>

        <ButtonCommon @click="IvePay">我已付款</ButtonCommon>
      </div>
    </div>
    <van-popup v-model="showImg" @click="showImg = false">
      <div class="popup-wrapper">
        <img
          v-if="detailData.trans_type === '2'"
          :src="'data:image/gif;base64,' + showImgUrl"
        />
        <img v-else :src="showImgUrl" />
      </div>
    </van-popup>
  </div>
</template>
<script>
import empty_icon from "@/assets/icons/empty_icon.png";
import back_icon from "@/assets/icons/black_back.svg";
import copy_icon from "@/assets/icons/mine_copy_black.svg";
import dayjs from "dayjs";
import {
  Icon as VanIcon,
  Toast,
  Row as VanRow,
  Col as VanCol,
  Popup as VanPopup,
  Uploader as VanUploader,
  Dialog
} from "vant";
// import QrCode from "@chenfengyuan/vue-qrcode";
import ButtonCommon from "@/components/ButtonCommon";
import {
  orderDetail,
  updateOrder,
  uploadPayAuth,
  fileUpload
} from "@/http/modules/otc";
import { getFrmconfig } from "@/http/modules/pattern.js";
import BigNumber from "bignumber.js";

export default {
  name: "orderDetail",
  components: {
    VanIcon,
    // QrCode,
    ButtonCommon,
    VanRow,
    VanCol,
    VanPopup,
    VanUploader
  },
  data() {
    return {
      copy_icon,
      back_icon,
      empty_icon,
      navStatus: 0,
      qrOptions: {
        width: 50
      },
      qrAddr: "",
      detailData: {},
      fileList: [],
      // 倒计时
      leftTime: 0,
      dayjs: dayjs,
      timer: null,
      queryTimer: null,
      showImg: false,
      showImgUrl: ""
    };
  },
  activated() {
    this.detailData = {};
    this.queryOrder();
    this.fileList = [];
    if (this.queryTimer) clearInterval(this.queryTimer);
    this.queryTimer = setInterval(() => {
      this.queryOrder();
    }, 10000);
  },
  deactivated() {
    if (this.queryTimer) clearInterval(this.queryTimer);
    if (this.timer) clearInterval(this.timer);
  },
  mounted() {},
  methods: {
    toShowImg(url) {
      this.showImgUrl = url;
      this.showImg = true;
    },
    afterUpload(url) {
      // 更新图片
      uploadPayAuth({
        id: this.detailData.id,
        pay_img:
          (process.env.VUE_APP_BASE_BASE_IMAGE_URL ||
            "http://sscv-image.hrwallet.xyz") + url
      }).then(() => {
        // this.fileList.push({
        //   url:
        //     (process.env.VUE_APP_BASE_BASE_IMAGE_URL ||
        //       "http://sscv-image.hrwallet.xyz") + url
        // });
        this.queryOrder();
      });
    },
    onOversize() {
      Toast(this.$t("common.fileSizeCantNotOver10M"));
    },
    // 获取文档流
    readPicture(file) {
      Toast.loading({
        forbidClick: true,
        duration: 0,
        message: this.$t("common.uploading")
      });
      const formData = new FormData(); // 创建form对象
      formData.append("file", file.file);
      fileUpload(formData)
        .then(res => {
          if (res.status === 1) {
            this.afterUpload(res.data);
            Toast.clear();
          }
        })
        .catch(() => {
          Toast.clear();
        });
    },
    handleDel(obj) {
      this.fileList.forEach((element, index) => {
        if (element.url === obj.url) {
          this.fileList = this.fileList.splice(index, 1);
        }
      });
    },
    IvePay() {
      Dialog.confirm({
        message: this.$t("home.otc.confirmPaid"),
        cancelButtonText: this.$t("common.cancel"),
        confirmButtonText: this.$t("common.confirm"),
        confirmButtonColor: this.$color.themeColor
      })
        .then(() => {
          // 确定已付款
          // //付款方状态,1：待支付，2：已支付，3：已取消（买家支付 2：已支付）
          // private String pay_status;
          // //订单状态,1：进行中，2：已完成，3：已取消（卖家放币后订单完成，支付超时即自动取消）
          // private String order_status;
          // //收款方状态,1：代收款，2：未收款，3：已完成（ 买家已支付但卖家未收到款 2：未收款（走申诉流程），  卖家卖家放币订单完成 3：已完成）
          // private String receive_status;
          const obj = Object.assign({}, this.detailData, {
            pay_status: "2"
          });
          this.toUpdateOrder(obj);
        })
        .catch(() => {});
    },
    // 申诉
    toComplain() {
      if (this.leftTime <= 0) {
        // 卖家
        if (this.detailData.trans_type === "1") {
          Dialog.confirm({
            message: "确认未收到款",
            cancelButtonText: this.$t("common.cancel"),
            confirmButtonText: this.$t("common.confirm"),
            confirmButtonColor: this.$color.themeColor
          })
            .then(() => {
              const obj = Object.assign({}, this.detailData, {
                // 1：代收款，2：未收款，3：已完成（
                receive_status: "2"
              });
              this.toUpdateOrder(obj);
            })
            .catch(() => {});
        }
      }
    },
    // 确认收款。
    confirmReceive() {
      Dialog.confirm({
        message: "确认收款并放币",
        cancelButtonText: this.$t("common.cancel"),
        confirmButtonText: this.$t("common.confirm"),
        confirmButtonColor: this.$color.themeColor
      })
        .then(() => {
          const obj = Object.assign({}, this.detailData, {
            receive_status: "3"
          });
          this.toUpdateOrder(obj);
        })
        .catch(() => {});
    },
    // 更新订单
    toUpdateOrder(param) {
      updateOrder(param).then(res => {
        if (res.status === 1) {
          // 更新数据
          this.queryOrder();
        }
      });
    },
    // 获取系统配置
    getFrmconfig() {
      getFrmconfig().then(res => {
        console.log(res.data);
        const nowTime = res.data.sysTime;
        console.log("nowTime" + nowTime);
        let leftTime = 0;
        // 待支付 付款剩余时间
        if (this.detailData.pay_status === "1") {
          leftTime =
            new Date(this.detailData.pay_time).getTime() -
            new Date(nowTime).getTime();
          //支付时间 pay_time
          //放币时间 offer_time
          console.log("pay_time" + this.detailData.pay_time);
          console.log(leftTime);
        }
        // 已支付未收款 投诉倒计时
        if (
          this.detailData.pay_status === "2" &&
          this.detailData.receive_status === "1"
        ) {
          leftTime =
            new Date(this.detailData.pay_time).getTime() +
            5 * 60 * 1000 -
            new Date(nowTime).getTime();
        }
        this.leftTime = BigNumber(leftTime)
          .dividedBy(1000)
          .toNumber();
        this.startCounter();
      });
    },
    startCounter() {
      if (this.leftTime > 0) {
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.leftTime -= 1;
          if (this.leftTime <= 0) {
            this.leftTime = 0;
            clearInterval(this.timer);
          }
        }, 1000);
      } else {
        this.leftTime = 0;
      }
    },
    queryOrder() {
      orderDetail(this.$route.query.id).then(res => {
        this.detailData = res.data;
        this.getFrmconfig();
      });
    },
    copy(text) {
      this.$copyText(text).then(
        () => {
          Toast.success(this.$t("common.copySuccess"));
        },
        () => {
          Toast.error(this.$t("common.copyFail"));
        }
      );
    }
  }
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
  .popup-wrapper {
    img {
      width: 375px;
    }
  }
  .i-dont-re {
    ::v-deep.confirm-btn-wrapper {
      .confirm-btn {
        background: $txtNav;
        color: #fff;
      }
    }
  }
  .i-dont-re.disabled {
    ::v-deep.confirm-btn-wrapper {
      .confirm-btn {
        background: #fff;
        border: solid 1px #edb259;
        color: #202028;
      }
    }
  }
  .title {
    padding: 15px;
  }
  .line {
    margin: 22px auto;
    width: 345px;
    border-top: 1px solid #eeeeee;
  }
  .nav {
    padding: 23px 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-left {
      p {
        color: $txtBlack;
        font-size: 25px;
        font-weight: 800;
      }
      div {
        margin-top: 10px;
        color: $txtGray;
        font-size: 14px;
        span {
          margin-left: 10px;
          color: $txtYellow;
        }
      }
    }
    &-right {
      width: 45px;
      height: 45px;
      line-height: 45px;
      background: #fffbf6;
      border-radius: 50%;
      text-align: center;
      color: $txtYellow;
      font-size: 25px;
    }
  }
  .order-content {
    padding: 0 15px;
    &-nav {
      color: $txtBlack;
      font-size: 15px;
      font-weight: 800;
      margin-bottom: 29px;
    }
    .item {
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: $txtBlack;
      &-left {
        font-size: 13px;
      }
      &-right {
        font-size: 14px;
        font-weight: bold;
        &.text-yellow {
          color: $txtYellow;
        }
        .copyIcon {
          margin-left: 8px;
        }
      }
    }
  }
  .footer {
    color: $txtGray;
    font-size: 13px;
    padding: 0 15px 30px;
    p {
      line-height: 25px;
    }
    label {
      display: block;
      margin: 17px 0 52px;
      width: 110px;
      height: 110px;
      line-height: 110px;
      text-align: center;
      background: #f7f6fb;
      border: 1px solid #eaeaea;
      border-radius: 4px;
      font-size: 15px;
      font-weight: 500;
      color: #aeb8c0;
    }
  }
}
</style>