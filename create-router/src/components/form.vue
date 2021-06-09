<template>
  <div  v-if="getEventType == null || getSwitched == false" >
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">יצירת התראה</div>
        </md-card-header>

      


          <div class="md-layout md-gutter" >
            <div class="md-layout-item md-small-size-100 ">
              <md-field :class="getValidationClass('eventType')">
                <label style="position:absolute; right:0"  for="event-type">סוג האירוע</label>
                <md-select  name="event-type" id="event-type" v-model="form.eventType" md-dense :disabled="sending">
                  
                  <md-option  value=1>ירי</md-option>
                  <md-option value=2>דקירה</md-option>
                  <md-option value=3>חטיפה</md-option>
                  <md-option value=4>תאונה</md-option>

                </md-select>
                <span class="md-error">  חובה למלא את סוג האירוע</span>
              </md-field>
            </div>

          </div>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" @click.native="clickedContinue()" :disabled="sending">המשך </md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>
  </div>
  <accident v-bind:selectedPoint="selectedPoint" v-else-if="getEventType == 4 && getSwitched == true" > </accident>
  <kidnapping v-bind:selectedPoint="selectedPoint" v-else-if="getEventType == 3 && getSwitched == true" > </kidnapping>
  <shootingSttack v-bind:selectedPoint="selectedPoint" v-else-if="getEventType == 1 && getSwitched == true" > </shootingSttack>
  <stabbingAttack v-bind:selectedPoint="selectedPoint" v-else-if="getEventType == 2 && getSwitched == true" > </stabbingAttack>


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
  import accident from "./accident.vue"
  import kidnapping from "./kidnapping.vue"
  import shootingSttack from "./shootingSttack.vue"
  import stabbingAttack from "./stabbingAttack.vue"
  export default {
    components: { DatePicker, accident, kidnapping, shootingSttack, stabbingAttack  },
    name: 'FormValidation',
    mixins: [validationMixin],
    props: ["selectedPoint"],
    data: () => ({
      form: {
        eventType: null,
      },
      sending: false,
      lastUser: null,
      userSaved: null,
      switch: false,
    }),
    validations: {
      form: {
        eventType: {
          required
        },
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
        this.form.eventType = null
      },
      saveUser () {
        this.sending = true
        sendPostRequest();
        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.offensiveName} ${this.form.injuredName}`
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
      clickedContinue(){
          this.switch = true;
          location.reload();
      }
     
    },
    computed:{
      getEventType(){
        return this.$v.form.eventType.$model
      },
      getSwitched(){
        return this.switch;
      }
    }
  }
</script>
<style>
.md-title{
  color: red;
}
.md-menu-content.md-select-menu {
  z-index: 100000;
}
.md-card {
  padding: 2REM;
}
.md-select-menu{
  margin-top: 3REm;
  margin-right: 3rem;
}

</style>
