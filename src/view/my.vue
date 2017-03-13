<template>
  <div class="main">
    <!--头部-->
    <div class="head">
      <span class="left">个人中心</span>
      <img @click="goto_setting" src="/static/images/person/rigth.gif" alt="">
    </div>
    <!--背景图-->
    <div class="slide">
      <img :src="userinfo.faceurl" alt="">
      <p>{{userinfo.nickname}}</p>

    </div>
    <!--导航-->
    <div class="nav">
      <div>
        <p class="img">
          <img src="/static/images/person/list_1.gif" alt="">
        </p>
        <p class="text">收藏</p>
      </div>
      <div>
        <p class="img">
          <img src="/static/images/person/list_2.gif" alt="">
        </p>
        <p class="text">优惠券</p>
      </div>
      <div>
        <p class="img">
          <img src="/static/images/person/list_3.gif" alt="">
        </p>
        <p class="text">消息</p>
      </div>
      <div>
        <p class="img">
          <img src="/static/images/person/list_4.gif" alt="">
        </p>
        <p class="text">评论</p>
      </div>
    </div>
    <!--订单状态-->
    <div class="order">
      <div class="title">
        <p class="p_left">全部订单</p>
        <p class="p_right"> &gt;</p>
      </div>
      <div class="list">
        <div>
          <p class="img">
            <img src="/static/images/person/order_1.gif" alt="">
          </p>
          <p class="text">待付款</p>
        </div>
        <div>
          <p class="img">
            <img src="/static/images/person/order_2.gif" alt="">
          </p>
          <p class="text">待发货</p>
        </div>
        <div>
          <p class="img">
            <img src="/static/images/person/order_3.gif" alt="">
          </p>
          <p class="text">待收货</p>
        </div>
        <div>
          <p class="img">
            <img src="/static/images/person/order_4.gif" alt="">
          </p>
          <p class="text">退款</p>
        </div>
      </div>
    </div>
    <!--设置-->
    <div class="settings">
      <div class="setting">
        <span class="left">
          <img src="/static/images/person/set_1.gif" alt="">
        </span>
        <span class="center">地址管理</span>
        <span class="right"> &gt; </span>
      </div>
      <div class="setting" flex="cross:center dir:left box:first">
        <span class="left">
          <img src="/static/images/person/set_2.gif" alt="">
        </span>
        <span class="center">联系客服</span>
        <span class="right"> &gt; </span>
      </div>
      <div class="setting" flex="cross:center dir:left box:first">
        <span class="left">
          <img src="/static/images/person/set_3.gif" alt="">
        </span>
        <span class="center">浏览足迹</span>
        <span class="right"> &gt; </span>
      </div>
      <div class="setting special" flex="cross:center dir:left box:first">
        <span class="left">
          <img src="/static/images/person/set_4.gif" alt="">
        </span>
        <span class="center" @click="goto_service">帮助说明</span>
        <span class="right"> &gt; </span>
      </div>
    </div>
    <!--底部-->
    <div class="foot" flex="dir:left box:mean">
      <div>
        <p class="first">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shouyeshouye"></use>
          </svg>
        </p>
        <p class="second" @click="go_home">首页</p>
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
        <p class="second" @click="goto_cart">购物车</p>
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
  import {MessageBox} from 'mint-ui';
  export default{
    data(){
      return {
        userinfo: {}
      }
    },
    created() {
      if (window.localStorage.getItem('userinfo')) {
        this.userinfo = JSON.parse(window.localStorage.getItem('userinfo'));
        console.log(this.userinfo);
      } else {
        MessageBox.alert('尚未登录').then(action => {
          this.$router.push({name: 'login'})
        });
      }
    },
    methods: {
      goto_setting: function () {
        this.$router.push({name: 'setting'})
      },
      go_home: function () {
        this.$router.push({name: 'home'})
      },
      goto_service: function () {
        this.$router.push({name: 'service'})
      },
      goto_cart: function () {
        this.$router.push({name: 'cart'})
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  div.main {
    height: 100%;
    background: #e8e8e8;
  }

  /*头部*/
  div.head {
    position: fixed;
    top: 0;
    width: 100%;
    height: 91/75rem;
    background: #ff8a26;
    z-index: 9999;
    span {
      display: block;
      width: (750-91)/75rem;
      height: 91/75rem;
      line-height: 91/75rem;
      float: left;
      color: white;
      text-indent: 4rem;
    }
    img {
      width: 91/75rem;
      height: 91/75rem;
    }
  }

  [data-dpr='1'] div.head {
    font-size: 20px;
  }

  [data-dpr='2'] div.head {
    font-size: 36px;
  }

  [data-dpr='3'] div.head {
    font-size: 70px;
  }

  /*背景图*/
  div.slide {
    margin-top: 91/75rem;
    width: 100%;
    height: 380/75rem;
    background: url("/static/images/1090120.jpg");
    background-size: cover;
    img {
      width: 2rem;
      height: 2rem;
      margin-left: 4rem;
      margin-top: (380/75-2)/2rem;
      border-radius: 50%;
    }
    p {
      color: white;
      text-align: center;
    }
  }

  /*导航*/
  div.nav {
    width: 100%;
    height: 140/75rem;
    background-color: white;
    div {
      width: 10/4rem;
      height: 140/75rem;
      float: left;
      text-align: center;
      p.img {
        height: 54/75rem;
        margin-top: 30/75rem;
        img {
          width: 54/75rem;
          height: 46/75rem;
        }
      }
      p.text {
        height: 56/75rem;
      }
    }
  }

  [data-dpr='1'] div.nav p.text {
    font-size: 17px;
  }

  [data-dpr='2'] div.nav p.text {
    font-size: 28px;
  }

  [data-dpr='3'] div.nav p.text {
    font-size: 50px;
  }

  /*订单状态*/
  div.order {
    margin-top: 16/75rem;
    width: 10rem;
    height: 227/75rem;
    background: white;
    div.title {
      width: 10rem;
      height: 79/75rem;
      line-height: 79/75rem;
      border-bottom: 1px solid #e8e8e8;
      p.p_left {
        width: 10-79/75-20/75rem;
        height: 79/75rem;
        margin-left: 20/75rem;
        float: left;
      }
      p.p_right {
        text-align: center;
        width: 79/75rem;
        height: 79/75rem;
        float: right;
      }
    }
    div.list {
      width: 10rem;
      height: (227-80)/75rem;
      div {
        width: 10/4rem;
        height: (227-80)/75rem;
        float: left;
        text-align: center;
        p.img {
          height: 50/75rem;
          margin-top: 30/75rem;
          img {
            width: 55/75rem;
            height: 50/75rem;
          }
        }
        p.text {
          height: 60/75rem;
        }
      }

    }
  }

  [data-dpr='1'] div.order p {
    font-size: 17px;
  }

  [data-dpr='2'] div.order p {
    font-size: 28px;
  }

  [data-dpr='3'] div.order p {
    font-size: 50px;
  }

  /*设置*/
  div.settings {
    margin-top: 16/75rem;
    width: 100%;
    height: 316/75rem;
    background: white;
    margin-bottom: 97/75rem;
    div.setting {
      width: 100%;
      height: 316/75/4rem;
      line-height: 316/75/4rem;
      border-bottom: 1px solid #e8e8e8;
      span.left {
        margin-left: 0.3rem;
        width: 52/75rem;
        height: 52/75rem;
        margin-top: (316/75/4-52/75)/2rem;
        float: left;
        img {
          width: 52/75rem;
          height: 52/75rem;
        }
      }
      span.center {
        width: 10-52/75*2-0.3-20/75rem;
        height: 316/75/4rem;
        display: block;
        float: left;
        margin-left: 20/75rem;
      }
      span.right {
        width: 52/75rem;
        height: 316/75/4rem;
        display: block;
        float: right;
      }
    }
    div.special {
      border: none;
    }
  }

  [data-dpr='1'] div.settings span {
    font-size: 17px;
  }

  [data-dpr='2'] div.settings span {
    font-size: 27px;
  }

  [data-dpr='3'] div.settings span {
    font-size: 50px;
  }

  div.foot {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 97/75rem;
    background: white;
    div {
      width: 10/4rem;
      height: 97/75rem;
      float: left;

      p.first {
        text-align: center;
      }
      p.second {
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
