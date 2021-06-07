<template>
  <div class="map">
    <select class="dropdown" v-model="selected" @change="changeArea">
      <option disabled value="">אנא בחר איזור</option>
      <option v-for="area in areaList" :key="area.name">{{ area.name }}</option>
    </select>
    <LMap :zoom="zoom" :center="center">
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
import { LMap, LTileLayer, LMarker, LPopup} from "vue2-leaflet";
import reports from "../../data/reports_json.json";
import { icon } from "leaflet";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 16,
      center: [40.73061, -73.935242],
      bounds: null,
      selected: "",
      events: reports,
      displayText: "",
      areaList: [
        {
          name: "ברונקס",
          coordinates: [40.84985, -73.86641]
        },
        {
          name: "מנהטן",
          coordinates: [40.73061, -73.935242]
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
    changeArea: function() {
      this.center = this.areaList.find(
        area => area.name === this.selected
      ).coordinates;
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
  width: 50vh;
  direction: rtl;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.dropdown {
    margin-bottom: 2vh;
    height: 4vh;
    width: 25vh;
}
</style>
