import { ref, computed } from 'vue'
import type { Pokemon, BattleState, BattleResult, Screen } from '@/types/battle.ts'
import { MOVES } from '@/types/pokemon'

export function useBattle() {
  const screen = ref<Screen>('home')
  const playerPick = ref<Pokemon | null>(null)
  const enemyPick = ref<Pokemon | null>(null)
  
  const battleState = ref<BattleState>({
    pHP: 0, pMaxHP: 0, pAtk: 0,
    eHP: 0, eMaxHP: 0, eAtk: 0,
    round: 0, done: false,
  })
  
  const battleLog = ref<string>('⚔️ The battle begins!')
  const result = ref<BattleResult | null>(null)
  const hitMessage = ref<{ text: string; target: 'player' | 'enemy'; key: number } | null>(null)
  
  const shakingPlayer = ref(false)
  const shakingEnemy = ref(false)
  const faintingPlayer = ref(false)
  const faintingEnemy = ref(false)

  const canFight = computed(() => playerPick.value !== null && enemyPick.value !== null)

  const playerHPPercent = computed(() =>
    battleState.value.pMaxHP > 0
      ? (battleState.value.pHP / battleState.value.pMaxHP) * 100
      : 100
  )
  
  const enemyHPPercent = computed(() =>
    battleState.value.eMaxHP > 0
      ? (battleState.value.eHP / battleState.value.eMaxHP) * 100
      : 100
  )
  
  const playerHPColor = computed(() => hpColor(playerHPPercent.value))
  const enemyHPColor = computed(() => hpColor(enemyHPPercent.value))

  function hpColor(pct: number): string {
    if (pct > 50) return '#43a047' // Green
    if (pct > 25) return '#f9a825' // Yellow
    return '#e53935' // Red
  }

  function getRandomMove(pokemon: Pokemon) {
    const moves = MOVES[pokemon.type]
    if (!moves || moves.length === 0) return 'Tackle'
    return moves[Math.floor(Math.random() * moves.length)]
  }

  function calcDamage(atk: number): number {
    const base = Math.floor(atk * 0.4 + Math.random() * atk * 0.3)
    return Math.max(5, base)
  }

  function spriteFallback(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  }

  function showHit(target: 'player' | 'enemy', dmg: number): void {
    hitMessage.value = { text: `-${dmg}!`, target, key: Date.now() }
    setTimeout(() => { hitMessage.value = null }, 900)
  }

  function shakeEl(target: 'player' | 'enemy'): void {
    if (target === 'player') {
      shakingPlayer.value = true
      setTimeout(() => { shakingPlayer.value = false }, 450)
    } else {
      shakingEnemy.value = true
      setTimeout(() => { shakingEnemy.value = false }, 450)
    }
  }

  function goToScreen(s: Screen): void {
    screen.value = s
  }

  function selectPlayer(p: Pokemon): void {
    playerPick.value = p
  }

  function selectEnemy(p: Pokemon): void {
    enemyPick.value = p
  }

  function startVS(): void {
    screen.value = 'vs'
  }

  function initBattle(): void {
    if (!playerPick.value || !enemyPick.value) return
    battleState.value = {
      pHP: playerPick.value.hp,
      pMaxHP: playerPick.value.hp,
      pAtk: playerPick.value.atk,
      eHP: enemyPick.value.hp,
      eMaxHP: enemyPick.value.hp,
      eAtk: enemyPick.value.atk,
      round: 0,
      done: false,
    }
    faintingPlayer.value = false
    faintingEnemy.value = false
    battleLog.value = '⚔️ The battle begins!'
    result.value = null
    screen.value = 'fight'
    setTimeout(() => runRound(), 800)
  }

  function runRound(): void {
    if (battleState.value.done || !playerPick.value || !enemyPick.value) return
    battleState.value.round++

    const playerFirst =
      playerPick.value.atk >= enemyPick.value.atk || Math.random() < 0.5
    const pMove = getRandomMove(playerPick.value)
    const eMove = getRandomMove(enemyPick.value)
    const pDmg = calcDamage(battleState.value.pAtk)
    const eDmg = calcDamage(battleState.value.eAtk)
    const pName = playerPick.value.name
    const eName = enemyPick.value.name

    const firstAttacker = playerFirst
      ? { move: pMove, dmg: pDmg, target: 'enemy' as const, attacker: pName }
      : { move: eMove, dmg: eDmg, target: 'player' as const, attacker: eName }
      
    const secondAttacker = playerFirst
      ? { move: eMove, dmg: eDmg, target: 'player' as const, attacker: eName }
      : { move: pMove, dmg: pDmg, target: 'enemy' as const, attacker: pName }

    // First attack turn
    setTimeout(() => {
      applyHit(firstAttacker.target, firstAttacker.dmg)
      battleLog.value = `${firstAttacker.attacker} used ${firstAttacker.move}! (-${firstAttacker.dmg} HP)`

      const firstFaint = firstAttacker.target === 'enemy'
        ? battleState.value.eHP <= 0
        : battleState.value.pHP <= 0

      if (firstFaint) {
        battleState.value.done = true
        setTimeout(() => triggerFaint(firstAttacker.target === 'enemy' ? 'enemy' : 'player'), 300)
        return
      }

      // Second attack turn
      setTimeout(() => {
        applyHit(secondAttacker.target, secondAttacker.dmg)
        battleLog.value = `${secondAttacker.attacker} used ${secondAttacker.move}! (-${secondAttacker.dmg} HP)`

        const secondFaint = secondAttacker.target === 'enemy'
          ? battleState.value.eHP <= 0
          : battleState.value.pHP <= 0

        if (secondFaint) {
          battleState.value.done = true
          setTimeout(() => triggerFaint(secondAttacker.target === 'enemy' ? 'enemy' : 'player'), 300)
          return
        }

        // Cap battle at 20 rounds max to prevent infinite stalemates
        if (battleState.value.round >= 20) {
          battleState.value.done = true
          const playerWon = battleState.value.pHP >= battleState.value.eHP
          setTimeout(() => finishBattle(playerWon), 500)
          return
        }

        // Run the next turn recursively
        setTimeout(() => runRound(), 1200)
      }, 800)
    }, 300)
  }

  function applyHit(target: 'player' | 'enemy', dmg: number): void {
    shakeEl(target)
    showHit(target, dmg)
    if (target === 'player') {
      battleState.value.pHP = Math.max(0, battleState.value.pHP - dmg)
    } else {
      battleState.value.eHP = Math.max(0, battleState.value.eHP - dmg)
    }
  }

  function triggerFaint(who: 'player' | 'enemy'): void {
    if (who === 'enemy') faintingEnemy.value = true
    else faintingPlayer.value = true
    const playerWon = who === 'enemy'
    setTimeout(() => finishBattle(playerWon), 800)
  }

  function finishBattle(playerWon: boolean): void {
    result.value = { playerWon, rounds: battleState.value.round }
    screen.value = 'result'
  }

  function resetToHome(): void {
    playerPick.value = null
    enemyPick.value = null
    result.value = null
    faintingPlayer.value = false
    faintingEnemy.value = false
    shakingPlayer.value = false
    shakingEnemy.value = false
    screen.value = 'home'
  }

  return {
    screen,
    playerPick,
    enemyPick,
    battleState,
    battleLog,
    result,
    hitMessage,
    shakingPlayer,
    shakingEnemy,
    faintingPlayer,
    faintingEnemy,
    canFight,
    playerHPPercent,
    enemyHPPercent,
    playerHPColor,
    enemyHPColor,
    spriteFallback,
    goToScreen,
    selectPlayer,
    selectEnemy,
    startVS,
    initBattle,
    resetToHome,
  }
}