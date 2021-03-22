<template>
<div id="app container bg-light">
  <div class="row">
    <aside-menu class="col-4" ref="aside-menu" @triggerMarkerPopup="openPopup"></aside-menu>
    <!-- 地圖區塊 -->
    <mask-map class="col-8" id="mask-map" ref="map"></mask-map>
  </div>
</div>
</template>

<script>
import AsideMenu from './components/AsideMenu'
import MaskMap from './components/MaskMap'
export default {
  name: 'App',
  components: {
    AsideMenu,
    MaskMap
  },
  methods: {
    openPopup (id) {
      this.$refs.map.triggerPopup(id)
    }
  }
}
</script>
