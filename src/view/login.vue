<template>
  <div>
    <!--头部-->
    <div class="head">
      <p class="p_left"> &lt; </p>
      <p class="p_center">注册</p>
      <p class="p_right" @click="goto_login">登录</p>
    </div>
    <!--头部-->
    <!--中部-->
    <div class="center">
      <p class="telephone">
        <span class="areanum">+86</span>
        <input type="text" maxlength="11" v-model="userdata.mobile" class="mobile" placeholder="请输入11位手机号码">
      </p>
      <p class="verify">
        <input type="text"  maxlength="6" v-model="userdata.yzm" placeholder="请输入验证码" class="yzm">
        <button class="achieve" @click="sendyzm" :disable="can_click">{{yzm_text}}</button>
      </p>
      <input type="password" minlength="6" maxlength="16" v-model="userdata.password" placeholder="请输入6-16位密码" class="password">
      <button class="agree" @click="agree">同意使用协议并注册</button>
      <a href="###" class="agreement">用户使用协议</a>
    </div>
    <!--中部-->
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  import  axios from 'axios'
  export default{
    data(){
      return {
        userdata: {
          mobile: '',
          yzm: '',
          password: '',
        },
        can_click: false,
        yzm_text: '获取验证码'
      }
    },
    methods: {
      sendyzm: function () {
        if (this.userdata.mobile === '') {
          Toast('手机号不能为空');
          return;
        }
        if (this.userdata.mobile.length !== 11) {
          Toast('手机号格式不正确');
          return;
        }
        this.can_click = true;
        this.yzm_text = '10s后重新发送'
        Indicator.open({
          text: '发送中...',
          spinnerType: 'fading-circle'
        });
        setTimeout(function () {
          Indicator.close();
          Toast('发送成功，请查看短信');
        }, 1000)
      },
      agree: function () {
        if (this.userdata.mobile === '') {
          Toast('手机号不得为空');
          return;
        }
        if (this.userdata.yzm === '') {
          Toast('验证码不得为空');
          return;
        }
        if (this.userdata.yzm.length !== 6) {
          Toast('验证码格式不正确');
          return;
        }
        if (this.userdata.password === '') {
          Toast('密码不得为空');
          return;
        }
        if (this.userdata.password.length < 6 || this.userdata.password.length > 16) {
          Toast('密码格式不正确');
          return;
        }
        Indicator.open({
          text: '注册中...',
          spinnerType: 'fading-circle'
        });
        let postdata = {};
        postdata.mobile = parseInt(this.userdata.mobile);
        console.log(this.userdata.mobile);
        console.log(parseInt(this.userdata.mobile));
        postdata.yzm = this.userdata.yzm;
        postdata.password = this.userdata.password;
        const _this = this;
        axios.post('http://localhost:3000/api_login', postdata)
          .then(function (response) {
            console.log(response.data);
            window.localStorage.setItem('userinfo', JSON.stringify(response.data));
            setTimeout(function () {
              Indicator.close();
              _this.$router.push({name: 'index'});
            }, 1000)
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      goto_login:function () {

        this.$router.push({name: 'enter'});
      }
    },
    watch: {
      yzm_text: function (newval, oldval) {
        console.log(newval, oldval);
        if (newval === '0s后重新发送' || newval === '获取验证码') {
          this.can_click = false;
          this.yzm_text = '获取验证码';
        } else {
          let second = parseInt(newval.substr(0, 2));

          const _this = this;
          setInterval(function () {
            second--;
            _this.yzm_text = `${second}秒后重新发送`;
          }, 1000);
        }
      }


    }
  }
</script>
<style scoped rel="stylesheet/less" lang="less">
  /*scoped只适用这个网页可写可不写*/
  /*lang="less"  npm run dev的时候打包的类型less*/
  /*type="text/less"告诉编辑器的东西，可写可不写*/

  div.head {
    height: 94/72rem;
    background: #ff8a26;
    color: #ffffff;
    p.p_left {
      width: 94/72rem;
      height: 94/72rem;
      line-height: 94/72rem;
      float: left;
      text-align: right;

    }
    p.p_center {

      width: 534/72rem;
      height: 94/72rem;
      float: left;
      line-height: 94/72rem;
      text-align: center;
    }
    p.p_right {
      height: 94/72rem;
      line-height: 94/72rem;
    }
  }
  div.center {
    margin: 0.5rem 0.5rem;
    width: 9rem;
    height: 9rem;
    p.telephone {
      width: 9rem;
      height: 1.3rem;
      border: 1px solid #d8d8d8;
      span.areanum {
        margin-top: 0.2rem;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        float: left;
      }
      input.mobile {
        margin-top: 0.2rem;
        border: none;
        width: 7rem;
        height: 1rem;
        line-height: 1rem;
      }
    }
    p.verify {
      width: 9rem;
      height: 1.4rem;
      margin-top: 0.5rem;
      input.yzm {
        border: 1px solid #d8d8d8;
        margin-top: 0.03rem;
        width: 5.5rem;
        height: 1.3rem;
        line-height: 1.3rem;
        float: left;
      }
      button.achieve {
        background: white;
        margin-top: 0.03rem;
        margin-left: 0.4rem;
        border: 1px solid #d8d8d8;
        width: 3rem;
        height: 1.3rem;
        line-height: 1.3rem;
      }
    }

    input.password {
      margin-top: 0.5rem;
      width: 9rem;
      height: 1.2rem;
      line-height: 1.2em;
      border: 1px solid #d8d8d8;
    }
    button.agree {
      border: none;
      width: 9rem;
      height: 1.3rem;
      line-height: 1.3rem;
      margin-top: 2rem;
      background: #ff8a26;
      text-align: center;
      color: white;
    }
    a.agreement {
      width: 9rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      display: block;
      color: gray;
    }
  }

  [data-dpr="1"] div.head p.p_left {
    font-size: 40px
  }

  [data-dpr="2"] div.head p.p_left {
    font-size: 55px
  }

  [data-dpr="3"] div.head p.p_left {
    font-size: 110px
  }

  [data-dpr="1"] div.head p.p_center {
    font-size: 24px
  }

  [data-dpr="2"] div.head p.p_center {
    font-size: 40px
  }

  [data-dpr="3"] div.head p.p_center {
    font-size: 80px
  }

  [data-dpr="1"] div.head p.p_right {
    font-size: 18px
  }

  [data-dpr="2"] div.head p.p_right {
    font-size: 30px
  }

  [data-dpr="3"] div.head p.p_right {
    font-size: 66px
  }

  [data-dpr="1"] div.center button {
    font-size: 14px
  }

  [data-dpr="2"] div.center button {
    font-size: 28px
  }

  [data-dpr="3"] div.center button {
    font-size: 46px
  }


  [data-dpr="1"] div.center input {
    font-size: 14px
  }

  [data-dpr="2"] div.center input {
    font-size: 28px
  }

  [data-dpr="3"] div.center input {
    font-size: 40px
  }
  [data-dpr="1"] div.center a {
    font-size: 10px
  }

  [data-dpr="2"] div.center a {
    font-size: 22px
  }

  [data-dpr="3"] div.center a {
    font-size: 46px
  }


</style>
