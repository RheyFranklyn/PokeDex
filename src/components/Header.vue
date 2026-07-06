<script setup lang="ts"></script>

<template>
  <!-- ── Header ── -->
  <!-- ── Header ── -->
  <header
    class="flex flex-col h-28 items-center gap-2 px-6 pt-[1.2rem] pb-[0.8rem] bg-white/[0.03] border-b border-white/[0.08] sticky top-0 z-[100] backdrop-blur-sm"
  >
    <div
      class="font-pixel text-game-title tracking-[1px] text-poke-gold drop-shadow-[0_0_25px_rgba(255,215,0,0.4)] [text-shadow:var(--shadow-offset-title)_var(--shadow-offset-title)_0_#c8a200] md:text-left text-center"
      role="heading"
      aria-level="1"
    >
      Pokémon <span class="text-white">Collection</span>
    </div>

    <div
      class="flex items-center gap-2 w-full max-w-85 px-4 py-[0.4rem] bg-white/8 border border-white/15 rounded-full"
      role="search"
    >
      <!-- Search icon -->
      <svg
        class="text-white/40 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>

      <input
        type="text"
        id="search"
        placeholder="Search Pokémon…"
        autocomplete="off"
        aria-label="Search Pokémon"
        class="flex-1 bg-transparent border-none outline-none text-white font-sans text-sm placeholder-white/40"
      />
    </div>
  </header>
</template>
