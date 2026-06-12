<script setup lang="ts">
  import { computed } from 'vue'
  import 'swiper/css'
  import 'swiper/css/pagination'

  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Pagination, Autoplay } from 'swiper/modules'
  import { useRandomImages } from '~/composables/api/photos/useRandomImages'
  import CardSlider from '~/components/CardSlider.vue'

  const { picsumImages } = useRandomImages()

  const slides = computed(() => {
    return picsumImages.map((img, index) => ({
      id: index,
      img: img,
      title: 'Gold big hoops',
      price: '$ 68,00',
    }))
  })
</script>

<template>
  <div class="slider">
    <Swiper
      :modules="[Pagination, Autoplay]"
      :slides-per-view="1"
      :space-between="0"
      :pagination="{ clickable: true }"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      :lazy="true"
      class="slider__swiper"
    >
      <SwiperSlide v-for="slide in slides" :key="slide.id">
        <CardSlider :slide="slide" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
  .slider {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 16px;

    &__swiper {
      width: 100%;
      height: 350px;
    }

    :deep(.swiper-pagination) {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :deep(.swiper-pagination-bullets.swiper-pagination-horizontal) {
      bottom: 24px;
      z-index: 3;
    }

    :deep(.swiper-pagination-bullet) {
      width: 10px;
      height: 10px;
      background-color: var(--color-white);
      opacity: 1;
    }

    :deep(.swiper-pagination-bullet-active) {
      width: 12px;
      height: 12px;
      background-color: transparent;
      border: 1px solid var(--color-white);
      opacity: 0.6;
      transition:
        background-color 0.3s,
        opacity 0.3s;
    }

    @media (width <= 767px) {
      :deep(.swiper-pagination-bullet) {
        width: 4px;
        height: 4px;
      }

      :deep(.swiper-pagination-bullet-active) {
        width: 8px;
        height: 8px;
      }
    }

    @media (min-width: $breakpoints-m) {
      &__swiper {
        height: 480px;
      }

      :deep(.swiper-pagination-bullet) {
        width: 8px;
        height: 8px;
      }

      :deep(.swiper-pagination-bullet-active) {
        width: 10px;
        height: 10px;
      }
    }

    @media (min-width: $breakpoints-xl) {
      &__swiper {
        height: 546px;
      }

      :deep(.swiper-pagination-bullet) {
        width: 10px;
        height: 10px;
      }

      :deep(.swiper-pagination-bullet-active) {
        width: 12px;
        height: 12px;
      }
    }

    @media (min-width: $breakpoints-l) {
      &__container {
        max-width: 936px;
      }
    }

    @media (min-width: $breakpoints-xl) {
      &__container {
        max-width: 1216px;
      }
    }

    @media (min-width: $breakpoints-xxl) {
      &__container {
        max-width: 1680px;
      }
    }
  }
</style>
