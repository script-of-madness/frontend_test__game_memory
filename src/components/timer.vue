<template>
  <div class="timer">
    <div class="timer__element">{{ minutes | addZero }}</div>
    <div class="timer__element">:</div>
    <div class="timer__element">{{ seconds | addZero }}</div>
  </div>
</template>

<script>
import {  mapState } from 'vuex'
export default {
  name: 'timer',
  computed: {
    ...mapState(['timer']),

    //считаем минуты
    minutes() {
      return Math.floor(this.timer / 60) % 60
    },
    //считаем секунды
    seconds() {
      return Math.floor(this.timer) % 60
    },
  },

  filters: {
    //добавление нулей к секундам и минутам
    addZero(value) {
      return value.toString().length <= 1
        ? '0' + value.toString()
        : value.toString()
    },
  },
}
</script>

<style scoped>
.timer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
