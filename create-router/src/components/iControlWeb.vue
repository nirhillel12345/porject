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
      <l-marker :lat-lng="[40.73181, -73.936542]" @click="triggerDialog(0)" :icon="icon">
      </l-marker>
      <LMarker :lat-lng="[40.73062, -73.93425]" @click="triggerDialog(1)">
      </LMarker>
      <LMarker :lat-lng="[40.730529, -73.935949]" @click="triggerDialog(2)">
      </LMarker>
    </LMap>

    <md-dialog :md-active.sync="this.trigger" class="triggerDialog">
      <div>
        <div class="md-layout">
          <div class="md-layout-item">
            <div dir="rtl" class="md-headline"><b>פרטי אירוע</b></div>
            <div dir="rtl">
              <p class="ps-2"><b>סוג אירוע: </b>{{ eventType() }}</p>
              <p class="ps-2"><b>זמן אירוע: </b>{{ eventTime() }}</p>
              <p class="ps-2"><b>זמן דיווח: </b>{{ reportTime() }}</p>
              <p class="ps-2"><b>מזהה מדווח: </b>{{ reporterId() }}</p>
              <p class="ps-2"><b>איזור אירוע: </b>{{ eventArea() }}</p>
            </div>
          </div>
          <div class="md-layout-item md-size-10"></div>
        </div>
        <div class="flex space-x-2">
          <md-button class="md-accent" @click="closeDialog()"
            ><b>סגור</b></md-button
          >
        </div>
      </div>
    </md-dialog>
    <md-dialog :md-active.sync="dialog" width="500" class="addReportDialog">
      <activityForm @confirmActivity="dialog = false" />
    </md-dialog>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import { icon } from "leaflet";
import activityForm from "./form";
import reports from "../../data/reports_json.json";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    activityForm,
    LPopup
  },
  data() {
    return {
      trigger: false,
      curEventIndex: 0,
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 16,
      center: [40.73061, -73.935242],
      bounds: null,
      selectedPoint: [],
      dialog: false,
      selected: "",
      activityList: [
        {
          activity: "דקירה",
          iconUrl: require("../assets/knife.png")
        },
        {
          activity: "תאונה",
          iconUrl: require("../assets/warning.png")
        },
        {
          activity: "חטיפה",
          iconUrl: require("../assets/running.png")
        },
        { 
          activity: "ירי",
          iconUrl: require("../assets/hitmark.png")
        }
      ],
      icon: L.icon({
        iconUrl: require("../assets/hitmark.png"),
        iconSize:     [45, 45], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      }),
      events: reports
    };
  },
  methods: {
    showForm: function(event) {
      this.selectedPoint = event.latlng;
      this.dialog = true;
    },
    triggerDialog(index) {
      this.trigger = true;
      this.curEventIndex = index;
    },
    closeDialog() {
      this.trigger = false;
    },
    eventType() {
      return this.events.reports[this.curEventIndex].ev_type;
    },
    eventTime() {
      return this.events.reports[this.curEventIndex].ev_time;
    },
    reportTime() {
      return this.events.reports[this.curEventIndex].ev_report_time;
    },
    reporterId() {
      return this.events.reports[this.curEventIndex].reporter_id;
    },
    eventArea() {
      return this.events.reports[this.curEventIndex].ev_area;
    }
  }
};
</script>

<style scoped>
.map {
  direction: rtl;
  height: 86vh;
  width: "100%";
  z-index: 100;
}
.dropdown {
  z-index: 5100;
  height: 4vh;
  width: 25vh;
}
.addReportDialog {
  direction: rtl;
  z-index: 500;
}
.triggerDialog {
  z-index: 500;
}
</style>
