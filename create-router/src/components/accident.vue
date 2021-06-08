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
              <md-field :class="getValidationClass('offensiveName')">
                <label for="offensive-name">שם הפוגע</label>
                <md-input name="offensive-name" id="offensive-name" autocomplete="given-name" v-model="form.offensiveName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.offensiveName.required">חובה למלא את שם הפוגע </span>
                <span class="md-error" v-else-if="!$v.form.offensiveName.minlength">Invalid first name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('injuredName')">
                <label for="injured-name">שם הנפגע</label>
                <md-input name="injured-name" id="injured-name" autocomplete="family-name" v-model="form.injuredName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.injuredName.required">חובה למלא את שם הנפגע</span>
                <span class="md-error" v-else-if="!$v.form.injuredName.minlength">Invalid last name</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            
 <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100" style="margin-left: 1.5vh">
              <md-field :class="getValidationClass('reportsName')" >
                <md-input name="reports-name" id="reports-name" autocomplete="given-name" v-model="form.reportsName" :disabled="sending" />
                <label for="reports-name" > זהות המדווח</label>
                
              </md-field>
            </div>

          
          </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('severalWounded')">
                <label for="several-wounded">מספר נפגעים</label>
                <md-input type="number" id="several-wounded" name="several-wounded" autocomplete="several-wounded" v-model="form.severalWounded" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.severalWounded.required">חובה למלא את מספר הנפגעים</span>
                <span class="md-error" v-else-if="!$v.form.severalWounded.maxlength">Invalid severalWounded</span>
              </md-field>
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
          <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('eventName')">
                <label for="event-name">שם האירוע</label>
                <md-input name="event-name" id="event-name" autocomplete="family-name" v-model="form.eventName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.eventName.required">חובה למלא את שם האירוע</span>
                <span class="md-error" v-else-if="!$v.form.eventName.minlength">Invalid last name</span>
              </md-field>
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
        offensiveName: null,
        injuredName: null,
        eventType: null,
        severalWounded: null,
        email: null,
        reportsName: null,
        eventName: null,
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
        offensiveName: {
          required,
          minLength: minLength(1)
        },
        injuredName: {
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
          
        },
        eventName: {
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
        this.form.offensiveName = null
        this.form.injuredName = null
        this.form.severalWounded  = null
        this.form.eventType = null
        this.form.reportsName = null
        this.form.eventName = null
      },
      saveUser () {
        this.sending = true
        sendPostRequest();
        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.offensiveName} ${this.form.injuredName}`
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
        if(this.$v.form.offensiveName.$model != "" &&
           this.$v.form.injuredName.$model !="" && 
           this.$v.form.severalWounded.$model != "" && 
           this.$v.form.eventType.$model != "" &&
           this.$v.form.reportsName.$model != "" && 
           this.eventTime != "" && 
           this.reportingTime != "" &&
           this.eventName != ""){
           console.log("before data")
        const dataToSend = {
            report: {criminal: this.$v.form.offensiveName.$model,
         casualties: this.$v.form.injuredName.$model ,
          number_of_casualties:   this.$v.form.severalWounded.$model,
          event_type : 4,
           user_name: this.$v.form.reportsName.$model ,
           event_time: this.eventTime ,
           report_time:  this.reportingTime,
           lat: 30,
           lon: 20,
           event_name: this.$v.form.eventName.$model
         } };
         console.log(dataToSend)
          
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

