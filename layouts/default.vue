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
<style lang="scss" scoped>
  .app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .page-content {
    flex: 1;
  }
</style>
