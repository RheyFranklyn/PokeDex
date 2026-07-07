import { ref } from 'vue'
import type { PokemonType } from '@/types/pokemon'

const activeType = ref<PokemonType | 'all'>('all')

function selectType(type: PokemonType | 'all') {
  activeType.value = type
}

export function usePokemonFilter() {
  return {
    activeType,
    selectType,
  }
}