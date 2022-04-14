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
                        <!-- 前一頁箭頭 -->
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
                          <li id="page-prev-function" class="page-item text-center"
>
                              <span class="page-link" aria-label="Previous"
                              :class="{'page-num-active':paginations[0].page === 1}"
                              @click="getAllShops('', 1)">
                                1
                              </span>
                          </li>
                        </template>

                        <!-- 左邊顯示更多 -->
                        <template v-for="page in paginations" :key="page.offset">
                          <li class="isMoreRight" v-if="page.page > 2">
                            <span>...</span>
                          </li>
                        </template>

                        <!-- 中間頁碼 -->
                        <template v-for="page in paginations" :key="page.offset">
                          <li id="page-item-function" class="page-item" v-for="i in page.total_page" :key="i" >
                              <span class="page-link page-num" v-if="i > 1 && i === page.page && i < page.total_page"
                              :class="{'page-num-active':paginations[0].page === i}"
                              @click="getAllShops('', i)"
                              >{{ i }}</span>
                          </li>
                        </template>

                        <!-- 右邊顯示更多 -->
                        <template v-for="page in paginations" :key="page.offset">
                          <li class="isMoreRight" v-if="page.page >= 2">
                            <span>...</span>
                          </li>
                        </template>

                        <!-- 末頁 -->
                          <li v-for="page in paginations" :key="page.offset">
                            <span>{{ page.total_page }}</span>
                          </li>

                        <!-- 下一頁箭頭 -->
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
      isStretch: false,
      pageNoBtnCount: 2,
      pageSize: 3,
      currentPage: 1
    }
  },
  watch: {
    $route (to, from) {
      if (this.$route.query.district && this.$route.query.category) {
        // 全部商圈 && 全部類別
        if (this.$route.query.district === 'total' && this.$route.query.category === 'total') {
          this.$store.dispatch('storesData/getAllTypes', { region: '', category: '', page: to.query.page })
          console.log('district === total && category === total', this.$route)
          // 全部商圈 && 其他類別
        } else if (this.$route.query.district === 'total' && this.$route.query.category !== 'total') {
          this.$store.dispatch('storesData/getAllTypes', { region: '', category: to.query.category, page: to.query.page })
          // 其他商圈 && 全部類別
        } else if (this.$route.query.district !== 'total' && this.$route.query.category === 'total') {
          this.$store.dispatch('storesData/getAllTypes', { region: to.query.district, category: '', page: to.query.page })
          console.log('district !== total && category === total', this.$route)
          // 其他商圈 && 其他類別
        } else if (this.$route.query.district !== 'total' && this.$route.query.category !== 'total') {
          this.$store.dispatch('storesData/getAllTypes', { region: to.query.district, category: to.query.category, page: to.query.page })
          console.log('district !== total && category !== total', this.$route)
        }
      } else {
        console.log('not include')
      }
    }
  },
  methods: {
    getShops () {
      this.$store.dispatch('storesData/getAllTypes', { region: '', category: '', page: 1 })
    },
    detailBtn (store) {
      console.log('detailBtn')
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
      console.log(page)
      if (this.$route.query.district === 'total' && this.$route.query.category === 'total') {
        // this.$store.dispatch('storesData/getAllTypes', { region: '', category: '', page: page })
        this.$router.push({
          path: '/inner/merchants',
          query: {
            uuid: `${this.$route.query.uuid}`,
            district: 'total',
            category: 'total',
            page: page
          }
        })
      } else if (this.$route.query.district === 'total' && this.$route.query.category !== 'total') {
        // this.$store.dispatch('storesData/getAllTypes', { region: '', category: this.TypeBtn, page: page })
        this.$router.push({
          path: '/inner/merchants',
          query: {
            uuid: `${this.$route.query.uuid}`,
            district: 'total',
            category: this.TypeBtn,
            page: page
          }
        })
      } else if (this.$route.query.district !== 'total' && this.$route.query.category === 'total') {
        // this.$store.dispatch('storesData/getAllTypes', { region: this.getMerchantValue, category: '', page: page })
        this.$router.push({
          path: '/inner/merchants',
          query: {
            uuid: `${this.$route.query.uuid}`,
            district: this.getMerchantValue,
            category: 'total',
            page: page
          }
        })
      } else {
        this.$router.push({
          path: '/inner/merchants',
          query: {
            uuid: `${this.$route.query.uuid}`,
            district: this.getMerchantValue,
            category: this.TypeBtn,
            page: page
          }
        })
      }
    },
    prevPage (remove) {
      remove--
      if (this.$route.query.district === 'total' && this.$route.query.category === 'total') {
        this.$store.dispatch('storesData/filterType', '')
        // this.$store.dispatch('storesData/getAllTypes', { region: '', category: '', page: remove })
        this.$router.push({
          path: '/inner/merchants',
          query: {
            uuid: `${this.$route.query.uuid}`,
            district: 'total',
            category: 'total',
            page: remove
          }
        })
      } else if (this.$route.query.district === 'total' && this.$route.query.category !== 'total') {
        this.$router.push({
          path: '/inner/merchants',
          query: {
            uuid: `${this.$route.query.uuid}`,
            district: 'total',
            category: this.TypeBtn,
            page: remove
          }
        })
      } else if (this.$route.query.district !== 'total' && this.$route.query.category === 'total') {
        this.$router.push({
          path: '/inner/merchants',
          query: {
            uuid: `${this.$route.query.uuid}`,
            district: this.getMerchantValue,
            category: 'total',
            page: remove
          }
        })
      } else {
        this.$router.push({
          path: '/inner/merchants',
          query: {
            uuid: `${this.$route.query.uuid}`,
            district: this.getMerchantValue,
            category: this.TypeBtn,
            page: remove
          }
        })
        // this.$store.dispatch('storesData/getAllTypes', { region: this.getMerchantValue, category: this.TypeBtn, page: remove })
      }
    },
    nextPage (add) {
      add++
      if (this.$route.query.district === 'total' && this.$route.query.category === 'total') {
        this.$store.dispatch('storesData/filterType', '')
        // this.$store.dispatch('storesData/getAllTypes', { region: '', category: '', page: remove })
        this.$router.push({
          path: '/inner/merchants',
          query: {
            uuid: `${this.$route.query.uuid}`,
            district: 'total',
            category: 'total',
            page: add
          }
        })
      } else if (this.$route.query.district === 'total' && this.$route.query.category !== 'total') {
        this.$router.push({
          path: '/inner/merchants',
          query: {
            uuid: `${this.$route.query.uuid}`,
            district: 'total',
            category: this.TypeBtn,
            page: add
          }
        })
      } else if (this.$route.query.district !== 'total' && this.$route.query.category === 'total') {
        this.$router.push({
          path: '/inner/merchants',
          query: {
            uuid: `${this.$route.query.uuid}`,
            district: this.getMerchantValue,
            category: 'total',
            page: add
          }
        })
      } else {
        this.$router.push({
          path: '/inner/merchants',
          query: {
            uuid: `${this.$route.query.uuid}`,
            district: this.getMerchantValue,
            category: this.TypeBtn,
            page: add
          }
        })
        console.log(123)
        // this.$store.dispatch('storesData/getAllTypes', { region: this.getMerchantValue, category: this.TypeBtn, page: remove })
      }
    }
  },
  mounted () {
    // this.getShops()
    console.log(this.$route)
    // 全部商圈 && 全部類別
    if (this.$route.query.district === 'total' && this.$route.query.category === 'total') {
      this.$store.dispatch('storesData/getAllTypes', { region: '', category: '', page: this.$route.query.page })
      console.log('mounted if', this.$route)
      // 全部商圈 && 其他類別
    } else if (this.$route.query.district === 'total' && this.$route.query.category !== 'total') {
      this.$store.dispatch('storesData/getAllTypes', { region: '', category: this.$route.query.category, page: this.$route.query.page })
      console.log('mounted else if 1', this.$route)
      // 其他商圈 && 全部類別
    } else if (this.$route.query.district !== 'total' && this.$route.query.category === 'total') {
      this.$store.dispatch('storesData/getAllTypes', { region: this.$route.query.district, category: '', page: this.$route.query.page })
      console.log('mounted else if 2', this.$route)
      // 其他商圈 && 其他類別
    } else {
      this.$store.dispatch('storesData/getAllTypes', { region: this.$route.query.district, category: this.$route.query.category, page: this.$route.query.page })
      console.log('else', this.$route)
    }
    // if (this.$route.query.district === 'total' && this.$route.query.category === 'total' && this.page === 1) {
    //   this.$store.dispatch('storesData/filterType', '')
    //   this.$store.dispatch('storesData/getAllTypes', { region: '', category: '', page: 1 })
    //   // console.log('ok', this.$route)
    // } else if (this.TypeBtn === '' && this.page === 1) {
    //   // console.log('else', this.$route)
    //   this.$store.dispatch('storesData/filterType', '')
    //   this.$store.dispatch('storesData/getAllTypes', { region: '', category: '', page: 1 })
    // }
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
  .page-num{
    color: #81CFF7;
    // margin: 0 5px;
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
  .page-link{
    font-size: 14px;
    color: #81CFF7;
  }
</style>
