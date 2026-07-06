<script setup lang="ts">
import { usePokemon } from '@/composables/usePokemon'
import PokemonCard from './PokemonCard.vue'
import PokemonLoader from './PokemonLoader.vue'

const { pokemons, loading, error, loadMore } = usePokemon()
</script>
<template>
  <PokemonLoader v-if="loading && pokemons.length === 0" />

  <section v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />
  </section>

  <PokemonLoader v-if="loading" />
  <p v-if="error">{{ error }}</p>

  <button @click="loadMore">Load More</button>
</template>
