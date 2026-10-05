<script setup lang="ts">
  import { ref } from 'vue'
  import type { Product } from '~/types/api'
  import ProductQuantity from './ProductQuantity.vue'
  import ProductRating from './ProductRating.vue'
  import ProductSocials from './ProductSocials.vue'
  import ProductMeta from './ProductMeta.vue'
  import IconShare from '~/assets/icons/IconShare.vue'

  const props = defineProps<{
    product: Product
  }>()

  const emit = defineEmits<{
    'add-to-cart': [product: Product, quantity: number]
    share: [platform: string]
  }>()

  const quantity = ref(1)
  const isDescriptionExpanded = ref(false)

  const handleAddToCart = () => {
    emit('add-to-cart', props.product, quantity.value)
  }

  const toggleDescription = () => {
    isDescriptionExpanded.value = !isDescriptionExpanded.value
  }

  const descriptionText =
    props.product.description ||
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
      'Aliquam placerat, augue a volutpat hendrerit, sapien tortor ' +
      'adipiscing augue, a maximus elit ex vitae libero. Sed quis mauris ' +
      'eget arcu facilisis consequat sed eu felis.'
</script>

<template>
  <div class="product-info">
    <h2 class="product-info__title">
      {{ product.title }}
    </h2>

    <div class="product-info__price-row">
      <h4 class="product-info__price">$ {{ product.price.toFixed(2).replace('.', ',') }}</h4>

      <BaseButton
        type="transparent"
        class="product-info__share"
        aria-label="Share"
        @click="emit('share', 'native')"
      >
        <IconShare />
      </BaseButton>
    </div>

    <ProductRating class="product-info__rating" :rating="5" :review-count="1" />

    <div class="product-info__description-wrap">
      <h5
        class="product-info__description"
        :class="{ 'product-info__description--expanded': isDescriptionExpanded }"
      >
        {{ descriptionText }}
      </h5>

      <BaseButton type="transparent" class="product-info__view-more" @click="toggleDescription">
        {{ isDescriptionExpanded ? 'View less' : 'View more' }} &gt;
      </BaseButton>
    </div>

    <div class="product-info__purchase">
      <ProductQuantity v-model="quantity" :min="1" :max="99" />

      <BaseButton type="transparent" class="product-info__add-button" @click="handleAddToCart">
        ADD TO CART
      </BaseButton>
    </div>

    <ProductSocials class="product-info__socials" @share="emit('share', $event)" />

    <ProductMeta class="product-info__meta" :sku="product.id" categories="Fashion, Style" />
  </div>
</template>

<style lang="scss" scoped>
  .product-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;

    &__title {
      margin: 0 0 16px;
      font-family: var(--font-primary), sans-serif;
      font-size: var(--h2-size);
      font-weight: var(--h2-weight);
      line-height: var(--h2-lh);
      color: var(--color-black);

      @media (max-width: $breakpoints-m) {
        margin-bottom: 5px;
      }
    }

    &__price-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;

      @media (max-width: $breakpoints-m) {
        margin-bottom: 16px;
      }
    }

    &__price {
      margin: 0;
      font-family: var(--font-primary), sans-serif;
      font-size: var(--h4-size);
      font-weight: var(--h4-weight);
      line-height: var(--h4-lh);
      color: var(--color-accent);

      @media (max-width: $breakpoints-m) {
        font-size: var(--h5-size);
        font-weight: var(--h5-weight);
        line-height: var(--h5-lh);
      }
    }

    &__share {
      display: none;
      padding: 0;
      color: var(--color-black);

      @media (max-width: $breakpoints-m) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
      }

      &:hover {
        background: transparent;
      }
    }

    &__description-wrap {
      margin-bottom: 32px;

      @media (max-width: $breakpoints-m) {
        order: 2;
        margin-bottom: 28px;
      }
    }

    &__description {
      max-width: 480px;
      margin: 0;
      color: var(--color-neutral-dark-gray);

      @media (max-width: $breakpoints-m) {
        max-height: 40px;
        margin-bottom: 8px;
        overflow: hidden;
        font-size: var(--body-small-size);
        font-weight: var(--body-small-weight);
        line-height: var(--body-small-lh);

        &--expanded {
          max-height: none;
          overflow: visible;
        }
      }
    }

    &__view-more {
      display: none;
      padding: 0;
      font-size: var(--body-small-size);
      font-weight: 500;
      color: var(--color-accent);

      @media (max-width: $breakpoints-m) {
        display: inline-flex;
      }

      &:hover {
        background: transparent;
      }
    }

    &__purchase {
      display: flex;
      gap: 16px;
      align-items: center;
      min-width: 0;
      max-width: 100%;
      margin-bottom: 40px;

      @media (max-width: $breakpoints-m) {
        flex-direction: column;
        gap: 12px;
        align-items: stretch;
        order: 1;
        margin-bottom: 24px;
      }
    }

    &__add-button {
      box-sizing: border-box;
      flex: 1;
      min-width: 0;
      max-width: 100%;
      min-height: 48px;
      padding: 12px 24px;
      font-size: var(--body-small-size);
      font-weight: 700;
      line-height: 1;
      color: var(--color-black);
      letter-spacing: 0.5px;
      background: var(--color-white);
      border: 1px solid var(--color-black);
      border-radius: 4px;
      transition:
        background-color 0.2s,
        color 0.2s;

      @media (max-width: $breakpoints-m) {
        width: 100%;
        min-height: 48px;
      }

      &:hover {
        color: var(--color-white);
        background: var(--color-black);
        border-radius: 4px;
      }

      &:active {
        transform: none;
      }
    }

    &__socials {
      @media (max-width: $breakpoints-m) {
        order: 3;
      }
    }

    &__meta {
      @media (max-width: $breakpoints-m) {
        order: 4;
      }
    }
  }
</style>
