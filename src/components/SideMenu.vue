<template>
        <div class="sideMenu" :class="{'sideMenu-100': this.$store.state.isStretch}">
            <ul class="list-unstyled mb-0">
                <li :class="{'active-color':$route.query.district === 'total'}">
                    <p class="mb-0" @click="totalMerchants(store, page)">全部商家</p>
                </li>
                <li :class="{'active-color':getMerchantValue === $route.query.district}">
                    <p class="mb-0" v-for="(store) in getCategoryArray" :key="store" @click="chooseStore(store, page)" >{{ store }}</p>
                </li>
            </ul>
        </div>
</template>

<script>
export default {
  data () {
    return {
      merchantsValue: ''
    }
  },
  computed: {
    getMerchantValue () {
      return this.$store.getters['storesData/merchantValue']
    },
    getCategoryArray () {
      return this.$store.getters['storesData/categories']
    }
  },
  methods: {
    getCategories () {
      this.$store.dispatch('storesData/getCategories')
    },
    totalMerchants (item, page = 1) {
      this.$store.commit('isStretch')
      this.$store.dispatch('storesData/getValue', item)
      this.merchantsValue = 'total'
      this.$store.dispatch('storesData/filterType', '')
      if (item === undefined) {
        this.$store.dispatch('storesData/getAllTypes', { region: '', category: '', page: page })
        this.$router.push({ path: '/inner/merchants', query: { uuid: this.$route.query.uuid, district: 'total', category: 'total', page: page } })
        this.$store.dispatch('storesData/getCategories')
      }
    },
    chooseStore (item, page = 1) {
      this.$store.commit('isStretch')
      this.$store.dispatch('storesData/getValue', item)
      this.$store.dispatch('storesData/filterType', '')
      this.merchantsValue = this.getMerchantValue
      console.log(this.merchantsValue)
      this.$store.dispatch('storesData/getAllTypes', { region: item, category: '', page: page })
      this.$router.push({ path: '/inner/merchants', query: { uuid: this.$route.query.uuid, district: `${item}`, category: 'total', page: page } })
    }
  },
  mounted () {
    this.getCategories()
    // this.merchantsValue = this.$route.query.district
  }
}
</script>

<style lang="scss" scoped>
  .sideMenu {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    background-color: #2270B0;
    transform: translateX(-100%);
    transition: transform .5s;
    li{
        p {
            width: 100%;
            padding: 10px 0;
            color: #81CFF7;
            text-align: center;
        }
    }
  }
  .active-color{
      background-color: #18588C;
  }
  .sideMenu-100{
    transform: translateX(0);
  }
</style>
