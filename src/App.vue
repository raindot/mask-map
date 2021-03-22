<template>
<div id="app">
  <aside-menu ref="aside-menu" @triggerMarkerPopup="openPopup"></aside-menu>
  <!-- 地圖區塊 -->
  <mask-map class="mask-map" id="mask-map" ref="map"></mask-map>
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

<style lang="scss" src="./assets/style/style.scss"></style>
