<script setup lang="ts">
import { usePokemon } from '@/composables/usePokemon'
import { computed } from 'vue'
import { usePokemonSearch } from '@/composables/usePokemonSearch'
import PokemonCard from './PokemonCard.vue'
import PokemonLoader from './PokemonLoader.vue'
import { usePokemonFilter } from '@/composables/usePokemonFilter.ts'

const { pokemons, loading, error, loadMore } = usePokemon()

const { searchQuery, searchedPokemon, searchError, clearSearch, searchLoading  } = usePokemonSearch()

const { activeType } = usePokemonFilter()

const filteredPokemons = computed(()=>{
  if(activeType.value === 'all'){
    return pokemons.value
  }

  return pokemons.value.filter((pokemon)=>
     pokemon.types.includes(activeType.value)
  )
})
</script>

<template>
  <PokemonLoader v-if="loading && pokemons.length === 0 || searchLoading" />

  <div v-else class="px-6 ">
    <p v-if="searchError && searchQuery.trim() !== ''" class="text-red-400 text-center text-sm py-4">{{ searchError }}</p>

    <section class="grid grid-cols-2 md:grid-cols-4 gap-4">
    
      <!-- default -->
      <template v-if="searchQuery.trim() === ''">
        <PokemonCard v-for="pokemon in filteredPokemons" :key="pokemon.id" :pokemon="pokemon" />
      </template>

      <!-- search-->
      <template v-else-if="searchedPokemon">
        <div class="col-span-full flex flex-col items-center justify-center py-8">
        
          <div class="w-full [perspective:900px] max-w-[300px]">
            <PokemonCard :pokemon="searchedPokemon" :isSearch="true" />
          </div>

          <button 
            @click="clearSearch" 
            class="text-xs bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-xl transition font-sans font-semibold mt-6"
          >
            ← Back to Grid
          </button>

        </div>
      </template>

    </section>

    <!-- Hide infinite loaders when user is actively searching -->
    <div v-if="searchQuery.trim() === ''" class="flex flex-col items-center mt-6">
      <PokemonLoader v-if="loading" />
      <p v-if="error" class="text-red-400 text-sm mb-2">{{ error }}</p>
      <button @click="loadMore" :disabled="loading" class="bg-white/10 px-6 py-2 rounded-xl text-sm">
        Load More
      </button>
    </div>
  </div>
</template>