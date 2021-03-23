<template>
<div id="app container bg-light">
  <div class="row">
    <aside-menu class="col-4"></aside-menu>
    <!-- 地圖區塊 -->
    <mask-map class="col-8"></mask-map>
  </div>
</div>
</template>

<script>
import { provide } from 'vue'
import map from '@/composition/map'
import mapStore from '@/composition/store'
import AsideMenu from './components/AsideMenu'
import MaskMap from './components/MaskMap'
export default {
  name: 'App',
  components: {
    AsideMenu,
    MaskMap
  },
  setup () {
    provide('mapStore', mapStore)
    provide('map', map)
    mapStore.fetchLocations()
    mapStore.fetchPharmacies()
  }
}
</script>
