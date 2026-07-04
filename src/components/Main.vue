<script setup lang="ts">
import PokemonCards from '@/components/PokemonCards.vue'
import Header from '@/components/Header.vue'
import Navbar from './Navbar.vue'
</script>

<template>
  <main class="relative z-1">
    <Header />
    <Navbar />
    <PokemonCards />
  </main>
</template>

<style scoped></style>
