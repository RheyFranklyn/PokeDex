<script setup lang="ts">
import { useBattle } from '@/composables/useBattle'
import PickScreen from '@/components/PickScreen.vue'
import VsScreen from '@/components/VsScreen.vue'
import FightScreen from '@/components/FightScreen.vue'
import ResultScreen from '@/components/ResultScreen.vue'

const {
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
  selectPlayer,
  selectEnemy,
  startVS,
  initBattle,
  resetToHome
} = useBattle()
</script>

<template>
  <div class="battle-view-container">
    <PickScreen
      v-if="screen === 'home'"
      :player-pick="playerPick"
      :enemy-pick="enemyPick"
      :can-fight="canFight"
      @select-player="selectPlayer"
      @select-enemy="selectEnemy"
      @fight="startVS"
    />

    <VsScreen
      v-else-if="screen === 'vs'"
      @done="initBattle"
    />

    <FightScreen
      v-else-if="screen === 'fight' && playerPick && enemyPick"
      :player-pick="playerPick"
      :enemy-pick="enemyPick"
      :battle-state="battleState"
      :battle-log="battleLog"
      :player-h-p-percent="playerHPPercent"
      :enemy-h-p-percent="enemyHPPercent"
      :player-h-p-color="playerHPColor"
      :enemy-h-p-color="enemyHPColor"
      :shaking-player="shakingPlayer"
      :shaking-enemy="shakingEnemy"
      :fainting-player="faintingPlayer"
      :fainting-enemy="faintingEnemy"
      :hit-message="hitMessage"
    />

    <ResultScreen
      v-else-if="screen === 'result' && result && playerPick && enemyPick"
      :result="result"
      :player-pick="playerPick"
      :enemy-pick="enemyPick"
      @play-again="resetToHome"
    />
  </div>
</template>

<style scoped>
.battle-view-container {
  background: #0a0a12;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}
</style>