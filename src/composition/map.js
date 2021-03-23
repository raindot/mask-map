import { ref, watch, onMounted } from 'vue'
import L from 'leaflet'
import store from './store'

const map = ref(null)
const markers = []
const addMarker = item => {
  const marker = L.marker([item.longitude, item.latitude])
    .addTo(map.value)
    .bindPopup(`<h4 class="popup-name">${item.name}</h4>
    <div class="row text-white flex-nowrap">
      <div class="col fs-6 text-nowrap adult-mask rounded-3 me-2 px-2 py-2">成人：${item.mask_adult}</div>
      <div class="col fs-6 text-nowrap child-mask rounded-3 px-2 py-2">兒童：${item.mask_child}</div>
    </div>`)
  marker.markerId = item.id
  marker.lng = item.longitude
  marker.lat = item.latitude
  markers.push(marker)
}
const clearMarker = () => {
  map.value.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      map.value.removeLayer(layer)
    }
  })
  markers.length = 0
}
const triggerPopup = markerId => {
  const marker = markers.find(d => d.markerId === markerId)
  map.value.flyTo(new L.LatLng(marker.lng, marker.lat), 15)
  marker.openPopup()
}

const mapInit = (element) => {
  onMounted(() => {
    map.value = L.map(element, {
      center: [25.03, 121.55],
      zoom: 14
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '<a target="_blank" href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(map.value)
  })

  watch(() => store.state.currDistrictInfo, dist => {
    map.value.panTo(new L.LatLng(dist.latitude, dist.longitude))
  })
  watch(() => store.state.filteredStores, stores => {
    clearMarker()
    stores.forEach(store => addMarker(store))
  })
}

export default {
  triggerPopup,
  mapInit
}
