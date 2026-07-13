<script setup lang="ts">
import { computed, watch } from 'vue' 
import type { Pokemon, BattleState } from '@/types/battle'
import hitSoundAsset from '@/assets/hit.mp3' 

const props = defineProps<{
  playerPick: Pokemon
  enemyPick:  Pokemon
  battleState: BattleState
  battleLog:  string
  playerHPPercent: number
  enemyHPPercent:  number
  playerHPColor:   string
  enemyHPColor:    string
  shakingPlayer:   boolean
  shakingEnemy:    boolean
  faintingPlayer:  boolean
  faintingEnemy:   boolean
  hitMessage: { text: string; target: 'player' | 'enemy'; key: number } | null
}>()


const hitAudio = new Audio(hitSoundAsset)

watch(
  () => props.hitMessage,
  (newMessage) => {
    
    if (newMessage) {
      hitAudio.currentTime = 0
      hitAudio.play().catch((error) => {
        console.warn("Audio playback context was delayed:", error)
      })
    }
  },
  { deep: true }
)

function fallback(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

const playerHP = computed(() => Math.max(0, props.battleState.pHP))
const enemyHP  = computed(() => Math.max(0, props.battleState.eHP))
</script>

<template>
  <div class="fight-screen">
    <img 
      src="@/assets/images/fairy.jpg" 
      alt="" 
      class="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
    />
    
    <div class="absolute inset-0 bg-black/50 z-1 pointer-events-none backdrop-blur-[1px]"></div>

    <div class="arena-wrap">

    
      <div class="arena pop-arena">
        <img 
      src="@/assets/images/fightBg.jpg" 
      alt="" 
      class="absolute inset-0 w-full h-full object-cover ointer-events-none"
    />
        <Transition name="hit-fade">
          <div
            v-if="props.hitMessage && props.hitMessage.target === 'enemy'"
            :key="props.hitMessage.key"
            class="hit-effect hit-enemy"
          >
            {{ props.hitMessage.text }}
          </div>
        </Transition>
        
        <Transition name="hit-fade">
          <div
            v-if="props.hitMessage && props.hitMessage.target === 'player'"
            :key="props.hitMessage.key"
            class="hit-effect hit-player"
          >
            {{ props.hitMessage.text }}
          </div>
        </Transition>

        <div
          class="fighter player-fighter"
          :class="{
            shake: props.shakingPlayer,
            faint: props.faintingPlayer,
          }"
        >
          <img
            :src="props.playerPick.gif"
            :alt="props.playerPick.name"
            :onerror="`this.src='${fallback(props.playerPick.id)}'`"
          />
        </div>

        <div
          class="fighter enemy-fighter"
          :class="{
            'shake-enemy': props.shakingEnemy,
            'faint-enemy': props.faintingEnemy,
          }"
        >
          <img
            :src="props.enemyPick.gif"
            :alt="props.enemyPick.name"
            :onerror="`this.src='${fallback(props.enemyPick.id)}'`"
          />
        </div>
      </div>

      <div class="hp-bars">
        <div class="hp-block pop-panel">
          <div class="hp-header">
            <span class="hp-name">{{ props.playerPick.name }}</span>
            <span class="hp-num">{{ playerHP }}/{{ props.battleState.pMaxHP }}</span>
          </div>
          <div class="hp-track">
            <div
              class="hp-fill"
              :style="{ width: props.playerHPPercent + '%', background: props.playerHPColor }"
            />
          </div>
        </div>
        
        <div class="hp-block pop-panel">
          <div class="hp-header">
            <span class="hp-num">{{ enemyHP }}/{{ props.battleState.eMaxHP }}</span>
            <span class="hp-name">{{ props.enemyPick.name }}</span>
          </div>
          <div class="hp-track">
            <div
              class="hp-fill"
              :style="{ width: props.enemyHPPercent + '%', background: props.enemyHPColor }"
            />
          </div>
        </div>
      </div>

      <div class="battle-log pop-panel" role="log" aria-live="polite">
        {{ props.battleLog }}
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.fight-screen {
  width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  box-sizing: border-box;
  background-color: #0a0a12;
}

.arena-wrap {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
 
  z-index: 10; 
}

.arena {
  width: 100%;
  height: 260px;
  
  background: linear-gradient(180deg, rgba(26, 26, 46, 0.4) 0%, rgba(22, 33, 62, 0.5) 60%, rgba(61, 42, 26, 0.7) 60%, rgba(45, 26, 10, 0.8) 100%);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
}


.pop-panel {
  background: rgba(15, 15, 30, 0.85) !important;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6) !important;
}

.arena::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 50px;
  background: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.03) 0px,
    rgba(255, 255, 255, 0.03) 1px,
    transparent 1px,
    transparent 40px
  );
}

.fighter {
  position: absolute;
  bottom: 32px;
  display: flex;
  align-items: flex-end;
}

.fighter img {
  width: 96px; 
  height: 96px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 6px 12px rgba(0,0,0,0.8));
}

.player-fighter { left: 40px; }
.enemy-fighter  { right: 40px; transform: scaleX(-1); }

/* --- Combat State Keyframe Triggers --- */
.shake       { animation: shake 0.4s ease-in-out; }
.shake-enemy { animation: shakeEnemy 0.4s ease-in-out; }
.faint       { animation: faint 0.7s cubic-bezier(.4, 0, 1, 1) forwards; }
.faint-enemy { animation: faintEnemy 0.7s cubic-bezier(.4, 0, 1, 1) forwards; }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-10px); }
  40%, 80% { transform: translateX(10px); }
}

@keyframes shakeEnemy {
  0%, 100% { transform: scaleX(-1) translateX(0); }
  20%, 60% { transform: scaleX(-1) translateX(-10px); }
  40%, 80% { transform: scaleX(-1) translateX(10px); }
}

@keyframes faint {
  to { transform: translateY(50px) rotate(15deg); opacity: 0; }
}

@keyframes faintEnemy {
  to { transform: scaleX(-1) translateY(50px) rotate(-15deg); opacity: 0; }
}

/* --- Combat Floater Effectsss --- */
.hit-effect {
  position: absolute;
  font-size: 24px;
  font-weight: 900;
  color: #ff3b30;
  font-family: var(--font-pixel, sans-serif);
  text-shadow: 0 0 10px rgba(255, 59, 48, 0.8), 0 2px 4px rgba(0,0,0,0.5);
  pointer-events: none;
  z-index: 20;
}

.hit-player { left: 70px; top: 70px; }
.hit-enemy  { right: 70px; top: 70px; }

.hit-fade-enter-active { animation: hitFloat 0.8s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards; }
.hit-fade-leave-active { display: none; }

@keyframes hitFloat {
  0%   { opacity: 0; transform: scale(0.5) translateY(20px); }
  30%  { opacity: 1; transform: scale(1.3) translateY(-10px); }
  100% { opacity: 0; transform: scale(0.9) translateY(-50px); }
}

/* --- Health Interface part --- */
.hp-bars {
  display: flex;
  gap: 12px;
}

.hp-block {
  flex: 1;
  border-radius: 10px;
  padding: 12px 14px;
}

.hp-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  align-items: center;
}

.hp-name {
  font-size: 13px;
  font-weight: 800;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hp-num {
  font-size: 11px;
  font-weight: 700;
  color: #ffe066;
  font-family: var(--font-pixel, monospace);
}

.hp-track {
  height: 12px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.05);
}

.hp-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s ease;
}

/* --- Feed Panel --- */
.battle-log {
  border-radius: 10px;
  padding: 14px 18px;
  min-height: 64px;
  color: rgba(255, 255, 255, 0.95);
  font-size: 14px;
  line-height: 1.6;
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.5);
}
</style>