<template>
  <nav>
    <ul>
      <router-link tag="li" to="/home">
        <i class="icon-homepage"></i>
        <p class="tab-link">首页</p>
      </router-link>
      <router-link tag="li" to="/find">
        <i class="icon-find"></i>
        <p class="tab-link">发现</p>
      </router-link>
      <router-link tag="li" to="/vip">
        <i class="icon-vip"></i>
        <p class="tab-link">VIP会员</p>
      </router-link>
      <router-link tag="li" to="/star">
        <i class="icon-star"></i>
        <p class="tab-link">星球</p>
      </router-link>
      <router-link tag="li" to="/mine">
        <i class="icon-people"></i>
        <p class="tab-link">我的</p>
      </router-link>
    </ul>
  </nav>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="less" scoped rel="stylesheet/less">
  nav {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 500;
    height: 0.45rem;
    padding-top: 0.05rem;
    width: 100%;
    border-top: 1px solid #ccc;
    background-color: #fff;
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      li {
        flex: 1;
        font-size: 0.14rem;
        text-align: center;
        i {
          font-size: 0.24rem;
        }
        &.router-link-active {
          color: #2a94ff;
        }
      }
    }
  }
</style>
