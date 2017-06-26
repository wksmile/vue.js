<template>
  <div>
    <transition name="move">
      <div v-show="showFlag" class="food" ref="food">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image">
            <div class="arrow_lift" @click="hide">
              <img src="./arrow_lift.png">
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
            <transition name="fade">
              <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
            </transition>
          </div>
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <div class="title">商品信息</div>
            <div class="text">{{food.info}}</div>
          </div>
          <split></split>
          <div class="ratings">
            <h1 class="title">商品评价</h1>
            <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" v-on:content="changeContent"  v-on:typeC="changeType"></ratingselect>
            <div class="rating-wrapper">
              <ul v-show="food.ratings && food.ratings.length">
                <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
                  <div class="user">
                    <div class="name">{{rating.username}}</div>
                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                  </div>
                  <div class="time">{{rating.rateTime | formatDate}}</div>
                  <p class="text">
                    <img :src="textImg(rating.rateType)">{{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import split from '../split/split'

  import {formatDate} from '../../common/js/data'

  import ratingselect from '../ratingselect/ratingselect'
  import Vue from 'vue'
  import thumbDown from './thumb_down.png'
  import thumbUp from './thumb_up.png'

  // const POSITIVE = 0
  // const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
        food: {
            type: Object
        }
    },
    data: function () {
        return {
            showFlag: false,
            selectType: ALL,
            onlyContent: false,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        }
    },
    methods: {
      changeContent: function (content) {
        this.onlyContent = content
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      changeType: function (type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      show: function () {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = true
        this.$nextTick(() => {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.food,{
                    click: true
                })
            }
          this.scroll.refresh()
        })
      },
      hide: function () {
        this.showFlag = false
      },
      addFirst: function (event) {
          console.log('click')
        if (!event._constructed) {
            return
        }
        console.log()
        // this.$dispatch('cart.add',event.target)
        Vue.set(this.food,'count',1)
      },
      textImg: function (rateType) {
        return rateType === 0 ? thumbUp : thumbDown
      },
      needShow: function (type, text) {
        if (this.onlyContent && !text) {
            return false
        }
        if (this.selectType === ALL) {
            return true
        } else {
            return type === this.selectType
        }
      }
    },
    filters: {
      formatDate(time) {
          let date = new Date(time)
        return formatDate(date,'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .food
    position : fixed
    left:0
    top:0
    bottom : 48px
    z-index: 30
    width:100%
    background : #fff
    &.move-transition
      transition : all 0.5s linear
      transform : translate3D(0,0,0)
    &.move-enter, &.move-leave
      transform : translate3D(100%,0,0)
    .image-header
      position : relative
      width: 100%
      height : 0
      padding-top: 100%
      img
        position : absolute
        top: 0
        left: 0
        width: 100%
        height : 100%
      .arrow_lift
        position : fixed
        top: 10px
        left: 10px
        padding : 10px
    .content
      position : relative
      padding: 18px
      .title
        line-height : 14px
        margin-bottom : 8px
        font-size : 14px
        font-weight : 700
        color: rgb(7,17,27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height:  10px
        font-size : 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147,153,159)
        .sell-count
          margin-right: 12px
      .price
        font-weight : 700
        line-height: 24px
        .now
          margin-right : 8px
          font-size : 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration : line-through
          font-size : 10px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position : absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height : 24px
        padding: 0 12px
        box-sizing : border-box
        border-radius : 12px
        font-size : 10px
        color: #fff
        background : rgb(0,160,220)
        &.fade-transition
          transition : all 0.2s
          opacity : 1
        &.fade-enter, &.fade-leave
          opacity : 0
    .info
      padding: 18px
      .title
        line-height : 14px
        margin-bottom : 6px
        font-size : 14px
        color: rgb(77,85,93)
      .text
        line-height : 24px
        padding: 0 8px
        font-size : 12px
        color: rgb(77,85,93)
    .ratings
      position : relative
      top: 0
      padding-top: 18px
      .title
        line-height : 14px
        margin-left : 18px
        font-size : 14px
        color: rgb(77,85,93)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          padding: 16px 0
          border-1px(rgba(7,17,27,0.1))
          .user
            position : absolute
            right : 0
            top: 16px
            line-height : 12px
            font-size : 0
            .name
              display : inline-block
              vertical-align : top
              margin-right: 6px
              font-size : 10px
              color: rgb(147,153,159)
            .avatar
              border-radius : 50%
          .time
            margin-bottom : 6px
            line-height : 12px
            font-size : 10px
            color: rgb(147,153,159)
          .text
            line-height : 16px
            font-size : 12px
            color: rgb(7,17,27)
            img
              height : 16px
              width : 16px
              margin-right : 24px
          .no-rating
            padding: 16px 0
            font-size : 12px
            color: rgb(147,153,150)
</style>
