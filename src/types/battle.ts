export interface Pokemon {
  id: number
  name: string
  hp: number
  atk: number
  type: string
  gif: string
}

export interface BattleState {
  pHP: number
  pMaxHP: number
  pAtk: number
  eHP: number
  eMaxHP: number
  eAtk: number
  round: number
  done: boolean
}

export interface BattleResult {
  playerWon: boolean
  rounds: number
}

export type Screen = 'home' | 'vs' | 'fight' | 'result'


export const POKEMON: Pokemon[] = [
  { id: 25, name: 'pikachu', hp: 110, atk: 60, type: 'electric', gif: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif' },
  { id: 4, name: 'charmander', hp: 100, atk: 58, type: 'fire', gif: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/4.gif' },
  { id: 7, name: 'squirtle', hp: 120, atk: 50, type: 'water', gif: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/7.gif' },
  { id: 1, name: 'bulbasaur', hp: 115, atk: 54, type: 'grass', gif: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/1.gif' }
]