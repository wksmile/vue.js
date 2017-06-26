<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-descrease" v-show="food.count>0" v-on:click.stop.prevent="decreaseCart">
        <transition name="inner">
          <img class="inner" src="./derease.png" alt="decrease">
        </transition>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <!-- 阻止事件冒泡失败 -->
    <div class="cart-add" v-on:click.stop.prevent="addCart">
      <img src="./plus.png" alt="plus">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  var eventHub = new Vue()

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart: function (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        eventHub.$emit('cart-add', event.target)
      },
      decreaseCart: function (event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-descrease, .cart-add
      display: inline-block
      padding: 6px
      transition: all 0.4s linear
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(0)
      img
        height: 24px
        width: 24px
      &.move-transition
        opacity: 1
        transform: translate3D(0, 0, 0)
      &.move-enter, &.move-leave
        opacity: 0
        transform: translate3D(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
</style>
