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
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
