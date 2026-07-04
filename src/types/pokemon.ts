export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

/* ---------- Detail API Response ---------- */

export interface PokemonApiType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonApiStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonApiSprites {
  front_default: string | null

  other: {
    'official-artwork': {
      front_default: string | null
    }
  }

  versions: {
    'generation-v': {
      'black-white': {
        animated: {
          front_default: string | null
        }
      }
    }
  }
}

export interface PokemonApiResponse {
  id: number
  name: string
  sprites: PokemonApiSprites
  types: PokemonApiType[]
  stats: PokemonApiStat[]
}

/* ---------- Model used by Vue ---------- */

export interface Pokemon {
  id: number
  name: string
  sprite: string
  types: string[]
  stats: {
    hp: number
    atk: number
    def: number
  }
}
export type PokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy'
