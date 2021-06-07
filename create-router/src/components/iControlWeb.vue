<template>
  <div class="map">
    <select class="dropdown" v-model="selected">
      <option value="">כל האירועים</option>
      <option v-for="activity in activityList" :key="activity.name">{{ activity }}</option>
    </select>
    <LMap :zoom="zoom" :center="center" @click="showPoint">
      <LTileLayer :url="url"></LTileLayer>
          <l-marker :lat-lng="[40.731810,-73.936542]">
          <l-popup>{{this.displayText}}</l-popup>
      </l-marker>
      <LMarker :lat-lng="[40.730620,-73.934250]">
          <l-popup class="popup">{{this.displayText}}</l-popup>
      </LMarker>
      <LMarker :lat-lng="[40.730529,-73.935949]">
          <l-popup class="popup">{{this.displayText}}</l-popup>
      </LMarker>
      </LMap>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import { icon } from "leaflet";
import reports from "../../data/reports_json.json";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
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
      ],
      events: reports,
      displayText: "",
    };
  },
  methods: {
    showPoint: function(event) {
      alert(event.latlng);
    }
  },
  mounted() {
      const event = this.events.reports[0];
      this.displayText = "סוג אירוע: " + event.ev_type + "\n" + 
                    "זמן אירוע: " + event.ev_time + "\n" + 
                    "זמן דיווח: " + event.ev_report_time + "\n" + 
                    "מזהה מדווח: " + event.reporter_id + "\n" +
                    "איזור אירוע: " + event.ev_area;
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
