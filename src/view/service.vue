<template>
  <div class="wrap" flex="dir:top">
    <div class="header" flex-box="0">
      <span class="left"  @click="goto_my">&lt;</span>
      <span class="title">包包网</span>
    </div>
    <div class="bodyer" flex-box="1">
      <div class="wechat" v-for="item in service_data">
        <p class="one">
          <span class="img"><img :src="item.url" alt=""></span>
          <span class="text_left">{{item.info1}}</span>
          <span @click="openinfo(item.info2_text)" v-if="item.info2_icon" class="text_right"><span class="icon">{{item.info2_icon}}</span>{{item.info2_text}}</span>
        </p>
        <p class="two">
          <span class="num">{{item.info3}}</span>
          <span class="border">{{item.info4}}</span>
        </p>
      </div>
    </div>
    <div class="foot" flex="dir:left box:mean">
      <div>
        <p class="first">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shouyeshouye"></use>
          </svg>
        </p>
        <p class="second" @click="goto_home">首页</p>
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
    <div class="mask" v-if="mask3"></div>
    <div class="helptext" v-if="mask1">
      <p class="title">帮助说明</p>
      <p class="content">亲爱的用户，为给你更好的客服体验，现微信好友客服已升级至公众号客服（微信好友客服同时停用），服务更专业，更迅速！请复制公众号关注进行咨询，已关注公众号的用户可以直接进入公众号咨询哦~~
      </p>
      <button @click="mask1 = false; mask3 = false;">确定</button>
    </div>
    <div class="popup" v-if="mask2">
      <div class="share">
        <p>
          <span class="img"><img src="/static/images/popup/popup-1.gif" alt=""></span>
          <span class="text">QQ好友</span>
        </p>
        <p>
          <span class="img"><img src="/static/images/popup/popup-2.gif" alt=""></span>
          <span class="text">微信好友</span>
        </p>
        <p>
          <span class="img"><img src="/static/images/popup/popup-3.gif" alt=""></span>
          <span class="text">朋友圈</span>
        </p>
        <p>
          <span class="img"><img src="/static/images/popup/popup-4.gif" alt=""></span>
          <span class="text">新浪微博</span>
        </p>
      </div>
      <div class="detail">
        <p>
          <span class="img"><img src="/static/images/popup/popup-5.gif" alt=""></span>
          <span class="text">复制链接</span>
        </p>
        <p>
          <span class="img"><img src="/static/images/popup/popup-6.gif" alt=""></span>
          <span class="text">收藏</span>
        </p>
        <p>
          <span class="img"><img src="/static/images/popup/popup-7.gif" alt=""></span>
          <span class="text">举报</span>
        </p>
      </div>
      <button @click="mask2 = false; mask3 = false;">取消</button>
    </div>
  </div>
</template>

<script>
  //
  import {service_data} from '../config/common';

  export default{
    data(){
      return{
        service_data: service_data,
        mask1: false,
        mask2: false,
        mask3: false
      }
    },
    methods: {
      openinfo: function (value) {
        if (value === '帮助说明') {
          this.mask1 = !this.mask1;
          this.mask3 = !this.mask3;
        } else {
          this.mask2 = !this.mask2;
          this.mask3 = !this.mask3;
        }
      },
      goto_my:function () {
        this.$router.push({name: 'my'})
      },
      goto_home:function () {
        this.$router.push({name: 'home'})
      },
      goto_cart:function () {
        this.$router.push({name: 'cart'})
      }
    }

  }
</script>
<style scoped rel="stylesheet/less" lang="less">
  div.wrap {
    background: #e8e8e8;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    div.mask {
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    div.popup{
      position: absolute;
      top:50%;
      left: 50%;
      margin: -210/75rem 0 0 -300/75rem;
      width: 600/75rem;
      height: 420/75rem;
      background: white;
      div{
        width: 550/75rem;
        height: 167/75rem;
        margin-left: 25/75rem;
        border-bottom: 1px solid gray;
        p{
          float: left;
          width: 550/75/4rem;
          height: 160/75rem;
          line-height: 160/75rem;
          text-align: center;
          margin-top: 15/75rem;
          span.img{
            width: 130/75rem;
            height: 100/75rem;
            line-height: 100/75rem;
            text-align: center;
            display: block;
            img{
              display: block;
              width: 100/75rem;
              height: 100/75rem;
              margin-left: 15/75rem;
            }
          }
          span.text{
            display: block;
            float: left;
            height: 50/75rem;
            width: 130/75rem;
            line-height: 40/75rem;
            text-align: center;
          }
        }
      }
      button{
        width: 600/75rem;
        height: 85/75rem;
        background: white;
        border: none;
      }
    }
    div.helptext{
      width: 600/75rem;
      height: 420/75rem;
      background: white;
      border-radius: 0.3rem;
      top:50%;
      left: 50%;
      margin: -210/75rem 0 0 -300/75rem;
      position: absolute;
      p.title{
        width: 600/75rem;
        height: 85/75rem;
        line-height: 85/75rem;
        text-align: center;
      }
      p.content{
        width: 550/75rem;
        height:250/75rem;
        margin: 0 auto;
      }
      button{
        width: 600/75rem;
        height: 85/75rem;
        background: white;
        border: none;
        border-radius:0 0 0.3rem 0.3rem;
        border-top:1px solid gainsboro ;
        color: #0056e5;
      }
    }
  }
  div.header {
    width: 100%;
    height: 85/75rem;
    background: #ff8a26;
    border-bottom: 1px solid grey;
    span.left {
      float: left;
      display: block;
      width: 90/75rem;
      height: 85/75rem;
      line-height: 85/75rem;
      text-align: center;
      color:white;
    }
    span.title {
      float: left;
      display: block;
      width: 10-2*90/75rem;
      height: 85/75rem;
      line-height: 85/75rem;
      text-align: center;
      color: white;
    }
  }
  div.header span{
    font-size: 20px;
  }
  [data-dpr="2"] div.header span{
    font-size: 35px;
  }
  [data-dpr="3"] div.header span{
    font-size: 62px;
  }
  div.bodyer{
    div.wechat{
      margin-top: 0;
    }
    div{
      margin-top: 20px;
      background: white;
      width: 100%;
      p.one{
        border-bottom: 1px solid grey;
      }
      p{
        height: 90/75rem;
        width: 100%;
        line-height: 90/75rem;
        span.img{
          display: block;
          float: left;
          width: 80/75rem;
          height: 90/75rem;
          text-align: center;
          img{
            margin-top: 20/75rem;
            width: 50/75rem;
            height: 50/75rem;
          }
        }
        span.text_right{
          display: block;
          float: right;
          margin-right: 0.3rem;
          height: 90/75rem;
          width: 300/75rem;
          text-align: right;
          span.icon{
            width: 35/75rem;
            height: 35/75rem;
            background: red;
            border-radius: 100%;
            color: white;
            margin-right: 10px;
          }
        }
        span.text_left{
          display: block;
          float: left;
          height: 90/75rem;
          width: 150/75rem;
          text-align: left;
        }

        span.num{
          display: block;
          float: left;
          width: 600/75rem;
          height: 90/75rem;
          text-align: center;
          color: grey;
        }
        span.border{
          margin-top: 20/75rem;
          color: grey;
          display: block;
          float: left;
          width: 100/75rem;
          height: 50/75rem;
          line-height:50/75rem;
          text-align: center;
          border: 1px solid grey;
          border-radius: 0.2rem;
        }
      }
    }
  }
  div.bodyer span{
    font-size: 16px;
  }
  [data-dpr="2"] div.bodyer span{
    font-size: 28px;
  }
  [data-dpr="3"] div.bodyer span{
    font-size: 52px;
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
