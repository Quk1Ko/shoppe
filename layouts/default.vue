<script setup lang="ts">
  import BaseHeader from '~/components/BaseHeader.vue'
  import BaseFooter from '~/components/BaseFooter.vue'
</script>

<template>
  <div class="app-layout">
    <BaseHeader />
    <main class="page-content">
      <slot />
    </main>
    <BaseFooter class="page-footer" />
  </div>
</template>

<style lang="scss" scoped>
  .app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }

  .page-content {
    flex: 1 0 auto;
  }
</style>
