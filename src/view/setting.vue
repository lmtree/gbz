<template>
  <div class="all">
    <div class="head">
      <p class="left" @click="goto_my">&lt;</p>
      <p class="center">设置</p>
    </div>
    <div class="user_one">
      <p @click="goto_userinfo"><span class="one"> 个人资料</span><span>></span></p>
      <p><span class="one"> 应用设置</span><span>></span></p>
    </div>
    <div class="user_two">
      <p><span class="one"> 推荐给朋友</span><span>></span></p>
      <p><span class="one"> 给包包网好评</span><span>></span></p>
      <p><span class="one"> 关于</span><span>></span></p>

    </div>
    <p class="exit" @click="logout">退出账号<span>></span></p>

    <!--底部-->
    <div class="foot" flex="box:mean">
      <div>
        <p class="first">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shouyeshouye"></use>
          </svg>
        </p>
        <p class="second">首页</p>
      </div>
      <div>
        <p class="first">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-eye"></use>
          </svg>
        </p>
        <p class="second">发现</p>
      </div>
      <div>
        <p class="first">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gouwuche"></use>
          </svg>
        </p>
        <p class="second">购物车</p>
      </div>
      <div class="active">
        <p class="first">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wo"></use>
          </svg>
        </p>
        <p class="second">我</p>
      </div>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';

  export default{
    data(){
      return{

      }
    },
    created() {
      if (window.localStorage.getItem('userinfo')) {
        this.userinfo = JSON.parse(window.localStorage.getItem('userinfo'));
      } else {
        MessageBox.alert('尚未登录').then(action => {
          this.$router.push({name: 'login'})
        });
      }
    },
    methods: {
      goto_my: function () {
        this.$router.push({name: 'my'});
      },
      goto_userinfo: function () {
        this.$router.push({name: 'userinfo'});
      },
      logout: function () {
        MessageBox.confirm('确认退出?').then(action => {
          localStorage.removeItem('userinfo');
          this.$router.push({name: 'login'});
        }).catch(action => {

        })
      }
    }

  }
</script>
<style scoped rel="stylesheet/less" lang="less">
  div.all {
    width: 100%;
    height: 100%;
    background: #e1e1e1;
    p.exit {
      margin-top: 0.5rem;
      text-align: center;
      background: white;
      height: 1rem;
      line-height: 1rem;
      color: #ff8a26;
    }

  }
  [data-dpr="1"] div.all p.exit {
    font-size: 16px;
  }

  [data-dpr="2"] div.all p.exit {
    font-size: 30px;
  }

  [data-dpr="3"] div.all p.exit {
    font-size: 54px;
  }







  div.head {
    width: 10rem;
    height: 1.5rem;
    background: #ff8a26;

    p.left {
      color: #ffd0a8;
      float: left;
      width: 1rem;
      height: 1.5rem;
      line-height: 1.5rem;

    }

    p.center {
      float: left;
      width: 7rem;
      height: 1.5rem;
      text-align: center;
      line-height: 1.5rem;
      color: white;

    }

  }
  [data-dpr="1"] div.head p {
    font-size: 24px;
  }

  [data-dpr="2"] div.head p {
    font-size: 35px;
  }

  [data-dpr="3"] div.head p {
    font-size: 80px;
  }

  div.user_one {
    background: white;
    width: 10rem;
    height: 2rem;

    p {
      height: 1rem;
      line-height: 1rem;
      border-top: 1px solid #d6d6d6;
      span.one{

        margin-left: 0.5rem;
        float: left;
        color: #010101;
      }

      span {
        float: right;
        margin-right: 0.5rem;
        color: #d6d6d6;
      }
    }

  }



  div.user_two {
    background: white;
    margin-top: 0.5rem;
    width: 10rem;
    height: 3rem;

    p {
      height: 1rem;
      line-height: 1rem;
      border-top: 1px solid #d6d6d6;
      span.one{

        margin-left: 0.5rem;
        float: left;
        color: #010101;
      }

      span {
        float: right;
        margin-right: 0.5rem;
        color: #d6d6d6;
      }
    }
  }
  [data-dpr="1"] div p span.one {
    font-size: 16px;
  }

  [data-dpr="2"] div p span.one{
    font-size: 28px;
  }

  [data-dpr="3"] div p span.one{
    font-size: 54px;
  }

  /*底部*/
  div.foot {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 97/75rem;
    background-color: white;
    div {
      width: 10/4rem;
      height: 97/75rem;
      float: left;

      p.first {
        text-align: center;
      }
      p.second {
        /*color: #999999;*/
        line-height: 35/75rem;
        text-align: center;
      }
    }
    & .active {
      color: #ff8a26;
    }
  }

  [data-dpr='1'] div.foot p.first {
    font-size: 25px;
  }

  [data-dpr='2'] div.foot p.first {
    font-size: 45px;
  }

  [data-dpr='3'] div.foot p.first {
    font-size: 80px;
  }

  [data-dpr='1'] div.foot p.second {
    font-size: 16px;
  }

  [data-dpr='2'] div.foot p.second {
    font-size: 27px;
  }

  [data-dpr='3'] div.foot p.second {
    font-size: 52px;
  }

</style>
