<template>
    <div class="about" :style="{ top: (  this.$store.state.headerH + 46 + 44) + 'px'}">
      <div class="content">
        <SideMenu/>
        <router-view></router-view>
        <div class="type-menu" ref="typeH">
          <TypeMenu />
        </div>
        <div class="shops-wrap" ref="shopsH">
          <div class="row g-2">
            <div class="col-6 mt-0 d-flex justify-content-center shops" v-for="store in stores" :key="store.uuid">
              <button type="button" class="border-0" @click="detailBtn(store)">{{ store.name }}</button>
            </div>
          </div>
          <div v-if="stores.length ===0" class="increase text-white">此分類目前尚無新增店家哦！</div>
        </div>

        <!-- pagination -->
        <div class="pagination-bar my-3">
                <nav class="mb-0">
                    <ul class="pagination pagination-num d-flex justify-content-center mb-0 border-0">
                      <template v-for="page in paginations" :key="page.offset">
                        <li id="page-prev-function" class="page-item text-center"
                        :class="{'disabled': paginations[0].page === 1}">
                            <span class="page-link"
                              aria-label="Previous" @click="prevPage(paginations[0].page)">
                            <i class="fas fa-chevron-left"></i>
                            </span>
                        </li>
                      </template>
                        <template v-for="page in paginations" :key="page.offset">
                        <li id="page-item-function" class="page-item" v-for="i in page.total_page" :key="i" >
                            <span class="page-link page-num"
                            :class="{'page-num-active':paginations[0].page === i}"
                            @click="getAllShops('', i)"
                            >{{ i }}</span>
                        </li>
                        </template>
                        <template v-for="page in paginations" :key="page.offset">
                          <li id="page-next-function" class="page-item text-center" :class="{'disabled': paginations[0].page === paginations[0].total_page || paginations[0].total_page === 0}">
                              <span class="page-link" @click="nextPage(paginations[0].page)" aria-label="Next">
                              <i class="fas fa-chevron-right"></i>
                              </span>
                          </li>
                        </template>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import TypeMenu from '@/components/TypeMenu.vue'
import SideMenu from '@/components/SideMenu.vue'
export default {
  components: {
    TypeMenu,
    SideMenu
  },
  computed: {
    stores () {
      return this.$store.getters['storesData/storesData']
    },
    paginations () {
      return this.$store.getters['storesData/pagination']
    },
    page () {
      return this.$store.getters['storesData/page']
    },
    getMerchantValue () {
      return this.$store.getters['storesData/merchantValue']
    },
    TypeBtn () {
      return this.$store.getters['storesData/TypeBtn']
    },
    types () {
      return this.$store.getters['storesData/types']
    },
    routerPage () {
      return this.$route.query.page
    }
  },
  data () {
    return {
      headerH: '',
      contentH: '',
      isStretch: false
    }
  },
  // watch: {
  //   routerPage () {
  //     console.log('routerPage')
  //   },
  //   $route (to, from) {
  //     console.log('to', to)
  //     console.log('from', to)
  //   }
  // },
  beforeRouteUpdate (to, from) {
    // console.log(this.$route.query.page)
    console.log('to', to.query.page)
    this.$store.dispatch('storesData/getAllTypes', { region: '', type: '', page: to.query.page })
    console.log('from', from)
  },
  methods: {
    getShops () {
      this.$store.dispatch('storesData/getAllTypes', { region: '', type: '', page: 1 })
    },
    detailBtn (store) {
      this.$store.commit('storeInformation', store)
      this.$router.push({
        path: '/inner/merchantDetail',
        query: {
          uuid: `${this.$route.query.uuid}`,
          district: `${store.region}`,
          merchantUUID: `${store.uuid}`
        }
      })
    },
    getAllShops (item, page = 1) {
      if (this.$route.query.district === 'total') {
        this.$store.dispatch('storesData/getAllTypes', { region: '', type: this.TypeBtn, page: page })
        this.$router.push({
          path: '/inner/merchants',
          query: {
            uuid: `${this.$route.query.uuid}`,
            district: 'total',
            category: 'total',
            page: page
          }
        })
      } else {
        this.$store.dispatch('storesData/getAllTypes', { region: this.getMerchantValue, type: this.TypeBtn, page: page })
      }
    },
    prevPage (remove) {
      remove--
      if (this.$route.query.district === 'total') {
        this.$store.dispatch('storesData/filterType', '')
        this.$store.dispatch('storesData/getAllTypes', { region: '', type: '', page: remove })
        // this.$router.push({
        //   path: '/inner/merchants',
        //   query: {
        //     uuid: `${this.$route.query.uuid}`,
        //     district: 'total',
        //     category: 'total',
        //     page: remove
        //   }
        // })
      } else {
        this.$store.dispatch('storesData/getAllTypes', { region: this.getMerchantValue, type: this.TypeBtn, page: remove })
      }
    },
    nextPage (add) {
      add++
      if (this.$route.query.district === 'total') {
        this.$store.dispatch('storesData/getAllTypes', { region: '', type: '', page: add })
        // this.$router.push({
        //   path: '/inner/merchants',
        //   query: {
        //     uuid: `${this.$route.query.uuid}`,
        //     district: 'total',
        //     category: 'total',
        //     page: add
        //   }
        // })
      } else {
        this.$store.dispatch('storesData/getAllTypes', { region: this.getMerchantValue, type: this.TypeBtn, page: add })
      }
    }
  },
  mounted () {
    // this.getShops()
    if (this.$route.query.district === 'total' && this.$route.query.category === 'total' && this.page === 1) {
      this.$store.dispatch('storesData/filterType', '')
      this.$store.dispatch('storesData/getAllTypes', { region: '', type: '', page: 1 })
      // console.log('ok', this.$route)
    } else if (this.TypeBtn === '' && this.page === 1) {
      // console.log('else', this.$route)
      this.$store.dispatch('storesData/filterType', '')
      this.$store.dispatch('storesData/getAllTypes', { region: '', type: '', page: 1 })
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  position: relative;
}
.bg-cover{
  background-size: cover;
  background-position: center center;
}
.content {
  background-color: #2270B0;
  position: absolute;
  width: 100%;
  padding-bottom: 10px;

  .type-menu{
    margin-top: 10px;
  }

  .shops-wrap {
    width: 90%;
    margin: 0 auto;

    .shops{
        button{
        background-color: #18588C;
        color: #81CFF7;
        border-radius: 10px;
        margin: 10px 5px 0;
        width: 165px;
        font-size: 14px;
        padding: 10px 0;
        height: 80%;
        @media(max-width: 375px) {
          // width: 150px;
          font-size: 12px;
          margin: 10px 5px 0;
        }

        @media(max-width: 320px) {
          // width: 140px;
          // width: 90%;
          font-size: 12px;
          margin: 10px auto 0;
        }
      }
    }
  }
}
// .shops-wrap:nth-child(odd) {
//     width: 90%;
//     margin: 0 auto 10px;
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;

//     .shops::after {
//       content: '';
//       display: block;
//       background-color: #18588C;
//       color: #81CFF7;
//       border-radius: 10px;
//       margin: 10px 5px 0;
//       width: 165px;
//       font-size: 14px;
//       padding: 10px 0;
//       height: 80%;
//     }
// }
.pagination-bar{
  width: 90%;
  margin: auto;
  transition: all 1s;
  .page-link{
    font-size: 14px;
    color: #81CFF7;
  }
  .page-num{
    color: #81CFF7;
    margin: 0 10px;
    font-size: 14px;
    font-weight: 600;
  }
  .page-num-active{
      background-color: #FEF2B1;
      padding: 5px 10px;
      border-radius: 50%;
      color: #2270B0;
  }
}
</style>
