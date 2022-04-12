<template>
  <ul class="list-unstyled mb-0 type-list">
        <li class="mb-0">
            <p class="mb-0 totalTypes" @click="totalTypes(type, page)"
            :class="{'type-active': TypeBtn === ''}">全部</p>
        </li>
        <li class="mb-2" @click="chooseType(type, page)" v-for="(type, index) in allTypes" :key="index">
            <p class="mb-0 chooseType" :class="{'type-active': type === TypeBtn}">{{ type }}</p>
        </li>
  </ul>
</template>

<script>
export default {
  computed: {
    allTypes () {
      return this.$store.getters['storesData/allTypes']
    },
    TypeBtn () {
      return this.$store.getters['storesData/TypeBtn']
    }
  },
  methods: {
    getCategories () {
      this.$store.dispatch('storesData/getCategories')
    },
    totalTypes (item, page = 1) {
      if (this.$route.query.district === 'total') {
        this.$store.dispatch('storesData/getAllTypes', { region: '', type: item, page: page })
        this.$store.dispatch('storesData/filterType', '')
        this.$router.push({ path: '/inner/merchants', query: { uuid: this.$route.query.uuid, district: 'total', category: 'total' } })
      } else {
        this.$store.dispatch('storesData/getAllTypes', { region: this.$route.query.district, type: item, page: page })
        this.$store.dispatch('storesData/filterType', item)
      }
    },
    chooseType (item, page = 1) {
      if (this.$route.query.district === 'total') {
        this.$store.dispatch('storesData/getAllTypes', { region: '', type: item, page: page })
        this.$store.dispatch('storesData/filterType', item)
        this.$router.push({ path: '/inner/merchants', query: { uuid: this.$route.query.uuid, district: this.$route.query.district, category: `${item}` } })
      } else {
        console.log('typeMenu', this.$route)
        this.$store.dispatch('storesData/getAllTypes', { region: this.$route.query.district, type: item, page: page })
        this.$store.dispatch('storesData/filterType', item)
        this.$router.push({ path: '/inner/merchants', query: { uuid: this.$route.query.uuid, district: this.$route.query.district, category: `${item}` } })
      }
    }
  },
  mounted () {
    this.getCategories()
  }
}
</script>

<style lang="scss" scoped>
    .type-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        li {
        margin-bottom: 15px;
        p{
        border-right: 1px solid #81CFF7;
        font-weight: 800;
        padding: 0 8px;
        color: #81CFF7;
        font-size: 16px;
        @media(max-width:375px) {
            font-size: 14px;
        }
            }
        }
        .type-active {
          color: #FEF2B1;
        }
    }
</style>
