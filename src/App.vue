<template>
  <div id="app">
    <SoftwareView msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import SoftwareView from './views/software.vue'

export default {
  name: 'app',
  components: {
    SoftwareView
  }
}
</script>

<style>
  #app {
    font-family: 'Roboto Mono', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 4em;
  }
  h1 {
    line-height: 90%;
  }
  h1 small {
    font-size: 70%;
  }
</style>
