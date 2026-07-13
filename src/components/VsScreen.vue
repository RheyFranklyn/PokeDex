<script setup lang="ts">
import { onMounted, ref } from 'vue'
import clickSound from '@/assets/enteringBattleSound.mp3'
const emit = defineEmits<{ done: [] }>()

const sound = new Audio(clickSound)
const leftIn  = ref(false)
const rightIn = ref(false)
const badgeIn = ref(false)

onMounted(() => {
  sound.currentTime = 0
  sound.play()
  setTimeout(() => { leftIn.value  = true; rightIn.value = true }, 120)
  setTimeout(() => { badgeIn.value = true }, 620)
  setTimeout(() => emit('done'), 3000)
})
</script>

<template>
  <div class="vs-screen" role="presentation" aria-label="Versus transition">
    <div class="panel left" :class="{ in: leftIn }">
      <span class="label">You</span>
      <img src="@/assets/images/leftbBg2.png" alt="" class="bg-img">
      <img src="@/assets/images/myAvatar.png" alt="Your Avatar" class="enemy-avatar">
    </div>

    <div class="vs-badge" :class="{ in: badgeIn }" aria-hidden="true">VS</div>

    <div class="panel right" :class="{ in: rightIn }">
      <span class="label">Enemy</span>
      <img src="@/assets/images/rightBg2.png" alt="" class="bg-img">
      <img src="@/assets/images/hero.jpg" alt="Enemy Avatar" class="enemy-avatar">
    </div>
  </div>
</template>

<style scoped>
.vs-screen {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: #0a0a0a;
  overflow: hidden;
  display: flex;
}

.panel {
  position: absolute;
  top: 0; 
  bottom: 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 1;
  transition: transform 0.55s cubic-bezier(.22, 1, .36, 1);
}


.bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  pointer-events: none;
}

.panel .label {
  font-size: clamp(20px, 4vw, 32px);
  font-weight: 900;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #fff;
  font-family: var(--font-pixel, sans-serif);
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
}

.panel .enemy-avatar {
  width: 75%;
  max-width: 300px;
  max-height: 50vh; 
  object-fit: contain; 
  filter: drop-shadow(0 14px 28px rgba(0, 0, 0, 0.65));
}


.left {
  left: 0;
  transform: translateX(-110%);
}
.left.in { transform: translateX(0); }

.right {
  right: 0;
  transform: translateX(110%);
}
.right.in { transform: translateX(0); }

.vs-badge {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) scale(0);
  background: var(--color-poke-gold, #ffe066);
  color: var(--color-poke-dark, #111);
  font-size: clamp(22px, 3vw, 38px);
  font-weight: 900;
  font-family: var(--font-pixel, sans-serif);
  width: clamp(68px, 12vw, 96px); 
  height: clamp(68px, 12vw, 96px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 0 40px rgba(255,220,0,0.8);
  transition: transform 0.35s cubic-bezier(.34, 1.56, .64, 1) 0s;
}
.vs-badge.in {
  transform: translate(-50%, -50%) scale(1);
}


@media (max-width: 768px) {
  .vs-screen {
    flex-direction: column;
  }

  .panel {
    width: 100%;
    height: 50%;
  }


  .left {
    top: 0;
    bottom: auto;
    transform: translateY(-110%);
  }
  .left.in { transform: translateY(0); }


  .right {
    top: auto;
    bottom: 0;
    transform: translateY(110%);
  }
  .right.in { transform: translateY(0); }

  .panel .enemy-avatar {
    max-width: 200px;
    max-height: 280px;
    width: 60%;
  }
}
</style>