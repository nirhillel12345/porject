<template>
  <div>
    <form v-if="getShowForm == true" novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">יצירת התראה</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('stabbingName')">
                <label for="stabbing-name" style="position:absolute; right:0" >מי הדוקר </label>
                <md-input
                  name="stabbing-name"
                  id="stabbing-name"
                  autocomplete="given-name"
                  v-model="form.stabbingName"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.stabbingName.required">
                  חובה למלא את השדה מי יורה
                </span>
                <span
                  class="md-error"
                  v-else-if="!$v.form.stabbingName.minlength"
                >
                  שדה זה לא חוקי
                </span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('gunType')">
                <label for="gun-type" style="position:absolute; right:0" >סוג הנשק </label>
                <md-input
                  name="gun-type"
                  id="gun-type"
                  autocomplete="family-name"
                  v-model="form.gunType"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.gunType.required"
                  >חובה למלא את שם הנפגע</span
                >
                <span class="md-error" v-else-if="!$v.form.gunType.minlength"
                  >Invalid last name</span
                >
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('eventType')">
                <label for="event-type" style="position:absolute; right:0" >נפגעים</label>
                <md-select
                  name="event-type"
                  id="event-type"
                  v-model="form.eventType"
                  md-dense
                  :disabled="sending"
                >
                  <md-option value="ירי">אזרחים</md-option>
                  <md-option value="דקירה">כוחותינו</md-option>
                  <md-option value="חטיפה">אויב</md-option>
                </md-select>
                <span class="md-error"> חובה למלא את סוג האירוע</span>
              </md-field>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100 ">
                <md-field :class="getValidationClass('reportsName')">
                  <md-input
                    name="reports-name"
                    id="reports-name"
                    autocomplete="given-name"
                    v-model="form.reportsName"
                    :disabled="sending"
                  />
                  <label for="reports-name" style="position:absolute; right:0" > זהות המדווח</label>
                </md-field>
              </div>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100 ">
              <div>זמן האירוע</div>
              <date-picker
                v-model="eventTime"
                :class="getValidationClass('eventTime')"
                type="datetime"
              ></date-picker>
            </div>
            <div class="md-layout-item md-small-size-100">
              <div>זמן הדיווח</div>
              <date-picker
                v-model="reportingTime"
                :class="getValidationClass('reportingTime')"
                type="datetime"
              ></date-picker>
            </div>
          </div>
            <div class="md-layout md-gutter">

          <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('eventName')">
                <label for="event-name" style="position:absolute; right:0" >שם האירוע</label>
                <md-input name="event-name" id="event-name" autocomplete="family-name" v-model="form.eventName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.eventName.required">חובה למלא את שם האירוע</span>
                <span class="md-error" v-else-if="!$v.form.eventName.minlength">Invalid last name</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('eventPlace')">
                 <label for="event-place" style="position:absolute; right:0" > מיקום </label>
                <md-select name="event-place" id="event-place" v-model="form.eventPlace" md-dense :disabled="sending">
                  <md-option value="ברונקס">ברונקס</md-option>
                  <md-option value="מנהטן">מנהטן</md-option>
                  <md-option value="ברוקלין">ברוקלין</md-option>
                  <md-option value="סטייטן איילנד">סטייטן איילנד</md-option>
                  <md-option value="קווינס">קווינס</md-option>

                </md-select>
                <span class="md-error">  חובה למלא את סוג האירוע</span>
              </md-field>
            </div>
            </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button
            type="submit"
            class="md-primary"
            @click.native="sendPostRequest()"
            :disabled="sending"
            >צור התראה</md-button
          >
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved"
        >The user {{ lastUser }} was saved with success!</md-snackbar
      >
    </form>
  </div>
</template>

<script>
import axios from "axios";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import eventBus from '../event-bus'
import { validationMixin } from "vuelidate";

import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

export default {
  components: { DatePicker },
  name: "FormValidation",
  mixins: [validationMixin],
props: ["selectedPoint"],
  data: () => ({
    form: {
      stabbingName: null,
      gunType: null,
      eventType: null,

      email: null,
      reportsName: null
    },
    eventTime: null,
    reportingTime: null,
    userSaved: false,
    sending: false,
    lastUser: null,
    lat: null,
    lon: null,
    eventName: null,
    eventPlace: null,
    showForm: true
  }),
  validations: {
    form: {
      stabbingName: {
        required,
        minLength: minLength(1)
      },
      gunType: {
        required,
        minLength: minLength(1)
      },
      eventType: {
        required
      },
      eventTime: {
        required
      },
      reportsName: {
        required
      },
      eventPlace: {
        required
      },
      reportingTime: {
        required
      }
      ,
      eventName: {
        required
      }
    }
  },
  computed:{
      getShowForm()
      {
      return this.showForm;
      }
    },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.stabbingName = null;
      this.form.gunType = null;
      this.form.eventName = null;
      this.form.eventType = null;
      this.form.reportsName = null;
      this.form.eventPlace = null;
    },
    saveUser() {
      this.sending = true;
      sendPostRequest();
      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.stabbingName} ${this.form.gunType}`;
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },

    sendPostRequest() {
    if(this.$v.form.stabbingName.$model !=null &&
           this.$v.form.gunType.$model != null && 
           this.$v.form.eventType.$model != null &&
           this.$v.form.eventPlace.$model != null &&
           this.$v.form.reportsName.$model != null && 
           this.eventTime != null && 
           this.reportingTime != null){
        this.showForm = false;
        // location.reload();
        const dataToSend = {
          report: {
            criminal: this.$v.form.stabbingName.$model,
            weapon_type: this.$v.form.gunType.$model,

            casualties: this.$v.form.eventType.$model,
            event_type: 2,
            user_name: this.$v.form.reportsName.$model,
            event_time: this.eventTime,
            report_time: this.reportingTime,
            event_name: this.$v.form.eventName.$model,
            lat: this.selectedPoint.lat,
            lon: this.selectedPoint.lng,
            region: this.$v.form.eventPlace.$model,
          }
        };
       axios.post("http://siton-backend-securityapp3.apps.openforce.openforce.biz/reports", dataToSend)
    .then(location.reload())



    

           }
           
},
  }
};
</script>
<style>
.label {
  float: "right";
}

.md-input {
  direction: RTL;
}
.md-title {
  color: red;
}
</style>
