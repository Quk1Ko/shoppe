<script setup lang="ts">
  defineProps<{
    sku: string | number
    categories?: string
  }>()
</script>

<template>
  <div class="product-meta">
    <div class="product-meta__row">
      <h5 class="product-meta__label">SKU:</h5>
      <h5>{{ sku }}</h5>
    </div>
    <div v-if="categories" class="product-meta__row">
      <h5 class="product-meta__label">Categories:</h5>
      <h5>{{ categories }}</h5>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .product-meta {
    display: flex;
    flex-direction: column;
    gap: 10px;

    h5 {
      margin: 0;
    }
  }

  .product-meta__row {
    display: flex;
    gap: 8px;
    font-size: var(--body-small-size);
    font-weight: var(--body-small-weight);
    line-height: var(--body-small-lh);
    color: var(--color-neutral-dark-gray);
  }

  .product-meta__label {
    color: var(--color-black);
  }
</style>
