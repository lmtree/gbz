<template>
  <div class="all">
    <div class="head" flex-box="0">
      <span class="left"> <  </span>
      <span class="center">确认订单</span>
    </div>
    <div class="place" flex-box="0">
      <span class="left"><img src="/static/images/pay/place.gif" alt=""></span>
      <span class="center" v-if="userinfo.address" @click="selectcity">
         收货地址: {{userinfo.address}}
       </span>
      <span class="center" @click="selectcity" v-if="!userinfo.address">
         请选择收货地址
       </span>
      <span class="right"> > </span>
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
    <div class="others" flex-box="0" @click="changepost">
      <div>
        <span class="left">配送方式</span>
        <span class="right"><span>{{postmethod}}</span></span>
      </div>
    </div>
    <div class="others" flex-box="0">
      <div>
        <span class="left">可使用积分抵</span>
        <span class="right"><span>￥12.00</span></span>
      </div>
    </div>
    <div class="others" flex-box="0">
      <div>
        <span class="left">优惠券</span>
        <span class="right"><span>使用优惠券&nbsp;&nbsp; ></span></span>
      </div>
    </div>
    <div class="pay" flex-box="0">
      <span class="title">支付方式</span>
      <div>
     <p> <input type="radio" name="pay"><img src="/static/images/pay/zhi.gif" alt=""><span>支付宝支付</span></p>
      <p> <input type="radio" name="pay"><img src="/static/images/pay/wei.gif" alt=""><span>微信支付</span></p>
      <p> <input type="radio" name="pay"><img src="/static/images/pay/yin.gif" alt=""><span>银行卡支付</span></p>
    </div>
    </div>
    <div class="footer" flex-box="0">
      <p class="totalprice" v-for="(item,key) in cart_data">
        <span class="text">合计：</span>
        <span class="price">￥{{ totalpirce }}</span>
        <span class="submit" @click="$router.push({name: 'paydone', params: { money: totalpirce}})" >立即支付</span></p>

    </div>
<mt-actionsheet
  :actions="actions"
  v-model="sheetVisible">
</mt-actionsheet>
<mt-actionsheet
  :actions="actions1"
  v-model="sheetVisible1">
</mt-actionsheet>
</div>
</template>
<script>
  import {MessageBox, Actionsheet} from 'mint-ui';
  export default{
    data(){
      return {
        userinfo: {},
        postmethod: '',
        totalpirce: '',
        cart_data: [],
        sheetVisible: false,
        sheetVisible1: false,
        actions: [
          {
            name: '快速免邮',
            method: this.ccc
          },
          {
            name: '货到付款',
            method: this.aaa
          },
          {
            name: '邮政EMS',
            method: this.bbb
          }
        ],
        actions1: [
          {
            name: '南京',
            method: this.nanjing
          },
          {
            name: '苏州',
            method: this.suzhou
          },

          {
            name: '扬州',
            method: this.yangzhou
          },
          {
            name: 'wu',
            method: this.none
          },
        ]
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
      if (this.cart_data.length == 0) {
        MessageBox.alert('购物车未添加商品').then(action => {
          this.$router.push({name: 'index'})
        });
      }
      ;
      this.postmethod = this.actions[0].name;
      //
      let total = 0;
      for (let i = 0; i < this.cart_data.length; i++) {
        if (this.cart_data[i].buy) {
          total += this.cart_data[i].num * parseInt(this.cart_data[i].color.new_money);
        }
      }
      this.totalpirce = total;
    },
    methods: {
      selectcity: function () {
        this.sheetVisible1 = true;
      },
      changepost: function () {
        this.sheetVisible = true;
      },
      aaa: function () {
        this.postmethod = this.actions[1].name;
        //
        let total = 0;
        for (let i = 0; i < this.cart_data.length; i++) {
          if (this.cart_data[i].buy) {
            total += this.cart_data[i].num * parseInt(this.cart_data[i].color.new_money);
          }
        }
        this.totalpirce = total + 1;
      },
      bbb: function () {
        this.postmethod = this.actions[2].name;
        //
        let total = 0;
        for (let i = 0; i < this.cart_data.length; i++) {
          if (this.cart_data[i].buy) {
            total += this.cart_data[i].num * parseInt(this.cart_data[i].color.new_money);
          }
        }
        this.totalpirce = total + 2;
      },
      ccc: function () {
        this.postmethod = this.actions[0].name;
        //
        let total = 0;
        for (let i = 0; i < this.cart_data.length; i++) {
          if (this.cart_data[i].buy) {
            total += this.cart_data[i].num * parseInt(this.cart_data[i].color.new_money);
          }
        }
        this.totalpirce = total;
      },
      nanjing: function () {
        this.userinfo.address = this.actions1[0].name;
        window.localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
      },
      none: function () {
        this.userinfo.address = this.actions1[3].name;
        window.localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
      },
      suzhou: function () {
        this.userinfo.address = this.actions1[1].name;
        window.localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
      },
      yangzhou: function () {
        this.userinfo.address = this.actions1[2].name;
        window.localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
      },
    }
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
    font-size: 55px;
  }

  div.place {
    margin-top: 88/75rem;
    width: 10rem;
    height: 220/75rem;
    background: white;
    span.left {
      width: 107/75rem;
      height: 220/75rem;
      display: block;
      float: left;
      text-align: center;
      img {
        margin-top: (220-62)/75/2rem;
        width: 62/75rem;
        height: 62/75rem;
      }

    }
    span.center {
      width: 600/75rem;
      height: 220/75rem;
      display: block;
      float: left;
      line-height: 220/75rem;
      color: #999999;
      text-indent: 30/75rem;
    }
    span.right {
      width: (750-600-107)/75rem;
      height: 220/75rem;
      line-height: 220/75rem;
      display: block;
      float: left;
      color: #999999;
    }
  }

  [data-dpr='1'] div.place span {
    font-size: 18px;
  }

  [data-dpr='2'] div.place span {
    font-size: 30px;
  }

  [data-dpr='3'] div.place span {
    font-size: 55px;
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

  div.others {
    width: 10rem;
    height: 244/75/3rem;
    background: white;
    border-bottom: 1px solid #999999;
    div {
      margin: 0 20/75rem;
      width: 10-40/75rem;
      height: 244/75/3rem;

      span.left {
        width: (10-40/75)/2rem;
        height: 244/75/3rem;
        display: block;
        float: left;
        line-height: 244/75/3rem;
      }
      span.right {
        width: (10-40/75)/2rem;
        height: 244/75/3rem;
        line-height: 244/75/3rem;
        display: block;
        float: right;
        span {
          float: right;
          color: #999999;
        }
      }
    }
  }

  [data-dpr='1'] div.others div span {
    font-size: 14px;
  }

  [data-dpr='2'] div.others div span {
    font-size: 26px;
  }

  [data-dpr='3'] div.others div span {
    font-size: 45px;
  }
  div.pay{
    margin-bottom: 120/75rem;
    width: 10rem;
    margin-top: 20/75rem;
    height: 318/75rem;
    background: white;
    span.title{
      width: 10rem;
      height: 80/75rem;
      line-height:80/75rem ;
      text-indent: 20/75rem;
    }
    div{
      width: 10-80/75rem;
      height: (318-80)/75rem;
      line-height:(318-80)/75rem ;
      margin: 0 40/75rem;
      p{
        width: 10-80/75rem;
        height: (318-80)/75/3rem;
        line-height:(318-80)/75/3rem ;
        input{
          margin-top:((318-80)/75/3-40/75)/2rem ;
          width: 40/75rem;
          height: 40/75rem;
        }
        img{
          margin-top:((318-80)/75/3-41/75)/2rem ;
          margin-left: 20/75rem;
          width:41/75rem ;
          height: 41/75rem;
        }
        span{
          width: 10-80/75-40/75-41/75-40/75rem;
          height: (318-80)/75/3rem;
          line-height:(318-80)/75/3rem ;
         margin-left: 20/75rem;
          display: block;
          float: right;
        }

      }
    }
  }
  [data-dpr='1'] div.pay div span {
    font-size: 13px;
  }

  [data-dpr='2'] div.pay div span {
    font-size: 26px;
  }

  [data-dpr='3'] div.pay div span {
    font-size: 40px;
  }
  div.footer{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
    width: 10rem;
    height: 100/75rem;
    background: white;
    p.totalprice{
      width:10rem;
      height: 100/75rem;
      line-height: 100/75rem;
      span.text{
        width:188/75rem;
        height: 100/75rem;
        display: block;
        float: left;
text-indent:78/75rem ;
      }
      span.price{
        width:258/75rem;
        height: 100/75rem;
         color: #ff2400;
       display: block;
        float: left;
      }
    span.submit{
           width: 10-258/75-188/75rem;
           height: 100/75rem;
         display: block;
        float: left;
      background: #ff2400;
      color: white;
      line-height:  100/75rem;
      text-align: center;
    }
  }}
  [data-dpr='1'] div.footer  p span {
    font-size: 13px;
  }

  [data-dpr='2'] div.footer  p span{
    font-size:30px;
  }

  [data-dpr='3'] div.footer  p span {
    font-size: 45px;
  }
  [data-dpr='1'] div.footer  p span.price{
    font-size: 18px;
  }

  [data-dpr='2'] div.footer  p span.price{
    font-size:37px;
  }

  [data-dpr='3'] div.footer  p span.price{
    font-size: 55px;
  }
  [data-dpr='1'] div.footer  p span.submit{
    font-size: 18px;
  }

  [data-dpr='2'] div.footer  p span.submit{
    font-size:37px;
  }

  [data-dpr='3'] div.footer  p span.submit{
    font-size: 55px;
  }
</style>
