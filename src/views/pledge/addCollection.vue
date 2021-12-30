<template>
  <div class="wrapper header-page">
    <Header title></Header>

    <div v-if="!type">
      <div class="nav">{{ $t("pledge.collection.add") }}</div>
      <div class="type-list" v-for="(item, index) in typeList" :key="index">
        <van-icon :name="`${item.icon}`" size="16" />
        <div class="item" @click="handleChooseType(item)">
          <span>{{ item.name }}</span>
          <van-icon name="arrow" color="#999" size="10" />
        </div>
      </div>
    </div>

    <div v-else>
      <div class="nav">{{ $t("pledge.collection.add") }}{{ type.name }}</div>

      <div class="input-item">
        <div class="input-item-name">{{ $t("pledge.collection.name") }}</div>
        <input
          type="text"
          v-model="userName"
          @input="nameValidator"
          :placeholder="$t('pledge.collection.namePld')"
        />
      </div>

      <div class="input-item">
        <div class="input-item-name">
          {{
            type.id === 3
              ? $t("pledge.collection.bankAccount")
              : $t("pledge.collection.account")
          }}
        </div>
        <input
          type="text"
          v-model="account"
          @input="accountValidator"
          :placeholder="
            type.id === 1
              ? $t('pledge.collection.wechatPld')
              : type.id === 2
              ? $t('pledge.collection.aliPld')
              : $t('pledge.collection.bankAccountPld')
          "
        />
      </div>

      <div class="input-item" v-if="type.id === 3">
        <div class="input-item-name">
          {{ $t("pledge.collection.bankName") }}
        </div>
        <input
          type="text"
          v-model="bankName"
          @input="bankValidator"
          :placeholder="$t('pledge.collection.bankPld')"
        />
      </div>

      <div class="input-item file" v-else>
        <div class="input-item-name mb28">
          {{ $t("pledge.collection.addQr") }}
        </div>
        <van-uploader
          v-model="fileList"
          :max-count="1"
          preview-full-image
          :after-read="readPicture"
          @delete="handleDel"
          :max-size="10 * 1024 * 1024"
          @oversize="onOversize"
        >
          <label for="upfile" class="fileUpload">{{
            $t("pledge.collection.clickUpload")
          }}</label>
        </van-uploader>
      </div>

      <ButtonCommon class="btn" @click="handleAddPay">{{
        $t("pledge.collection.add")
      }}</ButtonCommon>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import ButtonCommon from "@/components/ButtonCommon";
import { Icon as VanIcon, Toast, Uploader as VanUploader } from "vant";
import wechat from "@/assets/icons/wechat.png";
import ali from "@/assets/icons/ali.png";
import bank from "@/assets/icons/bank.png";
import checkDisabled from "@/assets/icons/check-disable.png";
import checkActive from "@/assets/icons/check-active.png";
import { addPayment, fileUpload } from "@/http/modules/pattern.js";

export default {
  name: "pledge",
  components: {
    Header,
    VanIcon,
    VanUploader,
    ButtonCommon
  },
  data() {
    return {
      ali,
      bank,
      wechat,
      checkActive,
      checkDisabled,
      type: "",
      userName: "",
      account: "",
      bankName: "",
      imgUrl: "",
      fileList: []
    };
  },
  computed: {
    typeList() {
      return [
        {
          type: "wechat",
          name: this.$t("pledge.collection.wechat"),
          icon: this.wechat,
          id: 1
        },
        {
          type: "ali",
          name: this.$t("pledge.collection.ali"),
          icon: this.ali,
          id: 2
        },
        {
          type: "bank",
          name: this.$t("pledge.collection.bank"),
          icon: this.bank,
          id: 3
        }
      ];
    }
  },
  methods: {
    nameValidator(e) {
      this.userName = e.target.value.replace(/\s/g, "");
    },
    bankValidator(e) {
      this.bankName = e.target.value.replace(/\s/g, "");
    },
    accountValidator(e) {
      if (this.type.id === 3) {
        this.account = e.target.value.replace(/\D/g, "");
        return;
      }
      this.account = e.target.value.replace(/\s/g, "");
    },
    handleChooseType(item) {
      this.type = item;
    },
    onOversize() {
      Toast(this.$t("common.fileSizeCantNotOver10M"));
    },
    submitBefore() {
      if (!this.userName) {
        Toast(this.$t("pledge.collection.namePld"));
        return false;
      }
      if (!this.account) {
        Toast(
          this.$t(
            `pledge.collection.${
              this.type.id === 3
                ? "bankAccountPld"
                : this.type.id === 2
                ? "aliPld"
                : "wechatPld"
            }`
          )
        );
        return false;
      }
      if (this.type.id === 3 && !this.bankName) {
        Toast(this.$t("pledge.collection.bankPld"));
        return false;
      }
      if (this.type.id !== 3 && !this.imgUrl) {
        Toast(this.$t("pledge.collection.imgPld"));
        return false;
      }
      return true;
    },
    handleAddPay() {
      if (this.submitBefore()) {
        addPayment({
          payment_type: this.type.id,
          payment_no: this.account,
          payment_url: this.imgUrl,
          bank: this.bankName,
          name: this.userName
        }).then(res => {
          if (res.status === 1 && res.msg === "success") {
            Toast(this.$t("pledge.collection.addPaymentSuccess"));
            this.$router.back();
          }
        });
      }
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
            this.imgUrl =
              (process.env.VUE_APP_BASE_BASE_IMAGE_URL ||
                "http://sscv-image.hrwallet.xyz") + res.data;
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
          this.imgUrl = "";
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
$txtGreen: #03ad90;
$txtRed: #ce435d;
$txtYellow: #edb259;
$txtBlack: #202028;
$txtGray: #8193a0;
.wrapper {
  background: #fff;
  padding-bottom: 100px;
  .btn {
    position: fixed;
    width: 345px;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: auto;
  }
  .nav {
    padding: 20px 15px;
    color: $txtBlack;
    font-size: 25px;
    font-weight: 800;
  }
  .type-list {
    padding: 0 15px;
    display: flex;
    align-items: center;
    .item {
      flex: 1;
      height: 55px;
      margin-left: 15px;
      padding-right: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      color: $txtBlack;
      border-bottom: 1px solid #ececec;
    }
  }
  .input-item {
    margin: 31px 15px 0;
    border-bottom: 1px solid #ececec;
    &-name {
      margin-bottom: 8px;
      color: $txtBlack;
      font-size: 13px;
      font-weight: bold;
    }
    input {
      height: 38px;
      font-size: 15px;
    }
    .fileUpload {
      display: block;
      width: 110px;
      line-height: 110px;
      background: #f7f6fb;
      border: 1px solid #eaeaea;
      border-radius: 4px;
      color: #aeb8c0;
      font-size: 15px;
      text-align: center;
    }
    .mb28 {
      margin-bottom: 28px;
    }
    &.file {
      border: 0;
    }
  }
}
</style>