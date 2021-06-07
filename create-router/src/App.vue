<template>
  <div id="app">
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