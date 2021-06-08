<template>
  <div class="map">
    <select class="dropdown" @change="changeShownTypes($event)">
      <option value="activities and reports">אירועים ופעילויות</option>
      <option value="reports">דיווחים</option>
      <option value="activities">פעילויות</option>
    </select>
    <LMap :zoom="zoom" :center="center" @click="showPoint" v-if="!this.isLoading" id="controlWebMap">
      <LTileLayer :url="url"></LTileLayer>
      <div v-if="this.showReports">
        <l-marker v-for="(report, index) in this.reports" :key="'report' + index" 
            :lat-lng="[report.lat, report.lon]" @click="triggerReportsDialog(index)"></l-marker>
      </div>
      <div v-if="this.showActivities">
        <l-marker v-for="(activity, index) in this.activities" :key="'activity' + index" 
          :lat-lng="[activity.lat, activity.lon]" @click="triggerActivitiesDialog(index)"></l-marker>
      </div>

      <md-dialog :md-active.sync="this.reportsTrigger">
        <div>
          <div class="md-layout"> 
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
            <div class="md-layout-item md-size-10"></div>
          </div>
          <div class="flex space-x-2">
            <md-button class="md-primary" @click="closeReportsDialog()"><b>סגור</b></md-button>
          </div>
      </div>
    </md-dialog>

    <md-dialog :md-active.sync="this.activitiesTrigger">
        <div>
          <div class="md-layout">
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
            <div class="md-layout-item md-size-10"></div>
          </div>
          <div class="flex space-x-2">
            <md-button class="md-primary" @click="closeActivitiesDialog()"><b>סגור</b></md-button>
          </div>
      </div>
    </md-dialog>
      </LMap>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
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
      showReports: true,
      showActivities: true,
      reports: null,
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
    };
  },
  methods: {
    changeShownTypes(selectedOption) {
      const typesToShow = selectedOption.target.value;
      switch(typesToShow) {
        case "activities and reports": {
          this.showReports = true;
          this.showActivities = true;
          break;
        }

        case "reports": {
          this.showReports = true;
          this.showActivities = false;
          break;
        }

        case "activities": {
          this.showReports = false;
          this.showActivities = true;
          break;
        }
      }
      
    },
    showPoint: function(event) {
      alert(event.latlng);
    },
    triggerReportsDialog(index) {
      this.reportsTrigger = true;
      this.curReportIndex = index;
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
    activityName() {
      return this.activities[this.curActivityIndex].activity_name;
    },
    activityType() {
      return this.activities[this.curActivityIndex].activity_type;
    },
    activityTime() {
      let activityTime = this.activities[this.curReportIndex].activity_time.toString();
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
