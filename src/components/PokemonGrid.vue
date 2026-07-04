<script setup lang="ts">
import { usePokemon } from '@/composables/usePokemon'

import PokemonCard from '@/components/PokemonCards.vue'

const { pokemons, loading, error, loadMore } = usePokemon()
</script>

<template>
  <section>
    <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />

    <p v-if="loading">Loading...</p>

    <p v-if="error">
      {{ error }}
    </p>

    <button @click="loadMore">Load More</button>
  </section>
</template>
