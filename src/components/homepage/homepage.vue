<template>
  <transition name="slideLeft">
    <div id="home">
      <v-header ref="header"></v-header>
      <scroll :data="homeList"
              class="scrollList"
              ref="scroll"
              :pulldown="true"
              @pulldown="pulldown"
              :listenScroll="true"
              @scroll="scrollListen"
              :scrollX="true"
      >
        <div>
          <pull-down-loading></pull-down-loading>
          <div class="slideImage" v-if="slideList.length">
            <slide>
              <div v-for="item in slideList">
                <img :src="item.image" class="needsclick" @load="loadImage">
              </div>
            </slide>
            <div class="banner"><img src="static/images/banner_bg.png" alt="item.image"></div>
          </div>
          <Play-list :homeList="homeList"
                     @touchstart.prevent="tabsTouchStart"
                     @touchmove.prevent="tabsTouchMove"
                     @touchend.prevent="tabsTouchEnd"
          ></Play-list>
        </div>
      </scroll>
      <refresh v-if="pulldownLoading"></refresh>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import vHeader from 'components/header/header'
  import Scroll from 'base/scroll/scroll'
  import Slide from 'base/slide/slide'
  import pullDownLoading from 'base/pulldown/pulldown'
  import Refresh from 'base/refresh/refresh'
  import PlayList from 'components/playList/playList'
  import axios from 'axios'

  export default {
    data() {
      return {
        slideList: [],
        homeList: [],
        pulldownLoading: false
      }
    },
    created() {
      this._getSlideList()
      this._getHomeList()
      this.touch = {}
    },
    methods: {
      loadImage() {
        if (!this.finish) {
          this.$refs.scroll.refresh()
          this.finish = true
        }
      },
      _getSlideList() {
        axios.get('static/slide.json').then((res) => {
          this.slideList = res.data.data.data.contents.results
        })
      },
      _getHomeList() {
        axios.get('static/homeList.json').then((res) => {
          this.homeList = res.data.data.data.contents.results
        })
      },
      pulldown() {
        this.pulldownLoading = true
        setTimeout(() => {
          this.pulldownLoading = false
        }, 1000)
      },
      scrollListen(ev, pos) {
        console.log(pos.x)
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
        console.log('deltaX' + deltaX)
        if (deltaX < -100) {
          this.$router.push({
            path: '/find'
          })
        }
        if (deltaX > 100) {
          return
        }
      },
      tabsTouchEnd() {

      }
    },
    components: {
      vHeader,
      Scroll,
      Slide,
      PlayList,
      pullDownLoading,
      Refresh
    }
  }

</script>

<style lang="less" scoped rel="stylesheet/less">
  #home {
    &.slideLeft-enter, &.slideLeft-leave {
      transform: translate3d(100%, 0, 0);
    }
    &.slideLeft-enter-active, .home-slideLeft-active {
      transition: all 0.3s ease-out;
    }
    .scrollList {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: fixed;
      top: 0.8rem;
      bottom: 0.6rem;
      .slideImage {
        position: relative;
        width: 100%;
        height: 1.8rem;
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
    }
  }
</style>
