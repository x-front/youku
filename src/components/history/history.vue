<template>
  <transition name="slideTop">
    <div id="history">
      <div class="top">
        <span class="float_l" @click="back" v-show="writeOff!==true">
          <i class="icon-return"></i>
        </span>
        观看历史
        <em class="float_r" @click="writeHistory"><i v-if="writeOff!==true">编辑</i><i v-if="writeOff===true">取消</i></em>
      </div>
      <div class="filter" v-show="writeOff!==true">
        过滤短视频
        <div class="off" :class="{ac:offFilter===true}" @click="filterOff">
          <span></span>
          <i></i>
        </div>
      </div>
      <scroll :data="historyToday"
              class="scroll-wrapper"
              :pulldown="true"
              @pulldown="pulldown"
      >
        <div>
          <pull-down-loading class="pulldown"></pull-down-loading>
          <dl>
            <dt v-if="historyToday.length>0"><span></span>今天</dt>
            <dd v-for="(item,index) in historyToday">
              <div class="checkBox" v-show="writeOff===true">
                <label>
                  <input type="checkbox" :value="index" v-model="checkBox">
                  <div class="tick" :class="{ac:checkBox.indexOf(index)!==-1}">
                    <i class="icon-tick" v-if="checkBox.indexOf(index)!==-1"></i>
                  </div>
                </label>
              </div>
              <div>
                <img v-lazy="item.image" alt="item.image">
                <h5>{{item.title}}</h5>
                <em>已在<i v-if="item.device===1">电脑</i><i v-if="item.device===2">手机</i>上观看{{item.finish}}</em>
                <div class="next" v-if="item.next && writeOff!==true">
                  <p><i class="icon-next"></i></p>
                  下一集
                </div>
              </div>
            </dd>
            <dt v-if="historyWeek.length>0"><span></span>7天内</dt>
            <dd v-for="(item,index) in historyWeek">
              <div class="checkBox" v-if="writeOff===true">
                <label>
                  <input type="checkbox" :value="index" v-model="checkBoxWeek">
                  <div class="tick" :class="{ac:checkBoxWeek.indexOf(index)!==-1}">
                    <i class="icon-tick" v-if="checkBoxWeek.indexOf(index)!==-1"></i>
                  </div>
                </label>
              </div>
              <div>
                <img v-lazy="item.image" alt="item.image">
                <h5>{{item.title}}</h5>
                <em>已在<i v-if="item.device===1">电脑</i><i v-if="item.device===2">手机</i>上观看{{item.finish}}</em>
                <div class="next" v-if="item.next && writeOff!==true">
                  <p><i class="icon-next"></i></p>
                  下一集
                </div>
              </div>
            </dd>
          </dl>
        </div>
      </scroll>
      <div class="delete" v-if="writeOff===true">
        <span @click="selectAll">全选</span>
        <span @click="deleteHistory" :class="{ac:checkBox.length+checkBoxWeek.length>0}">
          删除
          <i v-if="checkBox.length+checkBoxWeek.length>0">({{checkBox.length+checkBoxWeek.length}})</i>
        </span>
      </div>
      <loading v-if="historyToday.length<=0 && historyWeek.length<=0"></loading>
      <refresh v-if="pulldownLoading"></refresh>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import pullDownLoading from 'base/pulldown/pulldown'
  import Refresh from 'base/refresh/refresh'
  import axios from 'axios'

  export default{
    data() {
      return {
        checkBox: [],
        checkBoxWeek: [],
        historyToday: [],
        historyWeek: [],
        offFilter: false,
        writeOff: false,
        offAll: true,
        number: 0,
        pulldownLoading: false
      }
    },
    created() {
    },
    methods: {
      back() {
        this.$router.back()
      },
      filterOff() {
        this.offFilter = !this.offFilter
      },
      deleteHistory() {
        if (this.checkBox.length + this.checkBoxWeek.length === 0) {
          alert('请选择要删除内容')
          return
        }
        let arr = []
        let arrWeek = []
        for (let i = 0; i < this.historyToday.length; i++) {
          if (this.checkBox.indexOf(i) === -1) {
            arr.push(this.historyToday[i])
          }
        }
        for (let i = 0; i < this.historyWeek.length; i++) {
          if (this.checkBoxWeek.indexOf(i) === -1) {
            arrWeek.push(this.historyWeek[i])
          }
        }
        this.historyToday = arr
        this.historyWeek = arrWeek
        window.localStorage.setItem('historyToday', JSON.stringify(this.historyToday))
        window.localStorage.setItem('historyWeek', JSON.stringify(this.historyWeek))
        this.checkBox = []
        this.checkBoxWeek = []
      },
      selectAll(event) {
        let _this = this
        if (!this.offAll) {
          this.checkBox = []
          this.checkBoxWeek = []
          this.offAll = !this.offAll
        } else {
          _this.selectArr = []
          _this.historyToday.forEach(function (item, i) {
            _this.checkBox.push(i)
          })
          _this.historyWeek.forEach(function (item, i) {
            _this.checkBoxWeek.push(i)
          })
          this.offAll = !this.offAll
        }
      },
      writeHistory() {
        this.writeOff = !this.writeOff
      },
      pulldown() {
        this.pulldownLoading = true
        setTimeout(() => {
          this.pulldownLoading = false
          console.log(this.pulldownLoading)
        }, 1000)
        console.log(this.pulldownLoading)
      }
    },
    mounted () {
      setTimeout(() => {
        axios.get('static/history.json').then((data) => {
          let historyToday = JSON.parse(window.localStorage.getItem('historyToday'))
          let historyWeek = JSON.parse(window.localStorage.getItem('historyWeek'))
          if ((!historyToday && !historyWeek) || (historyToday.length === 0 && historyWeek.length === 0)) {
            this.historyToday = data.data.today
            this.historyWeek = data.data.week
            window.localStorage.clear('historyToday')
            window.localStorage.clear('historyWeek')
            return
          }
          this.historyToday = historyToday || data.data.today
          this.historyWeek = historyWeek || data.data.week
        })
      }, 1000)
    },
    components: {
      Loading,
      Scroll,
      pullDownLoading,
      Refresh
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  #history {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    min-height: 100%;
    z-index: 1000;
    background-color: #fff;
    padding-bottom: 0.4rem;
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
      border-bottom: 1px solid #eee;
      text-align: center;
      padding: 0 0.1rem;
      span {
        display: inline-block;
        width: 0.3rem;
        font-size: 0.2rem;
      }
      em {
        color: #188efb;
      }
    }
    .filter {
      height: 0.3rem;
      line-height: 0.3rem;
      padding: 0 0.1rem;
      border-bottom: 1px solid #ccc;
      font-size: 0.12rem;
      color: #666;
      position: relative;
      .off {
        width: 0.5rem;
        height: 100%;
        float: right;
        position: relative;
        &.ac span {
          background-color: #188efb;
          border-color: #188efb;
          right: 0;
        }
        &.ac i {
          background-color: #188efb;
        }
        span {
          position: absolute;
          right: 0.16rem;
          top: 0;
          bottom: 0;
          margin: auto 0;
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid #aaa;
          background-color: #fff;
          transition: all 0.3s;
          z-index: 10;
        }
        i {
          display: inline-block;
          width: 0.3rem;
          height: 2px;
          background-color: #ccc;
          position: absolute;
          right: 0;
          bottom: 0;
          top: 0;
          margin: auto 0;
          transition: all 0.3s;
        }
      }
    }
    .scroll-wrapper {
      position: fixed;
      top: 0.7rem;
      bottom: 0;
      width: 100%;
      overflow: hidden;
      dl {
        dt {
          padding: 0 0.1rem;
          height: 0.25rem;
          line-height: 0.25rem;
          font-size: 0.1rem;
          span {
            display: inline-block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #0f0;
            margin: -0.05rem 0.1rem 0 0;
            vertical-align: middle;
          }
        }
        dd {
          height: 0.5rem;
          border-bottom: 1px solid #ececec;
          margin-bottom: 0.1rem;
          position: relative;
          .checkBox {
            width: 0.3rem;
            height: 0.4rem;
            float: left;
            padding-left: 0.1rem;
            position: relative;
            overflow: hidden;
            input[type="checkbox"] {
              position: absolute;
              left: -0.2rem;
            }
            .tick {
              border: 1px solid #333;
              width: 0.15rem;
              height: 0.15rem;
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              text-align: center;
              line-height: 0.15rem;
              color: #fff;
              background-color: #fff;
              border-radius: 2px;
              &.ac {
                background-color: #188efb;
                border-color: #188efb;
              }
            }
          }
          img {
            margin: 0 0.1rem;
            width: 0.8rem;
            height: 0.45rem;
            float: left;
          }
          h5 {
            padding-top: 0.08rem;
            width: 2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font: 0.12rem / 0.12rem '楷体';
          }
          em {
            font: 0.1rem / 0.1rem '楷体';
            width: 2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .next {
            position: absolute;
            top: 0.04rem;
            right: 0.1rem;
            font-size: 0.1rem;
            text-align: center;
            color: #aaa;
            p {
              font-size: 0.2rem;
              color: #999;
            }
          }
        }
      }
    }
    .delete {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      height: 0.4rem;
      border-top: 1px solid #ccc;
      display: flex;
      span {
        display: inline-block;
        flex: 1;
        text-align: center;
        line-height: 0.4rem;
        background-color: #fff;
        border-right: 1px solid #ccc;
        &:last-of-type {
          border-right: none;
          color: rgba(255, 0, 0, 0.3);
        }
        &:last-of-type.ac {
          border-right: none;
          color: rgba(255, 0, 0, 1);
        }
      }
    }
  }
</style>
