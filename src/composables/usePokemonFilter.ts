import { ref } from 'vue'
import type { PokemonType } from '@/types/pokemon'
import { usePokemonSearch } from '@/composables/usePokemonSearch'

const activeType = ref<PokemonType | 'all'>('all')
const { clearSearch } = usePokemonSearch()

function selectType(type: PokemonType | 'all') {
  activeType.value = type

  clearSearch()
  
}

export function usePokemonFilter() {
  return {
    activeType,
    selectType,
  }
}