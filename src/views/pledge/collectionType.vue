<template>
  <div class="wrapper header-page">
    <Header title></Header>

    <div class="nav">{{ $t("pledge.collection.title") }}</div>

    <div class="list" v-for="(item, index) in list" :key="index">
      <div class="list-nav">
        <div class="list-nav-left">
          <van-icon class="icon" :name="iconFn(item.payment_type)" size="16" />
          {{ nameFn(item.payment_type) }}
        </div>
        <div
          class="list-nav-right"
          @click="handleUnactivpym(item.id)"
          v-if="item.active_flag === 'Y'"
        >
          <van-icon class="icon" :name="checkActive" size="16" />
          {{ $t("pledge.collection.statusOn") }}
        </div>
        <div
          class="list-nav-right text-gray"
          @click="handleActivpm(item)"
          v-else
        >
          <van-icon class="icon" :name="checkDisabled" size="16" />
          {{ $t("pledge.collection.statusOff") }}
        </div>
      </div>
      <div class="content">
        <p class="name">{{ item.name }}</p>
        <p class="value">{{ item.payment_no }}</p>
      </div>
    </div>

    <div class="footer-box">
      <ButtonCommon class="btn" @click="handleAddType">{{
        $t("pledge.collection.add")
      }}</ButtonCommon>
    </div>

    <div class="not-data" v-if="list.length == 0">
      {{ $t("pledge.collection.noCollection") }}
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import ButtonCommon from "@/components/ButtonCommon";
import { Icon as VanIcon, Toast } from "vant";
import wechat from "@/assets/icons/wechat.png";
import ali from "@/assets/icons/ali.png";
import bank from "@/assets/icons/bank.png";
import checkDisabled from "@/assets/icons/check-disable.png";
import checkActive from "@/assets/icons/check-active.png";
import { getPaymentList, activpm, unactivpym } from "@/http/modules/pattern.js";

export default {
  name: "collectionType",
  components: {
    Header,
    VanIcon,
    ButtonCommon
  },
  data() {
    return {
      ali,
      bank,
      wechat,
      checkActive,
      checkDisabled,
      list: []
    };
  },
  computed: {
    typeList() {
      return [
        {
          type: "wechat",
          name: this.$t("pledge.collection.wechat"),
          icon: this.wechat,
          id: "1"
        },
        {
          type: "ali",
          name: this.$t("pledge.collection.ali"),
          icon: this.ali,
          id: "2"
        },
        {
          type: "bank",
          name: this.$t("pledge.collection.bank"),
          icon: this.bank,
          id: "3"
        }
      ];
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      getPaymentList().then(res => {
        if (res.status === 1) {
          this.list = res.data;
          Toast.clear();
        }
      });
    },
    async handleActivpm(item) {
      try {
        Toast.loading({
          message: this.$t("pledge.collection.activeLoading"),
          duration: 0
        });
        let unactivpymList = [];
        this.list.map(items => {
          if (
            items.payment_type === item.payment_type &&
            items.active_flag === "Y"
          ) {
            unactivpymList.push(unactivpym(items.id));
          }
        });
        await Promise.all(unactivpymList);
        await activpm(item.id);
        this.init();
      } catch (error) {
        this.init();
        console.error(error);
      }
    },
    handleUnactivpym(id) {
      unactivpym(id).finally(() => {
        this.init();
      });
    },
    handleAddType() {
      // 从广告发布或下单进来的直接回退到相应页面
      // if (this.$route.query.fromOrder) {
      //   this.$router.back();
      // } else {
      // }
      this.$router.push("/addCollection");
    },
    iconFn(id) {
      return this.typeList.find(item => item.id === id).icon;
    },
    nameFn(id) {
      return this.typeList.find(item => item.id === id).name;
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
  .text-gray {
    color: $txtGray !important;
  }
  .not-data {
    margin-top: 180px;
    font-size: 15px;
    color: $txtGray;
    text-align: center;
  }
  .footer-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 30px;
    background: #fff;
    .btn {
      width: 345px;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
  .nav {
    padding: 20px 15px;
    color: $txtBlack;
    font-size: 25px;
    font-weight: 800;
  }
  .list {
    border-top: 10px solid #f7f6fb;
    padding: 12px 15px 18px;
    &-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      &-left {
        display: flex;
        align-items: center;
        color: $txtBlack;
        .icon {
          margin-right: 5px;
        }
      }
      &-right {
        display: flex;
        align-items: center;
        color: $txtYellow;
        .icon {
          margin-right: 9px;
        }
      }
    }
    .content {
      margin-top: 24px;
      .name {
        color: $txtGray;
        font-size: 14px;
      }
      .value {
        margin-top: 12px;
        color: $txtBlack;
        font-size: 17px;
        font-weight: bold;
      }
    }
  }
}
</style>