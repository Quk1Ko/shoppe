<script setup lang="ts">
  import BaseButton from '~/components/BaseButton.vue'

  defineProps<{
    img: string
    title: string
    price: string
  }>()
</script>

<template>
  <div class="slider__card">
    <div class="slider__img-wrapper">
      <img :src="img" loading="lazy" class="slider__img swiper-lazy" />
      <div class="swiper-lazy-preloader"></div>
    </div>

    <div class="slider__overlay">
      <div class="slider__content">
        <h1 class="slider__title">{{ title }}</h1>
        <h2 class="slider__title">{{ price }}</h2>
        <BaseButton type="transparent" class="slider__btn">
          <h3 class="slider__btn-title">View Product</h3>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .slider {
    &__card {
      position: relative;
      width: 100%;
      height: 100%;
    }

    &__img-wrapper {
      position: absolute;
      inset: 0;
      z-index: 1;
    }

    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    &__overlay {
      position: absolute;
      inset: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      margin-left: 40px;
      pointer-events: none;
    }

    &__title {
      color: var(--color-white);
    }

    &__btn {
      height: 52px;
      padding: 0 30px;
      color: var(--color-white);
      border: 2px solid var(--color-white);
      border-radius: 6px;

      &-title {
        font-weight: 700;
      }
    }
  }
</style>
