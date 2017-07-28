<template>
  <transition name="slideTop">
    <div id="player">
      <div class="playVideo" @click.stop="showControls">
        <div class="top" :class="{ac:offShow}">
          <span @click.prevent="back"><i class="icon-return"></i></span>
          <span>拆弹专家</span>
        </div>
        <video src="../../../static/video/video01.mp4" ref="video"></video>
        <div class="controls" :class="{ac:offShow}">
          <span @click.prevent.stop="playing"><i class="icon-play"></i></span>
          <em>{{CurrentTime}}</em>
          <div class="progress">
            <div class="line"></div>
            <div class="bar"></div>
          </div>
          <em>{{AllTime}}</em>
          <span @click="fullScreen"><i class="icon-fullscreen"></i></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getVideoAllTime, getVideoCurrentTime} from 'common/js/getVideoTime'

  export default{
    data() {
      return {
        offShow: false,
        AllTime: '00:00:00',
        CurrentTime: '00:00:00'
      }
    },
    methods: {
      showControls() {
        this.offShow = !this.offShow
        if (this.offShow === true) {
          const video = this.$refs.video
          video.playbackRate = 1.5
          this.AllTime = getVideoAllTime(video)
          setInterval(() => {
            this.CurrentTime = getVideoCurrentTime(video)
          }, 1000)
        }
      },
      back() {
        this.$router.back()
      },
      playing() {
        const video = this.$refs.video
        this.AllTime = getVideoAllTime(video)
        if (!video.paused) {
          video.pause()
        } else {
          video.play()
        }
        this.offShow = !this.offShow
      },
      fullScreen() {
        let docElm = document.documentElement
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen()
        }
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  #player {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: #fff;
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
    .playVideo {
      width: 100%;
      position: relative;
      height: 2.1rem;
      overflow: hidden;
      .top {
        width: 100%;
        height: 0.3rem;
        line-height: 0.3rem;
        position: absolute;
        top: -0.3rem;
        left: 0;
        z-index: 10;
        transition: all 0.3s;
        background-color: rgba(0, 0, 0, .2);
        color: #fff;
        &.ac {
          top: 0;
        }
      }
      video {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
      .controls {
        transition: all 0.3s;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        width: 100%;
        height: 0.3rem;
        line-height: 0.3rem;
        padding: 0 0.05rem;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        bottom: -0.3rem;
        z-index: 10;
        color: #fff;
        background-color: rgba(0, 0, 0, .2);
        &.ac {
          bottom: 0;
        }
        i {
          font-size: 0.26rem;
          line-height: 0.3rem;
        }
        em {
          font-size: 0.12rem;
        }
        .progress {
          flex: 0 0 2rem;
          width: 2rem;
          position: relative;
          overflow: hidden;
          .line {
            height: 2px;
            border-radius: 1px;
            background-color: #fff;
            margin-top: 0.15rem;
          }
          .bar {
            margin-top: 0.15rem;
            position: absolute;
            top: -5px;
            left: 1rem;
            width: 11px;
            height: 11px;
            background-color: #f60;
            border-radius: 50%;
            &:after {
              content: '';
              width: 2rem;
              height: 2px;
              background-color: #f69;
              position: absolute;
              top: 5px;
              left: -2rem;
            }
          }
        }
      }
    }
  }
</style>
