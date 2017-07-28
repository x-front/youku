<template>
  <div id="playList">
    <ul>
      <li v-for="item in homeList">
        <div class="image">
          <img v-lazy="item.image" :alt="item.title">
          <span :style="{
            backgroundColor:item.bg_color,
            color:item.text_color
          }"
                v-if="item.desc"
          >{{item.desc}}</span>
          <em v-if="item.intro">{{item.intro}}</em>
        </div>
        <h6>{{item.title}}</h6>
        <p>{{item.subtitle}}</p>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      homeList: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  #playList {
    width: 100%;
    padding: 0.2rem 0.1rem 0;
    box-sizing: border-box;
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;
      margin: 0 auto;
      li {
        width: 49.5%;
        padding-bottom: 0.1rem;
        .image {
          width: 100%;
          position: relative;
          border-radius: 3px;
          overflow: hidden;
          color: #fff;
          z-index: 10;
          span {
            display: inline-block;
            border-radius: 3px;
            background-color: #f00;
            text-align: center;
            line-height: 0.2rem;
            width: 0.4rem;
            height: 0.2rem;
            position: absolute;
            right: 0;
            top: 0;
          }
          img {
            width: 100%;
            height: 100%;
            float: left;
          }
          em {
            position: absolute;
            left: 0;
            bottom: 0;
            display: inline-block;
            height: 0.2rem;
            width: 100%;
            overflow: hidden;
            background-color: rgba(0, 0, 0, .3);
            font-size: 0.14rem;
            line-height: 0.2rem;
            text-indent: 0.5em;
          }
        }
        h6 {
          width: 100%;
          font-size: 0.16rem;
          height: 0.2rem;
          line-height: 0.2rem;
          overflow: hidden;
        }
        p {
          width: 100%;
          font-size: 0.14rem;
          height: 0.18rem;
          line-height: 0.18rem;
          overflow: hidden;
        }
      }
    }
  }
</style>
