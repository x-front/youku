<template>
  <transition name="moreNav">
    <div id="moreNav">
      <div class="top">
        频道
        <span @click="back"><i class="icon-close"></i></span>
      </div>
      <scroll class="scroll" :data="programList">
        <div>
          <div class="programList">
            <ul class="userList">
              <li v-for="item in programList">
                <i :class="item.icon"></i>
                <h6>{{item.title}}</h6>
              </li>
            </ul>
          </div>
          <div class="programList">
            <ul class="userList">
              <li v-for="item in programList">
                <i :class="item.icon"></i>
                <h6>{{item.title}}</h6>
              </li>
            </ul>
          </div>
          <div class="programList">
            <ul class="userList">
              <li v-for="item in programList">
                <i :class="item.icon"></i>
                <h6>{{item.title}}</h6>
              </li>
            </ul>
          </div>
          <div class="programList">
            <ul class="userList">
              <li v-for="item in programList">
                <i :class="item.icon"></i>
                <h6>{{item.title}}</h6>
              </li>
            </ul>
          </div>
          <div class="programList">
            <ul class="userList">
              <li v-for="item in programList">
                <i :class="item.icon"></i>
                <h6>{{item.title}}</h6>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import axios from 'axios'

  export default{
    data() {
      return {
        programList: []
      }
    },
    mounted() {
      axios.get('static/programListIcon.json').then((data) => {
        this.programList = data.data
      })
    },
    methods: {
      back() {
        this.$router.back()
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  #moreNav {
    border-top: 1px solid #ccc;
    position: absolute;
    left: 0;
    top: -1px;
    z-index: 1000;
    width: 100%;
    min-height: 100%;
    background-color: #fff;
    &.moreNav-enter-active, .moreNav-leave-active {
      transition: all 0.5s ease-out;
      opacity: 1;
    }
    &.moreNav-enter, .moreNav-leave {
      transform: translate3d(0, 100%, 0);
      opacity: 0;
    }
    .top {
      height: 0.4rem;
      line-height: 0.4rem;
      border-bottom: 1px solid #ccc;
      text-align: center;
      position: relative;
      span {
        position: absolute;
        right: 0;
        padding-right: 0.1rem;
        font-size: 0.2rem;
        line-height: 0.45rem;
      }
    }
    .scroll {
      position: fixed;
      top: 0.41rem;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      overflow: hidden;
      .programList {
        padding-top: 0.1rem;
        .userList {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          border-bottom: 1px solid #ccc;
          li {
            flex: 0 0 25%;
            height: 0.6rem;
            text-align: center;
            font-size: 0.18rem;
            font-weight: normal;
            i {
              font-size: 0.22rem;
            }
          }
        }
      }
    }
  }
</style>
