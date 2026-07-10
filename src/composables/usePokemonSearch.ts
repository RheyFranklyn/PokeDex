import { ref } from 'vue'
import { searchPokemon, getPokemon } from '@/services/pokemonService'
import type { Pokemon } from '@/types/pokemon'

const searchQuery = ref('')
const searchedPokemon = ref<Pokemon | null>(null)
const evolutionFamily = ref<Pokemon[]>([]) // Stores the full family array
const activeCarouselIndex = ref(0)         // Tracks which one is centered
const searchLoading = ref(false)
const searchError = ref<string | null>(null)
const isSearching = ref(false)

async function handleSearch() {
  if (!searchQuery.value.trim()) return clearSearch()

  searchLoading.value = true
  searchError.value = null
  evolutionFamily.value = []

  try {
    // Fetch the targeted search Pokémon
    const target = await searchPokemon(searchQuery.value.toLowerCase().trim())
    searchedPokemon.value = target

    // Fetch its species profile to get the evolution chain URL
    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${target.id}/`)
    const speciesData = await speciesRes.json()
    
    const evoRes = await fetch(speciesData.evolution_chain.url)
    const evoData = await evoRes.json()

    // Traverse the chain 
    const familyNames: string[] = []
    let chainNode = evoData.chain
    
    while (chainNode) {
      familyNames.push(chainNode.species.name)
      // move to next evolution stage if it exists
      chainNode = chainNode.evolves_to && chainNode.evolves_to.length > 0 
        ? chainNode.evolves_to[0] 
        : null
    }

    //load full card datasets for the gathered family names
    const cardPromises = familyNames.map(name => 
      getPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`)
    )
    evolutionFamily.value = await Promise.all(cardPromises)

    isSearching.value = true
    // Align the searched target directly in the center spotlight position
    const targetIdx = evolutionFamily.value.findIndex(p => p.id === target.id)
    activeCarouselIndex.value = targetIdx !== -1 ? targetIdx : 0

  } catch (err) {
    isSearching.value =true
    searchedPokemon.value = null
    evolutionFamily.value = []
    searchError.value = `Could not find any data for "${searchQuery.value}"`
  } finally {
    searchLoading.value = false
  }
}

function clearSearch() {
  searchQuery.value = ''
  searchedPokemon.value = null
  evolutionFamily.value = []
  activeCarouselIndex.value = 0
  searchError.value = null
  isSearching.value = false
}

export function usePokemonSearch() {
  return {
    searchQuery,
    searchedPokemon,
    evolutionFamily,
    activeCarouselIndex,
    searchLoading,
    searchError,
    handleSearch,
    clearSearch,
    isSearching
  }
}