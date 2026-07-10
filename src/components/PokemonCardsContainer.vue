<script setup lang="ts">
import { usePokemon } from '@/composables/usePokemon'
import { computed } from 'vue'
import { usePokemonSearch } from '@/composables/usePokemonSearch'
import PokemonCard from './PokemonCard.vue'
import PokemonLoader from './PokemonLoader.vue'
import { usePokemonFilter } from '@/composables/usePokemonFilter.ts'

const { pokemons, loading, error, loadMore } = usePokemon()
const { searchQuery, searchError, clearSearch, searchLoading, evolutionFamily, activeCarouselIndex, isSearching } = usePokemonSearch()
const { activeType } = usePokemonFilter()

const infiniteCarouselItems = computed(() => {

  if (!evolutionFamily.value || evolutionFamily.value.length === 0) return []

  const baseLine = evolutionFamily.value

  let virtualLine: { member: typeof baseLine[0]; sourceIndex: number }[] = []

  if (baseLine.length === 1) {
    virtualLine = [
      { member: baseLine[0]!, sourceIndex: 0 },
      { member: baseLine[0]!, sourceIndex: 0 },
      { member: baseLine[0]!, sourceIndex: 0 }
    ]
  } else if (baseLine.length === 2) {
    virtualLine = [
      { member: baseLine[0]!, sourceIndex: 0 },
      { member: baseLine[1]!, sourceIndex: 1 },
      { member: baseLine[0]!, sourceIndex: 0 },
      { member: baseLine[1]!, sourceIndex: 1 }
    ]
  } else {
    virtualLine = baseLine.map((member, idx) => ({ member, sourceIndex: idx }))
  }

  const totalLength = virtualLine.length

  return virtualLine.map((item, index) => {
    let offset = (index - activeCarouselIndex.value) % totalLength
    
    if (offset < 0) offset += totalLength
    if (offset > totalLength / 2) offset -= totalLength
    if (offset <= -totalLength / 2) offset += totalLength

    return {
      id: `${item.member.id}-v${index}`,
      pokemon: item.member,
      index: item.sourceIndex, 
      offset: offset,
      isCenter: offset === 0,
      isLeft: offset === -1,
      isRight: offset === 1,
      isHidden: offset !== 0 && offset !== -1 && offset !== 1
    }
  })
})

const filteredPokemons = computed(() => {
  if (activeType.value === 'all') return pokemons.value
  return pokemons.value.filter((p) => p.types.includes(activeType.value))
})
</script>

<template>
  <PokemonLoader v-if="(loading && pokemons.length === 0) || searchLoading" />

  <div v-else class="px-6">
    <p v-if="searchError && isSearching" class="text-red-400 text-center text-sm py-4">{{ searchError }}</p>

    <section v-if="!isSearching" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <PokemonCard v-for="pokemon in filteredPokemons" :key="pokemon.id" :pokemon="pokemon" />
    </section>

    <div v-if="isSearching && evolutionFamily.length > 0" class="flex flex-col items-center justify-center py-4" >
      
      <div class="carousel-container">
        <button 
          class="nav-arrow left" 
          @click="activeCarouselIndex = (activeCarouselIndex - 1 + evolutionFamily.length) % evolutionFamily.length"
        >
          ‹
        </button>

        <div class="carousel-track">
          <div 
            v-for="slide in infiniteCarouselItems" 
            :key="slide.id"
            class="carousel-slide"
            :class="{
              'center-stage': slide.isCenter,
              'left-stage': slide.isLeft,
              'right-stage': slide.isRight,
              'hidden-stage': slide.isHidden
            }"
            :style="{ '--offset': slide.offset }"
            @click="activeCarouselIndex = slide.index"
          >
            <PokemonCard :pokemon="slide.pokemon" :isSearch="true" />
          </div>
        </div>

        <button 
          class="nav-arrow right" 
          @click="activeCarouselIndex = (activeCarouselIndex + 1) % evolutionFamily.length"
        >
          ›
        </button>
      </div>

      <button 
        @click="clearSearch" 
        class="text-xs bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-xl transition font-sans font-semibold mt-4"
      >
        ← Back to Grid
      </button>
    </div>

    <div v-if="!isSearching" class="flex flex-col items-start mt-3 mb-3">
      <PokemonLoader v-if="loading" />
      <p v-if="error" class="text-red-400 text-sm mb-2">{{ error }}</p>
      <button @click="loadMore" :disabled="loading" class="bg-white/10 px-6 py-2 rounded-xl text-sm">
        Load More
      </button>
    </div>
  </div>
</template>

<style scoped>
/* ── 3D Carousel Mathematical Layout Engine ────────────────────────── */
.carousel-container {
  position: relative;
  width: 100%;
  max-width: 960px;
  height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
  overflow: hidden;
}

.carousel-track {
  position: relative;
  width: 1000px; /* Adjust to match your PokemonCard width exactly if needed */
  height: 480px;
  transform-style: preserve-3d;
}

.carousel-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  /* High quality Spring-like transition for smooth active sliding snaps */
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.45s ease, filter 0.45s ease;
  
  transform: 
    translateX(calc(var(--offset) * 260px)) 
    scale(calc(1 - abs(var(--offset)) * 0.15)) 
    rotateY(calc(var(--offset) * -24deg));
  
  z-index: calc(10 - abs(var(--offset)));
}

/* ── Carousel Visibility States ─────────────────────────────────────── */
.carousel-slide.left-stage,
.carousel-slide.right-stage {
  opacity: 0.45;
  filter: blur(1px) grayscale(0.2);
  pointer-events: auto; /* Allows user to click side cards to skip to them */
}

.carousel-slide.center-stage {
  opacity: 1;
  filter: none;
  transform: translateX(0) scale(1.04) rotateY(0deg);
  z-index: 20;
  pointer-events: auto;
}

/* 🎯 CRUCIAL: Keeps background-wrapped components completely invisible without visual snapping artifacts */
.carousel-slide.hidden-stage {
  opacity: 0;
  pointer-events: none;
  transition: none !important; 
}

/* ── UI Navigation Arrows ────────────────────────────────────────────── */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
  transition: all 0.2s ease;
}
.nav-arrow:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #ffd700;
  transform: translateY(-50%) scale(1.1);
}
.nav-arrow.left { left: 15px; }
.nav-arrow.right { right: 15px; }
</style>