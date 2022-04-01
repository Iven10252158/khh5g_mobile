<template>
  <div class="home" :class="$style.height">
    <div class="media-block">
      <div class="header-bg bg-cover">
        <div class="header-banner bg-cover"></div>
          <!-- <img class="img-fluid d-block header-banner" src="~@/assets/輕軌_16x9.png" alt=""> -->
      </div>
      <!-- <img class="d-block header-bg" src="~@/assets/home-page-top.png" alt=""> -->
    </div>
    <div class="content-bottom">
        <div class="media-bottom"></div>
        <!-- <img class="img-fluid d-block media-bottom" src="~@/assets/home-page-bottom.png" alt=""> -->
    </div>
    <button type="button" class="merchants-btn">
        <p class="mb-0 pe-3">
          <img class="d-block" src="~@/assets/Vector.svg" alt="">
        </p>商家
    </button>
  </div>
</template>

<script>

export default {
  mounted () {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    console.log(document.documentElement.style)
    window.addEventListener('resize', () => setTimeout(() => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }, 30))
  }
}
</script>

<style scoped module>
    .height {
    height: calc(var(--vh, 1vh) * 100);
    /* overflow: hidden; */
    background-color: #2270B0;
  }
</style>

<style lang="scss" scoped>
  .home{
    position: relative;
    max-width: 576px;
    // height: 100vh;
    // background-color: #2270B0;
    // z-index: 1;
  }
  .media-header, .media-bottom {
    margin: auto;
  }
  .bg-cover{
    background-size: cover;
    background-position: center center;
  }
  .header-bg {
    position: relative;
    // z-index: 2;
    background-image: url("~@/assets/background.png");
    // background-image: url("~@/assets/home-page-top.png");
    padding-top: 76.16%;
  }
  .header-banner{
    // z-index: 3;
    position: absolute;
    top: 23%;
    left: 4%;
    background-image: url("~@/assets/輕軌_16x9.png");
    // padding-top: 56.25%;
    width: 92%;
    height: 68.5%;
    // border: 3px solid #C4C4C4;
    // border-style: outset;
    // width: 91.7%;
    // height: 68%;
    // transform: translate(-50%, -50%);
  }
  .content-bottom{
    position: relative;
  }
  .media-bottom {
    background-size: cover;
    background-position: center top;
    background-image: url('~@/assets/home-page-bottom.png');
    padding-top: 87%;
  }
  .merchants-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 2px;
    border: 0;
    padding: 5px 0;
    border-radius: 15px;
    width: 90%;
    color: #C99000;
    font-size: 36px;
    font-weight: 700;
    background: linear-gradient(180deg, #FFF4B3 0%, #DED07B 50.21%, #FFF4B3 100%);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 8%;
    @media (max-width:320px) {
      font-size: 24px;

    }
  }
</style>
