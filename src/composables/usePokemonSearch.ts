import { ref } from 'vue'
import { searchPokemon } from '@/services/pokemonService'
import type { Pokemon } from '@/types/pokemon'

const searchQuery = ref('')
const searchedPokemon = ref<Pokemon | null>(null)
const searchLoading = ref(false)
const searchError = ref<string | null>(null)

async function handleSearch() {
  if (!searchQuery.value.trim()) {
    searchedPokemon.value = null
    searchError.value = null
    return
  }

  searchLoading.value = true
  searchError.value = null

  try {
    const result = await searchPokemon(searchQuery.value)
    searchedPokemon.value = result
  } catch (err) {
    searchedPokemon.value = null
    searchError.value = `Could not find any Pokémon named "${searchQuery.value}"`
  } finally {
    searchLoading.value = false
  }
}

function clearSearch() {
  searchQuery.value = ''
  searchedPokemon.value = null
  searchError.value = null
}

export function usePokemonSearch() {
  return {
    searchQuery,
    searchedPokemon,
    searchLoading,
    searchError,
    handleSearch,
    clearSearch,
  }
}