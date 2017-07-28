<template>
  <transition name="slideLeft">
    <div id="vip"
         @touchstart.prevent="tabsTouchStart"
         @touchmove.prevent="tabsTouchMove"
         @touchend.prevent="tabsTouchEnd"
    >
      <header>
        <div class="top">
          <div class="userPic">
            <img v-lazy="avatar.small">
            <div class="vip">
              <img v-lazy="userList.vipImage">
            </div>
          </div>
          <p class="float_l">尊贵的会员，您好></p>
          <span class="float_r" @click="search"><i class="icon-search"></i></span>
        </div>
        <div class="nav">
          <ul>
            <li class="ac">精选</li>
            <li>暑期看大剧</li>
            <li>电影</li>
            <li>剧集</li>
            <li>剧集观影送PS4</li>
            <li>德云社</li>
          </ul>
        </div>
      </header>
      <scroll :data="vipPlayList"
              :pulldown="true"
              class="scroll-wrapper"
              ref="scroll"
              @pulldown="pulldown"
      >
        <div>
          <pull-down-loading></pull-down-loading>
          <div class="slider-wrapper" v-if="vipSlider.length">
            <slide>
              <div v-for="item in vipSlider">
                <a :href="item.show_app_vurl">
                  <img :src="item.img" @load="loadImage">
                </a>
              </div>
            </slide>
            <div class="banner"><img src="static/images/banner_bg.png" alt="item.image"></div>
          </div>
          <div class="list-wrapper">
            <h6>{{liveTitle.title}}<span>更多</span></h6>
            <ul class="videoList">
              <li v-for="item in liveList">
                <div class="pic">
                  <img v-lazy="item.img">
                  <span :style="{
                backgroundColor:item.operation_corner_mark.bg_color,
                color:item.operation_corner_mark.text_color
                }"
                  >{{item.operation_corner_mark.desc}}</span>
                  <em>{{item.intro}}</em>
                </div>
                <h5>{{item.title}}</h5>
                <p>{{item.second_title}}</p>
              </li>
            </ul>
          </div>
          <div class="list-wrapper" v-for="items in vipPlayList">
            <h6>{{items.header.title}}<span>更多</span></h6>
            <ol class="videoLists">
              <li v-for="item in items.contents">
                <div class="pic">
                  <img v-lazy="item.img">
                  <i>{{item.total_vv}}</i>
                  <em>{{item.intro}}</em>
                </div>
                <h5>{{item.title}}</h5>
                <p>{{item.second_title}}</p>
              </li>
            </ol>
          </div>
        </div>
      </scroll>
      <loading v-show="!vipPlayList && !liveList"></loading>
      <refresh v-if="pulldownLoading"></refresh>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Slide from 'base/slide/slide'
  import Scroll from 'base/scroll/scroll'
  import pullDownLoading from 'base/pulldown/pulldown'
  import Refresh from 'base/refresh/refresh'
  import Loading from 'base/loading/loading'
  import axios from 'axios'

  export default{
    data() {
      return {
        userList: {},
        avatar: {},
        vipSlider: [],
        vipPlayList: [],
        liveList: [],
        liveTitle: {},
        pulldownLoading: false
      }
    },
    mounted() {
      axios.get('static/user.json').then((res) => {
        this.userList = res.data.data
        this.avatar = res.data.data.avatar
      })
      axios.get('static/vipSlider.json').then((res) => {
        if (res.data.code === '20000') {
          this.vipSlider = res.data.result.slider.contents
        }
      })
      axios.get('static/vipVideo.json').then((res) => {
        if (res.data.livePlay.code === '20000') {
          this.liveTitle = res.data.livePlay.result.live.header
          this.liveList = res.data.livePlay.result.live.contents
          this.vipPlayList = res.data.vipPlayList.result.d
        }
      })
    },
    created() {
      this.touch = {}
    },
    methods: {
      search() {
        this.$router.push({
          path: '/search'
        })
      },
      loadImage() {
        if (!this.finish) {
          this.$refs.scroll.refresh()
          this.finish = true
        }
      },
      pulldown() {
        this.pulldownLoading = true
        setTimeout(() => {
          this.pulldownLoading = false
        }, 1000)
      },
      tabsTouchStart(ev) {
        this.touch.initiated = true
        const touch = ev.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
      },
      tabsTouchMove(ev) {
        if (!this.touch.initiated) {
          return
        }
        const touch = ev.touches[0]
        const deltaX = touch.pageX - this.touch.startX
        const deltaY = touch.pageY - this.touch.startY
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return
        }
        if (deltaX < -100) {
          this.$router.push({
            path: '/star'
          })
        }
        if (deltaX > 100) {
          this.$router.push({
            path: '/find'
          })
        }
      },
      tabsTouchEnd() {

      }
    },
    components: {
      Slide,
      Scroll,
      Loading,
      pullDownLoading,
      Refresh
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  #vip {
    &.slideLeft-enter, &.slideLeft-leave {
      transform: translate3d(100%, 0, 0);
    }
    &.slideLeft-enter-active, .home-slideLeft-active {
      transition: all 0.3s ease-out;
    }
    header {
      background-color: #323232;
      .top {
        padding: 0.1rem 0.1rem 0;
        height: 0.3rem;
        line-height: 0.3rem;
        color: #cba45c;
        font-size: 0.12rem;
        .userPic {
          margin-right: 0.15rem;
          float: left;
          position: relative;
          width: 0.25rem;
          height: 0.25rem;
          vertical-align: middle;
          > img {
            width: 0.25rem;
            height: 0.25rem;
            border-radius: 50%;
            overflow: hidden;
          }
          .vip {
            width: 0.14rem;
            height: 0.14rem;
            position: absolute;
            bottom: 0.02rem;
            right: -0.05rem;
            font-size: 0;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        span {
          font-size: 0.24rem;
          color: #fff;
        }
      }
      .nav {
        height: 0.3rem;
        width: 100%;
        overflow: hidden;
        font-size: 0.12rem;
        line-height: 0.3rem;
        ul {
          min-width: 200%;
          max-width: 1000%;
          li {
            padding: 0 0.1rem;
            float: left;
            color: #ccc;
            &.ac {
              color: #cba45c;
            }
          }
        }
      }
    }
    .scroll-wrapper {
      position: fixed;
      top: 0.7rem;
      bottom: 0.5rem;
      width: 100%;
      overflow: hidden;
      .slider-wrapper {
        position: relative;
        width: 100%;
        height: 1.6rem;
        overflow: hidden;
        .banner {
          width: 100%;
          position: absolute;
          left: 0;
          bottom: -1px;
          font-size: 0;
          img {
            width: 100%;
          }
        }
      }
      .list-wrapper {
        padding: 0 0.1rem 0.1rem;
        h6 {
          height: 0.3rem;
          line-height: 0.3rem;
          font-size: 0.14rem;
          color: #cba45c;
          span {
            float: right;
            font-size: 0.08rem;
            font-weight: normal;
          }
        }
        .videoList {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          border-bottom: 1px solid #eee;
          li {
            width: 48%;
            margin-bottom: 0.1rem;
            .pic {
              position: relative;
              height: 1rem;
              img {
                width: 100%;
                height: 100%;
                float: left;
                border-radius: 3px;
                overflow: hidden;
              }
              span {
                border-radius: 3px;
                overflow: hidden;
                display: inline-block;
                width: 0.5rem;
                height: 0.25rem;
                font: 0.14rem / 0.25rem '楷体';
                text-align: center;
                position: absolute;
                top: 0;
                right: 0;
                opacity: 0.8;
              }
              em {
                display: inline-block;
                width: 100%;
                height: 0.2rem;
                line-height: 0.2rem;
                font-size: 0.12rem;
                text-indent: 1em;
                position: absolute;
                bottom: 0;
                left: 0;
                color: #fff;
                background-color: rgba(0, 0, 0, .1);
              }
            }
            h5 {
              font: 0.12rem / 0.2rem '楷体';
            }
            p {
              font: 0.1rem / 0.1rem '楷体';
            }
          }
        }
        .videoLists {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          border-bottom: 1px solid #eee;
          li {
            width: 30%;
            margin-bottom: 0.1rem;
            .pic {
              position: relative;
              width: 100%;
              height: 1.6rem;
              img {
                width: 100%;
                height: 100%;
                float: left;
                border-radius: 3px;
                overflow: hidden;
              }
              span, i {
                border-radius: 3px;
                overflow: hidden;
                display: inline-block;
                width: 0.5rem;
                height: 0.25rem;
                font: 0.14rem / 0.25rem '楷体';
                text-align: center;
                position: absolute;
                top: 0;
                right: 0;
                opacity: 0.8;
              }
              i {
                background-color: #1eaefc;
                color: #fff;
                font-size: 0.1rem;
              }
              em {
                display: inline-block;
                width: 100%;
                height: 0.2rem;
                line-height: 0.2rem;
                font-size: 0.12rem;
                text-indent: 1em;
                position: absolute;
                bottom: 0;
                left: 0;
                color: #fff;
                background-color: rgba(0, 0, 0, .1);
              }
            }
            h5, p {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            h5 {
              font: 0.12rem / 0.2rem '楷体';
            }
            p {
              font: 0.1rem / 0.1rem '楷体';
            }
          }
        }
      }
    }
  }
</style>
