<template>
  <div class="home">
    <div class="logo">
            <img src="/static/images/11.gif">
    </div>
    <div class="username">
      <input class="username" type="text" placeholder="用户名" v-model="login_data.username">
        <img src="/static/images/111.gif" alt="">
    </div>
    <div class="password">
      <input class="password" type="text" placeholder="密码" v-model="login_data.password">
      <img src="/static/images/2.gif" alt="">
    </div>
    <div class="submit">
      <button class="submit"  @click="login">登录</button>
    </div>
    <div class="create">
      <span class="line"></span>
        <p  @click="goto_register">创建新用户</p>
      <span class="line"></span>
    </div>

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
      }
    },
    methods: {
      goto_register: function () {
        this.$router.push({name: 'login'});
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
        // //模拟用户数据
        let userinfo = {};
        userinfo.nickname = "lmt";
        userinfo.faceurl = "/static/images/jsonimg/slide1.gif";
        userinfo.email = "aaa@bbb.ccc";
        userinfo.mobile = "13888888888";
        //将用户名密码保存
//        window.localStorage.setItem('userinfo', JSON.stringify(this.login_data));
        window.localStorage.setItem('userinfo', JSON.stringify(userinfo));
        console.log(userinfo);
        const _this = this;
        setTimeout(function () {
          Indicator.close();
          _this.$router.push({name: 'home'});
        }, 1000);
      }
    }
  }
</script>

<style  scoped lang="less" rel="stylesheet/less" >
  div.home{
    background: #f9f5ec;
    position: absolute;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    div.logo {
        height: 258/75rem;
        display: block;
        width: 230/75rem;
        margin:92/75rem auto 0 auto;
        img {
          width: 230/75rem;
          height: 258/75rem;
      }
    }
   div.username{
      width: 600/75rem;
      height: 77/75rem;
      margin: 0.5rem 1rem 0 1rem;
      background: #ff8a26;
      border-radius: 77/75/2rem;
      border: 1px solid #ff8a26;
     input.username {
        width: (600-90)/75rem;
        height: 77/75rem;
        float: right;
        text-indent: 30/75rem;
        background: #f9f5ec;
        border-radius: 0  77/75/2rem 77/75/2rem 0;
        border: 1px solid #ff8a26;

      }
        img {
          margin-top: 0.15rem;
          margin-left: 0.35rem;
          width: 31/75rem;
          height: 55/75rem;
          float: left;
        }

    }
    div.password{
      width: 600/75rem;
      height: 77/75rem;
      margin: 0.5rem 1rem 0 1rem;
      background: #ff8a26;
      border-radius: 77/75/2rem;
      border: 1px solid #ff8a26;
      input.password {
        width: (600-90)/75rem;
        height: 77/75rem;
        float: right;
        text-indent: 30/75rem;
        background: #f9f5ec;
        border-radius: 0 77/75/2rem 77/75/2rem 0;
        border: 1px solid #ff8a26;
      }
        img {
          margin-top: 0.25rem;
          margin-left: 0.35rem;
          width: 35/75rem;
          height: 39/75rem;
          float: left;

        } }
    div.submit{
      width: 8rem;
      height: 77/75rem;
      margin: 0.8rem 1rem 0 1rem;
      button.submit{
        border-radius: 77/75/2rem;
        border: 1px solid #ff8a26;
        background:  #ff8a26;
        width: 8rem;
        text-align: center;
        height: 77/75rem;
        line-height:77/75rem ;
        color: white;
      }
    }
    div.create {
     margin: 0.5rem 1rem;
      height: 100/75rem;
      span.line {
        margin: 50/75rem  0 ;
        width: 180/75rem;
        border: 1px solid #cccccc;
        float: left;
      }
      p{
        height: 100/75rem;
        line-height: 100/75rem;
        width:230/75rem;
        float: left;
        text-align: center;
      }
    }

  }
  [data-dpr="1"] div.home div input{
    font-size: 18px
  }

  [data-dpr="2"] div.home  div input{
    font-size: 23px
  }

  [data-dpr="3"] div.home div input{
    font-size: 80px
  }
  [data-dpr="1"] div.home button {
    font-size: 20px
  }

  [data-dpr="2"] div.home button {
    font-size: 35px
  }

  [data-dpr="3"] div.home button{
    font-size: 80px
  }
  [data-dpr="1"] div.create {
    font-size: 15px
  }

  [data-dpr="2"] div.create {
    font-size: 25px
  }

  [data-dpr="3"] div.create{
    font-size: 50px
  }
</style>
