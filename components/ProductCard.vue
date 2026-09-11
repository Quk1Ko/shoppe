<script setup lang="ts">
  import { computed } from 'vue'
  import type { Product } from '~/types/api'

  const props = defineProps<{
    product: Product
  }>()

  const emit = defineEmits<{
    'add-to-cart': [product: Product]
    'open-product': [productId: number]
  }>()

  const titleText = computed(() => props.product.title ?? '')
  const imageUrl = computed(() => props.product.image ?? '')
  const badgeText = computed(() => props.product.badge ?? '')

  const formattedPrice = computed(() => {
    return props.product.price.toFixed(2).replace('.', ',')
  })

  const handleOpenProduct = () => {
    emit('open-product', props.product.id)
  }

  const handleAddToCart = () => {
    emit('add-to-cart', props.product)
  }
</script>

<template>
  <article class="product-card" @click="handleOpenProduct">
    <div class="product-card__image-wrap">
      <span v-if="badgeText" class="product-card__badge">
        {{ badgeText }}
      </span>

      <img class="product-card__image" :src="imageUrl" :alt="titleText" loading="lazy" />

      <BaseButton type="transparent" class="product-card__add-button" @click.stop="handleAddToCart">
        Add to cart
      </BaseButton>
    </div>

    <h3 class="product-card__title">
      {{ titleText }}
    </h3>

    <p class="product-card__price">$ {{ formattedPrice }}</p>
  </article>
</template>

<style lang="scss" scoped>
  .product-card {
    width: calc((100% - 48px) / 3);

    &__add-button {
      position: absolute;
      right: 12px;
      bottom: 12px;
      left: 12px;
      padding: 12px;
      color: var(--color-white);
      pointer-events: none;
      background: var(--color-black);
      opacity: 0;
      transform: translateY(8px);
      transition:
        opacity 0.2s ease,
        transform 0.2s ease;
    }

    @media (hover: hover) and (min-width: $breakpoints-l) {
      &:hover &__add-button {
        pointer-events: auto;
        opacity: 1;
        transform: translateY(0);
      }
    }

    &__image-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      background: #f6f6f6;
      border-radius: 8px;
    }

    &__image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__badge {
      position: absolute;
      top: 12px;
      left: 12px;
      z-index: 1;
      padding: 6px 10px;
      font-size: var(--body-small-size);
      line-height: var(--body-small-lh);
      color: var(--color-white);
      background: var(--color-accent);
      border-radius: 4px;
    }

    &__title {
      width: 100%;
      margin: 16px 0 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: var(--font-primary), sans-serif;
      font-size: var(--h3-size);
      font-weight: var(--h3-weight);
      line-height: var(--h3-lh);
      color: var(--color-black);
      white-space: nowrap;
    }

    &__price {
      margin: 0;
      font-family: var(--font-primary), sans-serif;
      font-size: var(--h4-size);
      font-weight: var(--h4-weight);
      line-height: var(--h4-lh);
      color: var(--color-accent);
    }

    @media (max-width: $breakpoints-m) {
      width: calc((100% - 24px) / 2);

      &__title {
        margin: 4px 0 2px;
        font-family: var(--font-primary), sans-serif;
        font-size: var(--body-medium-size);
        font-weight: var(--body-medium-weight);
      }

      &__price {
        font-size: var(--body-small-size);
        font-weight: var(--body-small-weight);
        line-height: var(--body-small-lh);
      }
    }
  }
</style>
