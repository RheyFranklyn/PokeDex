<script setup lang="ts">
import { onMounted, ref } from 'vue'

const emit = defineEmits<{ done: [] }>()

const leftIn  = ref(false)
const rightIn = ref(false)
const badgeIn = ref(false)

onMounted(() => {
  setTimeout(() => { leftIn.value  = true; rightIn.value = true }, 120)
  setTimeout(() => { badgeIn.value = true }, 620)
  setTimeout(() => emit('done'), 2300)
})
</script>

<template>
  <div class="vs-screen" role="presentation" aria-label="Versus transition">
    <div class="panel left" :class="{ in: leftIn }">
      <span class="label">You</span>
      <span class="icon">⚔️</span>
    </div>

    <div class="vs-badge" :class="{ in: badgeIn }" aria-hidden="true">VS</div>

    <div class="panel right" :class="{ in: rightIn }">
      <span class="label">Enemy</span>
      <span class="icon">🛡️</span>
    </div>
  </div>
</template>

<style scoped>
.vs-screen {
  position: relative;
  min-height: 520px;
  background: #0a0a0a;
  overflow: hidden;
  display: flex;
}
.panel {
  position: absolute;
  top: 0; bottom: 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  transition: transform 0.55s cubic-bezier(.22, 1, .36, 1);
}
.panel .label {
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #fff;
}
.panel .icon { font-size: 52px; }

.left {
  left: 0;
  background: linear-gradient(135deg, #e53935, #b71c1c);
  transform: translateX(-110%);
}
.left.in { transform: translateX(0); }

.right {
  right: 0;
  background: linear-gradient(225deg, #1565c0, #0d47a1);
  transform: translateX(110%);
}
.right.in { transform: translateX(0); }

.vs-badge {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) scale(0);
  background: #ffe066;
  color: #111;
  font-size: 38px;
  font-weight: 900;
  width: 88px; height: 88px;
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
</style>