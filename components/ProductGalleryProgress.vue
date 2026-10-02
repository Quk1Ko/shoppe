<script setup lang="ts">
  defineProps<{
    total: number
    current: number
  }>()
</script>

<template>
  <div class="product-gallery-progress">
    <span
      :style="{
        width: `${100 / total}%`,
        transform: `translateX(${current * 100}%)`,
      }"
    />
  </div>
</template>

<style lang="scss" scoped>
  .product-gallery-progress {
    width: 100%;
    height: 2px;
    overflow: hidden;
    background: var(--color-neutral-gray);

    span {
      display: block;
      height: 2px;
      background: var(--color-black);
      transition: transform 0.25s ease;
    }
  }
</style>
