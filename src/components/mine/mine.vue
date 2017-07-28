<template>
  <transition name="slideLeft">
    <div id="mine"
         @touchstart.prevent="tabsTouchStart"
         @touchmove.prevent="tabsTouchMove"
         @touchend.prevent="tabsTouchEnd"
    >
      <header>
        <div class="top">
          <span>
            <label>
              <input type="file" hidden>
              <i class="icon-scanning"></i>
            </label>
          </span>
          <span class="float_r"><i class="icon-message"></i></span>
          <span class="float_r" @click="setup"><i class="icon-setup"></i></span>
        </div>
        <div class="user">
          <img v-lazy="avatarImg.small" alt="user">
          <h3><span>{{userMessage.username}}</span><em><img v-lazy="userMessage.vipImage"></em></h3><br>
          <span>{{userMessage.lv}}</span>
        </div>
        <div class="bot">
          <img src="static/images/banner_bg.png">
        </div>
      </header>
      <ul class="nav">
        <li>
          <div><i class="icon-recreation"></i></div>
          <span>收藏</span>
        </li>
        <li>
          <div><i class="icon-subscribe-fill" style="color: #ff8b00"></i></div>
          <span>订阅</span>
        </li>
        <li>
          <div><i class="icon-series"></i></div>
          <span>追剧</span>
        </li>
        <li>
          <div><i class="icon-upload" style="color: #816fff"></i></div>
          <span>上传</span>
        </li>
      </ul>
      <ol>
        <li>
          <div class="column clearfix">
            <h6>会员中心
              <em><i class="icon-vip-fill"></i> {{userMessage.vipTime}}</em>
            </h6>
            <span><i class="icon-right"></i></span>
          </div>
        </li>
        <li>
          <div class="column clearfix" @click="historyPage">
            <h6>历史记录 </h6>
            <span><i class="icon-right"></i></span>
          </div>
          <div class="historyList" ref="scrollLeft">
            <ul>
              <li v-for="item in historyToday">
                <div class="pic">
                  <img v-lazy="item.image">
                  <em>{{item.finish | filterFinish(item.finish)}}</em>
                </div>
                <p>{{item.title}}</p>
              </li>
              <li v-for="item in historyWeek">
                <div class="pic">
                  <img v-lazy="item.image">
                  <em>{{item.finish | filterFinish(item.finish)}}</em>
                </div>
                <p>{{item.title}}</p>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div class="column clearfix">
            <h6>我的缓存 </h6>
            <span><i class="icon-right"></i></span>
          </div>
        </li>
        <li>
          <div class="column clearfix">
            <h6>个人服务</h6>
            <span><i class="icon-right"></i></span>
          </div>
        </li>
      </ol>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'

  export default{
    filters: {
      filterFinish: function (text) {
        if (text === '100%') {
          return '已看完'
        } else {
          return text
        }
      }
    },
    data() {
      return {
        userMessage: {},
        avatarImg: {},
        historyToday: {},
        historyWeek: {},
        UserMessage: {}
      }
    },
    created() {
      this.touch = {}
    },
    mounted() {
      axios.get('static/user.json').then((data) => {
        this.userMessage = data.data.data
        this.avatarImg = data.data.data.avatar
      })
      axios.get('static/history.json').then((data) => {
        this.historyToday = JSON.parse(window.localStorage.getItem('historyToday')) || data.data.today
        this.historyWeek = JSON.parse(window.localStorage.getItem('historyWeek')) || data.data.week
      })
    },
    methods: {
      historyPage() {
        this.$router.push({
          path: '/history'
        })
      },
      setup() {
        this.$router.push({
          path: '/mine/setup'
        })
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
          return
        }
        if (deltaX > 100) {
          this.$router.push({
            path: '/star'
          })
        }
      },
      tabsTouchEnd() {

      }
    },
    components: {}
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  #mine {
    width: 100%;
    height: 100%;
    padding-bottom: 0.5rem;
    &.slideLeft-enter, &.slideLeft-leave {
      transform: translate3d(100%, 0, 0);
    }
    &.slideLeft-enter-active, .home-slideLeft-active {
      transition: all 0.5s ease-out;
    }
    header {
      position: relative;
      padding-bottom: 0.2rem;
      background: url("header_bg.png") no-repeat 0 0;
      .top {
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.24rem;
        color: #fff;
        span {
          margin: 0 0.1rem;
        }
      }
      .user {
        height: 0.6rem;
        padding: 0 0.1rem;
        color: #fff;
        line-height: 0.24rem;
        img {
          width: 0.5rem;
          height: 0.5rem;
          margin-right: 0.1rem;
          border-radius: 50%;
          overflow: hidden;
          float: left;
        }
        h3 {
          font-size: 0.16rem;
          height: 0.24rem;
          width: 2.1rem;
          float: left;
          span {
            display: inline-block;
            max-width: 1.8rem;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            float: left;
          }
          em {
            display: inline-block;
            float: left;
            margin-top: 0.05rem;
            img {
              width: 0.16rem;
              height: 0.16rem;
            }
          }
        }
        > span {
          float: left;
          display: inline-block;
          text-align: center;
          padding: 0 0.1rem;
          height: 0.24rem;
          border-radius: 0.12rem;
          background-color: rgba(30, 174, 252, 0.5);
          font-size: 0.12rem;
        }
      }
      .bot {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 0;
        img {
          width: 100%;
        }
      }
    }
    .nav {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      padding: 0.1rem 0;
      border-bottom: 1px solid #eee;
      li {
        flex: 1;
        font-size: 0.12rem;
        text-align: center;
        line-height: 0.2rem;
        i {
          font-size: 0.24rem;
        }
      }
    }
    ol {
      > li {
        min-height: 0.4rem;
        line-height: 0.4rem;
        padding: 0 0.1rem;
        border-bottom: 1px solid #eee;
        .column {
          h6 {
            width: 90%;
            font-size: 0.12rem;
            font-weight: normal;
            float: left;
            em {
              color: #c1a161;
              float: right;
            }
          }
          span {
            float: right;
          }
        }
        .historyList {
          width: 100%;
          overflow: auto;
          ul {
            width: 10rem;
            min-width: 100%;
            overflow: auto;
            li {
              float: left;
              width: 1rem;
              font-size: 0.12rem;
              margin-right: 0.1rem;
              &:last-of-type {
                margin-right: 0;
              }
              .pic {
                width: 100%;
                height: 0.6rem;
                position: relative;
                border-radius: 3px;
                overflow: hidden;
                img {
                  width: 100%;
                  height: 100%;
                  float: left;
                }
                em {
                  line-height: 0.2rem;
                  position: absolute;
                  left: 0.05rem;
                  bottom: 0;
                  color: #fff;
                }
              }
              p {
                width: 100%;
                height: 0.2rem;
                font: 0.12rem / 0.2rem '楷体';
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
</style>
