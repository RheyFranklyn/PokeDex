import { onMounted, ref, watch } from 'vue'
import { getPokemon, fetchPokemonList, fetchPokemonUrlsByType } from '@/services/pokemonService'
import type { Pokemon, TypePokemonResource, PokemonType } from '@/types/pokemon'
import { usePokemonFilter } from './usePokemonFilter'

const { activeType } = usePokemonFilter()

function loaderDelay(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}

const pokemons = ref<Pokemon[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const offset = ref(0)
const limit = 20

const allTypePokemonUrls = ref<TypePokemonResource[]>([])

async function loadMore() {
  if (loading.value) return
  loading.value = true
  error.value = null

  try {
    await loaderDelay()

    if (activeType.value === 'all') {
      // Standard list pagination
      const data = await fetchPokemonList(limit, offset.value)
      
      const detailedPokemons = await Promise.all(
        data.results.map((pokemon) => getPokemon(pokemon.url)),
      )

      pokemons.value.push(...detailedPokemons)
      offset.value += limit
    } else {
      // Isolated Type Filtering
      if (allTypePokemonUrls.value.length === 0) {
        allTypePokemonUrls.value = await fetchPokemonUrlsByType(activeType.value)
      }

      const nextChunk = allTypePokemonUrls.value.slice(offset.value, offset.value + limit)
      
      const temporaryBatch: Pokemon[] = []
      
      for (const item of nextChunk) {
        try {
          const pokemonDetails = await getPokemon(item.pokemon.url)
          temporaryBatch.push(pokemonDetails)
        } catch (singleErr) {
          console.error(`Skipped a broken endpoint slot: ${item.pokemon.name}`, singleErr)
        }
      }

      pokemons.value.push(...temporaryBatch)
      offset.value += limit
    }

  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load Pokémon'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Watch for category clicks, wipe everything, reset pointers, and load page 1 and chuchu
watch(activeType, async (newType: PokemonType | 'all') => {
  pokemons.value = []
  allTypePokemonUrls.value = []
  offset.value = 0
  await loadMore()
})

export function usePokemon() {
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