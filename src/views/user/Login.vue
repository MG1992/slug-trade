<template>
  <div class="login-wrapper" justify="space-around">
    <!--右侧登录框-->
    <!-- <div class="form-wrapper clearfix">
      <div class="login-content-left">
        <div class="login-left-logo">
          <img src="@/assets/icons/logo.png" alt="login-logo" class="login-logo">
          <p>欢迎使用KIWIETF孵化器</p>
        </div>
        <div class="login-form">
          <div class="input-wrapper">
            <p class="input-title">账号/手机号</p>
            <van-field v-model="username" @keyup.enter.native="toLogin" maxlength="11"></van-field>
          </div>
          <div class="input-wrapper">
            <p class="input-title">密码</p>
            <img class="password-hidden-img" :src="passwordImg" @click="changePswType">
            <van-field :type="passwordType" v-model="pwd" placeholder="请输入密码" @keyup.enter.native="login"></van-field>
          </div>
        </div>
        <div class="login-btn-wrapper">
          <van-button class="login-btn" type="primary" @click="login">登录</van-button>
          <div class="login-bottom-wrapper">
            <router-link :to="{ path: 'register' }">
              <a class="underline">去注册>></a>
            </router-link>
            <router-link :to="{ path: 'PwdStepOne' }">
              <span class="forgetPSW fr">忘记密码？</span>
            </router-link>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// import Cookies from "js-cookie"
// import { Toast, Field as VanField, Button as VanButton } from 'vant'
// import { login } from '@/http/modules/user'
// import passwordHidden from '@/assets/icons/password_hide.png'
// import passwordVisual from '@/assets/icons/password_visual.png'
// import { createNamespacedHelpers } from 'vuex'
// const { mapMutations } = createNamespacedHelpers('user')
// import checkRules from '@/utils/checkRules'

export default {
  name: "Login",
  // components: {
  //   VanField,
  //   VanButton
  // },
  data() {
    return {
      username: '',
      pwd: '',
      // passwordImg: passwordHidden,
      passwordType: 'password'
    }
  }
  // mounted:function () {
  //   var sign_id = localStorage.getItem('sign_id');
  //   if (sign_id) {
  //       this.username = sign_id;
  //   }
  //   this.calBottomImg()
  // },
  // methods : {
  //   ...mapMutations(['SET_USER_INFO']),
  //   calBottomImg: function(){
  //     var h = document.body.scrollHeight;
  //     window.onresize = function(){
  //         if (document.body.scrollHeight < h) {
  //             document.getElementById("e-bottom-wrapper").style.display = "none";
  //         }else{
  //             document.getElementById("e-bottom-wrapper").style.display = "block";
  //         }
  //     };
  //   },
  //   async login() {
  //     if (!this.username) {
  //       return Toast('请输入账号/手机号');
  //     }
  //     if(!(
  //       /^\d{9,11}$/.test(this.username)
  //     )){
  //       return Toast('请输入正确的账号/手机号');
  //     }
  //     if(!this.pwd){
  //       return Toast('请输入密码');
  //     }
  //     const submitObj = this.username.length === 9 ? {
  //       m_account_num: this.username,
  //       m_pwd: this.pwd
  //     }: {
  //       m_name: this.username,
  //       m_pwd: this.pwd
  //     }
  //     const res = await login(submitObj)
  //     this.SET_USER_INFO(res.result)
  //     Toast('登录成功')
  //     this.$router.push('/')
  //   },
  //   changePswType() {
  //     if (this.passwordType === 'password') {
  //       this.passwordType = 'text'
  //       this.passwordImg = passwordVisual
  //     } else {
  //       this.passwordType = 'password'
  //       this.passwordImg = passwordHidden
  //     }
  //   }
  // }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.clearfix {
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.login-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 57px 38px;
  background-color: #fff;
}
.login-left-logo {
  text-align: center;

  p {
    font-size: 18px;
    color: #36ACFA;
    font-weight: bold;
    margin-top: 15px;
  }
}
.login-logo {
  width: 125px;
  margin-bottom: 30px;
}
.input-wrapper {
  position: relative;
  padding-top: 30px;
  font-size:14px;
  font-weight:400;
  color:rgba(153,153,153,1);
  text-align: left;

  .input-title {
    color: #999999;
    font-size: 12px;
  }
  .van-cell {
    background-color: transparent;
    padding: 5px 0 0 0;
  }
}
.password-hidden-img {
  position: absolute;
  right: 3px;
  top: 64px;
  z-index: 99;
  width: 16px;
  cursor: pointer;
}

.login-bottom-wrapper {
  text-align: left;
  margin-top: 10px;
  color: #999;
  font-size: 12px;

  .forgetPSW {
    position: absolute;
    right: 0;
  }
}

.login-btn-wrapper {
  position: relative;
  margin-top: 41px;
  .login-btn {
    width: 100%;
    height: 45px;
    color: #fff;
    background-color: #37ACFA;
    border: none;
    border-radius: 30px;
    font-size: 18px;
    outline: none;
  }
}
.underline {
  text-decoration: underline;
  text-underline-position: below;
}
.login-form .van-field {
  height: 35px;
  padding: 5px;

  border-bottom: #EBEBEB 1px solid!important;
  border-radius: 0;
  outline: none;
}
</style>
