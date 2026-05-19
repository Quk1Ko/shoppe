<script setup lang="ts">
  import BaseHeader from '~/components/BaseHeader.vue'
</script>
<template>
  <div class="app-layout">
    <BaseHeader />
    <main class="page-content">
      <slot />
    </main>
  </div>
</template>
