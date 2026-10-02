<script setup lang="ts">
  defineProps<{
    images: string[]
    title: string
    selectedIndex: number
  }>()

  const emit = defineEmits<{
    select: [index: number]
  }>()
</script>

<template>
  <div class="product-gallery-thumbnails">
    <BaseButton
      v-for="(image, index) in images"
      :key="index"
      type="transparent"
      class="product-gallery-thumbnails__item"
      :class="{
        'product-gallery-thumbnails__item--active': selectedIndex === index,
      }"
      :aria-label="`View image ${index + 1}`"
      @click="emit('select', index)"
    >
      <img :src="image" :alt="`${title} ${index + 1}`" />
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
  .product-gallery-thumbnails {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    gap: 16px;
    width: 120px;

    @media (max-width: $breakpoints-xl) {
      gap: 14px;
      width: 100px;
    }

    @media (max-width: $breakpoints-l) {
      gap: 12px;
      width: 80px;
    }

    &__item {
      flex: 1 1 0;
      width: 100%;
      min-height: 0;
      padding: 0;
      overflow: hidden;
      cursor: pointer;
      background: var(--color-neutral-light-gray);
      border: 1px solid transparent;
      border-radius: 8px;
      transition: border-color 0.2s;

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }

      &--active {
        border-color: var(--color-black);
      }

      &:hover {
        background: var(--color-neutral-light-gray);
        border-radius: 8px;
      }
    }
  }
</style>
