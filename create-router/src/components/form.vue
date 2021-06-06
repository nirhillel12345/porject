<template>
<div class="form">

  <div>
  <div>
    <md-dialog-confirm
      :md-active.sync="active"
      md-title="יצירת התראה"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"
       > 
          <md-select  v-model="movie" name="eventType" id="eventType">
          <div v-for="eventType in eventTypes" :key="eventType">
            <md-option value=eventType>{{eventType}}</md-option>
            </div>
          </md-select>
        
</md-dialog-confirm>
    <md-button class="md-primary md-raised" @click="active = true">תחשוב שיש כאן כוונת</md-button>
    
  </div>
  </div>
   
  </div>
</template>

<script>
  export default {
    name: 'form',
    data: () => ({
      eventType: 'godfather',
      eventTypes: ["f","ssss","sss"],
      country: null,
      font: null,
       active: false,
      value: null
    }),
    methods: {
      onConfirm () {
        this.value = 'Agreed'
      },
      onCancel () {
        this.value = 'Disagreed'
      }
    }
  }
</script>