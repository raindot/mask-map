<template>
  <div class="mask-map" id="mask-map">
  </div>
</template>

<script>
import L from 'leaflet'
export default {
  name: 'MaskMap',
  data () {
    return {
      map: {},
      markers: []
    }
  },
  mounted () {
    this.map = L.map('mask-map', {
      center: [25.03, 121.55],
      zoom: 14
    })
    // delete L.Icon.Default.prototype._getIconUrl
    // L.Icon.Default.prototype.options.iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png'
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '<a target="_blank" href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(this.map)
  },
  methods: {
    addMarker (item) {
      // const ICON = {
      //   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
      //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      //   iconSize: [25, 41],
      //   iconAnchor: [12, 41],
      //   shadowSize: [41, 41]
      // }
      const marker = L.marker([item.longitude, item.latitude])
        .addTo(this.map)
        .bindPopup(`<h4 class="popup-name">${item.name}</h4>
        <div class="row text-white flex-nowrap">
          <div class="col fs-6 text-nowrap adult-mask rounded-3 me-2 px-2 py-2">成人：${item.mask_adult}</div>
          <div class="col fs-6 text-nowrap child-mask rounded-3 px-2 py-2">兒童：${item.mask_child}</div>
        </div>`)
      marker.markerId = item.id
      marker.lng = item.longitude
      marker.lat = item.latitude
      this.markers.push(marker)
    },
    clearMarker () {
      this.map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer)
        }
      })
      this.markers.length = 0
    },
    triggerPopup (markerId) {
      const marker = this.markers.find(d => d.markerId === markerId)
      this.map.flyTo(new L.LatLng(marker.lng, marker.lat), 15)
      marker.openPopup()
    }
  },
  computed: {
    currDistrictInfo () {
      return this.$store.getters.currDistrictInfo
    },
    filteredStores () {
      return this.$store.getters.filteredStores
    }
  },
  watch: {
    currDistrictInfo (dist) {
      this.map.panTo(new L.LatLng(dist.latitude, dist.longitude))
    },
    filteredStores (stores) {
      this.clearMarker()
      stores.forEach(store => this.addMarker(store))
    }
  }
}
</script>
