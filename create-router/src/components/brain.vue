
<template>
  <div class="map">
    <select class="dropdown" v-model="selected" @change="changeArea">
      <option disabled value="">אנא בחר איזור</option>
      <option v-for="area in areaList" :key="area.name">{{ area.name }}</option>
    </select>
    <LMap :zoom="zoom" :center="center" v-if="!this.isLoading" id="brainMap">
      <LTileLayer :url="url"></LTileLayer>
        <l-marker v-for="(report, index) in this.reports" :key="'report' + index" 
          :lat-lng="[report.lat, report.lon]" @click="triggerReportsDialog(index)"></l-marker>
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
      isLoading: true,
      trigger: false,
      curReportIndex: 0,
      reportServerUrl: "http://siton-backend-securityapp3.apps.openforce.openforce.biz/reports",
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
    triggerReportsDialog(index) {
      this.trigger = true;
      this.curReportIndex = index;
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
      let eventTime = this.reports[this.curReportIndex].event_time.toString();
      eventTime = eventTime.replace("T", " ");
      eventTime = eventTime.replace("Z", " ");      
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