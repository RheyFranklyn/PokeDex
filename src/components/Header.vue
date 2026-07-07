<script setup lang="ts">
import { usePokemonSearch } from '@/composables/usePokemonSearch'

const { searchQuery, searchLoading, handleSearch } = usePokemonSearch()
</script>

<template>
  <header class="flex flex-col h-28 items-center gap-2 px-6 pt-[1.2rem] pb-[0.8rem] bg-white/[0.03] border-b border-white/[0.08] sticky top-0 z-[100] backdrop-blur-sm">
     <div
      class="font-pixel text-game-title tracking-[1px] text-poke-gold drop-shadow-[0_0_25px_rgba(255,215,0,0.4)] [text-shadow:var(--shadow-offset-title)_var(--shadow-offset-title)_0_#c8a200] md:text-left text-center"
      role="heading"
      aria-level="1"
    >
      Pokémon <span class="text-white">Collection</span>
    </div>

    <!-- Submitting triggers -->
    <form @submit.prevent="handleSearch" class="flex items-center gap-2 w-full max-w-85 px-4 py-[0.4rem] bg-white/8 border border-white/15 rounded-full">
      <svg
        class="shrink-0 transition-colors"
        :class="searchLoading ? 'text-rose-400 animate-pulse' : 'text-white/40'"
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search Pokémon…"
        autocomplete="off"
        :disabled="searchLoading"
        class="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-white/40"
      />
    </form>
  </header>
</template>