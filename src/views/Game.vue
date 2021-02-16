<template>
  <div id="app">
    <section class="view-port">
      <h2>Игра "Память"</h2>
      <div class="controler">
        <timer />
        <div @click="start" class="btn">
          начать игру заново
        </div>
        <div @click="stop" class="btn">
          остановить игру
        </div>
      </div>
      <div v-if="!isFinish" class="game">
        <card
          v-for="card of cards"
          :key="card.id"
          :card="card"
          class="game_field"
        ></card>
      </div>
      <div v-else>
        <h2>вы победили</h2>
        <p>введите ваше имя, что бы вас увековечили на века</p>
        <input v-model="nameUser" type="text" />
        <button :disabled="isPushResult" @click.enter="addUser">создать</button>
      </div>
    </section>
  </div>
</template>

<script>
import timer from '@/components/timer.vue'
import card from '@/components/card.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: { timer, card },

  data() {
    return {
      nameUser: 'MyName',
      isPushResult: false,
    }
  },

  computed: {
    ...mapState(['cards', 'timerId', 'timer']),
    ...mapGetters(['isFinish']),
  },
  methods: {
    ...mapMutations(['createCards', 'clearCards', 'addToRating']),
    ...mapActions(['startTimer']),
    start() {
      // this.startTimer()
      this.createCards()
      this.startTimer()
    },
    stop() {
      clearInterval(this.timerId)
      this.clearCards()
    },
    addUser() {
      //перенаправлять на страницу с результатами или нет ?
      //за диссейблить
      this.addToRating({
        name: this.nameUser,
        time: this.timer,
      })
      this.isPushResult = true
    },
  },
  mounted() {
    this.createCards()
    this.startTimer()
  },
  watch: {
    isFinish: function(show) {
      if (show && this.cards) {
        clearInterval(this.timerId)
        this.isPushResult = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.view-port {
  width: 100vw;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: rgb(193, 203, 206);

  .btn {
    background-color: #e78a32;
    width: 170px;
    cursor: pointer;

    padding: 10px;
    margin: 10px;
    color: white;
  }

  .game {
    height: 70vh;
    width: 80vw;
    display: grid;
    grid-gap: 1vw;
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
