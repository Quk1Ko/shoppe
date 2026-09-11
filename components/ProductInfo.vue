<script setup lang="ts">
  import { ref } from 'vue'
  import type { Product } from '~/types/api'
  import IconFacebook from '~/assets/icons/IconFacebook.vue'
  import IconInstagram from '~/assets/icons/IconInstagram.vue'
  import IconTwitter from '~/assets/icons/IconTwitter.vue'
  import IconLetter from '~/assets/icons/IconLetter.vue'

  const props = defineProps<{
    product: Product
  }>()

  const emit = defineEmits<{
    'add-to-cart': [product: Product, quantity: number]
  }>()

  const quantity = ref(1)

  const decreaseQuantity = () => {
    if (quantity.value > 1) {
      quantity.value--
    }
  }

  const increaseQuantity = () => {
    quantity.value++
  }

  const handleAddToCart = () => {
    emit('add-to-cart', props.product, quantity.value)
  }
</script>

<template>
  <div class="product-info">
    <h2 class="product-info__title">
      {{ product.title }}
    </h2>

    <h4 class="product-info__price">$ {{ product.price.toFixed(2) }}</h4>

    <div class="product-info__rating">
      <div class="product-info__stars" aria-label="5 out of 5 stars">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
      <h5 class="product-info__reviews">1 customer review</h5>
    </div>

    <h5 class="product-info__description">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat
      hendrerit, sapien tortor adipiscing augue, a maximus elit ex vitae libero. Sed quis mauris
      eget arcu facilisis consequat sed eu felis.
    </h5>

    <div class="product-info__purchase">
      <div class="product-info__quantity">
        <BaseButton
          type="transparent"
          aria-label="Decrease quantity"
          :disabled="quantity === 1"
          @click="decreaseQuantity"
        >
          −
        </BaseButton>
        <span>{{ quantity }}</span>
        <BaseButton type="transparent" aria-label="Increase quantity" @click="increaseQuantity">
          +
        </BaseButton>
      </div>

      <BaseButton type="transparent" class="product-info__add-button" @click="handleAddToCart">
        ADD TO CART
      </BaseButton>
    </div>

    <div class="product-info__socials">
      <BaseButton type="transparent" aria-label="Email">
        <IconLetter />
      </BaseButton>
      <BaseButton type="transparent" aria-label="Facebook">
        <IconFacebook />
      </BaseButton>
      <BaseButton type="transparent" aria-label="Instagram">
        <IconInstagram />
      </BaseButton>
      <BaseButton type="transparent" aria-label="Twitter">
        <IconTwitter />
      </BaseButton>
    </div>

    <div class="product-info__meta">
      <div class="product-info__meta-row">
        <h5 class="product-info__meta-row-text">SKU:</h5>
        <h5>{{ product.id }}</h5>
      </div>
      <div class="product-info__meta-row">
        <h5 class="product-info__meta-row-text">Categories:</h5>
        <h5>Fashion, Style</h5>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .product-info {
    min-width: 0;

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

    &__price {
      margin: 0 0 24px;
      font-family: var(--font-primary), sans-serif;
      font-size: var(--h4-size);
      font-weight: var(--h4-weight);
      line-height: var(--h4-lh);
      color: var(--color-accent);

      @media (max-width: $breakpoints-m) {
        margin-bottom: 24px;
        font-size: var(--h5-size);
        font-weight: var(--h5-weight);
        line-height: var(--h5-lh);
      }
    }

    &__rating {
      display: flex;
      gap: 12px;
      align-items: center;
      margin-bottom: 16px;

      @media (max-width: $breakpoints-m) {
        display: none;
      }
    }

    &__stars {
      display: flex;
      gap: 4px;
      font-size: 16px;
      line-height: 1;
      color: var(--color-black);
    }

    &__reviews {
      margin: 0;
      font-size: var(--body-small-size);
      font-weight: var(--body-small-weight);
      line-height: var(--body-small-lh);
      color: var(--color-neutral-dark-gray);
    }

    &__description {
      max-width: 480px;
      margin: 0 0 32px;
      color: var(--color-neutral-dark-gray);

      @media (max-width: $breakpoints-m) {
        margin-bottom: 24px;
        font-size: var(--body-small-size);
        font-weight: var(--body-small-weight);
        line-height: var(--body-small-lh);
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
        margin-bottom: 28px;
      }
    }

    &__quantity {
      box-sizing: border-box;
      display: flex;
      flex: 0 0 102px;
      align-items: center;
      justify-content: space-between;
      width: 102px;
      height: 48px;
      padding: 0 12px;
      font-size: var(--body-medium-size);
      line-height: 1;
      color: var(--color-neutral-dark-gray);
      background: var(--color-neutral-light-gray);
      border-radius: 4px;

      @media (max-width: $breakpoints-m) {
        flex: none;
        width: 100%;
        min-width: 0;
        max-width: 100%;
        height: 44px;
      }

      :deep(.base-button) {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: 24px;
        min-width: 24px;
        height: 100%;
        padding: 0;
        font-size: 18px;
        line-height: 1;
        color: var(--color-neutral-dark-gray);

        &:disabled {
          cursor: default;
          opacity: 0.5;
        }

        &:hover {
          background: transparent;
          border-radius: 0;
        }
      }

      span {
        min-width: 20px;
        font-weight: 500;
        text-align: center;
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
      display: flex;
      gap: 20px;
      align-items: center;
      margin-bottom: 28px;

      :deep(.base-button) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        padding: 0;
        font-size: 16px;
        line-height: 1;
        color: var(--color-neutral-dark-gray);
        transition: color 0.2s;

        &:hover {
          color: var(--color-black);
          background: transparent;
          border-radius: 0;
        }
      }
    }

    &__meta {
      display: flex;
      flex-direction: column;
      gap: 10px;

      h5 {
        margin: 0;
      }
    }

    &__meta-row {
      display: flex;
      gap: 8px;
      font-size: var(--body-small-size);
      font-weight: var(--body-small-weight);
      line-height: var(--body-small-lh);
      color: var(--color-neutral-dark-gray);

      &-text {
        color: var(--color-black);
      }
    }
  }
</style>
