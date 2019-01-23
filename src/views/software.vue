<template>
  <div class="container">
    <h1>
      Software<br>
      <small>управление оборудованием</small>
    </h1>
  </div>
</template>

<script>
  import Emulator from '@/libs/software/emulator'
  import {
    SIG_FLOOR_BUTTON,
    SIG_CABIN_BUTTON,
    SIG_LO_REACHED,
    SIG_HI_REACHED
  } from '@/libs/software/signals'

  export default {
    name: 'SoftwareView',
    created () {
      const emulator = new Emulator()
      emulator.signal(SIG_FLOOR_BUTTON, 1)
      console.log(emulator.cmd)
    }
  }
</script>

<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
