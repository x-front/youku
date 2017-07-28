<template>
  <transition name="slideLeft">
    <div id="star"
         @touchstart.prevent="tabsTouchStart"
         @touchmove.prevent="tabsTouchMove"
         @touchend.prevent="tabsTouchEnd"
    >
      <ul class="content">
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
        <li>fw2gag</li>
      </ul>
    </div>
  </transition>
</template>

<script>
  export default {
    created() {
      this.touch = {}
    },
    methods: {
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
            path: '/mine'
          })
        }
        if (deltaX > 100) {
          this.$router.push({
            path: '/vip'
          })
        }
      },
      tabsTouchEnd() {

      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">

</style>
