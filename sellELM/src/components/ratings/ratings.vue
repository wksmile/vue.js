<template>
    <div class="ratings" ref="ratings">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.foodScore"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{seller.deliveryTime }}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings" v-on:content="changeContent"  v-on:typeC="changeType"></ratingselect>
        <div class="rating-wrapper">
          <ul>
            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item border-1px" >
              <div class="avatar">
                <img width="28" height="28" :src="rating.avatar">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <star class="star" :size="24" :score="rating.score"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommand" v-show="rating.recommend.length">
                  <img src="./thumb_up.png" width="12" height="12">
                  <span v-for="oneR in rating.recommend" class="item">{{oneR}}</span>
                </div>
                <div class="time">
                  {{rating.rateTime | formatDate}}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import star from '../star/star.vue'
  import ratingselect from '../ratingselect/ratingselect'
  import split from '../split/split'

  import {formatDate} from '../../common/js/data'

  const ALL = 2
  const ERR_OK = 0
    export default {
      props: {
        seller: {
          type: Object
        }
      },
      data: function () {
        return {
          ratings: [],
          showFlag: false,
          selectType: ALL,
          onlyContent: true,
          desc: {
            all: '全部',
            positive: '推荐',
            negative: '吐槽'
          }
        }
      },
      created: function () {
        this.$http.get('/api/ratings').then((res) => {
          res = res.body
          if (res.errno === ERR_OK) {
            this.ratings = res.data
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.ratings, {
                click: true
              })
            })
          }
        })
      },
      methods: {
        needShow: function (type, text) {
          if (this.onlyContent && !text) {
            return false
          }
          if (this.selectType === ALL) {
            return true
          } else {
            return type === this.selectType
          }
        },
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
        }
      },
      filters: {
        formatDate(time) {
          let date = new Date(time)
          return formatDate(date,'yyyy-MM-dd hh:mm')
        }
      },
      components: {
        star,
        split,
        ratingselect
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratings
    position : absolute
    top: 174px
    bottom : 0
    width : 100%
    left: 0
    overflow : hidden
    .overview
      display: flex
      padding : 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right : 1px solid rgba(7,17,27,0.1)
        text-align : center
        @media only screen and (max-width : 320px)
          flex: 0 0 120px
          width : 120px
        .score
          margin-bottom : 6px
          line-height : 28px
          font-size : 24px
          color: rgb(255,153,0)
        .title
          margin-bottom : 8px
          line-height : 12px
          font-size : 12px
          color: rgb(7,17,27)
        .rank
          line-height : 10px
          font-size : 10px
          color: rgb(147,153,159)
      .overview-right
        flex: 1
        padding : 6px 0 6px 24px
        @media only screen and (max-width : 320px)
          padding-left : 6px
        .score-wrapper
          margin-bottom : 8px
          font-size : 0
          .title
            display : inline-block
            line-height : 18px
            font-size : 12px
            color: rgb(7,17,27)
          .star
            display : inline-block
            margin: 0 12px
            vertical-align : top
          .score
            display : inline-block
            line-height : 18px
            vertical-align : top
            font-size : 18px
        .delivery-wrapper
          font-size : 0
          .title
            line-height : 12px
            font-size : 12px
            color: rgb(7,17,27)
          .delivery
            margin-left: 12px
            font-size : 12px
            color: rgb(147,153,159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display : flex
        padding : 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          margin-right : 12px
          width: 28px
          img
            border-radius : 50%
        .content
          position : relative
          flex: 1
          .name
            margin-bottom : 4px
            line-height : 12px
            font-size : 10px
            color : rgb(7,17,27)
          .star-wrapper
            margin-bottom : 6px
            height : 24px
            .star
              display: inline-block
              flex: 1 1 15px
            .delivery
              display : inline-block
              margin-left : 6px
              font-size : 10px
              font-weight : 200
              color: rgb(147,153,159)
          .text
            margin-bottom : 8px
            line-height : 18px
            color: rgb(7,17,27)
            font-size : 12px
          .recommand
            line-height : 16px
            font-size : 0
            img, .item
              display : inline-block
              vertical-align : middle
              margin : 0 8px 4px 0
              padding : 0 6px
            .item
              border : 1px solid rgba(7,17,27,0.1)
              font-size : 9px
              border-radius : 1px
              background : #fff
          .time
            position : absolute
            top: 0
            right: 0
            line-height : 12px
            font-size : 12px
            color: rgb(7,17,27)
</style>
