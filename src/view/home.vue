<template>
  <div class="all">
    <!--头部-->
    <div class="head">
      <span class="left" @click="span_change_city_select">
        {{city}}
      </span>
      <ul v-show="city_select">
        <template v-for="item in city_data">
          <li @click="li_change_city_select(item)">{{item}}</li>
        </template>
      </ul>
      <div class="middle">
        <div class="search">
          <p class="text">
            <input type="text" placeholder="请输入您感兴趣的商品">
          </p>
          <p class="img">
            <img src="/static/images/search.gif" alt="">
          </p>
        </div>
      </div>
      <span class="right">
        <img src="/static/images/tou.gif" alt="">
      </span>
    </div>
    <!--幻灯-->
    <div class="slide">
      <swiper :options="swiperOption" class="swiper-box">
        <template v-for="item in slide_data">
          <swiper-slide class="swiper-item"><img :src="item.url" alt=""></swiper-slide>
        </template>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!--导航-->
    <div class="nav" flex="box:mean">
      <div>
        <p class="img">
          <img src="/static/images/qian.gif" alt="">
        </p>
        <p class="text">签到</p>
      </div>
      <div>
        <p class="img">
          <img src="/static/images/you.gif" alt="">
        </p>
        <p class="text">优惠券</p>
      </div>
      <div>
        <p class="img">
          <img src="/static/images/zixun.gif" alt="">
        </p>
        <p class="text">资讯</p>
      </div>
      <div>
        <p class="img">
          <img src="/static/images/fenlei.gif" alt="">
        </p>
        <p class="text">分类</p>
      </div>
    </div>
    <!--商品-->
    <div class="shopping">
      <div class="top">
        <p class="p1"></p>
        <p class="p2">
          <span class="left">NEW&nbsp;STYLE&nbsp;</span>
          <span class="right">每周上新</span>
        </p>
        <p class="p1"></p>
      </div>
      <div v-for="item in week_main_data">
        <template v-if="item.top">
          <div @click="goto_detail(item.id)">
            <p class="one">
              <img :src="item.url" alt="">
            </p>
            <p class="two">{{item.title}}</p>
            <p class="three">
              <span class="newnum">￥{{item.new_price}}&nbsp;</span>
              <span class="oldnum">￥{{item.old_price}}</span>
            </p>
          </div>
        </template>
      </div>
      <div class="next">
        <template v-for="item in week_main_data">
          <div class="left" v-if="!item.top" @click="goto_detail(item.id)">
            <p class="one">
              <img :src="item.url" alt="">
            </p>
            <p class="two">{{item.title}}</p>
            <p class="three">
              <span class="newnum">￥{{item.new_price}}&nbsp;</span>
              <span class="oldnum">￥{{item.old_price}}</span>
            </p>

          </div>
        </template>
      </div>
      <p class="four">查看更多>></p>
    </div>
    <div class="shopping">
      <div class="top">
        <p class="p1"></p>
        <p class="p2">
          <span class="left">HOT&nbsp;SALE&nbsp;</span>
          <span class="right">热卖推荐</span>
        </p>
        <p class="p1"></p>
      </div>
      <div v-for="item in new_main_data">
        <template v-if="item.top">
          <div @click="goto_detail(item.id)">
            <p class="one">
              <img :src="item.url" alt="">
            </p>
            <p class="two">{{item.title}}</p>
            <p class="three">
              <span class="newnum">￥{{item.new_price}}&nbsp;</span>
              <span class="oldnum">￥{{item.old_price}}</span>
            </p>
          </div>
        </template>
      </div>

      <div class="next">
        <template v-for="item in new_main_data">
          <div class="left" v-if="!item.top" @click="goto_detail(item.id)">
            <p class="one">
              <img :src="item.url" alt="">
            </p>
            <p class="two">{{item.title}}</p>
            <p class="three">
              <span class="newnum">￥{{item.new_price}}&nbsp;</span>
              <span class="oldnum">￥{{item.old_price}}</span>
            </p>

          </div>
        </template>
      </div>
      <p class="four">查看更多>></p>
    </div>
    <!--查看更多-->
    <div class="check">
      <p> 查看更多宝贝>> </p>
    </div>
    <!--底部-->
    <div class="foot" flex="box:mean">
      <div class="active">
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
        <p class="second" @click="goto_cart">购物车</p>
      </div>
      <div>
        <p class="first">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wo"></use>
          </svg>
        </p>
        <p class="second" @click="goto_my">我</p>
      </div>
    </div>
  </div>
</template>

<script>
  //
  import axios from 'axios'
  import {API_SLIDE, API_MAIN_DATA} from '../config/api'
  //
  export default{
    data(){
      return {
        //
        swiperOption: {
          pagination: '.swiper-pagination',
          direction: 'horizontal',
          slidesPerView: 1,
          paginationClickable: true,
          spaceBetween: 30,
          mousewheelControl: true
        },
        //切换下拉框
        city_select: false,
        //初始城市
        city: '',
        //下拉框城市
        city_data: ['南京', '扬州', '上海'],
        //幻灯
        slide_data: [],
        //上新数据
        new_main_data: [],
        //周
        week_main_data: [],
      }
    },
    created() {
      this.city = this.city_data[0];
      this.initdata();
    },
    methods: {
      initdata: function () {
        function getslide() {
          return axios.get(API_SLIDE);
        }

        function getmaindata() {
          return axios.get(API_MAIN_DATA);
        }

        //
        const _this = this;
        axios.all([getslide(), getmaindata()])
          .then(axios.spread(function (res1, res2) {
            _this.slide_data = res1.data;
            //计算
            let new_array = [];
            let week_obj = [];
            let new_obj = [];
            for (let i = 0; i < res2.data.length; i++) {
              if (res2.data[i].week) {
                week_obj.push(res2.data[i]);
              } else {
                new_obj.push(res2.data[i]);
              }
            }
            _this.new_main_data = new_obj;
            _this.week_main_data = week_obj;
            console.log(new_obj);
            console.log(week_obj);
          }));
      },
      span_change_city_select: function () {
        this.city_select = !this.city_select
      },
      li_change_city_select: function (value) {
        this.city_select = !this.city_select;
        //切换城市名字
        console.log(value);
        this.city = value;
      },
      mine: function () {
        this.$router.push({name: 'my'});
      },
      goto_my: function () {
        this.$router.push({name: 'my'})
      },
      goto_detail: function (value) {
        this.$router.push({name: 'details', params: {id: value}})
      },
      goto_cart: function () {
        this.$router.push({name: 'cart'})
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
    z-index: 9999; //导航不不遮盖
    span.left {
      display: block;
      float: left;
      width: 155/75rem;
      height: 88/75rem;
      line-height: 88/75rem;
      text-align: center;
      color: white;
    }
    ul {
      position: absolute;
      width: 155/75rem;
      top: 88/75rem;
      left: 0;
      li {
        width: 155/75rem;
        height: 88/75rem;
        line-height: 88/75rem;
        background-color: #d5d5d5;
        text-align: center;
        color: white;
        border-top: 1px solid white;
      }
    }
    div.middle {
      width: (750-155-88)/75rem;
      height: 88/75rem;
      float: left;
      div.search {
        width: 480/75rem;
        height: 50/75rem;
        margin: 20/75rem auto 0 auto;
        border-radius: 0.5rem;
        background-color: #ffffff;
        p.text {
          float: left;
          width: 430/75rem;
          height: 50/75rem;
          input {
            width: 430/75rem;
            height: 50/75rem;
            border: none;
            border-radius: 0.5rem;
            text-indent: 15/75rem;
          }
        }
        p.img {
          width: 30/75rem;
          height: 50/75rem;
          float: left;
          img {
            width: 30/75rem;
            height: 50/75rem;
          }
        }
      }
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

  [data-dpr='1'] div.head span.left {
    font-size: 18px;
  }

  [data-dpr='2'] div.head span.left {
    font-size: 30px;
  }

  [data-dpr='3'] div.head span.left {
    font-size: 55px;
  }

  [data-dpr='1'] div.search p input {
    font-size: 15px;
  }

  [data-dpr='2'] div.search p input {
    font-size: 25px;
  }

  [data-dpr='3'] div.search p input {
    font-size: 43px;
  }

  /*幻灯*/
  div.slide {
    margin-top: 88/75rem;
    width: 100%;
    height: 310/75rem;
    background-size: cover;
    .swiper-box {
      width: 100%;
      height: 310/75rem;
      .swiper-item {
        height: 310/75rem;
        img {
          width: 100%;
          height: 310/75rem;
        }
      }
    }
  }

  /*导航*/
  div.nav {
    width: 100%;
    height: 175/75rem;
    background-color: white;
    div {
      width: 10/4rem;
      float: left;
      height: 175/75rem;

      p.img {
        margin-top: 28/75rem;
        text-align: center;
        img {
          width: 82/75rem;
          height: 74/75rem;
        }
      }
      p.text {
        text-align: center;
        line-height: 62/75rem;
      }
    }
  }

  [data-dpr='1'] div.nav p.text {
    font-size: 17px;
  }

  [data-dpr='2'] div.nav p.text {
    font-size: 27px;
  }

  [data-dpr='3'] div.nav p.text {
    font-size: 45px;
  }

  /*商品*/
  div.shopping {
    margin-top: 20/75rem;
    width: 100%;
    height: 1130/75rem;
    background-color: white;
    div.top {
      width: 690/75rem;
      height: 120/75rem;
      margin: 0 auto;
      p.p1 {
        float: left;
        width: 100/75rem;
        height: 2px;
        margin-top: 60/75rem;
        background-color: #d4d4d4;
      }
      p.p2 {
        float: left;
        width: (690-200)/75rem;
        height: 120/75rem;
        text-align: center;
        line-height: 120/75rem;
        span.left {
          font-weight: bold;
        }
        span.right {
          color: #f5bf04;
          font-weight: bold;
        }
      }
    }
    p.one {
      text-align: center;
      img {
        width: 690/75rem;
        height: 300/75rem;
      }
    }
    p.two {
      width: 690/75rem;
      height: 90/75rem;
      margin-left: 30/75rem;
    }
    p.three {
      margin-top: 10/75rem;
      text-indent: 30/75rem;
      line-height: 37/75rem;
      height: 37/75rem;
      span.newnum {
        color: #ff0000;
      }
      span.oldnum {
        color: #999999;
        text-decoration: line-through;
      }
    }
    div.next {
      border-bottom: 1px solid #999999;
      width: 10rem;
      height: 450/75rem;
      margin: 22/75rem 0 0 0;
      div.left {
        width: 335/75rem;
        height: 400/75rem;
        float: left;
        margin-left: (750-700)/75/2rem;
        p.one {
          width: 335/75rem;
          height: 260/75rem;
          img {
            width: 335/75rem;
            height: 260/75rem;
          }
        }
        p.two {
          width: 335/75rem;
          height: 80/75rem;
          margin: 0;
        }
        p.three {
          text-indent: -5/75rem;
          line-height: 60/75rem;
          height: 60/75rem;
          span.newnum {
            color: #ff0000;
          }
          span.oldnum {
            color: #999999;
            text-decoration: line-through;
          }
        }
      }
    }
    p.four {
      width: 690/75rem;
      height: 77/75rem;
      line-height: 77/75rem;
      margin: 10px auto 0 auto;
      text-align: right;
      color: #9d9d9d;
    }
  }

  [data-dpr='1'] div.shopping div.top p.p2 span.left {
    font-size: 24px;
  }

  [data-dpr='2'] div.shopping div.top p.p2 span.left {
    font-size: 29px;
  }

  [data-dpr='3'] div.shopping div.top p.p2 span.left {
    font-size: 65px;
  }

  [data-dpr='1'] div.shopping div.top p.p2 span.right {
    font-size: 20px;
  }

  [data-dpr='2'] div.shopping div.top p.p2 span.right {
    font-size: 22px;
  }

  [data-dpr='3'] div.shopping div.top p.p2 span.right {
    font-size: 55px;
  }

  [data-dpr='1'] div.shopping p.two {
    font-size: 16.5px;
  }

  [data-dpr='2'] div.shopping p.two {
    font-size: 27px;
  }

  [data-dpr='3'] div.shopping p.two {
    font-size: 59px;
  }

  [data-dpr='1'] div.shopping span.newnum {
    font-size: 20px;
  }

  [data-dpr='2'] div.shopping span.newnum {
    font-size: 30px;
  }

  [data-dpr='3'] div.shopping span.newnum {
    font-size: 65px;
  }

  [data-dpr='1'] div.shopping span.oldnum {
    font-size: 16.5px;
  }

  [data-dpr='2'] div.shopping span.oldnum {
    font-size: 25px;
  }

  [data-dpr='3'] div.shopping span.oldnum {
    font-size: 50px;
  }

  [data-dpr='1'] div.shopping p.four {
    font-size: 17px;
  }

  [data-dpr='2'] div.shopping p.four {
    font-size: 32px;
  }

  [data-dpr='3'] div.shopping p.four {
    font-size: 60px;
  }

  /*查看更多*/
  div.check {
    margin-top: 20px;
    margin-bottom: 107/75rem;
    height: 100/75rem;
    p {
      text-align: center;
      position: absolute;
      width: 100%;
      height: 80/75rem;
      line-height: 80/75rem;
      color: #999999;
      background-color: white;
    }
  }

  [data-dpr='1'] div.check p {
    font-size: 20px;
  }

  [data-dpr='2'] div.check p {
    font-size: 33px;
  }

  [data-dpr='3'] div.check p {
    font-size: 60px;
  }

  /*底部*/
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
    font-size: 85px;
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
