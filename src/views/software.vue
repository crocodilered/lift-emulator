<template>
  <div class="container">
    <h1>
      LIFT EMULATOR (software/simple)<br>
    </h1>
    <div class="row">
      <div class="col">
        <h2>IN</h2>
        <p>Press button to send signal.</p>
        <div class="row">
          <div class="col">
            <ul>
              <li
                v-for="o in floors"
                :key="`floor-${o}`"
              >
                <button @click="floorButtonPush(o)">FLOOR {{ o }}</button>
              </li>
            </ul>
          </div>
          <div class="col">
            <ul>
              <li
                v-for="o in floors"
                :key="`cabin-${o}`"
              >
                <button @click="cabinButtonPush(o)">CAB {{ o }}</button>
              </li>
            </ul>
          </div>
          <div class="col">
            <button @click="floorCheck()">FLOOR CHECK</button>
          </div>
        </div>

        <h2>STATUS</h2>
        <table>
          <tr>
            <td>CURR FL:</td>
            <td>{{ emulator.currentFloor }}</td>
          </tr>
          <tr>
            <td>DEST FL:</td>
            <td>{{ emulator.destinationFloor }}</td>
          </tr>
          <tr>
            <td>MOTOR:</td>
            <td>{{ emulator.motorStatus }}</td>
          </tr>
          <tr>
            <td>CABIN:</td>
            <td>{{ emulator.cabinStatus }}</td>
          </tr>
          <tr>
            <td>QUEUE:</td>
            <td>{{ emulator.queue.items.join(', ') }}</td>
          </tr>
        </table>

      </div>
      <div class="col">
        <h2>OUT</h2>
        <ul>
          <li
            v-for="(o, i) in busOutConsole"
            :key="`out-${i}`"
          >
            <code>{{ o.type }}</code>
            <code v-if="o.value">- {{ o.value }}</code>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Emulator from '@/libs/software/emulator'
  import Queue from '@/libs/queue.js'
  import {
    SIG_FLOOR_BUTTON,
    SIG_CABIN_BUTTON,
    SIG_FLOOR_REACHED
  } from '@/libs/software/signals'

  const data = function () {
    return {
      busIn: null,
      busOut: null,
      emulator: null,
      floors: [1, 2, 3, 4, 5]
    }
  }

  const computed = {
    busOutConsole () {
      return this.busOut.items
    }
  }

  const methods = {
    floorButtonPush (floor) {
      this.busIn.put({ type: SIG_FLOOR_BUTTON, value: floor })
    },
    cabinButtonPush (floor) {
      this.busIn.put({ type: SIG_CABIN_BUTTON, value: floor })
    },
    floorCheck () {
      this.busIn.put({ type: SIG_FLOOR_REACHED })
    }
  }

  export default {
    name: 'SoftwareView',
    data,
    computed,
    methods,
    created () {
      this.busIn = new Queue(),
      this.busOut = new Queue(),
      this.emulator = new Emulator(this.busIn, this.busOut)
    }
  }
</script>

<style scoped>
  h2 {
    margin: 40px 0 10px;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    display: block;
  }
  .row {
    display: flex;
  }
  .col {
    margin-right: 3em;
  }
  code {
    font-size: 130%;
    text-transform: uppercase;
  }
</style>
