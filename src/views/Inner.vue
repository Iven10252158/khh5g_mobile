<template>
    <div class="inner">
        <div class="page-top">
            <div class="bg-cover main_banner" ref="headerH"></div>
        </div>
        <div class="btns-group" :style="{ top: this.$store.state.headerH + 'px' }">
            <button type="button" class="back-arrow" @click="backBtn">
                <img src="~@/assets/back.svg" alt="">
            </button>
            <button type="button" class="shop">商家</button>
        </div>
        <div class="wrap d-flex justify-content-center" :style="{ top: (  this.$store.state.headerH + 46) + 'px'}">
            <button type="button" class="shop-menu d-flex align-items-center justify-content-start" @click="areaBtn">
                    <img src="~@/assets/icon_menu.svg" alt="">
                    <span class="mb-0">商圈</span>
                    <span class="mb-0 w-50 text-end" v-if="this.$route.query.district === 'total'">OSENSE 品牌館</span>
                    <span class="mb-0 w-50 text-end" v-if="this.$route.query.district !== 'total'">{{ this.$route.query.district }}</span>
            </button>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
  data () {
    return {
      headerH: ''
    }
  },
  computed: {
    page () {
      return this.$store.getters['storesData/page']
    }
  },
  methods: {
    areaBtn () {
      this.$store.commit('isStretch')
    },
    backBtn () {
      if (this.$route.path === '/inner/merchants') {
        this.$router.push({
          path: '/content',
          query: {
            uuid: this.$route.query.uuid
          }
        })
      } else if (this.$route.path === '/inner/merchantDetail') {
        this.$router.go(-1)
      }
    }
  },
  mounted () {
    // console.log('inner')
    this.$store.commit('headerH', this.$refs.headerH.clientHeight)
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => setTimeout(() => {
      console.log('1, resize')
      // const vh = window.innerHeight * 0.01
      // document.documentElement.style.setProperty('--vh', `${vh}px`)
      this.$store.commit('headerH', this.$refs.headerH.clientHeight)
    }, 30))
    // this.$router.replace({
    //   path: '/inner/merchants',
    //   query: {
    //     uuid: `${this.$route.query.uuid}`,
    //     district: 'total',
    //     category: 'total',
    //     page: 1
    //   }
    // })
  }
}
</script>

<style lang="scss" scoped>
.inner{
    position: relative;
    height: 100vh;
    background-color: #2270B0;
}
.bg-cover{
  background-size: cover;
  background-position: center center;
}
.page-top{
  position: absolute;
  width: 100%;
  background-color: #2270B0;
  .main_banner {
    background-image: url('~@/assets/bg.png');
    margin: auto;
    padding-top: 51.63%;
  }
}
.btns-group{
  position: absolute;
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
    @media(max-width:320px) {
      img {
        width: 25px;
        height: 25px;
      }
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
    @media(max-width:320px) {
      font-size: 20px;
    }
  }
}
.shop {
  border: 0;
  width: 70%;
  color: #fff;
  background: linear-gradient(180deg, #86D4FA 0%, #52A1D9 51.56%, #86D4FA 100%);
}
  .wrap{
    position: absolute;
    width: 100%;
    background-color: #18588C;
        .shop-menu {
        width: 92%;
        border: 0;
        padding: 10px 5px;
        background-color: #18588C;

            span{
            color: #fff;
            padding-left: 5px;
            }
        }
  }
</style>
