<script setup lang="ts">
  import type { Product } from '~/types/api'

  defineProps<{
    products: Product[]
  }>()

  const emit = defineEmits<{
    'add-to-cart': [product: Product]
    'open-product': [productId: number]
  }>()
</script>

<template>
  <div class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-cart="emit('add-to-cart', $event)"
      @open-product="emit('open-product', $event)"
    />
  </div>
</template>

<style lang="scss" scoped>
  .product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 32px 24px;

    @media (max-width: $breakpoints-m) {
      gap: 24px;
    }
  }
</style>
