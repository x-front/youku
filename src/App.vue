<template>
  <div id="app">
    <router-view></router-view>
    <nav-list></nav-list>
  </div>
</template>

<script>
  import navList from 'components/navList/navList'

  export default {
    components: {
      navList
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">

</style>
