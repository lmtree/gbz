<template>
  <div class="all">
    <div class="head" flex-box="0">
      <span class="left"> <  </span>
      <span class="center">交易成功</span>
    </div>
    <div class="place" flex-box="0">
   <div>
  <span class="left">收件人：小清新</span>
  <span class="right" >13218893680</span>
     <span class="other">江苏省南京市江宁区龙眠大道180号江苏经贸职业技术学院</span>
</div>
    </div>
    <div class="username" flex-box="0">
      <img src="/static/images/pay/home.gif" alt="">
      <span class="name">{{userinfo.nickname}} </span>
    </div>
    <template v-if="cart_data.length !== 0">
    <div class="list" flex-box="1" v-for="(item,key) in cart_data">
      <div v-if="item.buy">
        <span class="image"><img :src="item.color.url" alt=""></span>
        <span class="title">{{item.color.title}}</span>
        <span class="price">￥{{item.color.new_money}}</span>
        <span class="color">颜色：白色</span>
        <span class="number">
        <span>x{{item.num}}</span></span>
      </div>
    </div>
  </template>
    <template v-for="(item,key) in cart_data">
    <div class="information" flex-box="0">
      <div>
      <span class="money">金额:￥{{item.color.new_money * item.num}}</span>
        <span class="order">订单号：1111111111111111111</span>
        <span class="date">交易时间：2017年1月17日  21:55:29</span>
        <span class="special">取消订单</span>
        <span class="special check">查看物流</span>
      </div>
    </div>
    </template>

  </div>
</template>
<style>
  body{
    background-color:#ff0000;
  }
</style>
<script>

  export default{
    data(){
      return{
        userinfo: {},
        cart_data: [],
        totalpirce: this.$route.params.money
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
      this.cart_data = JSON.parse(window.localStorage.getItem('cart_data'));
    },
  }
</script>
<style scoped rel="stylesheet/less" lang="less">

  div.all {
    height: 100%;
    background: #e8e8e8;
  }

  div.head {
    position: fixed;
    top: 0;
    width: 100%;
    height: 88/75rem;
    background-color: #ff8a26;
    z-index: 9999;
    span.left {
      display: block;
      float: left;
      width: 155/75rem;
      height: 88/75rem;
      line-height: 88/75rem;
      text-align: center;
      color: white;
    }
    span.center {
      display: block;
      float: left;
      width: 10-155/75rem;
      height: 88/75rem;
      line-height: 88/75rem;
      text-indent: 2rem;
      color: white;
    }
  }

  [data-dpr='1'] div.head span {
    font-size: 18px;
  }

  [data-dpr='2'] div.head span {
    font-size: 37px;
  }

  [data-dpr='3'] div.head span {
    font-size: 65px;
  }

  div.place {
    margin-top: 88/75rem;
    width: 10rem;
    height: 220/75rem;
    background: white;
    div{
      width: 9rem;
      height: 220/75rem;
      margin: 0 0.5rem 0 0.5rem;
      span.left {
        margin-top: 40/75rem;
        width: 4.5rem;
        height: 60/75rem;
        line-height: 60/75rem;
        display: block;
        float: left;
      }
      span.right {
        margin-top: 40/75rem;
        width: 4.5rem;
        line-height: 60/75rem;
        height: 60/75rem;
        display: block;
        float: left;
        text-indent: 115/75rem;
      }
      span.other {
        margin-bottom: 20/75rem;
        width: 9rem;
        height: 90/75rem;
        display: block;
        float: left;
      }
    }


  }

  [data-dpr='1'] div.place span {
    font-size: 14px;
  }

  [data-dpr='2'] div.place span {
    font-size: 30px;
  }

  [data-dpr='3'] div.place span {
    font-size: 45px;
  }
  [data-dpr='1'] div.place span.other {
    font-size: 14px;
  }

  [data-dpr='2'] div.place span.other {
    font-size: 25px;
  }

  [data-dpr='3'] div.place span.other {
    font-size:45px;
  }

  div.username {
    height: 82/75rem;
    width: 10rem;
    margin-top: 20/75rem;
    background: white;
    img {
      margin-left: 20/75rem;
      width: 43/75rem;
      height: 37/75rem;
      margin-top: (82-37)/75/2rem;
      float: left;
    }
    span.name {
      margin-left: 20/75rem;
      height: 82/75rem;
      line-height: 82/75rem;
      display: block;
      float: left;
      width: 10-43/75-40/75rem;
    }
  }

  [data-dpr='1'] div.username span {
    font-size: 18px;
  }

  [data-dpr='2'] div.username span {
    font-size: 30px;
  }

  [data-dpr='3'] div.username span {
    font-size: 55px;
  }

  div.list {
    width: 10rem;
    height: 200/75rem;
    background: #f0f0f0;
    border-bottom: 1px solid #999999;
    div {
      width: 10-40/75rem;
      margin: 0 20/75rem;
      height: 200/75rem;
      span.image {
        width: 170/75rem;
        height: 200/75rem;
        display: block;
        float: left;
        img {
          margin-top: (200-150)/75/2rem;
          width: 170/75rem;
          height: 150/75rem;
        }
      }
      span.title {
        margin-left: 20/75rem;
        display: block;
        margin-top: (200-150)/75/2rem;
        width: 10-40/75-170/75-20/75rem;
        height: 100/75rem;
        float: left;
      }
      span.price {
        font-weight: bold;
        display: block;
        width: (10-40/75-170/75-20/75)/3rem;
        height: (150-100)/75rem;
        line-height: (150-100)/75rem;
        float: left;
        margin-left: 20/75rem;
        color: red;
      }
      span.color {
        color: #666666;
        display: block;
        width: (10-40/75-170/75-20/75)/3rem;
        height: (150-100)/75rem;
        line-height: (150-100)/75rem;
        float: left;
      }
      span.number {
        display: block;
        width: (10-40/75-170/75-20/75)/3rem;
        height: (150-100)/75rem;
        line-height: (150-100)/75rem;
        float: left;
        span {
          float: right;
        }
      }
    }

  }

  [data-dpr='1'] div.list div span {
    font-size: 14px;
  }

  [data-dpr='2'] div.list div span {
    font-size: 27px;
  }

  [data-dpr='3'] div.list div span {
    font-size: 45px;
  }
  div.information{
    width: 10rem;
    height: 715/75rem;
    background: white;
    position: absolute;
    div{
      position: relative;
      width: 9rem;
      height: 615/75rem;
      margin: 50/75rem 0.5rem;
      span.money{
         width: 9rem;
        height: 1rem;
       line-height: 1rem;
        display: block;
        color: #666666;
      }
      span.order{
        width: 9rem;
        height: 1rem;
        line-height: 1rem;
        display: block;
        color: #666666;
      }
      span.date{
        width: 9rem;
        height: 1rem;
        line-height: 1rem;
        display: block;
        color: #666666;

      }
      span.special{
        width: 3.4rem;
        text-align: center;
        height: 1rem;
        line-height: 1rem;
        display: block;
        margin: 0.5rem 0.5rem;
        float: left;
        border: 1px solid #ff8a26;
        border-radius: 10/75rem;
        color: #ff8a26;
      }
      span.check{
        color: white;
        background: #ff8a26 ;
      }
    }
  }
  [data-dpr='1'] div.information span {
    font-size: 14px;
  }

  [data-dpr='2'] div.information span {
    font-size: 25px;
  }

  [data-dpr='3'] div.information span {
    font-size: 50px;
  }
  </style>
