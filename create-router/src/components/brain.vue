<template>
  <div class="map" style="height: 80vh">
    <select v-model="selected" @change="changeArea">
      <option disabled value="">אנא בחר איזור</option>
      <option v-for="area in areaList" :key="area.name">{{ area.name }}</option>
    </select>
    <LMap :zoom="zoom" :center="center">
      <LTileLayer :url="url"></LTileLayer>
    </LMap>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
import { icon } from "leaflet";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  },
  data() {
    return {
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 16,
      center: [40.73061, -73.935242],
      bounds: null,
      selected: "",
      areaList: [
        {
          name: "ברונקס",
          coordinates: [40.84985, -73.86641]
        },
        {
          name: "מנהטן",
          coordinates: [40.730610, -73.935242]
        },
        {
          name: "ברוקלין",
          coordinates: [40.650002, -73.949997]
        },
        {
          name: "קווינס",
          coordinates: [40.742054, -73.769417]
        },
        {
          name: "סטייטן איילנד",
          coordinates: [40.51542, -74.2457]
        }
      ]
    };
  },
  methods: {
      changeArea: function () {
          this.center = this.areaList.find(area => area.name === this.selected).coordinates;
      }
  },
};
</script>
