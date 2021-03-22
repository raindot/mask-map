<template>
  <div class="bg-light">
    <div class="text-center py-4">口罩即時查</div>
    <div class="px-2">
      <label class="form-label">
        縣市：
      </label>
      <select class="form-select mb-2" v-model="currCity">
        <option v-for="city in cityList" :key="city">{{ city }}</option>
      </select>
      <label class="form-label">
        行政區：
      </label>
      <select class="form-select mb-2" v-model="currDistrict">
        <option v-for="d in districtList" :key="d.id">{{ d.name }}</option>
      </select>
    </div>

    <div class="px-2">
      <label class="form-label">
        <div class="py-2 pl-4"> <i class="fas fa-search-location"></i> 藥局名稱搜尋：</div>
      </label>
        <input class="form-control" v-model="keywords" type="text" placeholder="請輸入關鍵字">
    </div>
      <div class="card my-3 mx-2"
        v-for="store in filteredStores"
        :key="store.id"
        @click="$emit('triggerMarkerPopup', store.id)">
        <div class="card-body">
          <div class="row gx-1 text-white flex-nowrap">
            <div class="col mask-count adult-mask rounded-3 me-3 px-3 py-3">
              <span>大人口罩</span>
              <div class="fs-3 text-nowrap">{{ store.mask_adult }} <span class="fs-5">個</span></div>
            </div>
            <div class="col mask-count child-mask rounded-3 px-3 py-3">
              <span>兒童口罩</span>
              <div class="fs-3 text-nowrap">{{ store.mask_child }} <span class="fs-5">個</span></div>
            </div>
          </div>
          <h5 class="card-title py-3" v-html="keywordHighlight(store.name)"></h5>
          <div>
            地址： {{store.address}}
          </div>
          <div>
            電話： {{store.phone}}
          </div>
          <div>
            最後更新時間: {{ store.updated }}
          </div>
          <div>
            {{store.custom_note}}
          </div>
        </div>
      </div>
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
  .adult-mask {
    background-color: #107879;
  }
  .child-mask {
    background-color: #e67f21;
  }
</style>
