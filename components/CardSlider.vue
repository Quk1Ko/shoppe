<script setup lang="ts">
  import BaseButton from '~/components/BaseButton.vue'

  defineProps<{
    slide: {
      id: number
      img: string
      title: string
      price: string
    }
  }>()
</script>

<template>
  <div class="slider__card">
    <div class="slider__img-wrapper">
      <img :src="slide.img" loading="lazy" class="slider__img swiper-lazy" />
      <div class="swiper-lazy-preloader"></div>
    </div>

    <div class="slider__overlay">
      <div class="slider__content">
        <h1 class="slider__title">{{ slide.title }}</h1>
        <h2 class="slider__title">{{ slide.price }}</h2>
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
      align-items: flex-end;
      padding: 0 20px 40px;
      pointer-events: none;
    }

    &__content {
      width: 100%;
      max-width: 280px;
      pointer-events: auto;
    }

    &__title {
      color: var(--color-white);
    }

    &__btn {
      height: 52px;
      padding: 0 30px;
      margin-top: 16px;
      color: var(--color-white);
      border: 2px solid var(--color-white);
      border-radius: 6px;

      &-title {
        font-weight: 700;
      }
    }

    @media (width <= 767px) {
      .slider {
        &__title {
          margin: 0;
        }
      }

      &__btn {
        width: 92px;
        height: 32px;
        padding: 0;
        margin-top: 10px;
        border: 1px solid var(--color-white);
        border-width: 1px;
        border-radius: 4px;

        &-title {
          font-size: 12px;
          font-weight: 400;
          line-height: 32px;
        }
      }
    }

    @media (min-width: $breakpoints-m) {
      &__overlay {
        align-items: center;
        padding: 0 0 0 40px;
      }

      &__content {
        margin: 0 0 20px;
      }

      &__btn {
        margin-top: 20px;
      }
    }

    @media (min-width: $breakpoints-l) {
      &__overlay {
        padding-left: 60px;
      }
    }
  }
</style>
