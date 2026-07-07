<script setup lang="ts">
import type { Pokemon } from '@/types/pokemon'

const props = defineProps<{
  pokemon: Pokemon
  isSearch?: boolean 
}>()


function padId(id: number): string {
  return id.toString().padStart(3, '0')
}
</script>

<template>
  <article class="card-wrap" :class="{'isCardSearch':isSearch}">
    <div class="card-inner-3d">
      <!-- Front -->
      <div class="card-face card-front">
        <div class="card-body">
          <div class="shine"></div>

          <span class="card-num"> #{{ padId(pokemon.id) }} </span>

          <button class="flip-btn" aria-label="Flip Card">↺</button>
          <button class="fav-btn">★</button>

          <div class="sprite-wrap">
            <div class="sprite-bg"></div>
            <div class="sprite-shadow"></div>

            <div class="sprite-float">
              <img class="sprite" :class="{'is-searched-sprite': props.isSearch}" :src="props.pokemon.sprite" :alt="props.pokemon.name" />
            </div>
          </div>

          <h2 class="poke-name">
            {{ props.pokemon.name }}
          </h2>

          <div class="type-badges">
            <span v-for="type in props.pokemon.types" :key="type" class="type-badge">
              {{ type }}
            </span>
          </div>

          <div class="stat-bar-row">
            <!-- HP -->
            <div class="stat-line">
              <span class="stat-label"> HP </span>

              <div class="stat-track">
                <div
                  class="stat-fill"
                  :style="{
                    width: `${(props.pokemon.stats.hp / 255) * 100}%`,
                    background: '#6ee86e',
                  }"
                />
              </div>

              <span class="stat-val">
                {{ props.pokemon.stats.hp }}
              </span>
            </div>

            <!-- ATK -->
            <div class="stat-line">
              <span class="stat-label"> ATK </span>

              <div class="stat-track">
                <div
                  class="stat-fill"
                  :style="{
                    width: `${(props.pokemon.stats.atk / 190) * 100}%`,
                    background: '#ff9f4a',
                  }"
                />
              </div>

              <span class="stat-val">
                {{ props.pokemon.stats.atk }}
              </span>
            </div>

            <!-- DEF -->
            <div class="stat-line">
              <span class="stat-label"> DEF </span>

              <div class="stat-track">
                <div
                  class="stat-fill"
                  :style="{
                    width: `${(props.pokemon.stats.def / 230) * 100}%`,
                    background: '#5ab9ff',
                  }"
                />
              </div>

              <span class="stat-val">
                {{ props.pokemon.stats.def }}
              </span>
            </div>
          </div>

          <!-- <button class="fav-btn">★</button> -->
        </div>
      </div>

      <!-- Back -->

      <div class="card-face card-back">
        <div class="card-back-body">
          <img class="back-sprite-big" :src="props.pokemon.sprite" :alt="props.pokemon.name" />

          <div class="back-name">
            {{ props.pokemon.name }}
          </div>

          <div class="back-num">#{{ padId(props.pokemon.id) }}</div>

          <div class="back-types">
            <span v-for="type in props.pokemon.types" :key="type" class="type-badge">
              {{ type }}
            </span>
          </div>

          <button class="back-flip-btn">↺</button>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* ── Stats Row ────────────────────────────────────────────────────────── */
.stats-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem 0.4rem;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.4);
}

/* ── Card Grid ────────────────────────────────────────────────────────── */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
  gap: 1rem;
  padding: 0.5rem 1.5rem 2rem;
}

/* ── Flip Card Container ──────────────────────────────────────────────── */
.card-wrap {
  height: 220px;
  perspective: 900px;
  cursor: pointer;
}
.card-wrap.isCardSearch{
  height: 500px;
}
.card-inner-3d {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-wrap.flipped .card-inner-3d {
  transform: rotateY(180deg);
}

/* ── Card Faces (shared) ──────────────────────────────────────────────── */
.card-face {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.card-front {
  z-index: 2;
}

.card-back {
  transform: rotateY(180deg);
}

/* ── Card Front Body ──────────────────────────────────────────────────── */
.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 0.85rem 0.7rem 0.7rem;
  position: relative;
  height: 100%;
}

/* Holographic shine overlay */
.shine {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.13) 0%,
    transparent 50%,
    rgba(255, 255, 255, 0.06) 100%
  );
  pointer-events: none;
}

.card-num {
  position: absolute;
  top: 7px;
  left: 9px;
  font-family: 'Press Start 2P', monospace;
  font-size: 7px;
  color: rgba(255, 255, 255, 0.35);
}

/* ── Flip Button ──────────────────────────────────────────────────────── */
.flip-btn,
.back-flip-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #ffffff;
  font-size: 11px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
  z-index: 10;
}

.flip-btn:hover,
.back-flip-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.15);
}

/* ── Sprite ───────────────────────────────────────────────────────────── */
.sprite-wrap {
  position: relative;
  width: 76px;
  height: 76px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sprite-bg {
  position: absolute;

  width: 90px;
  height: 90px;

  border-radius: 50%;

  background: radial-gradient(circle, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.04));

  filter: blur(20px);

  z-index: 0;
}

.sprite-shadow {
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 48px;
  height: 9px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.25);
  z-index: 0;
}

.sprite-float {
  position: relative;

  z-index: 2;

  animation: float 3s ease-in-out infinite;
}

.sprite {
  position: relative;
  z-index: 1;
  width: 70px;
  height: 70px;
  object-fit: contain;
  image-rendering: pixelated;
  transition:
    transform 0.3s ease,
    filter 0.3s ease;
}

.sprite.is-searched-sprite {
  
  transform: scale(2);
}

.card-wrap:hover .sprite {
  transform: scale(1.08);

  filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.4));
}
@keyframes float {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }

  100% {
    transform: translateY(0);
  }
}

/* ── Pokémon Name ─────────────────────────────────────────────────────── */
.poke-name {
  font-weight: 800;
  font-size: 13px;
  text-align: center;
  color: #ffffff;
  margin-top: 2px;
  letter-spacing: 0.3px;
}

/* ── Type Badges ──────────────────────────────────────────────────────── */
.type-badges,
.back-types {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
}

.type-badge {
  padding: 2px 8px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #ffffff;
}

/* ── Stat Bars ────────────────────────────────────────────────────────── */
.stat-bar-row {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  margin-top: 4px;
  padding-top: 5px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-line {
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-label {
  width: 22px;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: rgba(255, 255, 255, 0.5);
}

.stat-track {
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 2px;
}

.stat-val {
  width: 20px;
  text-align: right;
  font-size: 8px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.55);
}

/* ── Favourite Button ─────────────────────────────────────────────────── */
.fav-btn {
  position: absolute;
  top: 30px;
  right: 7px;
  background: none;
  border: none;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  padding: 2px;
  z-index: 10;
  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

.fav-btn.active {
  color: #ffd700;
}

.fav-btn:hover {
  transform: scale(1.3);
}

/* ── Card Back Body ───────────────────────────────────────────────────── */
.card-back-body {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  height: 100%;
  padding: 0.5rem;
  overflow: hidden;
}

/* Ambient colour orbs on back */
.back-orb {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
}

.back-sprite-big {
  position: relative;
  z-index: 1;
  width: 120px;
  height: 120px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.5));
}

.back-name {
  font-family: 'Press Start 2P', monospace;
  font-size: 9px;
  color: #ffffff;
  text-align: center;
  margin-top: 6px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
}

.back-num {
  font-family: 'Press Start 2P', monospace;
  font-size: 7px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 3px;
}

.back-types {
  margin-top: 6px;
}

/* ====== style for searched pokemon =======*/


.card-wrap.isCardSearch {
  height: 480px; 
  max-width: 300px;
  margin: 0 auto;
}


.isCardSearch .card-body {
  gap: 1.2rem;
  padding: 2.2rem 1.5rem 1.5rem;
}


.isCardSearch .sprite-wrap {
  width: 130px;
  height: 130px;
  margin-top: 16px;
}
.isCardSearch .sprite-bg {
  width: 150px;
  height: 150px;
  filter: blur(28px);
}
.isCardSearch .sprite-shadow {
  width: 85px;
  height: 12px;
  bottom: -10px;
}


.sprite.is-searched-sprite {
  width: 100px !important;
  height: 100px !important;
}

/* ypography sizing enhancements */
.isCardSearch .poke-name {
  font-size: 18px;
  letter-spacing: 0.8px;
}
.isCardSearch .card-num {
  font-size: 9px;
  top: 12px;
  left: 14px;
}
.isCardSearch .type-badge {
  padding: 4px 12px;
  font-size: 10px;
}

.isCardSearch .stat-bar-row {
  gap: 8px;
  margin-top: 10px;
  padding-top: 15px;
}
.isCardSearch .stat-line {
  gap: 8px;
}
.isCardSearch .stat-label {
  width: 28px;
  font-size: 10px;
}
.isCardSearch .stat-track {
  height: 6px;
  border-radius: 4px;
}
.isCardSearch .stat-val {
  width: 26px;
  font-size: 10px;
}

.isCardSearch .flip-btn,
.isCardSearch .back-flip-btn {
  top: 12px;
  right: 12px;
  width: 30px;
  height: 30px;
  font-size: 13px;
}
.isCardSearch .fav-btn {
  top: 45px;
  right: 15px;
  font-size: 18px;
}

/* 8. Card back configuration layout adjustments */
.isCardSearch .card-back-body {
  padding: 2rem;
  gap: 1rem;
}
.isCardSearch .back-sprite-big {
  width: 180px;
  height: 180px;
}
.isCardSearch .back-name {
  font-size: 13px;
}
.isCardSearch .back-num {
  font-size: 9px;
}
</style>
