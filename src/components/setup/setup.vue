<template>
  <transition name="slideTop">
    <div id="setup">
      <div class="top">
        <span class="float_l" @click="back"><i class="icon-return"></i></span>
        设置
        <span class="float_r" @click="search"><i class="icon-search"></i></span>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default{
    methods: {
      back() {
        this.$router.back()
      },
      search() {
        this.$router.push({
          path: '/search'
        })
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  #setup {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    min-height: 100%;
    z-index: 1000;
    background-color: #fff;
    padding-bottom: 0.5rem;
    &.slideTop-enter {
      transform: translate3d(0, 100%, 0);
      opacity: 0.5;
    }
    &.slideTop-leave {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    &.slideTop-enter-active {
      transition: all 0.3s ease-out;
      opacity: 1;
    }
    &.slideTop-leave-active {
      transition: all 0.3s ease-out;
      opacity: 0.5;
    }
    .top {
      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      border-bottom: 1px solid #ccc;
      padding: 0 0.1rem;
      span {
        display: inline-block;
        width: 0.3rem;
        font-size: 0.24rem;
      }
    }
  }
</style>
