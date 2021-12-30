<template>
  <div class="export-spacific-addr header-page">
    <Header
      :title="
        $t(
          type === 'mnemonicPwd'
            ? 'mine.accountManage.exportMnemonicWord'
            : 'mine.accountManage.exportPrivateKey'
        )
      "
    />
    <div class="hint">
      <img :src="safetyIcon" alt="hint" />
      <div>
        {{ $t('mine.accountManage.copyCarefully') }}
        {{ $t('mine.accountManage.keepSafe') }}
        {{
        type === 'mnemonicPwd'
        ? $t('mine.accountManage.unLeakYourMnemonicWord')
        : $t('mine.accountManage.unLeakYourPrivateKey')
        }}
      </div>
      <div>
        {{ $t('mine.accountManage.theWalletServerDoesNotKeepUserPrivateKey') }}
        {{ $t('mine.accountManage.theLossCannotBeRecovered') }}
      </div>
    </div>
    <div class="box" v-if="type === 'mnemonicPwd'">
      <div v-clipboard:copy="info.mnemonic" v-clipboard:success="onCopy">
        <img :src="copyIcon" alt="copy" />
      </div>
      <div class="title">{{ info.currency }}{{ $t('mine.accountManage.mnemonicWord') }}</div>
      <div class="content">{{ info.mnemonic }}</div>
    </div>
    <div class="box" v-if="type === 'privateKeyPwd'">
      <div v-clipboard:copy="info.private_key" v-clipboard:success="onCopy">
        <img :src="copyIcon" alt="copy" />
      </div>
      <div class="title">{{ info.currency }}{{ $t('mine.accountManage.privateKey') }}</div>
      <div class="content">{{ info.private_key }}</div>
    </div>
    <div class="box">
      <div v-clipboard:copy="info.address" v-clipboard:success="onCopy">
        <img :src="copyIcon" alt="copy" />
      </div>
      <div class="title">{{ info.currency }}{{ $t('mine.accountManage.address') }}</div>
      <div class="content">{{ info.address }}</div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import safetyIcon from '@/assets/icons/safety.svg'
import copyIcon from '@/assets/icons/mine_copy.svg'
import i18n from '@/langs'
import { Toast } from 'vant'

export default {
  components: {
    Header,
  },

  data () {
    return {
      safetyIcon,
      copyIcon,
      info: {},
      type: '',
    }
  },

  activated () {
    this.info = this.$route.query.info
    this.type = this.$route.query.type
  },

  methods: {
    onCopy () {
      Toast(i18n.t('mine.accountManage.copySuccess'))
    },
  },
}
</script>
<style lang="scss" scoped>
.export-spacific-addr {
  background-color: #f3f3f3;
  min-height: 100vh;
  .hint {
    text-align: center;
    margin: 40px auto 45px;
    color: $themeColor;
    font-size: 13px;
    line-height: 20px;
    padding: 0 15px;
  }
  img {
    width: 36px;
    margin-bottom: 21px;
  }
  .box {
    margin: 15px;
    background-color: #ffffff;
    padding: 0 16px;
    .title {
      height: 49px;
      padding-top: 19px;
      color: #333333;
      font-size: 15px;
    }
    .content {
      min-height: 30px;
      padding-bottom: 16px;
      width: 256px;
      line-height: 20px;
      color: #666666;
      font-size: 13px;
    }
    img {
      float: right;
      width: 20px;
      margin-top: 15px;
    }
  }
}
</style>
