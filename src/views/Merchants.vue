<template>
    <div class="about">
        <div class="page-top" ref="headerH">
            <img class="img-fluid d-block" src="~@/assets/bg.png" alt="">
        </div>
        <div class="btns-group" :style="{ top: headerH + 'px' }">
            <button type="button" class="back-arrow" @click="toHome">
                <img src="~@/assets/back.svg" alt="">
            </button>
        <button type="button" class="shop">商家</button>
      </div>
      <div class="content">

      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      headerH: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        window.onload = () => {
          this.headerH = this.$refs.headerH.offsetHeight
          console.log('1.', this.headerH)
        }
        window.addEventListener('resize', () => {
          this.headerH = this.$refs.headerH.offsetHeight
          console.log('2.', this.headerH)
        })
      }, 0)
    })
  }
}
</script>

<style lang="scss" scoped>
.about {
  position: relative;
  height: 100vh;
  // overflow: hidden;
}
.page-top{
  position: fixed;
  width: 100%;
  background-color: #2270B0;

  @media(min-width: 320px) {
    .img-fluid{
      margin: auto;
    }
  }
}
.btns-group{
  position: fixed;
  width: 100%;
  height: 46px;
  .back-arrow{
    border: 0;
    background: linear-gradient(180deg, #FFF4B3 0%, #DED07B 50.21%, #FFF4B3 100%);
    position: absolute;
    left: 0;
    width: 25%;
    height: 46px;
    img {
      width: 30px;
      height: 30px;
    }
  }

  .shop{
    position: absolute;
    right: 0;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    height: 46px;
    border: 0;
    width: 75%;
    background: linear-gradient(180deg, #86D4FA 0%, #52A1D9 51.56%, #86D4FA 100%);
  }
}
.shop {
  border: 0;
  width: 70%;
  color: #fff;
  background: linear-gradient(180deg, #86D4FA 0%, #52A1D9 51.56%, #86D4FA 100%);
}
.content {
  background-color: #fa0;
  // height: 1000px;
  // overflow-y: scroll;
}
</style>
