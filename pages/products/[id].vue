<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { navigateTo, useRoute } from '#imports'
  import type { Product } from '~/types/api'
  import { mockProducts } from '~/public/test/mockProducts'
  import { useShare } from '~/composables/useShare'

  const route = useRoute()

  const productId = computed(() => Number(route.params.id))

  const product = computed<Product | undefined>(() => {
    return mockProducts.find((item) => item.id === productId.value)
  })

  const images = computed(() => {
    if (!product.value?.image) return []
    return [product.value.image, product.value.image, product.value.image, product.value.image]
  })

  const isNotificationOpen = ref(false)
  const notificationMessage = ref('')

  const handleAddToCart = (product: Product, quantity: number) => {
    notificationMessage.value = `${product.title} (x${quantity}) added to cart`
    isNotificationOpen.value = true
  }

  const handleViewCart = async () => {
    isNotificationOpen.value = false
    await navigateTo('/product')
  }
  const { share } = useShare()

  const handleShare = (platform: string) => {
    share(platform, {
      title: product.value?.title,
      text: product.value?.title,
    })
  }
</script>

<template>
  <section class="product-page">
    <div class="container">
      <div v-if="product" class="product-page__layout">
        <ProductGallery :images="images" :title="product.title" />

        <ProductInfo :product="product" @add-to-cart="handleAddToCart" @share="handleShare" />
      </div>

      <div v-else class="product-page__not-found">
        <h1>Product not found</h1>
      </div>
    </div>

    <Transition name="notification">
      <BaseNotification
        v-if="isNotificationOpen"
        type="success"
        :message="notificationMessage"
        action-text="View Cart"
        closable
        @close="isNotificationOpen = false"
        @action="handleViewCart"
      />
    </Transition>
  </section>
</template>

<style lang="scss" scoped>
  .product-page {
    padding: 35px 0 70px;

    @media (max-width: $breakpoints-l) {
      padding: 26px 0 60px;
    }

    @media (max-width: $breakpoints-m) {
      padding: 20px 0 46px;
    }

    &__layout {
      display: flex;
      gap: 48px;
      align-items: flex-start;

      :deep(.product-gallery) {
        flex: 1 1 0;
        min-width: 0;
      }

      :deep(.product-info) {
        flex: 1 1 0;
        min-width: 0;
      }

      @media (max-width: $breakpoints-xl) {
        gap: 40px;
      }

      @media (max-width: $breakpoints-l) {
        gap: 30px;
      }

      @media (max-width: $breakpoints-m) {
        flex-direction: column;
        gap: 24px;
      }
    }

    &__not-found {
      padding: 80px 0;
      text-align: center;

      h1 {
        margin: 0;
      }
    }
  }
</style>
