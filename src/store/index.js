import Vue from 'vue'
import Vuex from 'vuex'
import { generater, checkEqualsCards } from '@/utils.js'
// import { checkEqualsCards } from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cards: generater(36),
    firstCard: null,
    secondCard: null,
    timer: 0,
    timerId: null,
    timerClickId: null,
    isFlippedCard: false,

    rating: null,
  },
  getters: {
    isFinish(state) {
      return state.cards ? state.cards.every((card) => !card.isShow) : null
    },
    sortRating(state) {
      return state.rating ? state.rating.sort((a, b) => a.time - b.time) : null
    },
  },
  mutations: {
    setFirstCard(state, card) {
      state.firstCard = card
    },
    setSecondCard(state, card) {
      state.secondCard = card
    },
    flippedCard(state, bool) {
      state.isFlippedCard = bool
    },
    clearCards(state) {
      state.cards = null
    },
    createCards(state) {
      state.cards = generater(36)
    },
    addTimer(state, time) {
      state.timer = time
    },
    currentTimer(state) {
      state.timer++
    },
    addtimerId(state, id) {
      state.timerId = id
    },
    clearTimer(state) {
      clearInterval(state.timerId)
    },
    addTimerCard(state, id) {
      state.timerClickId = id
    },
    clearTimerCard(state) {
      clearTimeout(state.timerClickId)
      state.timerClickId = 0
    },
    addToRating(state, obj) {
      state.rating.push(obj)
    },
  },

  actions: {
    startTimer({ commit }) {
      commit('addTimer', 0)

      commit(
        'addtimerId',
        setInterval(() => {
          commit('currentTimer')
        }, 1000)
      )
    },

    clickCard({ state, commit, dispatch }, card) {
      //нажал на ту же ячейку
      if (card === state.firstCard || card === state.secondCard) return
      //нажал на скарточку, когда уже две открыты
      if (state.firstCard && state.secondCard) {
        dispatch('clearFlip')
      }

      if (!state.isFlippedCard) {
        commit('flippedCard', true)
        commit('setFirstCard', card)
      } else {
        commit('flippedCard', false)
        commit('setSecondCard', card)

        checkEqualsCards(state.firstCard, state.secondCard)
      }

      dispatch('timerCard', card)
    },

    timerCard({ state, commit, dispatch }, card) {
      card.isFlip = true
      commit('clearTimerCard')

      if (!state.isFlippedCard) {
        let id = setTimeout(() => {
          dispatch('clearFlip')
        }, 1000)
        commit('addTimerCard', id)
      } else {
        let id = setTimeout(() => {
          dispatch('clearFlip')
        }, 5000)
        commit('addTimerCard', id)
      }
    },
    clearFlip({ state, commit }) {
      commit('clearTimerCard')
      if (state.firstCard) state.firstCard.isFlip = false
      if (state.secondCard) state.secondCard.isFlip = false

      commit('setFirstCard', null)
      commit('setSecondCard', null)
      commit('flippedCard', false)
    },
  },
})
