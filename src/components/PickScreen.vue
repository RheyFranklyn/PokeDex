<script setup lang="ts">
import { ref, computed } from 'vue'

// Explicitly import both types to prevent local naming conflicts
import type { Pokemon as ApiPokemon } from '@/types/pokemon'
import type { Pokemon as BattlePokemon } from '@/types/battle'

import { TYPE_COLORS } from '@/types/pokemon.ts'
import { usePokemon } from '@/composables/usePokemon'       
import { usePokemonSearch } from '@/composables/usePokemonSearch'
import PokeCardBattle from './PokeCardBattle.vue'

const props = defineProps<{
  playerPick: BattlePokemon | null
  enemyPick: BattlePokemon | null
  canFight: boolean
}>()

const emit = defineEmits<{
  selectPlayer: [p: BattlePokemon]
  selectEnemy:  [p: BattlePokemon]
  fight:        []
}>()

// --- Interactive Animations State ---
const isFlickering = ref(false)

const { pokemons, loading, loadMore } = usePokemon()
const { searchQuery, searchedPokemon, searchLoading, searchError, handleSearch, clearSearch, isSearching } = usePokemonSearch()

// Normalizes your pre-mapped application API structure into the simplified Battle format
function normalizePokemon(p: ApiPokemon): BattlePokemon {
  return {
    id: p.id,
    name: p.name,
    hp: p.stats?.hp ?? 100,
    atk: p.stats?.atk ?? 50,
    type: (p.types && p.types[0]) ? p.types[0] : 'normal',
    gif: p.sprite || '' 
  }
}

// Combines list view and search results into one unified array of BattlePokemon
const activeSelectionPool = computed<BattlePokemon[]>(() => {
  if (isSearching.value) {
    return searchedPokemon.value ? [normalizePokemon(searchedPokemon.value)] : []
  }
  return (pokemons.value as ApiPokemon[]).map(normalizePokemon)
})

// Triggers a classic retro dark flash before updating selected states
function handlePokemonSelect(type: 'player' | 'enemy', pokemon: BattlePokemon) {
  isFlickering.value = true
  
  setTimeout(() => {
    isFlickering.value = false
    if (type === 'player') {
      emit('selectPlayer', pokemon)
    } else {
      emit('selectEnemy', pokemon)
    }
  }, 400)
}

function fallbackSprite(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}
</script>

<template>
  <div class="pick-screen">
    <div v-if="isFlickering" class="flicker-overlay"></div>

    <h2 class="screen-title">Choose Your Pokémon</h2>

    <div class="search-container">
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search Pokémon by name..." 
          class="search-bar"
          @keyup.enter="handleSearch"
        />
        <button v-if="isSearching" class="clear-btn" @click="clearSearch">✕</button>
        <button class="search-btn" :disabled="searchLoading" @click="handleSearch">
          {{ searchLoading ? '...' : '🔍' }}
        </button>
      </div>
      <p v-if="searchError" class="search-error-msg">{{ searchError }}</p>
    </div>

    <div class="pick-row">
      <div class="panel">
        <div class="panel-title player">🎮 Your Pokémon</div>
        <div class="selected-preview">
          <template v-if="props.playerPick">
            <img
              :src="props.playerPick.gif || fallbackSprite(props.playerPick.id)"
              :alt="props.playerPick.name"
              class="preview-img"
              :onerror="`this.src='${fallbackSprite(props.playerPick.id)}'`"
            />
            <span class="preview-name">{{ props.playerPick.name }}</span>
            <div class="preview-meta">
              <span class="type-badge" :style="{ background: TYPE_COLORS[props.playerPick.type] || '#757575' }">
                {{ props.playerPick.type }}
              </span>
              <span class="stats">HP {{ props.playerPick.hp }} · ATK {{ props.playerPick.atk }}</span>
            </div>
          </template>
          <span v-else class="empty-hint">Pick from the list →</span>
        </div>
        
        <div class="grid-container">
          <div class="poke-grid">
            <PokeCardBattle
              v-for="p in activeSelectionPool"
              :key="'p-' + p.id"
              :pokemon="p"
              :selected="props.playerPick?.id === p.id"
              @select="handlePokemonSelect('player', $event)"
            />
          </div>
          <button v-if="!isSearching" class="load-more-btn" :disabled="loading" @click="loadMore">
            {{ loading ? 'Loading Content...' : '⬇️ Load More' }}
          </button>
        </div>
      </div>

      <div class="mid">
        <p class="mid-hint">Pick your<br>Pokémon,<br>then the<br>enemy's</p>
        <button class="fight-btn" :disabled="!props.canFight" @click="emit('fight')">
          ⚔️ Fight!
        </button>
      </div>

      <div class="panel">
        <div class="panel-title enemy">🤖 Enemy Pokémon</div>
        <div class="selected-preview">
          <template v-if="props.enemyPick">
            <img
              :src="props.enemyPick.gif || fallbackSprite(props.enemyPick.id)"
              :alt="props.enemyPick.name"
              class="preview-img"
              :onerror="`this.src='${fallbackSprite(props.enemyPick.id)}'`"
            />
            <span class="preview-name">{{ props.enemyPick.name }}</span>
            <div class="preview-meta">
              <span class="type-badge" :style="{ background: TYPE_COLORS[props.enemyPick.type] || '#757575' }">
                {{ props.enemyPick.type }}
              </span>
              <span class="stats">HP {{ props.enemyPick.hp }} · ATK {{ props.enemyPick.atk }}</span>
            </div>
          </template>
          <span v-else class="empty-hint">← Pick enemy</span>
        </div>

        <div class="grid-container">
          <div class="poke-grid">
            <PokeCardBattle
              v-for="p in activeSelectionPool"
              :key="'e-' + p.id"
              :pokemon="p"
              :selected="props.enemyPick?.id === p.id"
              @select="handlePokemonSelect('enemy', $event)"
            />
          </div>
          <button v-if="!isSearching" class="load-more-btn" :disabled="loading" @click="loadMore">
            {{ loading ? 'Loading Content...' : '⬇️ Load More' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pick-screen {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #0d1b4b, #1a0a3e);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  box-sizing: border-box;
  position: relative;
}
.flicker-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: #000000;
  z-index: 9999;
  pointer-events: none;
  animation: retroFlicker 0.4s ease-in-out forwards;
}
@keyframes retroFlicker {
  0% { opacity: 0; }
  15% { opacity: 1; }
  30% { opacity: 0; }
  45% { opacity: 1; }
  60% { opacity: 0; }
  75% { opacity: 1; }
  100% { opacity: 0; }
}
.screen-title {
  color: #ffe066;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.search-container {
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-box {
  position: relative;
  width: 100%;
  display: flex;
}
.search-bar {
  width: 100%;
  padding: 12px 60px 12px 20px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}
.search-bar:focus { border-color: #ffe066; }
.clear-btn {
  position: absolute;
  right: 50px; top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  font-size: 14px;
}
.clear-btn:hover { color: #fff; }
.search-btn {
  position: absolute;
  right: 6px; top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.1);
  border: none;
  border-radius: 50%;
  width: 34px; height: 34px;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-btn:hover { background: rgba(255,255,255,0.2); }
.search-error-msg {
  color: #ff6b6b;
  font-size: 12px;
  margin-top: 6px;
}
.pick-row {
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  align-items: center;
}
.panel {
  flex: 1;
  background: rgba(255,255,255,0.06);
  border-radius: 16px;
  padding: 16px;
  border: 1px solid rgba(255,255,255,0.12);
  min-width: 0;
}
.panel-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 12px;
  text-align: center;
}
.panel-title.player { color: #ffe066; }
.panel-title.enemy  { color: #ff6b6b; }
.selected-preview {
  min-height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 14px;
  background: rgba(0,0,0,0.2);
  border-radius: 8px;
  padding: 8px;
}
.preview-img {
  width: 74px; height: 74px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.6));
}
.preview-name {
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
}
.preview-meta {
  display: flex;
  gap: 8px;
  align-items: center;
}
.type-badge {
  font-size: 9px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
}
.stats { color: rgba(255,255,255,0.6); font-size: 11px; }
.empty-hint { color: rgba(255,255,255,0.3); font-size: 12px; }
.grid-container { display: flex; flex-direction: column; gap: 10px; }
.poke-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  max-height: 240px;
  overflow-y: auto;
  padding-right: 4px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.2) transparent;
}
.load-more-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  transition: background 0.2s;
}
.load-more-btn:hover:not(:disabled) { background: rgba(255, 255, 255, 0.15); }
.mid {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 8px;
  flex-shrink: 0;
}
.mid-hint { color: rgba(255,255,255,0.4); font-size: 11px; text-align: center; line-height: 1.6; }
.fight-btn {
  background: linear-gradient(135deg, #43a047, #2e7d32);
  color: #fff;
  border: none;
  padding: 14px 32px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  letter-spacing: 1px;
  text-transform: uppercase;
  box-shadow: 0 4px 20px rgba(50,200,50,0.4);
  white-space: nowrap;
}
.fight-btn:hover:not(:disabled) { transform: scale(1.06); }
.fight-btn:disabled { opacity: 0.25; cursor: not-allowed; }

@media(max-width: 640px) {
  .pick-row { flex-direction: column; }
  .mid { order: -1; flex-direction: row; width: 100%; justify-content: space-between; }
  .mid-hint { display: none; }
}
</style>