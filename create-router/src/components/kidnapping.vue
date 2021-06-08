<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">יצירת התראה</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('kidnappingName')">
                <label for="kidnapping-name">מי החוטף </label>
                <md-input name="kidnapping-name" id="kidnapping-name" autocomplete="given-name" v-model="form.kidnappingName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.kidnappingName.required">חובה למלא את שם הפוגע </span>
                <span class="md-error" v-else-if="!$v.form.kidnappingName.minlength">Invalid first name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('whoKidnapping')">
                <label for="who-kidnapping"> מי הנחטף</label>
                <md-input name="who-kidnapping" id="who-kidnapping" autocomplete="family-name" v-model="form.whoKidnapping" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.whoKidnapping.required">חובה למלא את שם הנפגע</span>
                <span class="md-error" v-else-if="!$v.form.whoKidnapping.minlength">Invalid last name</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('eventType')">
                <label for="event-type"> מיקום אחרון ידוע</label>
                <md-select name="event-type" id="event-type" v-model="form.eventType" md-dense :disabled="sending">
                  <md-option></md-option>
                  <md-option value="new york">new york</md-option>
                  <md-option value="dalas">dalas</md-option>
                  <md-option value="los angeles">los angeles</md-option>
                  <md-option value="san fransico">san fransico</md-option>

                </md-select>
                <span class="md-error">  חובה למלא את סוג האירוע</span>
              </md-field>
            </div>

            <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100 ">
              <md-field :class="getValidationClass('reportsName')" >
                <md-input name="reports-name" id="reports-name" autocomplete="given-name" v-model="form.reportsName" :disabled="sending" />
                <label for="reports-name" > זהות המדווח</label>
                
              </md-field>
            </div>

          
          </div>
          </div>

           <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100 ">
              <div>זמן האירוע
              </div>
               <date-picker v-model="eventTime" :class="getValidationClass('eventTime')" type="datetime"></date-picker> 
            </div>
            <div class="md-layout-item md-small-size-100">
            <div>זמן הדיווח
              </div>
                <date-picker v-model="reportingTime" :class="getValidationClass('reportingTime')" type="datetime"></date-picker>
            </div>
          </div>
          
          
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" @click.native="sendPostRequest()" :disabled="sending">צור התראה</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

  export default {
    components: { DatePicker },
    name: 'FormValidation',
    mixins: [validationMixin],
    
    data: () => ({
      form: {
        kidnappingName: null,
        whoKidnapping: null,
        eventType: null,
        severalWounded: null,
        email: null,
        reportsName: null,
      },
      eventTime: null,
      reportingTime: null,
      userSaved: false,
      sending: false,
      lastUser: null,
      lat: null,
    lon: null
    }),
    validations: {
      form: {
        kidnappingName: {
          required,
          minLength: minLength(1)
        },
        whoKidnapping: {
          required,
          minLength: minLength(1)
        },
        severalWounded: {
          required,
          maxLength: maxLength(100)
        },
        eventType: {
          required
        },
        eventTime: {
          required,
          
        },
        reportsName: {
          required,
          
        },
        reportingTime: {
          required,
          
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.kidnappingName = null
        this.form.whoKidnapping = null
        this.form.severalWounded  = null
        this.form.eventType = null
        this.form.reportsName = null
      },
      saveUser () {
        this.sending = true
        sendPostRequest();
        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.kidnappingName} ${this.form.whoKidnapping}`
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      },
     
       sendPostRequest() {
        if(this.$v.form.kidnappingName.$model != "" &&
           this.$v.form.whoKidnapping.$model !="" && 
           this.$v.form.severalWounded.$model != "" && 
           this.$v.form.eventType.$model != "" &&
           this.$v.form.reportsName.$model != "" && 
           this.eventTime != "" && 
           this.reportingTime != ""){
           
        const dataToSend = {report:{criminal: this.$v.form.kidnappingName.$model,
         kidnapped : this.$v.form.whoKidnapping.$model ,
          severalWounded:   this.$v.form.severalWounded.$model,
          last_place_known : this.$v.form.eventType.$model,
          event_type : 3,
           user_name: this.$v.form.reportsName.$model ,
           event_time: this.eventTime ,
           report_time:  this.reportingTime
        }};
          
  axios.post("http://siton-backend-securityapp3.apps.openforce.openforce.biz/reports", dataToSend)
    .then(response => this.email = response.data.id);
           }
           
},
    }
  }
</script>
<style>

.label{
  float: "right";
}

.md-input{
  direction:RTL;
}
.md-title{
  color: red;
}
</style>

