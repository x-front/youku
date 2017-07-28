<template>
  <header>
    <div class="top clearfix">
      <div class="float_l nav">
        <ul>
          <li class="ac">精选</li>
          <li>极限挑战</li>
          <li>剧集</li>
          <li>综艺</li>
          <li>电影</li>
          <li>娱乐</li>
          <li>娱乐</li>
          <li>娱乐</li>
          <li>娱乐</li>
        </ul>
      </div>
      <div class="moreNav float_r" @click="moreNav">
        <i class="icon-manage"></i>
      </div>
    </div>
    <div class="search">
      <dl>
        <dt @click="search">
          <i class="icon-search"></i>
          超次元偶像次
        </dt>
        <dd @click="history"><i class="icon-history"></i></dd>
        <dd><i class="icon-download"></i></dd>
        <dd @click="player"><i class="icon-message"></i></dd>
      </dl>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'

  export default{
    methods: {
      moreNav() {
        this.$router.push({
          path: '/moreNav'
        })
      },
      search() {
        this.$router.push({
          path: '/search'
        })
      },
      history() {
        this.$router.push({
          path: '/history'
        })
      },
      player() {
        this.$router.push({
          path: '/player'
        })
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  header {
    height: 0.8rem;
    background: url("header_bg.png");
    overflow: hidden;
    .top {
      line-height: 0.4rem;
      height: 0.4rem;
      text-align: center;
      .nav {
        width: 3.35rem;
        overflow: auto;
        ul {
          width: 5rem;
          height: 0.4rem;
          color: #ededed;
          li {
            margin: 0 0.1rem;
            float: left;
            &.ac {
              color: #fff;
            }
          }
        }
      }
      .moreNav {
        width: 0.4rem;
        i {
          font-size: 0.2rem;
          color: #fff;
        }
      }
    }
    dl {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      padding: 0.05rem 0.1rem;
      text-align: center;
      line-height: 0.3rem;
      color: #fff;
      dt {
        width: 2.5rem;
        height: 0.3rem;
        line-height: 0.3rem;
        border-radius: 0.15rem;
        background-color: rgba(255, 255, 255, 0.3);
        font-size: 0.12rem;
        i {
          font-size: 0.16rem;
        }
      }
      dd {
        width: 0.3rem;
        height: 0.3rem;
        font-size: 0.2rem;
      }
    }
  }
</style>
