<template>
  <div class="aside-menu">
    <div class="wraps">
      <label>
        縣市：<select v-model="currCity">
          <option v-for="city in cityList" :key="city">{{ city }}</option>
        </select>
      </label>
      <label>
        行政區：<select v-model="currDistrict">
          <option v-for="d in districtList" :key="d.id">{{ d.name }}</option>
        </select>
      </label>
    </div>

    <div class="wraps">
      <label>
        <i class="fas fa-search-location"></i> 藥局搜尋：
        <input v-model="keywords" type="text" placeholder="請輸入關鍵字">
      </label>
    </div>
    <ul class="store-lists">
      <li class="store-info wraps"
        v-for="store in filteredStores"
        :key="store.id"
        @click="$emit('triggerMarkerPopup', store.id)">
        <h1 v-html="keywordHighlight(store.name)"></h1>

        <div class="mask-info">
          <i class="fas fa-head-side-mask"></i>
          <span>大人口罩: {{ store.mask_adult }} 個</span>
        </div>

        <div class="mask-info">
          <i class="fas fa-baby"></i>
          <span>兒童口罩: {{ store.mask_child }} 個</span>
        </div>

        <div class="mask-info">
          最後更新時間: {{ store.updated }}
        </div>

        <button class="btn-store-detail">
          <i class="fas fa-info-circle"></i>
          看詳細資訊
        </button>
      </li>
    </ul>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions(['fetchLocations', 'fetchPharmacies']),
    keywordHighlight (val) {
      return val.replace(new RegExp(this.keywords, 'g'), `<span class="highlight">${this.keywords}</span>`)
    }
  },
  mounted () {
    this.fetchLocations()
    this.fetchPharmacies()
  },
  computed: {
    currCity: {
      get () {
        return this.$store.state.currCity
      },
      set (value) {
        this.$store.commit('setcurrCity', value)
      }
    },
    currDistrict: {
      get () {
        return this.$store.state.currDistrict
      },
      set (value) {
        this.$store.commit('setcurrDistrict', value)
      }
    },
    keywords: {
      get () {
        return this.$store.state.keywords
      },
      set (value) {
        this.$store.commit('setKeywords', value)
      }
    },
    ...mapGetters(['cityList', 'districtList', 'filteredStores'])
  },
  watch: {
    districtList (v) {
      const [arr] = v
      this.currDistrict = arr.name
    }
  }
}
</script>

<style lang="scss">
  .highlight {
    color: #f08d69;
  }
</style>
