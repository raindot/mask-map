import { reactive, computed } from 'vue'
const state = reactive({
  currCity: '臺北市',
  currDistrict: '大安區',
  location: [],
  stores: [],
  keywords: '',
  cityList: computed(() => state.location.map(d => d.name)),
  districtList: computed(() => state.location.find(d => d.name === state.currCity)?.districts || []),
  filteredStores: computed(() => {
    const { stores } = state
    return state.keywords ? stores.filter(d => d.name.includes(state.keywords)) : stores.filter(d => d.county === state.currCity && d.town === state.currDistrict)
  }),
  currDistrictInfo: computed(() => state.districtList.find(d => d.name === state.currDistrict) || {})
})

const fetchLocations = async () => {
  const location = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json')
    .then(res => {
      return res.json()
    })
  state.location = location
}

const fetchPharmacies = async () => {
  const json = await fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
    .then(res => {
      return res.json()
    })
  const stores = json.features.map(d => ({
    ...d.properties,
    latitude: d.geometry.coordinates[0],
    longitude: d.geometry.coordinates[1]
  }))
  state.stores = stores
}

export default {
  state,
  fetchLocations,
  fetchPharmacies
}
