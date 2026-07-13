<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PokemonCardsContainer from '@/components/PokemonCardsContainer.vue'
import Header from '@/components/Header.vue'
import Navbar from './Navbar.vue'
import BattleBtn from './common/BattleBtn.vue'
import clickSound from '@/assets/pokeyman.mp3'

const router = useRouter()
const enteringBattleSound = new Audio(clickSound)

// --- Interactive Screen State ---
const isEncounterTransition = ref(false)

function goToBattleArena() {
  enteringBattleSound.currentTime = 0
  enteringBattleSound.play()
  
  setTimeout(() => {
      isEncounterTransition.value = true
  }, 500);

  setTimeout(() => {
    
    isEncounterTransition.value = false
    
    router.push('/battle')
  }, 5000)
}
</script>

<template>
  <main class="relative z-1">
    <div v-if="isEncounterTransition" class="flicker-overlay"></div>

    <Header />
    <Navbar />
    <PokemonCardsContainer />
    
    <BattleBtn @trigger="goToBattleArena" class="animate-pulse-slow"/>
    <img 
      src="@/assets/images/fireBtn.png"  
      alt="fight-button" 
      class="w-32 h-16 fixed bottom-5 right-20 cursor-pointer sm:bottom-4 z-50 
            drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]
            hover:drop-shadow-[0_0_15px_rgba(239,68,68,0.9)]
            transition-all duration-300 ease-out
            hover:-translate-y-1 hover:scale-105 active:scale-95 animate-pulse-slow" 
      @click="goToBattleArena"
    />
  </main>
</template>

<style scoped>
/*  Retro Encounter Screen Flash Transition Styles */
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
  0% { opacity: 0; }
  15% { opacity: 1; }
  30% { opacity: 0; }
  45% { opacity: 1; }
  60% { opacity: 0; }
  75% { opacity: 1; }
  100% { opacity: 1; } /* Stay pure pitch black at 100% right as router swaps components */
}

/* fight button */
.animate-pulse-slow {
  animation: flamePulse 2.5s infinite ease-in-out;
}

@keyframes flamePulse {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.6));
  }
  50% {
    transform: scale(1.03);
    filter: drop-shadow(0 0 16px rgba(239, 68, 68, 0.8));
  }
}
</style>