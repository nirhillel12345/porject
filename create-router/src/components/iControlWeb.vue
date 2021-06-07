<template>
  <div class="map">
    <select class="dropdown" v-model="selected">
      <option value="">כל האירועים</option>
      <option v-for="activity in activityList" :key="activity.name">{{
        activity
      }}</option>
    </select>
    <LMap :zoom="zoom" :center="center" @click="showForm">
      <LTileLayer :url="url"></LTileLayer>
    </LMap>
    <md-dialog :md-active.sync="dialog" width=500>
      <activityForm @confirmActivity="dialog = false"></activityForm>
    </md-dialog>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
import { icon } from "leaflet";
import activityForm from "./form";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    activityForm
  },
  data() {
    return {
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 16,
      center: [40.73061, -73.935242],
      bounds: null,
      selectedPoint: [],
      dialog: false,
      selected: "",
      activityList: ["דקירה", "מרדף", "חטיפה", "ירי"]
    };
  },
  methods: {
    showForm: function(event) {
      this.selectedPoint = event.latlng;
      this.dialog = true;
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
