<template>
  <div class="map" style="height: 80vh">
    <LMap :zoom="zoom" :center="center">
      <LTileLayer :url="url"></LTileLayer>
      <LMarker :lat-lng="[40.731810,-73.936542]">
        <!-- <eventPopUp v-show="popUpShow" v-bind="events[0]" v-on:closePopUp="popUpShow = false" ></eventPopUp> -->
      </LMarker>
      <LMarker :lat-lng="[40.730620,-73.934250]"></LMarker>
      <LMarker :lat-lng="[40.730529,-73.935949]"></LMarker>
    </LMap>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import eventPopUp from "../components/eventPopUp"
import reports from "../../data/reports_json.json";

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    eventPopUp,
  },
  data() {
    return {
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 16,
      center: [40.730610,-73.935242],
      bounds: null,
      staticAnchor: [16, 37],
      popUpShow: true,
      events: reports
    };
  }
}
</script>
