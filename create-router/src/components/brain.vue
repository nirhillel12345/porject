
<template>
  <div class="map">
    <select class="dropdown" v-model="selected" @change="changeArea">
      <option disabled value="">אנא בחר איזור</option>
      <option v-for="area in areaList" :key="area.name">{{ area.name }}</option>
    </select>
    <LMap :zoom="zoom" :center="center" v-if="!this.isLoading" id="brainMap">
      <LTileLayer :url="url"></LTileLayer>
        <l-marker v-for="(shooting, index) in this.shootings" :key="'shooting' + index" 
          :lat-lng="[shooting.lat, shooting.lon]" @click="triggerReportsDialog(shooting)" :icon="ShootingIcon"></l-marker>

        <l-marker v-for="(stabbing, index) in this.stabbings" :key="'stabbing' + index" 
          :lat-lng="[stabbing.lat, stabbing.lon]" @click="triggerReportsDialog(stabbing)" :icon="StabbingIcon"></l-marker>

        <l-marker v-for="(accident, index) in this.accidents" :key="'accident' + index" 
          :lat-lng="[accident.lat, accident.lon]" @click="triggerReportsDialog(accident)" :icon="AccidentIcon"></l-marker>

        <l-marker v-for="(kidnap, index) in this.kidnaps" :key="'kidnap' + index" 
          :lat-lng="[kidnap.lat, kidnap.lon]" @click="triggerReportsDialog(kidnap)" :icon="KidnappingIcon"></l-marker>

    </LMap>
    <md-dialog :md-active.sync="this.trigger">
        <div>
          <div class="md-layout"> 
            <div class="md-layout-item md-size-10"></div>
            <div class="md-layout-item">
              <div dir="rtl" class="md-headline"><b>פרטי אירוע</b></div>
              <div dir="rtl">
              <p class="ps-2"><b>סוג אירוע: </b>{{eventType()}}</p>
              <p class="ps-2"><b>שם אירוע: </b>{{eventName()}}</p>
              <p class="ps-2"><b>זמן אירוע: </b>{{eventTime()}}</p>
              <p class="ps-2"><b>זמן דיווח: </b>{{reportTime()}}</p>
              <p class="ps-2"><b>שם מדווח: </b>{{reporterName()}}</p>
              <p class="ps-2"><b>תיאור אירוע: </b>{{eventDescription()}}</p>
            </div>
          </div>
          </div>
          <div class="flex space-x-2">
            <md-button class="md-primary" @click="closeReportsDialog()"><b>סגור</b></md-button>
          </div>
      </div>
    </md-dialog>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker} from "vue2-leaflet";
import { icon } from "leaflet";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      reports: null,
      stabbings: null,
      kidnaps: null,
      accidents: null,
      shootings: null,
      isLoading: true,
      trigger: false,
      curReportIndex: 0,
      reportServerUrl: "http://siton-backend-securityapp3.apps.openforce.openforce.biz/reports",
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 16,
      center: [40.73061, -73.935242],
      bounds: null,
      selected: "",
      ShootingIcon: L.icon({
        iconUrl: require("../assets/hitmark.png"),
        iconSize:     [45, 45], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      }),
      StabbingIcon: L.icon({
        iconUrl: require("../assets/knife.png"),
        iconSize:     [45, 45], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      }),
      AccidentIcon: L.icon({
        iconUrl: require("../assets/warning.png"),
        iconSize:     [45, 45], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      }),
      KidnappingIcon: L.icon({
        iconUrl: require("../assets/running.png"),
        iconSize:     [45, 45], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      }),
      areaList: [
        {
          name: "ברונקס",
          coordinates: [40.84985, -73.86641]
        },
        {
          name: "מנהטן",
          coordinates: [40.754932, -73.984016]
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
    },
    triggerReportsDialog(curReport) {
      this.trigger = true;
      this.curReportIndex = this.reports.findIndex((report => report === curReport));
    },
    closeReportsDialog() {
      this.trigger = false;
    },
    eventName() {
      return this.reports[this.curReportIndex].event_name;
    },
    eventDescription() {
      return this.reports[this.curReportIndex].event_description;
    },
    eventType() {
      return this.reports[this.curReportIndex].event_type;
    },
    eventTime() {
      let eventTime = this.reports[this.curReportIndex].event_time;
      if(this.reports[this.curReportIndex].event_time !== null) {
        eventTime = eventTime.toString();
        eventTime = eventTime.replace("T", " ");
        eventTime = eventTime.replace("Z", " ");      
      }
      return eventTime;
    },
    reportTime() {
      let reportTime = this.reports[this.curReportIndex].report_time.toString();
      reportTime = reportTime.replace("T", " ");
      reportTime = reportTime.replace("Z", " ");   
      return reportTime;
    },
    reporterName() {
      return this.reports[this.curReportIndex].user_name;
    },

  },
  mounted() {
    const axios = require('axios');

    let response = axios.get(this.reportServerUrl)
    .then((response) => {
      this.reports = response.data;
      this.kidnaps = response.data.filter((report) => report.event_type === "חטיפה");
      this.stabbings = response.data.filter((report) => report.event_type === "דקירה");
      this.accidents = response.data.filter((report) => report.event_type === "תאונה");
      this.shootings = response.data.filter((report) => report.event_type === "ירי");
      }).catch((error) => {
      console.log(error);
    }).finally(() => {
      console.log(this.reports);
      this.isLoading = false;
    });
  } 
};
</script>

<style scoped>
.map {
  height: 85vh;
  direction: rtl;
}
.dropdown {
    margin-bottom: 2vh;
    height: 4vh;
    width: 25vh;
}

.md-dialog {
  z-index: 10000;
}
</style>