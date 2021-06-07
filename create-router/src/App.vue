<template>
  <div id="app">
    
    <router-view/>
    <Map name=""></Map>
  </div>
</template>
<script>
import Map  from "../src/components/Map";

export default {
  name: 'App',
  components: { Map }
}
</script>
<style>
#app {
  
}
</style>