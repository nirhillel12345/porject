<template>
  <div class="map">
    <select class="dropdown" v-model="selected" @change="changeArea">
      <option disabled value="">אנא בחר איזור</option>
      <option v-for="area in areaList" :key="area.name">{{ area.name }}</option>
    </select>
    <LMap :zoom="zoom" :center="center">
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
import { LMap, LTileLayer, LMarker, LPopup} from "vue2-leaflet";
import reports from "../../data/reports_json.json";
import { icon } from "leaflet";
import VEasyDialog from 'v-easy-dialog';

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    VEasyDialog,
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
      events: reports,
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
  height: 85vh;
  direction: rtl;
}
.dropdown {
    margin-bottom: 2vh;
    height: 4vh;
    width: 25vh;
}
</style>
