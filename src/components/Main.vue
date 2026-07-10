<script setup lang="ts">
import { useRouter } from 'vue-router'
import PokemonCardsContainer from '@/components/PokemonCardsContainer.vue'
import Header from '@/components/Header.vue'
import Navbar from './Navbar.vue'
import BattleBtn from './common/BattleBtn.vue'

const router = useRouter()

function goToBattleArena() {
  // 🎯 Navigate smoothly to your registered route right after the ball finishes spinning!
  router.push('/battle')
}
</script>

<template>
  <main class="relative z-1">
    <Header />
    <Navbar />
    <PokemonCardsContainer />
    
    <BattleBtn @trigger="goToBattleArena" />
  </main>
</template>

<style scoped>
</style>