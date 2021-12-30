<template>
  <div id="app">
    <header class="app-header" ref="header"></header>
    <div class="page-container">
      <keep-alive>
        <router-view v-if="!$route.meta.notkeepAlive" />
      </keep-alive>
      <router-view v-if="$route.meta.notkeepAlive" />
    </div>
    <Footer />
    <van-overlay
      :show="showWelcome && finished"
      class="app-overlay"
      style="z-index: 99"
    >
      <!-- <img
        style="width: 100%; height: 100%"
        src="@/assets/img/start.gif"
        @load="loadImage"
      /> -->
      <!-- <video
        style="width: 100%; height: 100%; object-fit: fill"
        src="@/assets/video/start.mp4"
        autoplay
        poster="@/assets/img/start_video.png"
        @ended="videoFinish"
      /> -->
    </van-overlay>
  </div>
</template>
<script>
import Footer from "@/components/Footer";
import { layout } from "@/http/modules/home";
import { BackRouter } from "@/config/backMapRouter";
import { Toast } from "vant";
import { Overlay as VanOverlay } from "vant";
import appUpdate from "@/utils/appUpdate.js";

export default {
  name: "App",
  components: {
    Footer,
    VanOverlay,
  },
  data() {
    return {
      // 静默更新完成
      isSmartUpdateOver: false,
      // 版本更新完成
      isVersionUpdateOver: false,
      timer: null,
      // 展示欢迎页 调试时不展示
      showWelcome: window.location.hostname !== "localhost",
      finished: true,
    };
  },
  created() {
    // 获取用户信息
    // this.GetUserInfo();
    this.appInit();
    // this.checkUserStatus();
    // // 初始化websocket
    // this.initSocket();
    // this.openVideo();
  },
  activated() {
    this.appInit();
  },
  methods: {
    videoFinish() {
      this.showWelcome = false;
    },
    // 加载图片
    loadImage() {
      // this.finished = true;
      setTimeout(() => {
        this.showWelcome = false;
      }, 3200);
    },
    // app事件集合 初始化 (一次 once)
    appInit() {
      if (window.api) {
        this.SET_DEVICE_ID(window.api.deviceId);
        // 关闭启动页
        window.api.removeLaunchView({
          animation: {
            type: "none",
            duration: 10,
          },
        });
        // eslint-disable-next-line no-undef
        //浅色背景状态栏
        window.api.setStatusBarStyle({
          style: "dark",
          color: "#fff",
        });
        // 状态栏设置 顶部向下30px
        // eslint-disable-next-line no-undef
        // $api && $api.fixStatusBar(this.$refs.header);

        // 静默更新
        window.api.addEventListener(
          {
            name: "smartupdatefinish",
          },
          () => {
            this.isSmartUpdateOver = true;
            this.rebootApp();
          }
        );
        // 版本更新
        this.$nextTick(function () {
          appUpdate(function () {
            this.isVersionUpdateOver = true;
            this.rebootApp();
          });
        });

        // 安卓返回键监听 安卓注册双击返回键退出程序事件
        if (window.api.systemType == "android") {
          this.keyBackListener();
        }
      }
    },
    // 重启app
    rebootApp() {
      if (this.isSmartUpdateOver && this.isVersionUpdateOver) {
        setTimeout(() => {
          // APP静默更新完毕，重启 APP才能生效
          Toast(this.$t("common.applicationUpdateCompleteReboot"));
          setTimeout(window.api.rebootApp, 2000);
        }, 1000);
      }
    },
    // 检查用户状态
    checkUserStatus() {
      if (this.timer) clearInterval(this.timer);
      //实时检查用户冻结状态 2分钟刷新一次
      this.timer = setInterval(async () => {
        // 如果未登录则不检查
        if (!this.token) return;
        const res = await this.GetUserInfo();
        //0:正常, 1:冻结
        if (res.m_status !== 1) return;
        await layout();
        this.FedLogOut();
        Toast(this.$t("home.app.yourAccountHasBeenFrozen"));
      }, 2 * 60 * 1000);
    },
    // 安卓返回键监听
    keyBackListener() {
      var firstKeyBackTime = null;
      window.api.addEventListener(
        {
          name: "keyback",
        },
        // eslint-disable-next-line no-unused-vars
        (ret) => {
          let hash = window.location.hash;
          hash = hash.split("?")[0]; // 过滤页面参数

          console.log("hash  = " + hash);
          if (
            hash === "#/" ||
            hash === "#/market" ||
            hash === "#/trade" ||
            hash === "#/wallet" ||
            hash === "#/mine" ||
            hash === "#/importOrCreateWords"
          ) {
            // 如果是导航条5首页部分 则不再后退
            if (!firstKeyBackTime) {
              firstKeyBackTime = new Date().getTime();
              Toast(this.$t("home.app.PressReturnKeyOneMoreTimeAndQuit"));
            } else {
              var secondKeyBackTime = new Date().getTime();
              if (secondKeyBackTime - firstKeyBackTime < 500) {
                console.log("小于500豪秒");
              } else if (secondKeyBackTime - firstKeyBackTime > 2000) {
                firstKeyBackTime = secondKeyBackTime;
                Toast(this.$t("home.app.PressReturnKeyOneMoreTimeAndQuit"));
              } else {
                window.api.closeWidget({
                  id: window.api.appId,
                  silent: true,
                });
              }
            }
          } else {
            if (BackRouter[hash]) {
              this.$router.replace({ path: BackRouter[hash] });
            } else {
              this.$router.go(-1);
            }
          }
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.app-header {
  top: 0;
  left: 0;
  position: fixed;
  z-index: 99;
  width: 100%;
  height: $appStatusTop;
  background-color: #343234;
}
.page-container {
  position: absolute;
  z-index: 9;
  width: 100%;
  height: calc(100% - 25px);
  top: $appStatusTop;
  background-color: #fff;
}
.app-overlay {
  background-color: #000;
}
</style>