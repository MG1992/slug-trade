<template>
  <div class="login-wrapper">
    <div class="login-header">
      <van-image class="login-background" src="./static/register-bg.png" />
    </div>
    <van-form ref="loginForm" :model="loginForm" class="login-form">
      <van-field
        v-model="loginForm.username"
        type="text"
        auto-complete="off"
        placeholder="请输入手机号"
        maxlength="11"
        @keyup.enter.native="handleLogin"
      >
        <template #left-icon>
          <van-image style="width: 20px;" src="./static/login-phone.png" />
        </template>
      </van-field>
      <van-field
        v-model="loginForm.code"
        type="text"
        auto-complete="off"
        placeholder="请输入验证码"
        @keyup.enter.native="handleLogin"
      >
        <template #left-icon>
          <van-image
            style="width: 20px;"
            src="./static/login-verify.png"
          /> </template
        ><template #button>
          <van-button
            size="small"
            plain
            type="info"
            class="code-info"
            @click="getMsgCode"
            >{{ count ? `${count}s后重新发送` : "发送验证码" }}</van-button
          >
        </template>
      </van-field>
      <van-field
        v-model="loginForm.password"
        :type="btnType"
        auto-complete="off"
        placeholder="请输入密码"
        @keyup.enter.native="handleLogin"
      >
        <template #left-icon>
          <van-image style="width: 20px;" src="./static/login-psw.png" />
        </template>
      </van-field>
      <van-field
        v-model="loginForm.password2"
        :type="btnType"
        auto-complete="off"
        placeholder="请再次输入密码"
        @keyup.enter.native="handleLogin"
      >
        <template #left-icon>
          <van-image style="width: 20px;" src="./static/login-psw.png" />
        </template>
      </van-field>
      <van-button
        :loading="loading"
        class="btn-login"
        size="medium"
        style="width:100%;"
        @click.native.prevent="handleLogin"
      >
        <span v-if="!loading">注 册</span>
        <span v-else>注 册 中...</span>
      </van-button>
      <van-row class="login-register-row">
        <van-col :span="24"
          >已有密码<router-link to="/login"
            ><span class="login-imediately">立即登录</span></router-link
          ></van-col
        >
      </van-row>
    </van-form>
  </div>
</template>

<script>
import { getMsgCode } from "@/API/login";
import { Toast } from "vant";
import checkRules from "@/utils/checkRules";

export default {
  name: "Register",
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "",
        password: "",
        password2: "",
        code: "",
        register: true
      },
      btnType: "password",
      checkRules: [
        {
          attr: "username",
          cnName: "手机号码",
          rules: {
            defineLength: 11
          }
        },
        {
          attr: "code",
          cnName: "验证码"
        },
        {
          attr: "password",
          cnName: "密码",
          rules: {
            minLength: 6
          }
        },
        {
          attr: "password2",
          cnName: "第二密码",
          rules: {
            minLength: 6
          }
        }
      ],
      loading: false,
      timer: null,
      count: ""
    };
  },
  created() {},
  methods: {
    getMsgCode() {
      if (this.count) return;
      // 1登录， 0注册
      getMsgCode(0, this.loginForm.username).then(res => {
        Toast("验证码发送成功");
        this.snedCode();
      });
    },
    snedCode() {
      this.count = 60;
      this.timer = setInterval(() => {
        if (this.count) {
          this.count--;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    handleLogin() {
      if (checkRules(this.loginForm, this.checkRules)) return;
      if (this.loginForm.password !== this.loginForm.password2) {
        Toast("两次输入密码不一致");
        return;
      }
      this.loading = true;
      this.$store
        .dispatch("LoginMicro", this.loginForm)
        .then(() => {
          this.$router.push({ path: this.redirect || "/" });
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  background-color: #fff;

  .login-background {
    width: 100%;
  }

  .login-tabs {
    width: 70%;
    margin: auto;
  }
  // .van-hairline--top-bottom:after, .van-hairline-unset--top-bottom:after {
    border: none;
  }
  .van-form {
    padding: 15px;

    .van-cell {
      padding: 20px 10px 10px 10px;
    }
  }

  .btn-login {
    height:40px;
    background:linear-gradient(-90deg,rgba(51,133,255,1),rgba(0,197,247,1));
    border-radius:2px;
    font-size: 14px;
    color: #fff;
    margin: 25px auto 10px auto;
  }

  .login-register-row {
    margin-top: 20px;
    font-size: 13px;
    color: #888888;
    text-align: center;
    .login-imediately {
      color: #11B0FA;
    }
  }

  .code-info {
    height: 20px;
    line-height: 20px;
  }
}
</style>
