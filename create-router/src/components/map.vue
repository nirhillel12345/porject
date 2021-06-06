<template>
  <div class="map" style="height: 80vh">
    <LMap :zoom="zoom" :center="center">
      <LTileLayer :url="url"></LTileLayer>
      <LMarker :lat-lng="[40.731810,-73.936542]">
          <l-icon
          :icon-anchor="staticAnchor"
          class-name="someExtraClass"
        >
          <img src="map-service/src/assets/running_man.png">
        </l-icon>
      </LMarker>
      <LMarker :lat-lng="[40.730620,-73.934250]"></LMarker>
      <LMarker :lat-lng="[40.730529,-73.935949]"></LMarker>
    </LMap>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 16,
      center: [40.730610,-73.935242],
      bounds: null,
      staticAnchor: [16, 37],
    };
  }
}
</script>
