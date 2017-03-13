<template>
  <div class="all">
    <!--头部-->
    <div class="head" flex-box="0">
      <span class="left" @click="goto_home"> <  </span>
      <span class="center">商品详情</span>
      <span class="right">
        <img src="/static/images/tou.gif" alt="">
      </span>
    </div>
    <div class="slide" flex-box="0">
      <p class="one">
        <img :src="color.url" alt="">
      </p>
      <p class="two">
        <span class="title">{{color.title}}</span>
        <span class="newnum">￥{{color.new_money}}&nbsp;&nbsp;</span>
        <span class="oldnum">￥{{color.old_money}}</span>
        <span class="score">{{color.integral}}</span>
      </p>
      <p class="three">
        <span class="post">{{color.Courier}}</span>
        <span class="sales">{{color.sales}}</span>
        <span class="collect">{{color.collection}}</span>
      </p>
    </div>
    <div class="list" flex-box="1">
      <div class="text">
        <span class="left active">图文详情</span>
        <span class="right">{{color.commonts}}</span>
        <div>
          <p class=" first">
            <span class="span1">流行款式名称：{{color.style_name}}</span>
            <span class="span2">款式：{{color.style}}</span>
          </p>
          <p>
            <span class="span1">背包方式：{{color.Backpack_way}}</span>
            <span class="span2">质地：{{color.grain}}</span>
          </p>
          <p>
            <span class="span1">材艺工质：{{color.Material_process}}</span>
            <span class="span2">颜色分类：{{color.all_color}}</span>
          </p>
          <p>
            <span class="span1">成色：{{color.The_colour}}</span>
            <span class="span2"> 品牌：{{color.brand}}</span>
          </p>
        </div>
      </div>

      <span class="images" v-for="item in img">
   <img :src="item.url" alt="">
</span>

    </div>

    <div class="footer">
        <span class="addcart" @click="addcart">
          加入购物车
        </span>
      <span class="buy">
          立即购买
        </span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {API_DETAILS} from '../config/api'
  import {MessageBox} from 'mint-ui';
  //
  export default{
    data(){
      return {
        img: [],
        color: {},
        detail_data: {}
      }
    },
    created() {
      this.initdata();
    },
    methods: {
      initdata: function () {
        const _this = this;
        axios.get(`${API_DETAILS}/${this.$route.params.id}`) //
          .then(function (response) {
            _this.detail_data = response.data;
            _this.color = response.data.color;
            _this.img = response.data.img;
            console.log(_this.detail_data);
          })
          .catch(function (error) {
            MessageBox.alert('无此商品').then(action => {
              _this.$router.push({name: 'index'})
            });
          });
      },
      addcart: function () {
        //放入购物车的数组
        let cart_data = [];
//         localStorage.setItem('cart_data', JSON.stringify(cart_data));
//         return;
        //购物车数据
        let old_cartdata = JSON.parse(localStorage.getItem('cart_data'));

        if (!old_cartdata || old_cartdata.length == 0) {//购物车没有东西
          this.detail_data.buy = true;
          cart_data.push(this.detail_data);
          localStorage.setItem('cart_data', JSON.stringify(cart_data));
        } else { //购物车有东西
          let has_product;
          for (let i = 0; i < old_cartdata.length; i++) {
            if (old_cartdata[i].id === this.detail_data.id) {
              has_product = true;
              //数量+1
              old_cartdata[i].num++;
              localStorage.setItem('cart_data', JSON.stringify(old_cartdata));
              break;
            } else {
              has_product = false;
//              console.log('购物车没有准备添加的东西');
//              old_cartdata.push(this.detail_data);
//              localStorage.setItem('cart_data', JSON.stringify(old_cartdata));
//              break;
            }
          }
          //购物车没有准备添加的东西
          if (!has_product) {
            this.detail_data.buy = true;
            old_cartdata.push(this.detail_data);
            localStorage.setItem('cart_data', JSON.stringify(old_cartdata));
          }
        }
        MessageBox.alert('添加成功').then(action => {
          this.$router.push({name: 'cart'})
        }).catch(function () {

        });
      },
      goto_home: function () {
        this.$router.push({name: 'home'})
      }
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  div.all {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 10rem;
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
      img {
        width: 88/75rem;
        height: 88/75rem;
      }
    }
  }

  [data-dpr='1'] div.head span {
    font-size: 18px;
  }

  [data-dpr='2'] div.head span {
    font-size: 35px;
  }

  [data-dpr='3'] div.head span {
    font-size: 55px;
  }

  div.slide {
    margin-top: 88/75rem;
    background: white;
    width: 10rem;
    height: 520/75rem;
    p.one {
      width: 10rem;
      height: 300/75rem;
      text-align: center;
      img {
        width: 10rem;
        height: 300/75rem;
      }
    }
    p.two {
      width: 10-40/75rem;
      height: 150/75rem;
      margin: 0 20/75rem;
      span.title {
        margin-top: 10/75rem;
        display: block;
        height: 90/75rem;
      }
      span.newnum {
        height: 50/75rem;
        width: 150/75rem;
        color: #ff0000;
      }
      span.oldnum {
        height: 50/75rem;
        width: 150/75rem;
        color: #999999;
        text-decoration: line-through;
      }
      span.score {
        float: right;
        color: #999999;
      }
    }
    p.three {

      width: 10-40/75rem;
      height: 50/75rem;
      margin: 0 20/75rem;
      color: #999999;
      span.post {
        text-align: left;
        display: block;
        height: 50/75rem;
        width: (10-40/75)/3rem;
        float: left;
      }
      span.sales {
        text-align: center;
        display: block;
        height: 50/75rem;
        width: (10-40/75)/3rem;
        float: left;
      }
      span.collect {
        text-align: right;
        float: left;
        display: block;
        width: (10-40/75)/3rem;

      }
    }
  }

  [data-dpr='1'] div.slide p.two {
    font-size: 18px;
  }

  [data-dpr='2'] div.slide p.two {
    font-size: 30px;
  }

  [data-dpr='3'] div.slide p.two {
    font-size: 60px;
  }

  [data-dpr='1'] div.slide p.two span.oldnum {
    font-size: 15px;
  }

  [data-dpr='2'] div.slide p.two span.oldnum {
    font-size: 25px;
  }

  [data-dpr='3'] div.slide p.two span.oldnum {
    font-size: 50px;
  }

  [data-dpr='1'] div.slide p.two span.title {
    font-size: 18px;
  }

  [data-dpr='2'] div.slide p.two span.title {
    font-size: 28px;
  }

  [data-dpr='3'] div.slide p.two span.title {
    font-size: 60px;
  }

  [data-dpr='1'] div.slide p.three {
    font-size: 13px;
  }

  [data-dpr='2'] div.slide p.three {
    font-size: 22px;
  }

  [data-dpr='3'] div.slide p.three {
    font-size: 40px;
  }

  div.list {
    margin-top: 20/75rem;
    width: 10rem;
    background: white;
    div.text {
      width: 10rem;
      height: 416/75rem;
      float: left;
      span.left {
        text-align: center;
        float: left;
        display: block;
        width: 190/75rem;
        height: 66/75rem;
        line-height: 66/75rem;

      }
      span.active {
        border-top: 2px solid #ff8a26;
      }

      span.right {
        background: #f4f4f4;
        text-indent: 20/75rem;
        float: left;
        display: block;
        line-height: 66/75rem;
        width: 10-190/75rem;
        height: 66/75rem;

      }
      div {
        width: 10-40/75rem;
        height: 300/75rem;
        margin: 0 20/75rem;
        border-bottom: 1px solid gray;
        p.first {
          margin: 80/75rem 20/75rem 0;
          width: 10-40/75rem;
          height: 300/4/75rem;
        }
        p {
          margin: 0 20/75rem;
          width: 10-40/75rem;
          height: 300/4/75rem;
          span.span1 {
            width: 4.2rem;
            height: 300/4/75rem;
            display: block;
            float: left;
          }
          span.span2 {
            width: 5rem;
            height: 300/4/75rem;
            display: block;
            float: left;
          }
        }
      }

    }
    span.images {
      width: 10-(750-666)/2/75rem;
      margin: 0 (750-666)/2/75rem;
      img {
        width: 666/75rem;
        height: 666/75rem;
        margin-bottom: 90/75rem;
      }
    }
  }

  [data-dpr='1'] div.list {
    font-size: 13px;
  }

  [data-dpr='2'] div.list  {
    font-size: 22px;
  }

  [data-dpr='3'] div.list  {
    font-size: 45px;
  }

  div.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 10rem;
    height: 94/75rem;
    z-index: 9999;
    span.addcart {
      width: 444/75rem;
      height: 94/75rem;
      display: block;
      float: left;
      background: #ff8a26;
      text-align: center;
      line-height: 94/75rem;
      color: #fff;
    }
    span.buy {
      width: (750-444)/75rem;
      height: 94/75rem;
      display: block;
      float: left;
      background: #ff2400;
      text-align: center;
      line-height: 94/75rem;
      color: #fff;
    }
  }

  [data-dpr='1'] div.footer {
    font-size: 18px;
  }

  [data-dpr='2'] div.footer  {
    font-size: 32px;
  }

  [data-dpr='3'] div.footer  {
    font-size: 55px;
  }
</style>
