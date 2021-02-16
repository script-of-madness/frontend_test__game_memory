<template>
  <div class="result">
    <h1>Рейтинг:</h1>
    <div v-if="sortRating">
      <ul>
        <li v-for="user in sortRating" :key="user.id">
          <div class="user">
            <div class="user__name">{{ user.name }}</div>

            <div class="user__time">{{ user.time | minutes | addZero }}</div>
            <div>:</div>
            <div class="user__time">{{ user.time | seconds | addZero }}</div>
          </div>
        </li>
      </ul>
    </div>
    <h2 v-else>
      рейтинг пуст
    </h2>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'rating',

  computed: {
    // ...mapState(['rating']),
    ...mapGetters(['sortRating']),
  },

  filters: {
    minutes(value) {
      return Math.floor(value / 60) % 60
    },
    seconds(value) {
      return Math.floor(value) % 60
    },
    addZero(value) {
      return value.toString().length <= 1
        ? '0' + value.toString()
        : value.toString()
    },
  },
  watch: {},
}
</script>

<style lang="scss">
.user {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
