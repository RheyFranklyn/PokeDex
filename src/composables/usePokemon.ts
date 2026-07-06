import { onMounted, ref } from 'vue'
import { getPokemon, getPokemons, searchPokemon } from '@/services/pokemonService'
import type { Pokemon } from '@/types/pokemon'

const loading = ref(false)
const error = ref<string | null>(null)

function loaderDelay(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}

export function usePokemon() {
  const pokemons = ref<Pokemon[]>([])

  const offset = ref(0)
  const limit = 20

  async function loadMore() {
    loading.value = true

    try {
      await loaderDelay()

      const data = await getPokemons(limit, offset.value)

      const detailedPokemons = await Promise.all(
        data.results.map((pokemon) => getPokemon(pokemon.url)),
      )

      pokemons.value.push(...detailedPokemons)

      offset.value += limit
    } catch (err) {
      error.value = 'Failed to load Pokémon'

      console.error(err)
    } finally {
      loading.value = false
    }
  }

  onMounted(loadMore)

  return {
    pokemons,
    loading,
    error,
    loadMore,
  }
}


// export async function usePokemonSearch(){
//   const pokemon = ref<Pokemon>()
//   const query = ref('')
  
//   loading.value = true
//   try{
//     const data = await searchPokemon(query)

//     const detailedPokemons = Promise.all(data)
//   }catch{

//   }
// }