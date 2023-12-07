<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGuiPreferencesStore } from '@/store/gui-preferences-store';

const { currentPlayer } = storeToRefs(useGuiPreferencesStore())

</script>

<template>
  <div class="ticker-wrap" v-if="currentPlayer.userId">
    <div class="ticker">
    <span class="item-collection-1">
      <span class="item" v-for="i in 1" :key="i">Сейчас крутит колесо - {{currentPlayer.name}}</span>
    </span>
<!--    <span class="item-collection-2">-->
<!--      <span class="item" v-for="i in 1" :key="i">Сейчас крутит колесо - {{currentPlayer.name}}</span>-->
<!--    </span>-->
    </div>
  </div>
</template>

<style scoped>
.ticker-wrap {
  width: 100%;
  height: 80px;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
  position: fixed;
  top: 0;
  height: 3.5rem;
  background-color: #FFCA46;
}
.ticker {
  display: inline-block;
  margin-top: 5px;
  animation: marquee 25s linear infinite;
}
.item-collection-1 {
  position: relative;
  left: 0%;
  animation: swap 25s linear infinite;
}

.item {
  display: inline-block;
  padding: 0 1rem;
  font-size: 2rem;
  color: black;
  font-weight: 800;
  font-family: sans-serif;
}

/* Transition */
@keyframes marquee {
  0% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(-100%)
  }
}

@keyframes swap {
  0%, 50% {
    left: 0%;
  }
  50.01%,
  100% {
    left: 100%;
  }
}
</style>
