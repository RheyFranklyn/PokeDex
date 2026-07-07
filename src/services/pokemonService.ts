import type { PokemonResponse } from '@/types/pokemon'
import type { Pokemon, PokemonApiResponse, TypePokemonSlot, ApiTypeSlot, ApiStatSlot} from '@/types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'

export async function getPokemon(url: string): Promise<Pokemon> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon')
  }

  const json: PokemonApiResponse = await response.json()

  const animatedSprite = json.sprites.versions['generation-v']['black-white'].animated.front_default

  const officialArtwork = json.sprites.other['official-artwork'].front_default

  const defaultSprite = json.sprites.front_default

  const sprite = animatedSprite ?? officialArtwork ?? defaultSprite ?? ''

  return {
    id: json.id,

    name: json.name,

    sprite,

    types: json.types.map((type) => type.type.name),

    stats: {
      hp: json.stats.find((stat) => stat.stat.name === 'hp')?.base_stat ?? 0,

      atk: json.stats.find((stat) => stat.stat.name === 'attack')?.base_stat ?? 0,

      def: json.stats.find((stat) => stat.stat.name === 'defense')?.base_stat ?? 0,
    },
  }
}


export async function fetchPokemonList(limit = 20, offset = 0): Promise<PokemonResponse> {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)

  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon')
  }

  return response.json()
}


export async function searchPokemon(name: string): Promise<Pokemon>{
  const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase().trim()}`)

  if(!response.ok) throw new Error(`Failed to fetch ${name}`)
  
  const data:PokemonApiResponse = await response.json()

  // for pokemon GIF
  const animatedSprite = data.sprites.versions['generation-v']['black-white'].animated.front_default
  const officialArtwork = data.sprites.other['official-artwork'].front_default
  const defaultSprite = data.sprites.front_default
  const sprite = animatedSprite ?? officialArtwork ?? defaultSprite ?? ''

  return{
    id: data.id,
    name: data.name,
    sprite,
    types: data.types.map((type) => type.type.name),
    stats:{
      hp: data.stats.find((stat) => stat.stat.name === 'hp')?.base_stat ?? 0,
      atk: data.stats.find((stat) => stat.stat.name === 'attack')?.base_stat ?? 0,
      def: data.stats.find((stat) => stat.stat.name === 'defense')?.base_stat ?? 0
    }

  }
}

export async function fetchPokemonByType(type: string): Promise<Pokemon[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`)
  if (!response.ok) throw new Error(`Failed to fetch Pokémon of type ${type}`)
  
  const data = await response.json()
  
  // Explicitly map out the typed slots instead of any
  const pokemonPromises = data.pokemon.map(async (p: TypePokemonSlot) => {
    const res = await fetch(p.pokemon.url)
    const detail = await res.json()
    
    const animatedSprite = detail.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default
    const officialArtwork = detail.sprites.other?.['official-artwork']?.front_default
    const defaultSprite = detail.sprites.front_default
    const sprite = animatedSprite ?? officialArtwork ?? defaultSprite ?? ''

    return {
      id: detail.id,
      name: detail.name,
      sprite,
      types: detail.types.map((t: ApiTypeSlot) => t.type.name),
      stats: {
        hp: detail.stats.find((s: ApiStatSlot) => s.stat.name === 'hp')?.base_stat ?? 0,
        atk: detail.stats.find((s: ApiStatSlot) => s.stat.name === 'attack')?.base_stat ?? 0,
        def: detail.stats.find((s: ApiStatSlot) => s.stat.name === 'defense')?.base_stat ?? 0
      }
    }
  })

  return Promise.all(pokemonPromises)
}