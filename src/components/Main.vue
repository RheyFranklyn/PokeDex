<script setup lang="ts">
import PokemonCardsContainer from '@/components/PokemonCardsContainer.vue'
import Header from '@/components/Header.vue'
import Navbar from './Navbar.vue'
</script>

<template>
  <main class="relative z-1">
    <Header />
    <Navbar />
    <PokemonCardsContainer />
  </main>
</template>

<style scoped></style>
 