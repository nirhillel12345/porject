<template>
  <div class="map">
    <select class="dropdown" v-model="selected">
      <option value="">כל האירועים</option>
      <option v-for="activity in activityList" :key="activity.name">{{ activity }}</option>
    </select>
    <LMap :zoom="zoom" :center="center" @click="showPoint">
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
      activityList: [
          "דקירה",
          "מרדף",
          "חטיפה",
          "ירי"
      ]
    };
  },
  methods: {
    showPoint: function(event) {
      alert(event.latlng);
    }
  }
};
</script>

<style scoped>
.map {
  height: 50vh;
  width: 75vw;
  direction: rtl;
  position: fixed;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.dropdown {
    margin-bottom: 2vh;
    height: 4vh;
    width: 25vh;
}
</style>
