<template>
  <div class="map" style="height: 80vh">
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
    <eventPopUp v-show="popUpShow" v-bind:event="events.reports[0]" v-on:closePopUp="popUpShow = false" ></eventPopUp>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup} from "vue2-leaflet";
import eventPopUp from "../components/eventPopUp"
import reports from "../../data/reports_json.json";

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    eventPopUp,
    LPopup,
  },
  data() {
    return {
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 16,
      center: [40.730610,-73.935242],
      bounds: null,
      staticAnchor: [16, 37],
      popUpShow: false,
      events: reports,
      displayText: ""
    };
  },

  mounted() {
      const event = this.events.reports[0];
      this.displayText = "סוג אירוע: " + event.ev_type + "\n" + 
                    "זמן אירוע: " + event.ev_time + "\n" + 
                    "זמן דיווח: " + event.ev_report_time + "\n" + 
                    "מזהה מדווח: " + event.reporter_id + "\n" +
                    "איזור אירוע: " + event.ev_area;
  }
}
</script>