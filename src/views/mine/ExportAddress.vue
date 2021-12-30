<template>
  <div class="export-address header-page">
    <Header :title="$t('mine.accountManage.exportAddress')" />
    <van-cell
      :title="$t('mine.accountManage.walletName')"
      is-link
      @click="toShowPopup('wallet', $t('mine.accountManage.updateWalletName'))"
    />
    <van-cell
      :title="$t('mine.accountManage.exportMnemonicWord')"
      is-link
      @click="
        toShowPopup('mnemonicPwd', $t('mine.accountManage.exportMnemonicWord'))
      "
    />
    <van-cell
      :title="$t('mine.accountManage.exportPrivateKey')"
      is-link
      @click="
        toShowPopup('privateKeyPwd', $t('mine.accountManage.exportPrivateKey'))
      "
    />
    <van-cell
      :title="$t('mine.accountManage.logoutWallet')"
      is-link
      @click="
        toShowPopup('logoutWalletPwd', $t('mine.accountManage.logoutWallet'))
      "
    />
    <create-address-popup
      :popupType="popupType"
      :title="popupTitle"
      :walletName="walletName"
      :isShow.sync="showPopup"
      @close="showPopup = false"
      @returnPwd="returnPwd"
    />
  </div>
</template>

<script>
import Header from "@/components/Header";
import { Cell as VanCell, Toast, Dialog } from "vant";
import CreateAddressPopup from "./components/CreateAddressPopup";
import { exportMnemonicWord, exportPrivateKey } from "@/http/modules/mine.js";
import { logout, logoutSubAddress } from "@/http/modules/home";
import i18n from "@/langs";
import { storage } from "@/utils/oldVersionFunc";
import { mapActions } from "vuex";

export default {
  components: {
    Header,
    VanCell,
    CreateAddressPopup,
    [Dialog.Component.name]: Dialog.Component
  },

  data() {
    return {
      popupType: "",
      popupTitle: "",
      walletName: "",
      showPopup: false,
      showPrivatePopup: false,
      // 配置对应接口方法
      methodConfig: {
        mnemonicPwd: exportMnemonicWord,
        privateKeyPwd: exportPrivateKey
      }
    };
  },
  activated() {
    this.showPopup = false;
  },
  methods: {
    ...mapActions({
      FedLogOut: "user/FedLogOut"
    }),
    toShowPopup(type, title) {
      //id, walletname, status, isMain, isActive
      const { walletName, isActive, isMain } = this.$route.query;
      this.popupType = type;
      this.popupTitle = title;
      this.walletName = walletName;
      //退出钱包时判断是否已激活，该地址已激活，请取消激活后再试
      if (type === "logoutWalletPwd") {
        // 主地址直接退出
        if (isMain === "true") {
          Dialog.confirm({
            title: i18n.t("mine.accountManage.hint"),
            message: i18n.t(
              "mine.accountManage.quitThisAddressAndExitAllSubAddressesAtTheSameTimePleaseMakeAFullBackupInTime"
            ),
            cancelButtonText: i18n.t("common.cancel"),
            confirmButtonText: i18n.t("common.confirm")
          })
            .then(() => {
              this.showPopup = true;
            })
            .catch(() => {});
          return;
        }
        // 子地址是当前激活提示线推迟激活
        if (isActive === "true") {
          Toast(
            i18n.t(
              "mine.accountManage.thisAddressIsActivePleaseDesactivateAndTryAgain"
            )
          );
        }
        // 子地址非当前激活提示 请确保自己已经备份该子地址，否则会导致无法找回
        if (isActive === "false") {
          Dialog.confirm({
            title: i18n.t("mine.accountManage.hint"),
            message: i18n.t(
              "mine.accountManage.makeSureYouHaveBackedUpTheSubAddressOtherwiseItWillNotBeRetrieved"
            ),
            cancelButtonText: i18n.t("common.cancel"),
            confirmButtonText: i18n.t("common.confirm")
          })
            .then(() => {
              this.showPopup = true;
            })
            .catch(() => {});
        }
      } else {
        this.showPopup = true;
      }
    },
    // 返回密码
    async returnPwd(data) {
      const { pwd, type } = data;

      if (type === "logoutWalletPwd") {
        // 退出钱包
        this.logoutWallet(pwd);
      } else {
        // 导出私钥或助记词
        await this.exportSpecificAddr(this.$route.query.id, pwd, type);
      }
    },
    async logoutWallet(pwd) {
      const { isMain, id } = this.$route.query;
      // console.log(isMain, isActive, id)
      // 退出主地址-会推出所有地址
      if (isMain === "true") {
        await logout(pwd);
        // 退出后的操作
        Toast(i18n.t("common.logoutSuccess"));
        storage.clear();
        this.FedLogOut();
        this.$router.push({ path: "/importOrCreateWords" });
        this.showPopup = false;
        return;
      }
      // 退出子地址
      logoutSubAddress(id, pwd).then(() => {
        i18n.t("mine.accountManage.deleteSubAddressSuccess");
        this.$router.push({ path: "/accountManage" });
      });
    },
    //导出助记词和私钥
    exportSpecificAddr(id, pwd, type) {
      const param = {
        id,
        m_pwd: pwd
      };
      // 根据打印的type取第一个值
      this.methodConfig[type](param).then(res => {
        this.$router.push({
          path: "exportSpecificAddr",
          query: {
            info: res.data,
            type
          }
        });
        this.showPopup = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
// .export-address {
// }
</style>
