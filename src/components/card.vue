<template>
  <div class="card" @click="flipped(card)">
    <transition
      name="fade"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
    >
      <div
        :class="['card__animation', card.isFlip ? 'flip' : '']"
        v-if="card.isShow"
      >
        <div>
          {{ card.isFlip ? card.value : 'X' }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'card',
  props: {
    card: Object,
  },

  methods: {
    ...mapMutations(['addTimerCard', 'clearTimerCard']),
    ...mapActions(['clickCard']),
    flipped(card) {
      this.clickCard(card)
    },
  },
}
</script>

<style scoped lang="scss">
@import 'css/animated';
.card {
  background-color: #e78a32;
  color: white;
  box-sizing: border-box;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .card__animation {
    transform: scale(1);
    transform-style: preserve-3d;
    transition: transform 0.5s;
    border-radius: 10px;

    &:active {
      transform: scale(0.97);
      transition: transform 0.2s;
    }

    &.flip {
      transform: scale(3);

      & .card__back-face {
        display: none;
      }

      & .card__front-face {
        transform: scale(1);
      }
    }
  }
}
</style>
