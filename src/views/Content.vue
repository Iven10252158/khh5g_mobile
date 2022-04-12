<template>
  <div class="home" :class="$style.height">
    <div class="media-block">
      <div class="header-bg bg-cover">
        <div v-show="showImage" class="header-banner bg-cover" :style="{backgroundImage:'url(' +image+ ')'}" ></div>
        <div class="header-banner bg-cover" v-show="!showImage">
            <YoutubeVue3 ref="youtube" :videoid="youtubeSrc" :width="width" :height="height" @ended="onEnded" @paused="onPaused" @played="onPlayed"/>
        </div>
      </div>
    </div>
    <div class="content-bottom">
        <div class="media-bottom"></div>
    </div>
    <router-link :to="{
      path : '/inner/merchants' ,
        query: {
          uuid: `${$route.query.uuid}`,
          district: 'total',
          category: 'total',
          page: 1
        }}"
    class="merchants-btn text-decoration-none">
      <p class="mb-0 pe-3">
          <img class="d-block" src="~@/assets/Vector.svg" alt="">
        </p>商家
    </router-link>
  </div>
</template>

<script>
import { connectSocket } from '../webSocket/websocket'
import YoutubeVue3 from '@/components/YoutubeVue3.vue'
export default {
  components: {
    YoutubeVue3
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  watch: {
    image () {
      if (this.image) {
        this.showImage = true
        this.isLoading = false
      }
    },
    youtubeSrc () {
      if (this.youtubeSrc) {
        this.showImage = false
        this.isLoading = false
      }
    }
  },
  computed: {
    youtubeSrc () {
      return this.$store.getters['ws/video']
    },
    image () {
      return this.$store.getters['ws/image']
    },
    page () {
      return this.$store.getters['storesData/page']
    }
  },
  data () {
    return {
      showImage: true,
      orientationAngle: 0
    }
  },
  methods: {
    getPageID () {
      this.$http.get(`${process.env.VUE_APP_URL}/template/${this.$route.query.uuid}`)
        .then(res => {
          // console.log(process.env.VUE_APP_URL)
          // console.log(res)
          connectSocket(res.data.uuid)
        })
    },
    onPlayed () {
      // console.log('## OnPlayed')
    },
    onEnded () {
      // console.log('## OnEnded')
      this.$refs.youtube.player.seekTo(0)
    },
    onPaused () {
      console.log('## OnPaused')
    }
    // getShops () {
    //   this.$store.dispatch('storesData/getAllTypes', { region: '', type: '', page: 1 })
    //   console.log('getShops')
    // }
  },
  mounted () {
    this.getPageID()
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => setTimeout(() => {
      console.log('1, resize')
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }, 30))
  }
}
</script>

<style scoped module>
  .height {
    height: calc(var(--vh, 1vh) * 100);
    overflow: hidden;
    background-color: #2270B0;
  }
</style>

<style lang="scss" scoped>
  .home{
    position: relative;
    max-width: 576px;
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
    background-image: url("~@/assets/background.png");
    padding-top: 76.16%;
  }
  .header-banner{
    position: absolute;
    top: 23%;
    left: 4%;
    // background-image: url("~@/assets/輕軌_16x9.png");
    width: 92%;
    height: 68.5%;
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
      font-size: 20px;

    }
  }
</style>
