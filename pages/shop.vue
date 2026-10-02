<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRoute, useRouter, navigateTo } from '#imports'
  import type { Product } from '~/types/api'
  //import { mockProducts } from '~/public/test/mockProducts'
  import IconFilter from '~/assets/icons/IconFilter.vue'
  import IconCross from '~/assets/icons/IconCross.vue'
  import { useGetAllProducts } from '~/composables/api/products/useGetAllProducts'

  const route = useRoute()
  const router = useRouter()

  const isFiltersOpen = ref(false)
  const isNotificationOpen = ref(false)
  const notificationMessage = ref('')
  // const pending = ref(false)
  // const products = computed<Product[]>(() => mockProducts)
  // const error = ref<Error | null>(null)

  const { data: productsData, pending, error } = useGetAllProducts()

  const products = computed<Product[]>(() => productsData.value ?? [])

  const perPage = 6

  const page = computed(() => {
    const raw = route.query.page
    const value = Array.isArray(raw) ? raw[0] : raw
    const parsed = Number(value)
    return Number.isInteger(parsed) && parsed > 0 ? parsed : 1
  })

  const totalPages = computed(() => Math.max(1, Math.ceil(products.value.length / perPage)))
  const safePage = computed(() => Math.max(1, Math.min(page.value, totalPages.value)))

  const visiblePages = computed(() => {
    const maxVisiblePages = 3

    if (totalPages.value <= maxVisiblePages) {
      return Array.from({ length: totalPages.value }, (_, index) => index + 1)
    }

    const startPage = Math.min(
      Math.max(safePage.value - 1, 1),
      totalPages.value - maxVisiblePages + 1,
    )

    return Array.from({ length: maxVisiblePages }, (_, index) => startPage + index)
  })

  const hasNextPage = computed(() => {
    return safePage.value < totalPages.value
  })

  const goToNextPage = async () => {
    if (!hasNextPage.value) return

    await goToPage(safePage.value + 1)
  }

  const paginatedProducts = computed(() => {
    const start = (safePage.value - 1) * perPage
    return products.value.slice(start, start + perPage)
  })

  const goToPage = async (n: number) => {
    await router.push({
      path: route.path,
      query: { ...route.query, page: String(n) },
    })
  }
  const handleAddToCart = (product: Product) => {
    notificationMessage.value = `${product.title} added to cart`
    isNotificationOpen.value = true
  }
  const handleOpenProduct = async (productId: number) => {
    await navigateTo(`/products/${productId}`)
  }

  const handleViewCart = async () => {
    isNotificationOpen.value = false

    await navigateTo('/product')
  }
</script>

<template>
  <section class="shop">
    <div class="container">
      <SearchBar class="shop__search" />

      <h1>Shop</h1>

      <div class="shop__top">
        <BaseButton
          type="transparent"
          aria-label="Filters"
          class="shop__filters-button"
          @click="isFiltersOpen = true"
        >
          <IconFilter /> Filters
        </BaseButton>
      </div>

      <div class="shop__content">
        <aside class="shop__filters">
          <ProductFilters />
        </aside>

        <div v-if="pending" class="shop__loading">Loading...</div>

        <div v-else-if="error" class="shop__error">
          Failed to load products
          <pre>{{ error }}</pre>
        </div>
        <div v-else class="shop__right">
          <ProductList
            :products="paginatedProducts"
            @add-to-cart="handleAddToCart"
            @open-product="handleOpenProduct"
          />

          <div v-if="totalPages > 1" class="shop__pagination">
            <BaseButton
              v-for="n in visiblePages"
              :key="n"
              type="transparent"
              class="shop__page"
              :class="{ 'shop__page--active': n === safePage }"
              :aria-label="`Page ${n}`"
              @click="goToPage(n)"
            >
              {{ n }}
            </BaseButton>

            <BaseButton
              type="transparent"
              class="shop__page shop__page--next"
              aria-label="Next page"
              :disabled="!hasNextPage"
              @click="goToNextPage"
            >
              <span aria-hidden="true">›</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <Transition name="slide">
      <div v-if="isFiltersOpen" class="shop__drawer-backdrop" @click.self="isFiltersOpen = false">
        <div class="shop__drawer">
          <div class="shop__drawer-header">
            <BaseButton
              type="transparent"
              class="shop__drawer-close"
              @click="isFiltersOpen = false"
            >
              <IconCross />
            </BaseButton>
          </div>
          <ProductFilters />
        </div>
      </div>
    </Transition>
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
  .shop {
    padding: 66px 0;

    @media (max-width: $breakpoints-l) {
      padding: 26px 0 66px;
    }

    @media (max-width: $breakpoints-m) {
      padding: 16px 0 46px;
    }

    &__search {
      display: none;

      @media (max-width: $breakpoints-m) {
        display: flex;
      }
    }

    &__top {
      display: none;
      margin-bottom: 16px;

      @media (max-width: $breakpoints-l) {
        display: flex;
        justify-content: flex-start;
      }
    }

    &__filters-button {
      display: inline-flex;
      gap: 8px;
      align-items: center;
      padding: 10px 15px 10px 0;
      color: var(--color-black);
      background: var(--color-white);

      @media (max-width: $breakpoints-m) {
        font-size: var(--body-small-size);
        font-weight: var(--body-small-weight);
        line-height: var(--body-small-lh);
        color: var(--color-accent);
      }

      @media (max-width: $breakpoints-l) {
        color: var(--color-accent);
      }
    }

    &__content {
      display: flex;
      gap: 31px;
      align-items: flex-start;

      @media (max-width: $breakpoints-l) {
        flex-direction: column;
      }
    }

    &__filters {
      flex: 0 0 266px;
      width: 266px;

      @media (max-width: $breakpoints-l) {
        display: none;
      }
    }

    &__right {
      flex: 1 1 auto;
      min-width: 0;
    }

    &__loading,
    &__error {
      padding: 20px 0;
      color: var(--color-black);
    }

    &__pagination {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-top: 40px;
    }

    &__page {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      padding: 0;
      line-height: 1;
      color: var(--color-black);
      background: var(--color-white);
      border: 1px solid var(--color-neutral-gray);
      border-radius: 4px;

      &--active {
        color: var(--color-white);
        background: var(--color-black);
        border-color: var(--color-black);
      }

      &:hover {
        color: var(--color-black);
      }

      &--next {
        font-size: 26px;
        font-weight: 300;
      }
    }

    &__drawer-backdrop {
      position: fixed;
      inset: 0;
      z-index: 50;
      background: rgb(0 0 0 / 40%);
    }

    &__drawer {
      position: absolute;
      inset: 12px;
      z-index: 1;
      padding: 18px 16px 24px;
      overflow-y: auto;
      background: var(--color-white);
      border-radius: 18px;
    }

    &__drawer-header {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 18px;
    }

    &__drawer-close {
      width: 24px;
      height: 24px;
      padding: 0;
      color: var(--color-black);
    }
  }
</style>
