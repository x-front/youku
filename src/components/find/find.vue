<template>
  <transition name="slideLeft">
    <div id="find">
      <div class="top">
        <ul>
          <li class="ac">推荐</li>
          <li>搞笑</li>
          <li>音乐</li>
          <li>影视剧</li>
          <li>动漫</li>
          <li>社会</li>
          <li>萌动</li>
        </ul>
      </div>
      <div
        @touchstart.prevent="tabsTouchStart"
        @touchmove.prevent="tabsTouchMove"
        @touchend.prevent="tabsTouchEnd"
      >
        <scroll class="scroll"
                :data="findVideoList"
                :pulldown="true"
                @pulldown="pulldown"
        >
          <div>
            <pull-down-loading></pull-down-loading>
            <ol>
              <li v-for="(item,index) in findVideoList">
                <div class="title">
                  <h6>{{item.title}}</h6>
                  <p>{{item.playFrom}}播放</p>
                </div>
                <div class="video">
                  <!--<img v-lazy="item.imgSrc" alt="item.title">-->
                  <video width="100%" :src="item.videoSrc" controls ref="video"></video>
                  <!--<span @click="playVideo(index)"><i class="icon-play"></i></span>-->
                  <time>02:50</time>
                </div>
                <div class="bot">
                  <img v-lazy="item.imgSrc">
                  {{item.playFrom}}
                  <span class="float_r" @click="shareModal(item.title)"><i class="icon-more"></i></span>
                </div>
              </li>
            </ol>
          </div>
        </scroll>
      </div>
      <div class="modal" v-show="!shareShow" @click="shareModal()"></div>
      <div class="share" v-show="!shareShow">
        <div class="out">
          <ul>
            <li>
              <em><i class="icon-weixin"></i></em>
              <p>微信</p>
            </li>
            <li>
              <em><i class="icon-friend"></i></em>
              <p>朋友圈</p>
            </li>
            <li>
              <em><i class="icon-QQ"></i></em>
              <p>QQ</p>
            </li>
            <li>
              <em><i class="icon-zoom"></i></em>
              <p>QQ空间</p>
            </li>
          </ul>
        </div>
        <div class="in">
          <ul>
            <li>
              <span><i class="icon-collect"></i></span>
              <p>收藏</p>
            </li>
            <li>
              <span><i class="icon-subscribe"></i></span>
              <p>订阅频道</p>
            </li>
            <li>
              <span><i class="icon-dislike"></i></span>
              <p>不感兴趣</p>
            </li>
          </ul>
        </div>
      </div>
      <refresh v-if="pulldownLoading"></refresh>
      <loading v-show="!findVideoList.length"></loading>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import pullDownLoading from 'base/pulldown/pulldown'
  import Refresh from 'base/refresh/refresh'

  export default{
    data() {
      return {
        findVideoList: [],
        videoTime: 0,
        imgModal: [],
        shareShow: true,
        pulldownLoading: false
      }
    },
    created() {
      this.touch = {}
    },
    methods: {
      videoAllTime() {
      },
      playVideo(index) {
      },
      shareModal(title) {
        this.shareShow = !this.shareShow
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
            path: '/vip'
          })
        }
        if (deltaX > 100) {
          this.$router.push({
            path: '/home'
          })
        }
      },
      tabsTouchEnd() {

      }
    },
    mounted() {
      axios.get('static/find.json').then((data) => {
        this.findVideoList = data.data
        for (let i = 0; i < this.findVideoList.length; i++) {
          this.imgModal.push(true)
        }
      })
    },
    components: {
      Loading,
      pullDownLoading,
      Refresh,
      Scroll
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  #find {
    width: 100%;
    height: 100%;
    padding-bottom: 0.5rem;
    &.slideLeft-enter, &.slideLeft-leave {
      transform: translate3d(100%, 0, 0);
    }
    &.slideLeft-enter-active, .home-slideLeft-active {
      transition: all 0.3s ease-out;
    }
    .top {
      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      color: #ededed;
      background: url("header_bg.png") no-repeat 0 0 / cover;
      ul {
        display: flex;
        justify-content: flex-start;
        flex-wrap: nowrap;
        li {
          flex: 0 0 0.5rem;
          float: left;
          &.ac {
            color: #fff;
          }
        }
      }
    }
    .scroll {
      position: fixed;
      top: 0.4rem;
      bottom: 0.5rem;
      width: 100%;
      overflow: hidden;
      ol {
        padding-bottom: 1rem;
        li {
          width: 100%;
          position: relative;
          .title {
            width: 80%;
            position: absolute;
            left: 0;
            top: 0;
            color: #fff;
            text-indent: 1em;
            z-index: 10;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            h6 {
              margin-top: 0.1rem;
              font: 0.14rem / 0.2rem '楷体';
            }
            p {
              font: 0.1rem / 0.2rem '楷体';
            }
          }
          .video {
            position: relative;
            video {
              width: 100% !important;
              height: auto;
              background-color: #000;
            }
            span {
              display: inline-block;
              width: 0.5rem;
              height: 0.5rem;
              background-color: rgba(0, 0, 0, .5);
              line-height: 0.5rem;
              text-align: center;
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              margin: auto;
              z-index: 30;
              i {
                color: #fff;
                font-size: 0.5rem;
              }
            }
            time {
              color: #fff;
              font-size: 0.1rem;
              position: absolute;
              bottom: 0.05rem;
              right: 0.1rem;
            }
            img {
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              z-index: 20;
            }
          }
          .bot {
            height: 0.3rem;
            line-height: 0.3rem;
            img {
              width: 0.2rem;
              height: 0.2rem;
              border-radius: 50%;
              overflow: hidden;
              float: left;
              margin: 0.05rem;
            }
            i {
              color: #000;
              font-size: 0.2rem;
            }
          }
        }
      }
    }
    .share {
      width: 100%;
      background-color: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1001;
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        li {
          flex: 1;
          text-align: center;
          font-size: 0.1rem;
          span {
            display: inline-block;
            width: 0.3rem;
            height: 0.3rem;
            margin: 0.1rem 0;
            line-height: 0.35rem;
            border-radius: 50%;
            border: 1px solid #ccc;
            text-align: center;
            font-size: 0.2rem;
          }
          em {
            display: inline-block;
            width: 0.4rem;
            height: 0.4rem;
            line-height: 0.45rem;
            text-align: center;
            border-radius: 50%;
            background-color: #62b900;
            margin: 0.1rem 0;
            color: #fff;
            font-size: 0.2rem;
          }
        }
      }
      .out {
        border-bottom: 1px solid #ccc;
      }
    }
    .modal {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      background-color: rgba(0, 0, 0, .5);
    }
  }
</style>
