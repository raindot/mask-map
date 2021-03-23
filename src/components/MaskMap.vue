<template>
  <div class="mask-map" id="mask-map">
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'MaskMap',
  setup () {
    const map = inject('map')
    map.mapInit('mask-map')
  }
}
</script>
