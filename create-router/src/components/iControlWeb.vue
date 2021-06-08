<template>
  <div class="map">
    <select class="dropdown" v-model="selected">
      <option value="">כל האירועים</option>
      <option v-for="activity in activityList" :key="activity.name">{{ activity }}</option>
    </select>
    <LMap :zoom="zoom" :center="center" @click="showPoint">
      <LTileLayer :url="url"></LTileLayer>
      <l-marker :lat-lng="[40.731810,-73.936542]" @click="triggerDialog(0)">
      </l-marker>
      <LMarker :lat-lng="[40.730620,-73.934250]" @click="triggerDialog(1)">
      </LMarker>
      <LMarker :lat-lng="[40.730529,-73.935949]" @click="triggerDialog(2)">
      </LMarker>
      <md-dialog :md-active.sync="this.trigger">
        <div>
          <div class="md-layout">
            <div class="md-layout-item">
              <div dir="rtl" class="md-headline"><b>פרטי אירוע</b></div>
              <div dir="rtl">
              <p class="ps-2"><b>סוג אירוע: </b>{{eventType()}}</p>
              <p class="ps-2"><b>זמן אירוע: </b>{{eventTime()}}</p>
              <p class="ps-2"><b>זמן דיווח: </b>{{reportTime()}}</p>
              <p class="ps-2"><b>מזהה מדווח: </b>{{reporterId()}}</p>
              <p class="ps-2"><b>איזור אירוע: </b>{{eventArea()}}</p>
            </div>
          </div>
            <div class="md-layout-item md-size-10"></div>
          </div>
          <div class="flex space-x-2">
            <md-button class="md-accent" @click="closeDialog()"><b>סגור</b></md-button>
          </div>
      </div>
    </md-dialog>
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
      trigger: false,
      curEventIndex: 0,
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
    };
  },
  methods: {
    showPoint: function(event) {
      alert(event.latlng);
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
  },
};
</script>

<style scoped>
.map {
  direction: rtl;
  height: 85vh;
  width: "100%";
}
.dropdown {
    margin-bottom: 2vh;
    height: 4vh;
    width: 25vh;
}
</style>
