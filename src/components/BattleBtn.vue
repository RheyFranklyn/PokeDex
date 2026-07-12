<script setup lang="ts">
import type { Pokemon } from '@/types/battle'
import { TYPE_COLORS } from '@/types/pokemon.ts'

const props = defineProps<{
  pokemon: Pokemon
  selected: boolean
}>()

defineEmits<{ select: [p: Pokemon] }>()

function getCDNIcon(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}
</script>

<template>
  <button 
    class="poke-card" 
    :class="{ active: props.selected }"
    :style="{ '--type-bleed': TYPE_COLORS[props.pokemon.type] + '22' }"
    @click="$emit('select', props.pokemon)"
    type="button"
  >
    <img :src="getCDNIcon(props.pokemon.id)" :alt="props.pokemon.name" class="card-sprite" />
    <span class="card-name">{{ props.pokemon.name }}</span>
  </button>
</template>

<style scoped>
.poke-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 8px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.poke-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}
.card-sprite {
  width: 56px;
  height: 56px;
  object-fit: contain;
  image-rendering: pixelated;
}
.card-name {
  color: rgba(255, 255, 255, 0.85);
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
}
.poke-card.active {
  background: var(--type-bleed);
  border-color: #ffe066;
  box-shadow: 0 0 12px rgba(255, 224, 102, 0.35);
}
.poke-card.active .card-name {
  color: #ffe066;
  font-weight: 700;
}
</style>