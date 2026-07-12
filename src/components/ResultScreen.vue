<script setup lang="ts">
import type { Pokemon, BattleResult } from '@/types/battle'

const props = defineProps<{
  result: BattleResult
  playerPick: Pokemon
  enemyPick:  Pokemon
}>()

const emit = defineEmits<{ playAgain: [] }>()

function fallback(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}
</script>

<template>
  <div class="result-screen">
    <div class="result-box">
      <h2
        class="result-title"
        :style="{ color: props.result.playerWon ? '#ffe066' : '#ff6b6b' }"
      >
        {{ props.result.playerWon ? 'You Win!' : 'You Lost!' }}
      </h2>

      <p class="result-sub">
        {{
          props.result.playerWon
            ? `${props.playerPick.name} defeated ${props.enemyPick.name}!`
            : `${props.enemyPick.name} was too powerful!`
        }}
      </p>

      <div class="sprites-row">
        <div class="sprite-slot">
          <img
            :src="props.playerPick.gif"
            :alt="props.playerPick.name"
            :class="{ loser: !props.result.playerWon }"
            :onerror="`this.src='${fallback(props.playerPick.id)}'`"
          />
          <span class="sprite-label">{{ props.playerPick.name }}</span>
        </div>

        <div class="versus-icon" :style="{ color: props.result.playerWon ? '#ffe066' : '#ff6b6b' }">
          {{ props.result.playerWon ? '🏆' : '💀' }}
        </div>

        <div class="sprite-slot">
          <img
            :src="props.enemyPick.gif"
            :alt="props.enemyPick.name"
            :class="{ loser: props.result.playerWon }"
            :onerror="`this.src='${fallback(props.enemyPick.id)}'`"
          />
          <span class="sprite-label">{{ props.enemyPick.name }}</span>
        </div>
      </div>

      <p class="rounds-label">Battle lasted {{ props.result.rounds }} rounds</p>

      <button class="rematch-btn" @click="emit('playAgain')">🏠 Play Again</button>
    </div>
  </div>
</template>

<style scoped>
.result-screen {
  width: 100vw;
  min-height: 100vh;
  background: #0a0a12;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}
.result-box {
  background: rgba(255,255,255,0.06);
  border-radius: 20px;
  padding: 32px 40px;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.12);
  max-width: 380px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.result-title {
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 8px;
}
.result-sub {
  color: rgba(255,255,255,0.6);
  font-size: 14px;
  margin-bottom: 24px;
  text-transform: capitalize;
}
.sprites-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin: 24px 0;
}
.sprite-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.sprite-slot img {
  width: 90px; height: 90px;
  object-fit: contain;
  image-rendering: pixelated;
  transition: opacity 0.4s, filter 0.4s;
}
.sprite-slot img.loser {
  opacity: 0.2;
  filter: grayscale(1) contrast(0.8);
}
.sprite-label {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.5);
  text-transform: uppercase;
}
.versus-icon {
  font-size: 36px;
}
.rounds-label {
  color: rgba(255,255,255,0.35);
  font-size: 12px;
  letter-spacing: 1px;
  margin-bottom: 24px;
}
.rematch-btn {
  background: linear-gradient(135deg, #ff6b00, #e53935);
  color: #fff;
  border: none;
  padding: 14px 40px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 15px rgba(229, 57, 53, 0.4);
}
.rematch-btn:hover { 
  transform: scale(1.05); 
  box-shadow: 0 6px 20px rgba(229, 57, 53, 0.6);
}
</style>