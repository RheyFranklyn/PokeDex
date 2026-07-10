<script setup lang="ts">
import { ref } from 'vue'
import VsScreen from '@/components/VsScreen.vue' // Adjust import path if needed

const introducesBattle = ref(true)

function startGameplay() {
  // 🎯 The 2.3s animation is finished! Hide the intro splash screen and launch the match.
  introducesBattle.value = false
}
</script>

<template>
  <div class="w-full min-h-screen bg-[#0a0a0a]">
    
    <VsScreen v-if="introducesBattle" @done="startGameplay" class="fixed inset-0 z-50" />

    <div v-else class="p-6 text-white animate-fade-in">
      <h1 class="text-xl font-bold text-center text-poke-gold">Battle Field Arena</h1>
      </div>

  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>