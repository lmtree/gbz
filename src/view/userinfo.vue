<template>
  <div class="all">
    <div class="head">
      <p class="left" @click="goto_my">&lt;</p>
      <p class="center">个人资料</p>
    </div>
    <div class="user_one">
      <p class="user"><span class="one"> 个人资料</span>
        <span> > </span><img :src="userinfo.faceurl" alt="头像"></p>
      <p><span class="one">昵称</span><span>{{userinfo.nickname}}</span></p>
      <p><span class="one"> 邮箱</span><span>{{userinfo.email}}</span></p>
      <p><span class="one"> 手机号</span><span>{{userinfo.mobile}}</span></p>
    </div>

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
        msg:'hello vue'
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
      }
    }

  }
</script>
<style scoped rel="stylesheet/less" lang="less">
  div.all {
    width: 100%;
    height: 100%;
    background: #e1e1e1;
  }
  div.head {
    width: 10rem;
    height: 1.5rem;
    background: #ff8a26;

    p.left {
      text-align: center;
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

  [data-dpr="2"] div.head p{
    font-size: 35px;
  }

  [data-dpr="3"] div.head p {
    font-size: 70px;
  }

  div.user_one {
    background: white;
    width: 10rem;
    height: 4.6rem;
    p.user{
      height: 1.6rem;
      span.one{
        height: 1.6rem;
        line-height: 1.6rem;
        float: left;


      }
      img{
        width: 120/75rem;
        height: 120/75rem;
        line-height: 1.6rem;
        float: right;
        margin-right: 0.6rem;
      }
      span{
        float: right;
        margin-right: 0.5rem;
        line-height: 1.6rem;
      }


    }

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
        color: #010101;
      }
    }

  }
  [data-dpr="1"] div.user_one p span{
    font-size: 16px;
  }

  [data-dpr="2"] div.user_one p span{
    font-size: 28px;
  }

  [data-dpr="3"] div.user_one p span{
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
    font-size:80px;
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
