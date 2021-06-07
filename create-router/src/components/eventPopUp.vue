<template>
    <div>
        <div>
          <i class="closeicon" @click="closePopUp()">x</i>
        </div>
          <p>:סוג אירוע {{event.ev_type}}</p>
          <p>:זמן אירוע {{event.ev_time}}</p>
          <p>:זמן דיווח {{event.ev_report_time}}</p>
          <p>:מזהה מדווח {{event.reporter_id}}</p>
          <p>:איזור אירוע {{event.ev_area}}</p>
    </div>
</template>
<script>
export default {
    name: "eventPopUp",
    props: {
        event: Object
    },
    methods: {
      closePopUp() {
        this.$emit('closePopUp');
      }
    }
}
</script>