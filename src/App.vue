<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/merchants">Merchants</router-link>
  </div> -->
  <router-view/>
</template>

<script>
export default {
  methods: {
    mobileMode () {
      console.log('3, mobileMode')
      window.addEventListener('orientationchange', () => {
        if (window.orientation === 0) { // portrait
          console.log('portrait')
        } else if (window.orientation === 90 || window.orientation === -90) { // landscape
          alert('請將手機轉回直式')
        }
      })
    }
  },
  mounted () {
    if (window.orientation === 90 || window.orientation === -90) {
      console.log('2, if判斷式')
      alert('請將手機轉回直式')
    } else {
      console.log('2, if判斷式 portrait')
    }
    this.mobileMode()
  }
}
</script>

<style lang="scss">
body{
  height: 100%;
  background-color: #2270B0;
  #app {
    max-width: 576px;
  }
}
@import './assets/all';
</style>
