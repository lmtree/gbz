<template>
  <div class="all">
    <div class="head" flex-box="0">
      <span class="left" @click="goto_home"> <  </span>
      <span class="center">购物车</span>
      <span class="right">编辑</span>
    </div>
    <div class="name">
      <p class="choose" v-if="cart_data.length !== 0">
        <span v-if="all" @click="removeall" class="choose">√</span>
        <span v-if="!all" @click="addall" class="other"> ●</span>
      </p>
      <span class="left">{{userinfo.nickname}} &nbsp;&nbsp; >  </span>
      <span class="right">领券</span>
    </div>
    <div class="list" v-for="(item,key) in cart_data" flex-box="1">
      <div>
        <p class="choose">
          <span v-if="item.buy" @click="remove(key)" class="choose">√</span>
          <span v-if="!item.buy" @click="add(key)" class="other"> ●</span>
        </p>
        <p class="image"><img :src="item.color.url"></p>
        <p class="text">
          <span class="title">{{item.color.title}}</span>
          <span class="color">颜色：白色</span>
          <span class="price">
          <span class="newprice"> ￥{{item.color.new_money}}</span>
        <span class="oldprice"> ￥{{item.color.old_money}}</span>
        </span>
          <span class="num">
          <button class="left" @click="jian(key)">-</button>
          <span class="number">{{item.num}}</span>
        <button class="right" @click="jia(key)">+</button>
        </span>
        </p>
      </div>
    </div>
    <div class="others" flex-box="0">
      <p>大家还买了</p>
      <div class="introduction" v-for="(item,key) in cart_data">
        <span class="img"><img :src="item.color.url"></span>
        <span class="title">{{item.color.title}}</span>
        <span class="price">
           <span class="newprice"> ￥{{item.color.new_money}}</span>
        <span class="oldprice"> ￥{{item.color.old_money}}</span>
        </span>
        <span class="collect"><img src="/static/images/gouwuche.gif" alt=""></span>
      </div>
    </div>
    <div class="footer" v-for="item in cart_data">
      <div>
        <p class="choose">
          <span v-if="all" @click="removeall" class="choose">√</span>
          <span v-if="!all" @click="addall" class="other"> ●</span>
        </p>
        <span class="text">全选</span>
        <p class="totle " v-if="cart_data.length !== 0">
          <span class="totleprice">总价：<span class="special">￥{{ cart_data | totalpirce }}</span></span>
          <span class="num">共{{ cart_data | totalnum }}件</span>
        </p>
        <button class="submit" :disabled="can_submit" @click="goto_pay">结算</button>
      </div>
    </div>

  </div>
</template>
<script>
  export default{
    data(){
      return {
        cart_data: [],
        totalprice: '',
        can_submit: false,
        all: true
      }
    },
    created() {
      this.cart_data = JSON.parse(window.localStorage.getItem('cart_data'));
      console.log(this.cart_data);
      if (window.localStorage.getItem('userinfo')) {
        this.userinfo = JSON.parse(window.localStorage.getItem('userinfo'));
      } else {
      }
    },
    filters: {
      'totalpirce': function (value) {
        let total = 0;
        for (let i = 0; i < value.length; i++) {
          if (value[i].buy) {
            total += value[i].num * parseInt(value[i].color.new_money);
          }
        }
        return total;
      },
      'totalnum': function (value) {
        let totalnumber = 0;
        for (let i = 0; i < value.length; i++) {
          if (value[i].num) {
            totalnumber += value[i].num;
          }
        }
        return totalnumber;
      }
    },
    methods: {
      goto_pay: function () {
        this.$router.push({name: 'pay'});
      },
      goto_home: function () {
        this.$router.push({name: 'home'});
      },
      jia: function (k) {
        this.cart_data[k].num++;
        window.localStorage.setItem('cart_data', JSON.stringify(this.cart_data));
      },
      jian: function (k) {
        if (this.cart_data[k].num > 1) {
          this.cart_data[k].num--;
        } else if (this.cart_data[k].num === 1) {
          this.cart_data.splice(k, 1);
        }
        window.localStorage.setItem('cart_data', JSON.stringify(this.cart_data));


      },
      remove: function (key) {
        this.cart_data[key].buy = !this.cart_data[key].buy;
        this.all = false;
        for (let i = 0; i < this.cart_data.length; i++) {
          if (this.cart_data[i].buy) {
            this.can_submit = false;

          } else {
            this.can_submit = true;
          }
        }
      },
      add: function (key) {
        this.cart_data[key].buy = !this.cart_data[key].buy;
        this.can_submit = false;
        for (let i = 0; i < this.cart_data.length; i++) {
          if (this.cart_data[i].buy) {
            this.all = true;

          } else {
            this.all = false;
          }
        }
      },
      removeall: function () {
        for (let i = 0; i < this.cart_data.length; i++) {
          this.cart_data[i].buy = false;
        }
        this.all = false;
        this.can_submit = true;
      },
      addall: function () {
        for (let i = 0; i < this.cart_data.length; i++) {
          this.cart_data[i].buy = true;
        }
        this.all = true;
        this.can_submit = false;
      }
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
      width: 10-155/75-88/75rem;
      height: 88/75rem;
      line-height: 88/75rem;
      text-indent: 2rem;
      color: white;
    }
    span.right {
      display: block;
      float: right;
      width: 88/75rem;
      height: 88/75rem;
      line-height: 88/75rem;
      color: white;
    }
  }

  [data-dpr='1'] div.head span {
    font-size: 20px;
  }

  [data-dpr='2'] div.head span {
    font-size: 35px;
  }

  [data-dpr='3'] div.head span {
    font-size: 65px;
  }

  [data-dpr='1'] div.head span.right {
    font-size: 18px;
  }

  [data-dpr='2'] div.head span.right {
    font-size: 23px;
  }

  [data-dpr='3'] div.head span.right {
    font-size: 55px;
  }

  div.name {
    margin-top: 88/75rem;
    background: white;
    width: 10rem;
    height: 84/75rem;
    p.choose {
      margin-left: 20/75rem;
      width: 54/75rem;
      height: 84/75rem;
      float: left;
      span.choose {
        text-align: center;
        line-height: 34/75rem;
        display: block;
        width: 34/75rem;
        margin-top: (84-34)/2/75rem;
        margin-left: (54-34)/2/75rem;
        height: 34/75rem;
        border: 1px solid red;
        border-radius: 34/75/2rem;
        background: red;
        color: white;
      }
      span.other {
        text-align: center;
        line-height: 34/75rem;
        display: block;
        width: 34/75rem;
        margin-top: (84-34)/2/75rem;
        margin-left: (54-34)/2/75rem;
        height: 34/75rem;
        border: 1px solid red;
        border-radius: 34/75/2rem;
        background: red;
        color: white;
      }
    }
    span.left {
      width: 600/75rem;
      height: 84/75rem;
      line-height: 84/75rem;
      display: block;
      float: left;
    }
    span.right {
      width: 70/75rem;
      height: 84/75rem;
      line-height: 84/75rem;
      display: block;
      float: left;
    }
  }

  [data-dpr='1'] div.name {
    font-size: 14px;
  }

  [data-dpr='2'] div.name {
    font-size: 23px;
  }

  [data-dpr='3'] div.name {
    font-size: 50px;
  }

  div.list {
    background: #f5f5f5;
    width: 10rem;
    border-bottom: 1px solid gray;
    div {
      margin: 0 25/75rem;
      height: 220/75rem;
      p.choose {
        width: 54/75rem;
        height: 220/75rem;
        float: left;
        span.choose {
          text-align: center;
          line-height: 34/75rem;
          display: block;
          width: 34/75rem;
          margin-top: (220-34)/2/75rem;
          margin-left: (54-34)/2/75rem;
          height: 34/75rem;
          border: 1px solid red;
          border-radius: 34/75/2rem;
          background: red;
          color: white;
        }
        span.other {
          text-align: center;
          line-height: 34/75rem;
          display: block;
          width: 34/75rem;
          margin-top: (220-34)/2/75rem;
          margin-left: (54-34)/2/75rem;
          height: 34/75rem;
          border: 1px solid red;
          border-radius: 34/75/2rem;
          background: red;
          color: white;
        }
      }
      p.image {
        width: 190/75rem;
        height: 170/75rem;
        float: left;
        margin-top: (220-170)/75/2rem;
        img {
          width: 190/75rem;
          height: 170/75rem;

        }
      }
      p.text {
        width: (750-40-54-200)/75rem;
        height: 170/75rem;
        float: right;
        margin-top: (220-170)/75/2rem;

        span.title {
          width: (750-40-54-200)/75-20/75rem;
          margin-left: 20/75rem;
          height: 80/75rem;
          display: block;
        }
        span.color {
          width: (750-40-54-200)/75-20/75rem;
          margin-left: 20/75rem;
          height: 45/75rem;
          line-height: 45/75rem;
          display: block;
          color: gray;
        }
        span.price {
          margin-left: 20/75rem;
          width: 294/75-20/75rem;
          height: 45/75rem;
          display: block;
          float: left;
          span.newprice {
            color: #ff0000;
          }
          span.oldprice {
            margin-left: 10/75rem;
            color: #999999;
            text-decoration: line-through;
          }
        }
        span.num {
          float: left;
          width: 158/75rem;
          height: 40/75rem;
          display: block;
          text-align: center;
          button.left {
            float: left;
            width: 34/75rem;
            height: 34/75rem;
            background: #f5f5f5;
            border-color: #e8e8e8;
            color: gray;
          }
          button.right {
            float: right;
            width: 34/75rem;
            height: 34/75rem;
            background: #f5f5f5;
            border-color: #e8e8e8;
            color: gray;
          }
          span.number {
            margin-left: (158/75-78/75-34/75*2)/2rem;
            display: block;
            float: left;
            width: 78/75rem;
            height: 38/75rem;
            border: 1px solid gray;
          }
        }
      }
    }
  }

  [data-dpr='1'] div.list p.choose span.choose {
    font-size: 18px;
  }

  [data-dpr='2'] div.list p.choose span.choose {
    font-size: 25px;
  }

  [data-dpr='3'] div.list p.choose span.choose {
    font-size: 65px;
  }

  [data-dpr='1'] div.list span {
    font-size: 13px;
  }

  [data-dpr='2'] div.list span {
    font-size: 24px;
  }

  [data-dpr='3'] div.list span {
    font-size: 45px;
  }

  [data-dpr='1'] div.list span.price span.newprice {
    font-size: 13px;
  }

  [data-dpr='2'] div.list span.price span.newprice {
    font-size: 23px;
  }

  [data-dpr='3'] div.list span.price span.newprice {
    font-size: 50px;
  }

  [data-dpr='1'] div.list span.price span.oldprice {
    font-size: 10px;
  }

  [data-dpr='2'] div.list span.price span.oldprice {
    font-size: 20px;
  }

  [data-dpr='3'] div.list span.price span.oldprice {
    font-size: 40px;
  }

  div.others {
    width: 10rem;
    margin-top: 66/75rem;
    height: 800/75rem;
    margin-bottom: 120/75rem;;
    p {
      margin: 0 20/75rem;
      color: red;
    }
    div.introduction {
      width: (10-60/75)/2rem;
      height: 360/75rem;
      float: left;
      margin: 20/75rem 0 0 20/75rem;
      background: #faf9f9;
      span.img {
        width: (10-60/75)/2rem;
        height: 200/75rem;
        img {
          width: (10-60/75)/2rem;
          height: 200/75rem;
        }
      }
      span.title {
        width: (10-60/75)/2rem;
        height: 114/75rem;
        display: block;
      }
      span.price {
        width: (10-60/75)/2-36/75rem;
        height: 40/75rem;
        display: block;
        float: left;
        span.newprice {
          width: ((10-60/75)/2-36/75)/2rem;
          height: 40/75rem;
          display: block;
          float: left;
          line-height: 40/75rem;
          color: #ff0000;
        }
        span.oldprice {
          width: ((10-60/75)/2-36/75)/2rem;
          height: 40/75rem;
          display: block;
          float: left;
          line-height: 40/75rem;
          color: #999999;
          text-decoration: line-through;
        }
      }
      span.collect {
        float: right;
        width: 36/75rem;
        height: 40/75rem;
        img {
          width: 36/75rem;
          height: 36/75rem;
        }
      }
    }

  }

  [data-dpr='1'] div.others span.price span.oldprice {
    font-size: 10px;
  }

  [data-dpr='2'] div.others span.price span.oldprice {
    font-size: 23px;
  }

  [data-dpr='3'] div.others span.price span.oldprice {
    font-size: 35px;
  }

  [data-dpr='1'] div.others span {
    font-size: 13px;
  }

  [data-dpr='2'] div.others span {
    font-size: 22px;
  }

  [data-dpr='3'] div.others span {
    font-size: 45px;
  }

  [data-dpr='1'] div.others p {
    font-size: 18px;
  }

  [data-dpr='2'] div.others p {
    font-size: 30px;
  }

  [data-dpr='3'] div.others p {
    font-size: 65px;
  }

  div.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 10rem;
    height: 94/75rem;
    z-index: 9999;
    background: white;
    div {
      width: 10rem;
      height: 94/75rem;
      p.choose {
        width: 54/75rem;
        height: 94/75rem;
        float: left;
        margin-left: 26/75rem;
        span.choose {
          text-align: center;
          line-height: 34/75rem;
          display: block;
          width: 34/75rem;
          margin-top: (94-34)/2/75rem;
          margin-left: (54-34)/2/75rem;
          height: 34/75rem;
          border: 1px solid #ff2400;
          border-radius: 34/75/2rem;
          background: #ff2400;
          color: white;
        }
        span.other {
          text-align: center;
          line-height: 34/75rem;
          display: block;
          width: 34/75rem;
          margin-top: (94-34)/2/75rem;
          margin-left: (54-34)/2/75rem;
          height: 34/75rem;
          border: 1px solid #ff2400;
          border-radius: 34/75/2rem;
          background: #ff2400;
          color: white;
        }
      }
      span.text {
        width: (750-54-300-250-26)/75rem;
        height: 94/75rem;
        float: left;
        display: block;
        line-height: 94/75rem;
      }
      p.totle {
        float: left;
        height: 94/75rem;
        width: 300/75rem;
        span.totleprice {
          height: 94/75/2rem;
          width: 300/75rem;
          display: block;
          span.special {
            color: #ff2400;
          }
        }
        span.num {
          color: gray;
          height: 94/75/2rem;
          width: 300/75rem;
          display: block;
        }
      }
      button.submit {
        height: 94/75rem;
        width: 250/75rem;
        float: right;
        line-height: 94/75rem;
        text-align: center;
        background: #ff2400;
        color: white;
      }
    }
  }

  [data-dpr='1'] div.footer div span.text {
    font-size: 19px;
  }

  [data-dpr='2'] div.footer div span.text {
    font-size: 30px;
  }

  [data-dpr='3'] div.footer div span.text {
    font-size: 55px;
  }

  [data-dpr='1'] div.footer div button.submit {
    font-size: 19px;
  }

  [data-dpr='2'] div.footer div button.submit {
    font-size: 35px;
  }

  [data-dpr='3'] div.footer div button.submit {
    font-size: 65px;
  }

  [data-dpr='1'] div.footer div span.special {
    font-size: 17px;
  }

  [data-dpr='2'] div.footer div span.special {
    font-size: 32px;
  }

  [data-dpr='3'] div.footer div span.special {
    font-size: 55px;
  }
</style>
