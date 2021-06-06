<template>
    <div>
    <vue-modaltor :visible="open" @hide="open=false">
      <template #header>
        <div>
          <i class="closeicon" @click="open = false">x</i>
        </div>
      </template>
      <template #body>
          <p>:סוג אירוע {{event.ev_type}}</p>
          <p>:זמן אירוע {{event.ev_time}}</p>
          <p>:זמן דיווח {{event.ev_report_time}}</p>
          <p>:מזהה מדווח {{event.reporter_id}}</p>
          <p>:איזור אירוע {{event.ev_area}}</p>
        </template>
    </vue-modaltor>
    <button @click="open=true">modal-basic</button>
    </div>
</template>
<script>
export default {
    name: "eventPopUp",
    data() {
        return {
          open: false

        }
    },
    props: {
        event: Object
    }
}
</script>