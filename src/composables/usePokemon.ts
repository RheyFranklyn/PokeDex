import { onMounted, ref, watch } from 'vue' // 👈 Added watch
import { getPokemon, fetchPokemonList, fetchPokemonByType } from '@/services/pokemonService'
import type { Pokemon, PokemonType } from '@/types/pokemon' // 👈 Added type import if needed
import { usePokemonFilter } from './usePokemonFilter'

const { activeType } = usePokemonFilter()

function loaderDelay(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}

// 🎯 FIX 1: Move state OUTSIDE so all components read the exact same data instances
const pokemons = ref<Pokemon[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const offset = ref(0)
const limit = 20

async function loadMore() {
  if (loading.value) return
  loading.value = true

  try {
    await loaderDelay()

    if (activeType.value === 'all') {
      const data = await fetchPokemonList(limit, offset.value)
      
      const detailedPokemons = await Promise.all(
        data.results.map((pokemon) => getPokemon(pokemon.url)),
      )

      pokemons.value.push(...detailedPokemons)
      offset.value += limit
    } else {
      const typePokemons = await fetchPokemonByType(activeType.value)
      pokemons.value = typePokemons
    }

  } catch (err) {
    error.value = 'Failed to load Pokémon'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// 🎯 FIX 2: Watch for Navbar type clicks! 
// When user clicks 'fire', wipe the old screen array, reset offset, and hit the API.
watch(activeType, () => {
  pokemons.value = []
  offset.value = 0
  loadMore()
})

export function usePokemon() {
  // Automatically trigger initial load when the main grid container mounts
  onMounted(() => {
    if (pokemons.value.length === 0) {
      loadMore()
    }
  })

  return {
    pokemons,
    loading,
    error,
    loadMore,
  }
}