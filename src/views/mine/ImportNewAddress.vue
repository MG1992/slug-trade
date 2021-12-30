<template>
  <div class="import-new-address header-page">
    <Header :title="$t('mine.accountManage.importAddress')" />
    <van-tabs v-model="active" @change="changeTab">
      <van-tab :title="$t('mine.accountManage.mnemonicWord')">
        <div class="mnemonic-word">
          <div class="p-l-26">{{ $t('mine.accountManage.walletName') }}</div>
          <van-field
            v-model="form.name"
            :placeholder="$t('mine.accountManage.pleaseEnterWalletName')"
            maxlength="20"
          />
          <div class="p-l-26 m-t-36">
            {{ $t('mine.accountManage.mnemonicWord') }}
          </div>
          <van-field
            type="textarea"
            v-model="form.mnemonicWord"
            :placeholder="
              $t('mine.accountManage.pleaseInputMnemonicWordsInCorrectOrder')
            "
            :autosize="{ minHeight: 210, maxHeight: 210 }"
            maxlength="500"
            show-word-limit
          />
        </div>
      </van-tab>
      <van-tab :title="$t('mine.accountManage.privateKey')">
        <div class="mnemonic-word">
          <div class="p-l-26">{{ $t('mine.accountManage.walletName') }}</div>
          <van-field
            v-model="form.name"
            :placeholder="$t('mine.accountManage.pleaseEnterWalletName')"
            maxlength="20"
          />
          <div class="p-l-26 m-t-36">
            {{ $t('mine.accountManage.privateKeyAddress') }}
          </div>
          <van-field
            type="textarea"
            v-model="form.privateKey"
            :placeholder="$t('mine.accountManage.pleaseInputPrivateKeyAddress')"
            :autosize="{ minHeight: 210, maxHeight: 210 }"
            maxlength="500"
            show-word-limit
          />
        </div>
      </van-tab>
    </van-tabs>
    <ButtonCommon fixed @click="toImport">{{
      $t('mine.accountManage.importImmediately')
    }}</ButtonCommon>
    <safety-verify-popup
      :isShow="showPopup"
      @returnPwd="returnPwd"
      @close="showPopup = false"
    />
  </div>
</template>

<script>
import { Tab as VanTab, Tabs as VanTabs, Field as VanField, Toast } from 'vant'
import Header from '@/components/Header'
import ButtonCommon from '@/components/ButtonCommon'
import i18n from '@/langs'
import checkRules from '@/utils/checkRules'
import { importAddress } from '@/http/modules/mine.js'
import SafetyVerifyPopup from './components/SafetyVerifyPopup'
import { mapState } from 'vuex'
const Form = () => {
  return {
    name: '',
    mnemonicWord: '',
    privateKey: '',
  }
}
export default {
  components: {
    VanTab,
    VanTabs,
    VanField,
    Header,
    ButtonCommon,
    SafetyVerifyPopup,
  },
  data() {
    return {
      active: 0,
      form: new Form(),
      showPopup: false,
      rules: [
        {
          attr: 'name', // originObj中的属性
          cnName: i18n.t('mine.accountManage.walletName'), // 中文名
          rules: {
            maxLength: 20, // 最大长度
            minLength: 1, // 最小长度
            allowNull: false, // default: false 是否允许非空 默认是false
            regex: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, // 正则表达式
            regexMsg: i18n.t(
              'mine.accountManage.walletNameOnlySupportNumberLetterChinese'
            ),
          },
        },
      ],
    }
  },
  computed: {
    ...mapState({
      deviceId: (state) => state.home.deviceId,
    }),
  },
  created() {},
  mounted() {},
  activated() {
    this.form = new Form()
    this.showPopup = false
  },
  methods: {
    changeTab() {
      this.form = new Form()
    },
    // 不同tab校验不一样
    getCheckConfig() {
      return {
        0: {
          attr: 'mnemonicWord', // originObj中的属性
          cnName: i18n.t('mine.accountManage.mnemonicWord'), // 中文名
          rules: {
            maxLength: 500, // 最大长度
            minLength: 1, // 最小长度
            allowNull: false, // default: false 是否允许非空 默认是false
          },
        },
        1: {
          attr: 'privateKey', // originObj中的属性
          cnName: i18n.t('mine.accountManage.privateKeyAddress'), // 中文名
          rules: {
            maxLength: 500, // 最大长度
            minLength: 1, // 最小长度
            allowNull: false, // default: false 是否允许非空 默认是false
          },
        },
      }
    },
    // 立即导入
    toImport() {
      // 校验必填
      const config = this.getCheckConfig()
      if (checkRules(this.form, [...this.rules, config[this.active]])) return
      // 弹出密码框
      this.showPopup = true
    },
    // 返回账户密码
    returnPwd(pwd) {
      this.toSubmit(pwd)
    },
    // 提交
    toSubmit(pwd) {
      const { name, privateKey, mnemonicWord } = this.form
      const prams = {
        name,
        privateKey: privateKey || mnemonicWord,
        m_pwd: pwd,
        machine: this.deviceId,
      }
      importAddress(prams).then(() => {
        // 导入成功，返回账户管理页
        Toast(i18n.t('mine.accountManage.importSuccess'))
        this.$router.push({ path: '/accountManage' })
      })
    },
  },
}
</script>
<style lang="scss">
.import-new-address {
  font-size: 14px;
  .van-tabs__line {
    background-color: #{$themeColor};
  }
  .mnemonic-word {
    margin-top: 39px;
  }
  .van-field__control {
    background-color: #f8f8f8;
    height: 40px;
    padding: 0 10px;
    border-radius: 6px;
  }
  .van-cell:after {
    border: none;
  }
  .p-l-26 {
    padding-left: 26px;
  }
  .m-t-36 {
    margin-top: 26px;
  }
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    padding-top: 8px;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    padding-top: 8px;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    padding-top: 8px;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    padding-top: 8px;
  }
}
</style>
