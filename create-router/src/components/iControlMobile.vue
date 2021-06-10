<template>
  <div class="map">
    <LMap :zoom="zoom" :center="center" v-if="!this.isLoading">
      <LTileLayer :url="url"></LTileLayer>
        <l-marker v-for="(shooting, index) in this.shootings" :key="'shooting' + index" 
          :lat-lng="[shooting.lat, shooting.lon]" @click="triggerReportsDialog(shooting)" :icon="ShootingIcon"></l-marker>

        <l-marker v-for="(stabbing, index) in this.stabbings" :key="'stabbing' + index" 
          :lat-lng="[stabbing.lat, stabbing.lon]" @click="triggerReportsDialog(stabbing)" :icon="StabbingIcon"></l-marker>

        <l-marker v-for="(accident, index) in this.accidents" :key="'accident' + index" 
          :lat-lng="[accident.lat, accident.lon]" @click="triggerReportsDialog(accident)" :icon="AccidentIcon"></l-marker>

        <l-marker v-for="(kidnap, index) in this.kidnaps" :key="'kidnap' + index" 
          :lat-lng="[kidnap.lat, kidnap.lon]" @click="triggerReportsDialog(kidnap)" :icon="KidnappingIcon"></l-marker>

        <l-marker v-for="(activity, index) in this.activities" :key="'activity' + index" 
          :lat-lng="[activity.lat, activity.lon]" @click="triggerActivitiesDialog(index)"></l-marker>
    </LMap>
<md-dialog :md-active.sync="this.reportsTrigger">
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

    <md-dialog :md-active.sync="this.activitiesTrigger">
        <div>
          <div class="md-layout">
            <div class="md-layout-item md-size-10"></div>
            <div class="md-layout-item">
              <div dir="rtl" class="md-headline"><b>פרטי פעילות</b></div>
              <div dir="rtl">
              <p class="ps-2"><b>שם פעילות: </b>{{activityName()}}</p>
              <p class="ps-2"><b>סוג פעילות: </b>{{activityType()}}</p>
              <p class="ps-2"><b>זמן פעילות: </b>{{activityTime()}}</p>
              <p class="ps-2"><b>מטרת פעילות: </b>{{activityGoal()}}</p>
              <p class="ps-2"><b>סטטוס: </b>{{(statusName())}}</p>
              <p class="ps-2"><b>מאשר פעילות: </b>{{activityApprover()}}</p>
              <p class="ps-2"><b>כוח מתוכנן: </b>{{scheduledPower()}}</p>
            </div>
          </div>
          </div>
          <div class="flex space-x-2">
            <md-button class="md-primary" @click="closeActivitiesDialog()"><b>סגור</b></md-button>
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
      activities: null,
      activitiesLoading: true,
      reportsLoading: true,
      isLoading: true,
      reportsTrigger: false,
      activitiesTrigger: false,
      curReportIndex: 0,
      curActivityIndex: 0,
      reportServerUrl: "http://siton-backend-securityapp3.apps.openforce.openforce.biz/reports",
      activitiesServerUrl: "http://siton-backend-securityapp3.apps.openforce.openforce.biz/activities",
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
    };
  },
  methods: {
    triggerReportsDialog(curReport) {
      this.reportsTrigger = true;
      this.curReportIndex = this.reports.findIndex((report => report === curReport));
    },
    closeReportsDialog() {
      this.reportsTrigger = false;
    },
    triggerActivitiesDialog(index) {
      this.activitiesTrigger = true;
      this.curActivityIndex = index;
    },
    closeActivitiesDialog() {
      this.activitiesTrigger = false;
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
    eventRegion() {
      return this.reports[this.curReportIndex].region;
    },
    activityName() {
      return this.activities[this.curActivityIndex].activity_name;
    },
    activityType() {
      return this.activities[this.curActivityIndex].activity_type;
    },
    activityTime() {
      let activityTime = this.activities[this.curActivityIndex].activity_time.toString();
      activityTime = activityTime.replace("T", " ");
      activityTime = activityTime.replace("Z", " ");  
      return activityTime;
    },
    activityGoal() {
      return this.activities[this.curActivityIndex].activity_goal;
    },
    statusName() {
      return this.activities[this.curActivityIndex].status_name;
    },
    activityApprover() {
      return this.activities[this.curActivityIndex].activity_approver;
    },
    scheduledPower() {
      let powerList = this.activities[this.curActivityIndex].scheduledPower;
      let stringedList = "";
      powerList.forEach(person => {
        stringedList += person + ", ";
      });
      stringedList = stringedList.slice(0,stringedList.length - 2);
      return stringedList;
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
      this.reportsLoading = false;
    });

    response = axios.get(this.activitiesServerUrl)
    .then((response) => {
      this.activities = response.data;
      }).catch((error) => {
      console.log(error);
    }).finally(() => {
      console.log(this.activities);
      this.activitiesLoading = false;
      if (!this.reportsLoading) {
        this.isLoading = false;
      } else {
        this.$nextTick(() => {
          this.isLoading = false;
        });
      }
    });

  }
};
</script>

<style scoped>
.map {
  height: 100vh;
  direction: rtl;
  z-index: 100;
}
.md-dialog {
  z-index: 600;
}
</style>
