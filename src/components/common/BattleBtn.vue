<script setup lang="ts">
import { ref } from 'vue'

const spinning = ref(false)

function onBattle(): void {
  if (spinning.value) return // Prevent clicking multiple times during animation
  spinning.value = true
  setTimeout(() => {
    spinning.value = false
    // emit('battle')
  }, 500)
}
</script>

<template>
  <div class="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 bg-transparent">
    
    <button
      class="poke-ball-container group relative flex w-14 h-14 items-center justify-center cursor-pointer select-none border-none bg-transparent"
      aria-label="Start battle"
      @click="onBattle"
    >
      <span 
        class="absolute w-12 h-12 rounded-full opacity-60 blur-md scale-110 transition-all duration-300 group-hover:animate-ping group-hover:scale-125"
        style="background-color: var(--color-poke-gold);"
      ></span>

      <span 
        class="absolute w-11 h-11 rounded-full opacity-30 blur-sm scale-100 group-hover:scale-115 transition-transform duration-300 bg-red-600"
      ></span>

      <div
        class="poke-ball relative z-10 transition-transform duration-200 group-hover:scale-110 active:scale-95"
        :class="{ spin: spinning }"
      />
      
    </button>

  </div>     
</template>

<style scoped>
.poke-ball {
  /* 🎯 Switched width back to explicit pixels so it renders flawlessly */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(180deg, #e53935 50%, #fff 50%);
  border: 4px solid #111;
  position: relative;
  cursor: pointer;
  box-shadow: 0 0 32px rgba(255, 60, 60, 0.4);
  /* Removed conflicting margin-bottom and hover rules */
}

/* Central button element of the Poke Ball design */
.poke-ball::after {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 22px; height: 22px;
  background: #fff;
  border-radius: 50%;
  border: 4px solid #111;
  box-shadow: 0 0 0 3px #fff;
}

/* Active Spin animation class configuration */
.poke-ball.spin { 
  animation: ballSpin 0.5s ease-in-out; 
}

@keyframes ballSpin {
  0%   { transform: rotate(0); }
  50%  { transform: rotate(360deg) scale(1.15); }
  100% { transform: rotate(720deg); }
}
</style>