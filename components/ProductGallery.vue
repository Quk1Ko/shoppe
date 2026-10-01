<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import type { Swiper as SwiperType } from 'swiper'
  import 'swiper/css'
  import ProductGalleryThumbnails from './ProductGalleryThumbnails.vue'
  import ProductGalleryProgress from './ProductGalleryProgress.vue'

  const props = defineProps<{
    images: string[]
    title: string
  }>()

  const selectedImage = ref(0)
  const swiperInstance = ref<SwiperType | null>(null)

  const currentImage = computed(() => {
    return props.images[selectedImage.value] ?? ''
  })

  const onSwiper = (swiper: SwiperType) => {
    swiperInstance.value = swiper
  }

  const onSlideChange = (swiper: SwiperType) => {
    selectedImage.value = swiper.activeIndex
  }

  const selectThumbnail = (index: number) => {
    selectedImage.value = index
    swiperInstance.value?.slideTo(index)
  }
</script>

<template>
  <div class="product-gallery">
    <div class="product-gallery__desktop">
      <ProductGalleryThumbnails
        :images="images"
        :title="title"
        :selected-index="selectedImage"
        @select="selectThumbnail"
      />

      <div class="product-gallery__main">
        <img :src="currentImage" :alt="title" />
      </div>
    </div>

    <div v-if="images.length > 1" class="product-gallery__progress-row">
      <div class="product-gallery__progress-spacer" aria-hidden="true" />
      <ProductGalleryProgress
        class="product-gallery__progress"
        :total="images.length"
        :current="selectedImage"
      />
    </div>

    <div class="product-gallery__mobile">
      <Swiper
        class="product-gallery__swiper"
        :slides-per-view="1"
        :space-between="0"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="(image, index) in images" :key="index">
          <div class="product-gallery__slide">
            <img :src="image" :alt="`${title} ${index + 1}`" />
          </div>
        </SwiperSlide>
      </Swiper>

      <ProductGalleryProgress
        v-if="images.length > 1"
        class="product-gallery__progress--mobile"
        :total="images.length"
        :current="selectedImage"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .product-gallery {
    width: 100%;
    min-width: 0;

    &__desktop {
      display: flex;
      gap: 39px;
      align-items: stretch;
      width: 100%;

      @media (max-width: $breakpoints-xl) {
        gap: 28px;
      }

      @media (max-width: $breakpoints-l) {
        gap: 20px;
      }

      @media (max-width: $breakpoints-m) {
        display: none;
      }
    }

    &__main {
      position: relative;
      flex: 0 1 auto;
      width: 100%;
      max-width: 540px;
      aspect-ratio: 540 / 600;
      overflow: hidden;
      background: var(--color-neutral-light-gray);
      border-radius: 8px;

      img {
        position: absolute;
        inset: 0;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: transform 0.3s ease;
      }
    }

    &__progress-row {
      display: flex;
      gap: 39px;
      width: 100%;
      margin-top: 24px;

      @media (max-width: $breakpoints-xl) {
        gap: 28px;
        margin-top: 20px;
      }

      @media (max-width: $breakpoints-l) {
        gap: 20px;
        margin-top: 16px;
      }

      @media (max-width: $breakpoints-m) {
        display: none;
      }
    }

    &__progress-spacer {
      flex-shrink: 0;
      width: 120px;

      @media (max-width: $breakpoints-xl) {
        width: 100px;
      }

      @media (max-width: $breakpoints-l) {
        width: 80px;
      }
    }

    &__progress {
      flex: 0 1 auto;
      max-width: 540px;
    }

    &__progress--mobile {
      max-width: 344px;
      margin: 16px auto 0;
    }

    &__mobile {
      display: none;
      width: 100%;

      @media (max-width: $breakpoints-m) {
        display: block;
      }
    }

    &__swiper {
      width: 100%;
      overflow: hidden;
      border-radius: 4px;

      :deep(.swiper-slide) {
        height: auto;
      }
    }

    &__slide {
      position: relative;
      width: 100%;
      max-width: 344px;
      aspect-ratio: 288 / 374;
      margin: 0 auto;
      overflow: hidden;
      background: var(--color-neutral-light-gray);
      border-radius: 4px;

      img {
        position: absolute;
        inset: 0;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    &__main img:hover {
      transform: scale(1.5);
    }
  }
</style>
