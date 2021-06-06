<template>
  <div id="app">
    <Map name=""></Map>
    <router-view/>
  </div>
</template>
<script>
import Map from './components/Map';

export default {
  name: 'App',
  components: {
    Map
  }
}
</script>
<style>
#app {
  
}
</style>