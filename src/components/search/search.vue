<template>
  <transition name="slideTop">
    <div id="search">
      <div class="top">
        <label>
          <i class="icon-search"></i>
          <input type="search" placeholder="海贼王" ref="searchText" @keyup="change" v-model="searchInput">
        </label>
        <input type="submit" value="搜索" v-if="!showSearch" @click="searchBtn">
        <input type="button" value="取消" v-if="showSearch" @click="back">
      </div>
      <div class="searchHistory" v-if="historyList.length">
        <p>搜索历史 <span @click="clearHistory"><i class="icon-clear"></i>清空</span></p>
        <ul>
          <li v-for="item in historyList">{{item}}</li>
        </ul>
      </div>
      <div class="rank">
        <ul>
          <li v-for="(item,index) in rank" @click="rankChange(item.w)">
            <p><span>{{index+1}}</span>{{item.w}}</p>
          </li>
        </ul>
        <loading v-show="!rank.length"></loading>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  import axios from 'axios'

  let historyList = ['楚乔生 TV版', '楚乔生 TV版']

  export default{
    data() {
      return {
        showSearch: true,
        rank: [],
        searchInput: '',
        historyList: JSON.parse(window.localStorage.getItem('history')) || historyList
      }
    },
    created() {
      this.change()
    },
    methods: {
      change() {
        this.searchInput === '' ? this.showSearch = true : this.showSearch = false
      },
      back() {
        this.$router.back()
      },
      rankChange(text) {
        this.searchInput = text
        this.showSearch = false
      },
      searchBtn() {
        if (!this.searchInput) {
          return
        }
        for (let i = 0; i < this.historyList.length; i++) {
          if (this.searchInput === this.historyList[i]) {
            return
          }
        }
        if (this.historyList.length >= 6) {
          this.historyList.pop()
        }
        this.historyList.unshift(this.searchInput)
        window.localStorage.setItem('history', JSON.stringify(this.historyList))
        this.searchInput = ''
        this.showSearch = false
      },
      clearHistory() {
        this.historyList = []
        window.localStorage.clear('history')
      }
    },
    mounted() {
      setTimeout(() => {
        axios.get('static/search.json').then((data) => {
          this.rank = data.data.r
        })
      }, 500)
      this.searchBtn()
    },
    components: {
      Loading
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  #search {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    min-height: 100%;
    z-index: 1000;
    background-color: #fff;
    &.slideTop-enter {
      transform: translate3d(0, 100%, 0);
      opacity: 0.5;
    }
    &.slideTop-leave {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    &.slideTop-enter-active, &.slideTop-leave-active {
      transition: all 0.3s ease-out;
      opacity: 1;
    }
    &.slideTop-leave-active {
      transition: all 0.3s ease-out;
      opacity: 0.5;
    }
    .top {
      padding: 0 0.1rem;
      height: 0.4rem;
      line-height: 0.4rem;
      border-bottom: 1px solid #eee;
      i {
        font-size: 0.2rem;
        vertical-align: middle;
      }
      input[type='submit'], input[type='button'] {
        padding-top: 0.1rem;
        width: 0.4rem;
        height: 0.3rem;
        border-radius: 3px;
        background-color: #fff;
        float: right;
        vertical-align: middle;
      }
      input[type='search'] {
        width: 2rem;
        height: 0.25rem;
        border-radius: 3px;
        vertical-align: middle;
      }
    }
    .searchHistory {
      padding: 0.1rem;
      border-bottom: 1px solid #eee;
      p {
        font-size: 0.14rem;
        height: 0.3rem;
        line-height: 0.3rem;
        span {
          float: right;
          font-size: 0.1rem;
          color: #999;
        }
      }
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        font-size: 0.12rem;
        li {
          width: 1.65rem;
          height: 0.24rem;
          line-height: 0.24rem;
          text-align: center;
          background-color: #eee;
          border-radius: 0.12rem;
          margin-bottom: 0.1rem;
          padding: 0 0.05rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .rank {
      font-size: 0.12rem;
      ul {
        padding: 0 0.1rem;
        li {
          height: 0.4rem;
          line-height: 0.4rem;
          span {
            display: inline-block;
            width: 14px;
            height: 14px;
            line-height: 14px;
            font-size: 10px;
            text-align: center;
            border-radius: 50%;
            background-color: #d9d9d9;
            color: #fff;
            margin-right: 10px;
          }
          &:nth-of-type(1) span {
            background-color: #f82a19;
          }
          &:nth-of-type(2) span {
            background-color: #ff6600;
          }
          &:nth-of-type(3) span {
            background-color: #ff900c;
          }
        }
      }
    }
  }
</style>
