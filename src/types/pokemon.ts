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


  /* slot for getpokemon by type */
export interface TypePokemonSlot {
  pokemon: {
    name: string
    url: string
  }
  slot: number
}

export interface ApiStatSlot {
  base_stat: number
  stat: {
    name: string
  }
}

export interface ApiTypeSlot {
  type: {
    name: string
  }
}

export interface TypePokemonResource {
  pokemon: {
    name: string
    url: string
  }
  slot: number
}

export const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
}

export const MOVES: Record<string, string[]> = {
  normal: ['Tackle', 'Scratch', 'Slam', 'Hyper Beam', 'Body Slam', 'Swift'],
  fire: ['Ember', 'Flamethrower', 'Fire Blast', 'Flame Wheel', 'Fire Punch'],
  water: ['Water Gun', 'Surf', 'Hydro Pump', 'Bubble Beam', 'Aqua Tail'],
  grass: ['Vine Whip', 'Razor Leaf', 'Solar Beam', 'Mega Drain', 'Energy Ball'],
  electric: ['Thunder Shock', 'Thunderbolt', 'Thunder', 'Spark', 'Volt Tackle'],
  ice: ['Ice Beam', 'Blizzard', 'Ice Punch', 'Powder Snow', 'Aurora Beam'],
  fighting: ['Karate Chop', 'Low Kick', 'Seismic Toss', 'Dynamic Punch', 'Close Combat'],
  poison: ['Poison Sting', 'Sludge', 'Sludge Bomb', 'Toxic', 'Poison Jab'],
  ground: ['Sand Attack', 'Dig', 'Earthquake', 'Mud-Slap', 'Earth Power'],
  flying: ['Gust', 'Wing Attack', 'Fly', 'Air Slash', 'Brave Bird'],
  psychic: ['Confusion', 'Psychic', 'Psybeam', 'Zen Headbutt', 'Hypnosis'],
  bug: ['Leech Life', 'Pin Missile', 'Bug Buzz', 'Signal Beam', 'X-Scissor'],
  rock: ['Rock Throw', 'Rock Slide', 'Stone Edge', 'Rock Tomb'],
  ghost: ['Lick', 'Night Shade', 'Shadow Ball', 'Shadow Punch', 'Hex'],
  dragon: ['Dragon Rage', 'Dragon Breath', 'Dragon Claw', 'Outrage', 'Draco Meteor'],
  steel: ['Metal Claw', 'Iron Wing', 'Flash Cannon', 'Iron Head', 'Meteor Mash'],
  fairy: ['Disarming Voice', 'Dazzling Gleam', 'Moonblast', 'Play Rough']
}