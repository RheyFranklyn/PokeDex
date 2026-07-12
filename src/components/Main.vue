<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PokemonCardsContainer from '@/components/PokemonCardsContainer.vue'
import Header from '@/components/Header.vue'
import Navbar from './Navbar.vue'
import BattleBtn from './common/BattleBtn.vue'

const router = useRouter()

// --- 🎬 Interactive Screen State ---
const isEncounterTransition = ref(false)

function goToBattleArena() {
  // 1. Kick off the screen-blanking flash animation sequence immediately
  isEncounterTransition.value = true
  
  // 2. Hold back navigation until the 400ms visual sequence ends
  setTimeout(() => {
    isEncounterTransition.value = false
    router.push('/battle')
  }, 1000)
}
</script>

<template>
  <main class="relative z-1">
    <div v-if="isEncounterTransition" class="flicker-overlay"></div>

    <Header />
    <Navbar />
    <PokemonCardsContainer />
    
    <BattleBtn @trigger="goToBattleArena" />
  </main>
</template>

<style scoped>
/* 📌 Retro Encounter Screen Flash Transition Styles */
.flicker-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  z-index: 9999;
  pointer-events: none; /* Block clicking or scrubbing during screen transition states */
  animation: retroFlicker 0.4s ease-in-out forwards;
}

@keyframes retroFlicker {
  0%   { opacity: 0; }
  10%  { opacity: 1; }
  20%  { opacity: 0; }
  30%  { opacity: 1; }
  40%  { opacity: 0; }
  50%  { opacity: 1; }
  60%  { opacity: 0; }
  70%  { opacity: 1; }
  80%  { opacity: 0; }
  90%  { opacity: 1; }
  100% { opacity: 1; } /* Stay pure pitch black right as router swaps components */
}
</style>