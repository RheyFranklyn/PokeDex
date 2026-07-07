<script setup lang="ts">
import { usePokemonFilter } from '@/composables/usePokemonFilter'
import type { PokemonType } from '@/types/pokemon'

const typeMap: Record<PokemonType, string> = {
  normal: '#a8a77a', fire: '#ee8130', water: '#6390f0', electric: '#f7d02c',
  grass: '#7ac74c', ice: '#96d9d6', fighting: '#c22e28', poison: '#a33ea1',
  ground: '#e2bf65', flying: '#a98ff3', psychic: '#f95587', bug: '#a6b91a',
  rock: '#b6a136', ghost: '#735797', dragon: '#6f35fc', dark: '#705746',
  steel: '#b7b7ce', fairy: '#d685ad',
}

function getTypeColor(type: PokemonType): string {
  return typeMap[type] || '#a8a77a'
}

const pokemonTypes = Object.keys(typeMap) as PokemonType[]

// 🎯 Hook up the shared filter pipeline variables
const { activeType, selectType } = usePokemonFilter()
</script>

<template>
  <!-- .type-scroll equivalent layout container -->
  <nav
    class="flex gap-[0.4rem] overflow-x-auto px-6 py-[0.8rem] no-scrollbar [touch-action:pan-x] sticky top-28 z-100 backdrop-blur-sm mb-0"
    aria-label="Filter by type"
  >
    <!-- All Reset Option -->
    <button
      type="button"
      class="flex items-center gap-1.25 px-3.25 py-1.25 rounded-[50px] border-none font-sans text-[12px] font-bold tracking-[0.4px] text-white cursor-pointer whitespace-nowrap transition-all duration-150 ease-out hover:-translate-y-0.5 hover:opacity-100"
      :class="
        activeType === 'all' ? 'opacity-100 bg-white/20 -translate-y-px' : 'opacity-65 bg-white/5'
      "
      @click="selectType('all')"
    >
      ✨ All Entries
    </button>

    <!-- Dynamic Type Pills Loop -->
    <button
      v-for="type in pokemonTypes"
      :key="type"
      type="button"
      class="flex items-center gap-1.25 px-3.25 py-1.25 rounded-[50px] border-none font-sans text-[12px] font-bold tracking-[0.4px] text-white cursor-pointer whitespace-nowrap capitalize transition-all duration-150 ease-out hover:-translate-y-0.5 hover:opacity-100"
      :class="activeType === type ? 'opacity-100 -translate-y-px shadow-sm' : 'opacity-65'"
      :style="{ backgroundColor: getTypeColor(type) }"
      @click="selectType(type)"
    >
      {{ type }}
    </button>
  </nav>
</template>
