<script setup lang="ts">
  import { computed } from 'vue'

  const props = withDefaults(
    defineProps<{
      rating?: number
      reviewCount?: number
    }>(),
    {
      rating: 5,
      reviewCount: 1,
    },
  )

  const stars = computed(() => Array.from({ length: 5 }, (_, i) => i < props.rating))
</script>

<template>
  <div class="product-rating">
    <div class="product-rating__stars" :aria-label="`${rating} out of 5 stars`">
      <span
        v-for="(filled, index) in stars"
        :key="index"
        :class="{ 'product-rating__star--filled': filled }"
      >
        ★
      </span>
    </div>
    <h5 class="product-rating__reviews">
      {{ reviewCount }} {{ reviewCount === 1 ? 'customer review' : 'customer reviews' }}
    </h5>
  </div>
</template>

<style lang="scss" scoped>
  .product-rating {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 16px;

    @media (max-width: $breakpoints-m) {
      display: none;
    }
  }

  .product-rating__stars {
    display: flex;
    gap: 4px;
    font-size: 16px;
    line-height: 1;
    color: var(--color-black);
  }

  .product-rating__star--filled {
    color: var(--color-black);
  }

  .product-rating__reviews {
    margin: 0;
    font-size: var(--body-small-size);
    font-weight: var(--body-small-weight);
    line-height: var(--body-small-lh);
    color: var(--color-neutral-dark-gray);
  }
</style>
