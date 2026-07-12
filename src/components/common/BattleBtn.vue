<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ trigger: [] }>() 
const spinning = ref(false)

function onBattle(): void {
  if (spinning.value) return 
  spinning.value = true
  
  setTimeout(() => {
    spinning.value = false
    emit('trigger') 
  }, 500)
}
</script>

<template>
  <div class="fixed bottom-4 right-4 sm:bottom-2 sm:right-6 z-50 bg-transparent">
    
    <button
      class="poke-ball-container group relative flex w-14 h-14 items-center justify-center cursor-pointer select-none border-none bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-full"
      aria-label="Start battle"
      @click="onBattle"
    >
      <span 
        class="absolute w-12 h-12 rounded-full opacity-0 blur-md scale-100 transition-all duration-300 group-hover:opacity-60 group-hover:animate-ping group-hover:scale-125 group-focus:opacity-60 group-focus:scale-125"
        style="background-color: var(--color-poke-gold);"
      ></span>

      <span 
        class="absolute w-11 h-11 rounded-full opacity-0 blur-sm scale-90 bg-red-600 transition-all duration-300 group-hover:opacity-30 group-hover:scale-115 group-focus:opacity-30 group-focus:scale-115 group-active:scale-95"
      ></span>

      <div
        class="poke-ball relative z-10 transition-transform duration-200 group-hover:scale-110 group-focus:scale-110 active:scale-95"
        :class="{ spin: spinning }"
      />
      
    </button>

  </div>     
</template>

<style scoped>
.poke-ball {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(180deg, #e53935 50%, #fff 50%);
  border: 4px solid #111;
  position: relative;
  cursor: pointer;
  /* 🎯 REMOVED ALL PASSIVE GLOW: Standard, crisp card shadow only */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* 🎯 THE GLOWS ONLY AWAKEN HERE (On Interaction) */
.poke-ball-container:hover .poke-ball,
.poke-ball-container:focus .poke-ball {
  box-shadow: 0 0 24px rgba(255, 60, 60, 0.6);
}

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

.poke-ball.spin { 
  animation: ballSpin 0.5s ease-in-out; 
}

@keyframes ballSpin {
  0%   { transform: rotate(0); }
  50%  { transform: rotate(360deg) scale(1.15); }
  100% { transform: rotate(720deg); }
}
</style>