<template>
  <div class="header-page">
    <Header
      title=""
      :rightText="$t('mine.share.shareLink')"
      @click-right="doCopy"
    />

    <img class="shareImg" :src="shareImg" />

    <div class="btn-container">
      <div @click="handleDownloadNow">{{ $t("mine.share.copyUrl") }}</div>
      <div @click="handleDistributeDownload">
        {{ $t("mine.share.distributeDownload") }}
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
// import shareImg from "@/assets/img/share.jpg"
import { Toast } from "vant";
import { getShareInfo } from "@/http/modules/mine";

export default {
  components: {
    Header
  },
  data() {
    return {
      shareImg: "",
      copyShareAddr: "", //"http://download.lighthousechain.live/au-dt-page/lhc.apk",
      shareInfo: {}
    };
  },
  activated() {
    this.getShareInfo();
  },
  methods: {
    getShareInfo() {
      getShareInfo().then(res => {
        this.shareInfo = res.data;
        this.shareImg = this.shareInfo.share_img_url;
        this.copyShareAddr = this.shareInfo.share_img_url;
      });
    },
    doCopy() {
      const that = this;
      if (process.env.VUE_APP_IS_APP) {
        var filename = "share_" + new Date().getTime() + ".jpg";
        window.api.download(
          {
            url: that.shareImg,
            savePath: "fs://" + filename
          },
          function(ret) {
            if (ret.state == 1) {
              window.api.saveMediaToAlbum(
                {
                  path: "fs://" + filename
                },
                function(ret) {
                  if (ret && ret.status) {
                    Toast(that.$t("mine.share.savePicSuccess"));
                  } else {
                    Toast(that.$t("mine.share.savePicFail"));
                  }
                }
              );
            } else {
              Toast(that.$t("mine.share.savePicFail"));
            }
          }
        );
      }
    },
    handleDownloadNow: function() {
      this.$copyText(this.shareInfo.share_url).then(
        () => {
          Toast(this.$t("mine.share.copySuccess"));
        },
        () => {
          Toast(this.$t("mine.share.copyError"));
        }
      );
      // if (window.api) {
      //   window.api.openApp({
      //     androidPkg: "android.intent.action.VIEW",
      //     mimeType: "text/html",
      //     uri: this.shareInfo.share_url //"http://download.lighthousechain.live/au-dt-page/lhc.apk",
      //   });
      // }
    },
    handleDistributeDownload: function() {
      if (window.api) {
        window.api.openApp({
          androidPkg: "android.intent.action.VIEW",
          mimeType: "text/html",
          uri: this.shareInfo.distribute_url //"http://ff.kiwietfcoin.me/lhfcz",
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.header-page {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  .shareImg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .btn-container {
    position: absolute;
    bottom: 70px;
    left: 0;
    right: 0;
    width: 260px;
    height: 30px;
    margin: auto;
    white-space: nowrap;
    div {
      width: 116px;
      height: 33px;
      margin: 0 10px;
      padding: 0;
      line-height: 33px;
      text-align: center;
      border-radius: 10px;
      background-color: #fff;
      color: #000;
      display: inline-block;
    }
  }
  ::v-deep.header-wrapper {
    background-color: transparent;
  }
  ::v-deep.van-nav-bar {
    background-color: transparent;
  }
  ::v-deep.van-nav-bar__title {
    color: #fff;
  }
  ::v-deep.van-nav-bar__right {
    color: #fff;
  }
}
</style>
