<template>
  <div class="login_wrap">
    <!--头部-->
    <div class="baobao_head">
      <div class="juzhong">
        <p class="p_left"> &lt; </p>
        <p class="p_center">登录</p>
        <p class="p_right" @click="goto_register">注册</p>
      </div>
    </div>
    <!--头部-->
    <div class="img">
         <span class="imgop">
            <img src="/static/images/11.gif">
         </span>
    </div>
    <p class="a1">
      <input class="int" type="text" placeholder="用户名" v-model="login_data.username">
      <span>
        <img src="/static/images/111.gif" alt="">
        </span>
    </p>
    <p class="a2">
      <input class="int" type="text" placeholder="密码" v-model="login_data.password">
      <span>
        <img src="/static/images/2.gif" alt="">
        </span>
    </p>
    <!--<p class="a3" v-if="save_password" @click="save_password = false">-->
      <!--<span class="img"><img src="/static/images/not_save_password.gif"></span>-->
      <!--<span class="text">记住密码</span>-->
    <!--</p>-->
    <!--<p class="a3" v-else @click="save_password = true">-->
      <!--<span class="img"><img src="/static/images/save_password.gif"></span>-->
      <!--<span class="text">记住密码</span>-->
    <!--</p>-->
    <button type="button" @click="login">登录</button>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  export default{
    data(){
      return {
        login_data: {
          username: '',
          password: ''
        },
        save_password: false
      }
    },
    methods: {
      goto_register: function () {
        this.$router.push({name: 'register'});
      },
      login: function () {
        //验证
        if (this.login_data.username === '') {
          Toast('手机号不得为空');
          return;
        }
        if (this.login_data.password === '') {
          Toast('密码不得为空');
          return;
        }
        //
        Indicator.open({
          text: '登录中...',
          spinnerType: 'fading-circle'
        });
        //
//        将用户名密码保存
        if (this.save_password) {
          window.sessionStorage.setItem('userinfo', JSON.stringify(this.login_data));
        } else {
          window.localStorage.setItem('userinfo', JSON.stringify(this.login_data));
        }

        const _this = this;
        setTimeout(function () {
          Indicator.close();
          _this.$router.push({name: 'index'});
        }, 1000);
      }
    }
  }
</script>
<style scoped rel="stylesheet/less" lang="less">

  div.login_wrap {
    background: #f9f5ec;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  div.baobao_head {
    width: 100%;
    height: 1.5rem;
    background: #ff8a26;
    color: #ffffff;
    div.juzhong {
      width: 10rem;
      height: 1.5rem;
      text-align: center;
      p.p_left {
        width: 2rem;
        height: 1.5rem;
        line-height: 1.5rem;
        float: left;
        color: #ffdbc6;
      }
      p.p_center {
        width: 6rem;
        height: 1.5rem;
        text-align: center;
        line-height: 1.5rem;
        float: left;
      }
      p.p_right {
        width: 2rem;
        height: 1.5rem;
        line-height: 1.5rem;
        float: right;
        color: #ffdbc6;
      }
    }
  }

  div.img {
    span {
      display: block;
      width: 230/75rem;

      margin: 0 auto;
      margin-top: 192/75rem;
      img.imgop {
        width: 230/75rem;

      }
    }
  }

  p.a1 {
    width: 635/75rem;
    height: 77/75rem;
    margin: 0.5rem auto 0 auto;
    background: #ff8a26;
    border-radius: 36px;
    border: 1px solid #ff8a26;

    input.int {
      width: (635-80)/75rem;
      height: 77/75rem;
      float: right;
      text-indent: 30/75rem;
      font-size: 45px;
      background: #f9f5ec;
      border-radius: 0 36px 36px 0;
      border: 1px solid #ff8a26;
    }
    span {
      width: 31/75rem;
      height: 55/75rem;
      display: block;
      float: left;
      margin-top: 0.15rem;
      margin-left: 0.35rem;
      img {
        width: 31/75rem;
        height: 55/75rem;
        float: left;

      }
    }

  }

  p.a2 {
    width: 635/75rem;
    height: 77/75rem;
    margin: 0.5rem auto 0rem auto;
    background: #ff8a26;
    border-radius: 36px;
    border: 1px solid #ff8a26;

    input.int {
      width: (635-80)/75rem;
      height: 77/75rem;
      float: right;
      text-indent: 30/75rem;
      font-size: 45px;
      background: #f9f5ec;
      border-radius: 0 36px 36px 0;
      border: 1px solid #ff8a26;
    }
    span {
      width: 35/75rem;
      height: 39/75rem;
      display: block;
      float: left;
      margin-top: 0.25rem;
      margin-left: 0.35rem;
      img {
        width: 35/75rem;
        height: 39/75rem;
        float: left;

      }
    }
  }

  p.a3 {
    width: 7rem;
    height: 64/75rem;
    line-height: 64/75rem;
    margin: 0 auto;
    text-align: center;
    span.img {
      img {
        width: 40/75rem;
        height: 40/75rem;
        margin-top: (64-40)/75rem;
        margin-right: 12/75rem;
      }
    }
    span.text {

    }
  }

  button {
    width: 635/75rem;
    margin: 0.5rem auto 0 auto;
    height: 77/75rem;
    line-height: 77/75rem;
    background: #fdaa61;
    color: #fff;
    font-weight: bolder;
    text-align: center;
    border: none;
    display: block;
    border-radius: (77/75)/2rem;
  }
</style>
