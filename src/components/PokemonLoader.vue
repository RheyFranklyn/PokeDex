<script setup lang="ts"></script>

<template>
  <div class="loader">
    <img
      src="https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/other/official-artwork/92.png"
      alt="Gastly"
      class="gastly"
    />

    <p class="loading-text">Loading Pokémon...</p>
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  inset: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  background: rgba(10, 10, 15, 0.75);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  z-index: 9999;
}

.gastly {
  width: 90px;
  height: 90px;
  object-fit: contain;

  animation: float 2.5s ease-in-out infinite;

  filter: drop-shadow(0 0 18px rgba(139, 92, 246, 0.6))
    drop-shadow(0 0 40px rgba(139, 92, 246, 0.3));
}

.loading-text {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-18px);
  }
}
</style>
